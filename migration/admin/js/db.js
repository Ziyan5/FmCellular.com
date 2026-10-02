// Every read and write the admin makes, in one place. Only the public anon
// key is used; what a signed-in person may change is decided by the
// database's own rules (admins only), never by this file.

const config = window.FM_ADMIN_CONFIG || {};
export const configured = !!(config.supabaseUrl && config.supabaseAnonKey && !config.supabaseUrl.includes("YOUR_PROJECT"));
export const sb = configured
  ? window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
    })
  : null;

export const me = { id: null, email: "", name: "", role: "staff", master: "sheet", seePurchase: false };

// An update the database refused returns no rows rather than an error, so
// every write asks for its rows back and treats none as a refusal.
function wrote(res) {
  if (res.error) throw new Error(res.error.message);
  if (!res.data || (Array.isArray(res.data) && !res.data.length)) throw new Error("The change was not accepted. Sign out and back in, then try again.");
  return res.data;
}

function check({ data, error, count }) {
  if (error) throw new Error(error.message);
  return count !== undefined && count !== null ? { data, count } : data;
}

// Every row of a query - PostgREST stops at 1,000.
async function all(build) {
  const out = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await build().range(from, from + 999);
    if (error) throw new Error(error.message);
    out.push(...data);
    if (data.length < 1000) return out;
  }
}

export async function loadMe(session) {
  me.id = session.user.id;
  me.email = session.user.email || "";
  const { data: ok, error } = await sb.rpc("is_admin");
  if (error || ok !== true) return false;
  const { data } = await sb.from("admin_users").select("role,display_name").eq("user_id", me.id).maybeSingle();
  me.role = (data && data.role) || "staff";
  me.name = (data && data.display_name) || me.email.replace(/@.*/, "");
  const { data: settings } = await sb.from("app_settings").select("key,value").in("key", ["catalog_master", "staff_see_purchase"]);
  const setting = (k) => ((settings || []).find((s) => s.key === k) || {}).value;
  me.master = setting("catalog_master") || "sheet";
  // What the shop paid is the owner's; staff see it only if the owner says so.
  me.seePurchase = me.role === "owner" || setting("staff_see_purchase") === "yes";
  return true;
}

export async function setSetting(key, value) {
  wrote(await sb.from("app_settings").upsert({ key, value }, { onConflict: "key" }).select("key"));
}

export async function log(action, target, detail = {}) {
  try {
    await sb.from("admin_activity").insert({ actor: me.id, actor_email: me.email, action, target, detail });
  } catch (e) { /* the change itself already saved */ }
}

/* ---------------- catalogue ---------------- */

// Devices and accessories with a summary of their options, in shop order.
export async function listDevices() {
  const rows = await all(() => sb.from("catalog_products")
    .select("id,item_type,category,brand,model,is_active,catalog_variants(retail_price,in_stock,is_active,sort_order)")
    .in("item_type", ["device", "accessory"]).order("model"));
  return rows.map(summarise).sort((a, b) => a.order - b.order);
}

export async function listParts({ group = "all", q = "", page = 0, size = 50, filter = "all" } = {}) {
  let req = sb.from("catalog_products")
    .select("id,category,brand,model,part_name,is_active,catalog_variants(retail_price,in_stock,is_active,sort_order,condition)", { count: "exact" })
    .eq("item_type", "part");
  if (group === "screens") req = req.eq("category", "Screens");
  else if (group === "apple") req = req.eq("brand", "Apple").neq("category", "Screens");
  else if (group === "samsung") req = req.eq("brand", "Samsung").neq("category", "Screens");
  const safe = q.replace(/[,%()*]/g, " ").trim();
  if (safe) {
    const words = safe.split(/\s+/).slice(0, 4);
    words.forEach((w) => { req = req.or(`model.ilike.%${w}%,part_name.ilike.%${w}%`); });
  }
  if (filter === "hidden") req = req.eq("is_active", false);
  if (!safe) {
    const { data, count, error } = await req.order("model").order("part_name").range(page * size, page * size + size - 1);
    if (error) throw new Error(error.message);
    return { rows: data.map(summarise), count: count || 0 };
  }
  // A search is ranked here: whole-word matches first, so "14 pro screen"
  // puts the iPhone 14 Pro screen above screen *pro*tectors for the A14.
  const { data, error } = await req.order("model").limit(400);
  if (error) throw new Error(error.message);
  const words = safe.toLowerCase().split(/\s+/).slice(0, 4);
  const score = (p) => {
    const m = String(p.model || "").toLowerCase(), n = String(p.part_name || "").toLowerCase();
    let s = 0;
    words.forEach((w) => {
      const whole = new RegExp("(^|[^a-z0-9])" + w.replace(/[^a-z0-9]/g, "") + "($|[^a-z0-9])");
      if (whole.test(m)) s += 3; else if (m.includes(w)) s += 1;
      if (whole.test(n)) s += 3; else if (n.includes(w)) s += 1;
    });
    return s - n.length / 200;                  // "Screen" before "Screen protector"
  };
  const ranked = data.map((p) => ({ p, s: score(p) })).sort((a, b) => b.s - a.s).map((x) => x.p);
  return { rows: ranked.slice(page * size, page * size + size).map(summarise), count: ranked.length };
}

function summarise(p) {
  const vs = (p.catalog_variants || []).filter((v) => v.is_active);
  const prices = vs.map((v) => v.retail_price).filter((x) => x !== null);
  const orders = (p.catalog_variants || []).map((v) => v.sort_order).filter((x) => x !== null);
  return {
    id: p.id, type: p.item_type, category: p.category, brand: p.brand, model: p.model,
    part: p.part_name, active: p.is_active,
    options: vs.length,
    from: prices.length ? Math.min(...prices) : null,
    to: prices.length ? Math.max(...prices) : null,
    unpriced: vs.filter((v) => v.retail_price === null).length,
    soldOut: vs.filter((v) => !v.in_stock).length,
    family: (vs[0] && vs[0].condition) || "",
    order: orders.length ? Math.min(...orders) : -1
  };
}

export async function allFinishes() {
  const rows = await all(() => sb.from("product_finishes")
    .select("id,product_id,color,hex_color,image_url,extra_urls,sort_order,is_hidden").order("sort_order"));
  const by = {};
  rows.forEach((f) => { (by[f.product_id] = by[f.product_id] || []).push(f); });
  return by;
}

export async function getProduct(id) {
  const p = check(await sb.from("catalog_products")
    .select("id,item_type,category,brand,model,part_name,is_active").eq("id", id).single());
  const variants = await all(() => sb.from("catalog_variants")
    .select("id,sku,storage,condition,color,retail_price,msrp,is_active,sort_order,in_stock,inventory_levels(quantity,available),wholesale_prices(price)")
    .eq("product_id", id).order("sort_order", { ascending: true, nullsFirst: true }).order("id"));
  const finishes = check(await sb.from("product_finishes")
    .select("id,color,hex_color,image_url,extra_urls,sort_order,is_hidden").eq("product_id", id).order("sort_order"));
  const images = check(await sb.from("product_images")
    .select("id,url,sort_order,is_primary,variant_id").eq("product_id", id).order("sort_order"));
  return {
    product: p,
    variants: variants.map((v) => {
      const inv = Array.isArray(v.inventory_levels) ? v.inventory_levels[0] : v.inventory_levels;
      const ws = Array.isArray(v.wholesale_prices) ? v.wholesale_prices[0] : v.wholesale_prices;
      return {
        id: v.id, sku: v.sku, storage: v.storage || "", condition: v.condition || "", color: v.color || "",
        price: v.retail_price, msrp: v.msrp, trade: ws ? ws.price : null,
        qty: inv ? inv.quantity : null, available: inv ? inv.available : true,
        active: v.is_active, sortOrder: v.sort_order
      };
    }),
    finishes, images
  };
}

// Saves a product page: the product switch, every changed option, and the
// colours. `changes` is what the page collected; nothing unchanged is sent.
export async function saveProduct(productId, { product, options, newOptions, finishes, images }) {
  if (product) wrote(await sb.from("catalog_products").update(product).eq("id", productId).select("id"));

  for (const o of options || []) {
    const v = {};
    ["storage", "condition", "color"].forEach((k) => { if (k in o.set) v[k] = o.set[k] || null; });
    if ("price" in o.set) v.retail_price = o.set.price;
    if ("active" in o.set) v.is_active = o.set.active;
    if (Object.keys(v).length) wrote(await sb.from("catalog_variants").update(v).eq("id", o.id).select("id"));
    if ("qty" in o.set || "available" in o.set) {
      const inv = { variant_id: o.id };
      if ("qty" in o.set) inv.quantity = o.set.qty;
      if ("available" in o.set) inv.available = o.set.available;
      wrote(await sb.from("inventory_levels").upsert(inv, { onConflict: "variant_id" }).select("variant_id"));
    }
    if ("trade" in o.set) {
      if (o.set.trade === null) check(await sb.from("wholesale_prices").delete().eq("variant_id", o.id));
      else wrote(await sb.from("wholesale_prices").upsert({ variant_id: o.id, price: o.set.trade }, { onConflict: "variant_id" }).select("variant_id"));
    }
  }

  for (const n of newOptions || []) {
    const sku = "FMC-" + crypto.randomUUID().replace(/-/g, "").slice(0, 16).toUpperCase();
    const row = check(await sb.from("catalog_variants").insert({
      product_id: productId, sku, storage: n.storage || null, condition: n.condition || null, color: n.color || null,
      retail_price: n.price, is_active: true
    }).select("id").single());
    check(await sb.from("inventory_levels").upsert({ variant_id: row.id, quantity: n.qty, available: n.available !== false }, { onConflict: "variant_id" }));
    if (n.trade !== null && n.trade !== undefined) check(await sb.from("wholesale_prices").insert({ variant_id: row.id, price: n.trade }));
  }

  if (finishes) {
    // Replace the colour list with what the page shows, in its order.
    const { data: have } = await sb.from("product_finishes").select("id,color").eq("product_id", productId);
    const keep = new Set(finishes.map((f) => f.color.trim().toLowerCase()));
    const gone = (have || []).filter((f) => !keep.has(String(f.color).trim().toLowerCase())).map((f) => f.id);
    if (gone.length) check(await sb.from("product_finishes").delete().in("id", gone));
    const rows = finishes.map((f, i) => ({
      product_id: productId, color: f.color.trim(), hex_color: f.hex || null,
      image_url: f.photos[0] || null, extra_urls: f.photos.slice(1), sort_order: i + 1, is_hidden: !!f.hidden
    }));
    if (rows.length) wrote(await sb.from("product_finishes").upsert(rows, { onConflict: "product_id,color" }).select("id"));
  }

  if (images) {
    check(await sb.from("product_images").delete().eq("product_id", productId).is("variant_id", null));
    const rows = images.map((url, i) => ({ product_id: productId, url, sort_order: i, is_primary: i === 0 }));
    if (rows.length) wrote(await sb.from("product_images").upsert(rows, { onConflict: "product_id,url" }).select("id"));
  }
}

/* ---------------- price sheet ---------------- */

// Every listing with its three prices, for the price sheet. Pages are asked
// for side by side, so nine thousand parts arrive in about a second.
export async function priceRows(kind) {
  const build = () => {
    const q = sb.from("catalog_variants")
      .select("id,product_id,storage,condition,retail_price,msrp,is_active,sort_order," +
        "catalog_products!inner(id,item_type,category,brand,model,part_name,is_active)," +
        "wholesale_prices(price)" + (me.seePurchase ? ",purchase_prices(price)" : ""), { count: "exact" });
    return (kind === "parts" ? q.eq("catalog_products.item_type", "part") : q.in("catalog_products.item_type", ["device", "accessory"]))
      .order("sort_order", { ascending: true, nullsFirst: false }).order("id");
  };
  const first = await build().range(0, 999);
  if (first.error) throw new Error(first.error.message);
  const rest = [];
  for (let from = 1000; from < (first.count || 0); from += 1000) rest.push(build().range(from, from + 999));
  const more = await Promise.all(rest);
  const out = [...first.data];
  more.forEach((r) => { if (r.error) throw new Error(r.error.message); out.push(...r.data); });
  const one = (x) => (Array.isArray(x) ? x[0] : x);
  return out.map((v) => {
    const p = v.catalog_products, ws = one(v.wholesale_prices), pp = one(v.purchase_prices);
    return {
      id: v.id, productId: v.product_id, storage: v.storage || "", condition: v.condition || "",
      price: v.retail_price, trade: ws ? ws.price : null, purchase: pp ? pp.price : null,
      msrp: v.msrp, active: v.is_active, order: v.sort_order,
      category: p.category, brand: p.brand, model: p.model, part: p.part_name || "", productActive: p.is_active
    };
  });
}

async function pool(items, size, fn) {
  let at = 0;
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, async () => {
    while (at < items.length) await fn(items[at++]);
  }));
}
const chunks = (list, n) => Array.from({ length: Math.ceil(list.length / n) }, (_, i) => list.slice(i * n, i * n + n));

// Saves the price sheet. Each list holds { id, price }; a null price clears
// it. `create` adds a grade a model did not have yet.
export async function savePrices({ retail = [], trade = [], purchase = [], create = [] }) {
  await pool(retail, 8, async (r) => wrote(await sb.from("catalog_variants").update({ retail_price: r.price }).eq("id", r.id).select("id")));
  for (const [table, list] of [["wholesale_prices", trade], ["purchase_prices", purchase]]) {
    const set = list.filter((x) => x.price !== null).map((x) => ({ variant_id: x.id, price: x.price }));
    const clear = list.filter((x) => x.price === null).map((x) => x.id);
    for (const part of chunks(set, 500)) wrote(await sb.from(table).upsert(part, { onConflict: "variant_id" }).select("variant_id"));
    for (const part of chunks(clear, 100)) check(await sb.from(table).delete().in("variant_id", part));
  }
  for (const n of create) {
    const sku = "FMC-" + crypto.randomUUID().replace(/-/g, "").slice(0, 16).toUpperCase();
    const row = check(await sb.from("catalog_variants").insert({
      product_id: n.productId, sku, storage: n.storage || null, condition: n.condition || null,
      retail_price: n.price, msrp: n.msrp ?? null, sort_order: n.order ?? null, is_active: true
    }).select("id").single());
    check(await sb.from("inventory_levels").upsert({ variant_id: row.id, quantity: null, available: true }, { onConflict: "variant_id" }));
    if (n.trade !== null) check(await sb.from("wholesale_prices").insert({ variant_id: row.id, price: n.trade }));
    if (n.purchase !== null) check(await sb.from("purchase_prices").insert({ variant_id: row.id, price: n.purchase }));
  }
}

/* ---------------- photos ---------------- */

export async function upload(blob, folder) {
  const ext = blob.type === "image/png" ? "png" : blob.type === "image/jpeg" ? "jpg" : "webp";
  const path = `${folder}/${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
  const { error } = await sb.storage.from("media").upload(path, blob, { contentType: blob.type, cacheControl: "31536000", upsert: false });
  if (error) throw new Error(error.message);
  return sb.storage.from("media").getPublicUrl(path).data.publicUrl;
}

/* ---------------- posters ---------------- */

export async function listPosters() {
  return check(await sb.from("posters").select("*").order("sort_order"));
}
export async function savePosterOrder(ids) {
  for (let i = 0; i < ids.length; i++) wrote(await sb.from("posters").update({ sort_order: i + 1 }).eq("id", ids[i]).select("id"));
}
export async function updatePoster(id, set) {
  wrote(await sb.from("posters").update(set).eq("id", id).select("id"));
}
export async function addPoster(row) {
  return check(await sb.from("posters").insert(row).select("*").single());
}
export async function deletePoster(id) {
  check(await sb.from("posters").delete().eq("id", id));
}

/* ---------------- home & activity ---------------- */

export async function stats() {
  const head = (t) => sb.from(t).select("*", { count: "exact", head: true });
  const [devices, parts, unpriced, soldOut, hidden, posters] = await Promise.all([
    head("catalog_products").in("item_type", ["device", "accessory"]).eq("is_active", true),
    head("catalog_products").eq("item_type", "part").eq("is_active", true),
    head("catalog_variants").eq("is_active", true).is("retail_price", null),
    head("catalog_variants").eq("is_active", true).eq("in_stock", false),
    head("catalog_products").eq("is_active", false),
    head("posters").eq("is_hidden", false)
  ]);
  const n = (r) => (r.error ? null : r.count);
  return { devices: n(devices), parts: n(parts), unpriced: n(unpriced), soldOut: n(soldOut), hidden: n(hidden), posters: n(posters) };
}

export async function activity(limit = 50) {
  return check(await sb.from("admin_activity").select("*").order("at", { ascending: false }).limit(limit));
}

export async function search(q) {
  const safe = q.replace(/[,%()*]/g, " ").trim();
  if (!safe) return [];
  let req = sb.from("catalog_products").select("id,item_type,category,model,part_name,is_active");
  safe.split(/\s+/).slice(0, 4).forEach((w) => { req = req.or(`model.ilike.%${w}%,part_name.ilike.%${w}%`); });
  const rows = check(await req.order("item_type").order("model").limit(30));
  // Phones first, then parts: a search for "14 Pro" is usually the phone.
  return rows.sort((a, b) => (a.item_type === "part") - (b.item_type === "part"));
}
