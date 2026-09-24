// Copies the shop from the Google Sheet into Supabase, replacing the catalogue.
//
// Only for the weeks before the switch, while the sheet is still where
// prices are typed. Once the shop runs on Supabase, this must not be run
// again: it would throw away every edit made in the new admin.
//
// Who can run it: a signed-in admin (checked with is_admin() as the caller).
// Where the data comes from: the Apps Script action exportForMigration,
// which sends listings on an allow list of columns - never a cost column,
// never the owner's own "parts" tab. Its key lives in this function's
// secrets (LIBRARY_IMPORT_KEY), never in a browser.
//
// POST {}                          -> counts only, nothing changed
// POST { "confirm": "replace-all" } -> replaces the catalogue

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const EXPORT_URL = Deno.env.get("SHEET_EXPORT_URL") ||
  "https://script.google.com/macros/s/AKfycbwzTCfZpWc0SuBynbBk38BY2OGHEx9OrIoaUqeFoTVQp4NBDzblrbxQ4GW35GKQs3X5/exec";
const CHUNK = 500;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json; charset=utf-8" },
  });
}

const text = (v: unknown) => (v === null || v === undefined ? "" : String(v).trim());
const money = (v: unknown) => {
  const n = Number(text(v).replace(/[$,]/g, ""));
  return text(v) !== "" && Number.isFinite(n) && n > 0 ? Math.round(n * 100) / 100 : null;
};
const count = (v: unknown) => {
  const n = Number(text(v));
  return text(v) !== "" && Number.isFinite(n) ? Math.max(0, Math.floor(n)) : null;
};
const yes = (v: unknown) => ["yes", "true", "1", "y"].includes(text(v).toLowerCase());
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 110) || "item";

// A stable id from a name, so the same listing gets the same id every run.
async function idFor(kind: string, key: string) {
  const bytes = new Uint8Array(await crypto.subtle.digest("SHA-1", new TextEncoder().encode(kind + "|" + key)));
  bytes[6] = (bytes[6] & 0x0f) | 0x50;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const h = [...bytes.slice(0, 16)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`;
}
async function shortHash(s: string) {
  const b = new Uint8Array(await crypto.subtle.digest("SHA-1", new TextEncoder().encode(s)));
  return [...b.slice(0, 8)].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function brandFor(category: string, model: string, family: string) {
  const all = `${category} ${model} ${family}`.toLowerCase();
  if (/iphone|ipad|macbook|apple watch|airpod|imac/.test(all)) return "Apple";
  if (/samsung|galaxy/.test(all)) return "Samsung";
  if (/google|pixel/.test(all)) return "Google";
  if (/motorola|moto /.test(all)) return "Motorola";
  return null;
}

async function build(data: any) {
  const products = new Map<string, any>();
  const variants: any[] = [];
  const seen = new Map<string, number>();

  const sources: [string, any[]][] = [["inventory", data.inventory || []], ["parts", data.parts || []]];
  for (const [source, rows] of sources) {
    for (const r of rows) {
      const category = text(r.category), model = text(r.model);
      if (!category || !model) continue;
      const itemType = source === "parts" ? "part" : category === "Accessories" ? "accessory" : "device";
      const part = text(r.part) || null;
      const productKey = [itemType, category, model, part || ""].map((s) => s.toLowerCase()).join("|");
      const productId = await idFor("product", productKey);
      if (!products.has(productId)) {
        products.set(productId, {
          id: productId, item_type: itemType, category, model, part_name: part,
          brand: brandFor(category, model, text(r.condition)),
          slug: slugify([category, model, part].filter(Boolean).join("-")) + "-" + (await shortHash(productKey)),
          is_active: true,
        });
      }
      const storage = text(r.storage) || null, condition = text(r.condition) || null, color = text(r.color) || null;
      const baseKey = [productKey, storage || "", condition || "", color || "", text(r.supplier_sku)].join("|");
      const n = (seen.get(baseKey) || 0) + 1;
      seen.set(baseKey, n);
      const variantKey = `${baseKey}|${n}`;
      const qty = count(r.qty);
      variants.push({
        id: await idFor("variant", variantKey),
        product_id: productId,
        sku: "FMC-" + (await shortHash(variantKey)).toUpperCase(),
        supplier_sku: text(r.supplier_sku) || null,
        storage, condition, color,
        retail_price: money(r.price), msrp: money(r.msrp),
        is_active: true,
        sort_order: variants.length + 1,   // the sheet's own order
        metadata: { source, notes: text(r.notes) || undefined },
        _qty: qty,
        _available: text(r.in_stock).toLowerCase() !== "no" && (qty === null || qty > 0),
        _wholesale: money(r.wholesale),
        _image: text(r.image_url) || null,
      });
    }
  }

  // Colours belong to the device product of the same model name.
  const deviceByModel = new Map<string, string>();
  for (const p of products.values()) if (p.item_type !== "part" && !deviceByModel.has(p.model)) deviceByModel.set(p.model, p.id);
  const finishes: any[] = [];
  const finishSeen = new Set<string>();
  let finishesUnmatched = 0;
  for (const f of data.finishes || []) {
    const productId = deviceByModel.get(text(f.model));
    const color = text(f.color);
    if (!productId || !color) { finishesUnmatched++; continue; }
    const k = productId + "|" + color.toLowerCase();
    if (finishSeen.has(k)) continue;
    finishSeen.add(k);
    finishes.push({
      product_id: productId, color, hex_color: text(f.hex) || null,
      image_url: text(f.image_url) || null,
      extra_urls: text(f.extra_urls).split("|").map((s) => s.trim()).filter(Boolean),
      sort_order: count(f.sort) ?? 0, is_hidden: yes(f.hidden),
    });
  }

  // Most of the Site text tab is the page's own wording as it was first
  // seeded, and some of that is out of date now. Only real edits - the ones
  // the sheet's own feed sends - are switched on.
  const overrides = data.contentOverrides || {};
  const content = (data.content || [])
    .filter((c: any) => text(c.key))
    .map((c: any) => ({
      content_key: text(c.key), page: text(c.page) || "index.html", element: text(c.element) || "p",
      text_value: text(c.text) || null,
      is_active: Object.prototype.hasOwnProperty.call(overrides, text(c.key)),
    }));
  const strip = (rows: any[]) => rows.map(({ _row, ...rest }) => rest);
  content.push({ content_key: "sheet:posters", page: "fm-parts.html", element: "config",
    content_json: strip(data.posters || []), is_active: true });
  content.push({ content_key: "sheet:buyback", page: "index.html", element: "config",
    content_json: strip(data.buyback || []), is_active: true });

  return { products: [...products.values()], variants, finishes, content, finishesUnmatched };
}

async function insertAll(db: any, table: string, rows: any[], onConflict?: string) {
  for (let i = 0; i < rows.length; i += CHUNK) {
    const slice = rows.slice(i, i + CHUNK);
    const q = onConflict ? db.from(table).upsert(slice, { onConflict }) : db.from(table).insert(slice);
    const { error } = await q;
    if (error) throw new Error(`${table}: ${error.message}`);
  }
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (request.method !== "POST") return json({ ok: false, error: "Use POST." }, 405);

  const url = Deno.env.get("SUPABASE_URL")!;
  const caller = createClient(url, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: request.headers.get("Authorization") || "" } },
    auth: { persistSession: false },
  });
  const { data: isAdmin, error: adminError } = await caller.rpc("is_admin");
  if (adminError || isAdmin !== true) return json({ ok: false, error: "Only a signed-in admin can do this." }, 403);

  // Trimmed: a key pasted from the text file easily brings its line break along.
  const key = (Deno.env.get("LIBRARY_IMPORT_KEY") || "").trim();
  if (!key) return json({ ok: false, error: "LIBRARY_IMPORT_KEY is not set in this function's secrets." }, 500);

  let body: any = {};
  try { body = await request.json(); } catch { /* empty body is a dry run */ }
  const apply = body.confirm === "replace-all";

  try {
    // Google now and then answers with an error page instead of data; one
    // more try is usually enough.
    let data: any = null, lastError = "";
    for (let attempt = 1; attempt <= 3 && !data; attempt++) {
      const res = await fetch(EXPORT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "exportForMigration", key }),
      });
      const raw = await res.text();
      try { data = JSON.parse(raw); } catch { lastError = "Google answered with a page, not data (HTTP " + res.status + ")"; }
      if (!data) await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
    if (!data) return json({ ok: false, error: "The sheet export failed: " + lastError }, 502);
    if (!data.ok) return json({ ok: false, error: "The sheet export failed: " + (data.error || "no reason given") }, 502);

    const built = await build(data);
    const summary = {
      exported: data.exported,
      products: built.products.length,
      variants: built.variants.length,
      priced: built.variants.filter((v) => v.retail_price !== null).length,
      wholesale: built.variants.filter((v) => v._wholesale !== null).length,
      finishes: built.finishes.length,
      finishesUnmatched: built.finishesUnmatched,
      content: built.content.length,
    };
    if (!apply) return json({ ok: true, dry: true, ...summary });

    const db = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });

    // Everything hangs off catalog_products, so clearing it clears variants,
    // stock, trade prices, images and colours with it.
    const { error: wipeError } = await db.from("catalog_products").delete().not("id", "is", null);
    if (wipeError) throw new Error("clearing the catalogue: " + wipeError.message);

    await insertAll(db, "catalog_products", built.products);
    await insertAll(db, "catalog_variants", built.variants.map(({ _qty, _available, _wholesale, _image, ...v }) => v));
    await insertAll(db, "inventory_levels", built.variants.map((v) => ({ variant_id: v.id, quantity: v._qty, available: v._available })));
    await insertAll(db, "wholesale_prices", built.variants.filter((v) => v._wholesale !== null)
      .map((v) => ({ variant_id: v.id, price: v._wholesale })));
    const images = new Map<string, any>();
    for (const v of built.variants) {
      if (!v._image) continue;
      const k = v.product_id + "|" + v._image;
      if (!images.has(k)) images.set(k, { product_id: v.product_id, variant_id: v.id, url: v._image, is_primary: true });
    }
    await insertAll(db, "product_images", [...images.values()]);
    await insertAll(db, "product_finishes", built.finishes);
    await insertAll(db, "cms_content", built.content, "content_key");

    return json({ ok: true, dry: false, ...summary, images: images.size });
  } catch (error) {
    console.error(error);
    return json({ ok: false, error: String((error as Error).message || error) }, 500);
  }
});
