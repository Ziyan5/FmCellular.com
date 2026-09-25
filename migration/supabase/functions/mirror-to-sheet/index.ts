// Keeps the Google Sheet a faithful copy of Supabase, so checkout, the
// wholesale portal, parts orders and stock alerts - which still price from
// the sheet - always charge what the website shows.
//
// Who can run it: a signed-in admin (the admin calls it after every save).
// What it sends: every listing's price, trade price, RRP, stock and whether
// it is on sale, keyed the same way sync-from-sheet keyed them, to the Apps
// Script action mirrorFromSupabase. The import key lives in this function's
// secrets (LIBRARY_IMPORT_KEY), never in a browser.
//
// POST {}                 -> what would change, nothing written
// POST { "apply": true }  -> writes the sheet

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const EXPORT_URL = Deno.env.get("SHEET_EXPORT_URL") ||
  "https://script.google.com/macros/s/AKfycbwzTCfZpWc0SuBynbBk38BY2OGHEx9OrIoaUqeFoTVQp4NBDzblrbxQ4GW35GKQs3X5/exec";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { ...cors, "Content-Type": "application/json; charset=utf-8" },
});
const text = (v: unknown) => (v === null || v === undefined ? "" : String(v).trim());

async function everything(db: any) {
  const out: any[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db.from("catalog_variants")
      .select("id,storage,condition,color,supplier_sku,retail_price,msrp,is_active,sort_order," +
        "catalog_products!inner(item_type,category,model,part_name,is_active)," +
        "inventory_levels(quantity,available),wholesale_prices(price)")
      .order("sort_order", { ascending: true, nullsFirst: false }).order("id")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    out.push(...data);
    if (data.length < 1000) return out;
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

  const key = (Deno.env.get("LIBRARY_IMPORT_KEY") || "").trim();
  if (!key) return json({ ok: false, error: "LIBRARY_IMPORT_KEY is not set in this function's secrets." }, 500);

  let body: any = {};
  try { body = await request.json(); } catch { /* empty body is a dry run */ }

  try {
    const db = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
    const rows = await everything(db);

    // The same key sync-from-sheet built, counting duplicates in shop order.
    const seen = new Map<string, number>();
    const inventory: any[] = [], parts: any[] = [];
    for (const v of rows) {
      const p = v.catalog_products;
      const source = p.item_type === "part" ? "parts" : "inventory";
      const type = p.item_type === "part" ? "part" : text(p.category) === "Accessories" ? "accessory" : "device";
      const product = [type, text(p.category), text(p.model), text(p.part_name)].map((x) => x.toLowerCase()).join("|");
      const base = [product, text(v.storage), text(v.condition), text(v.color), text(v.supplier_sku)].join("|");
      const n = (seen.get(base) || 0) + 1;
      seen.set(base, n);
      const inv = Array.isArray(v.inventory_levels) ? v.inventory_levels[0] : v.inventory_levels;
      const ws = Array.isArray(v.wholesale_prices) ? v.wholesale_prices[0] : v.wholesale_prices;
      const qty = inv ? inv.quantity : null;
      const on = v.is_active && p.is_active && (!inv || inv.available !== false) && (qty === null || qty > 0);
      (source === "parts" ? parts : inventory).push({
        key: base + "|" + n,
        category: p.category, model: p.model, part: p.part_name || "",
        storage: v.storage || "", condition: v.condition || "", color: v.color || "", supplier_sku: v.supplier_sku || "",
        price: v.retail_price, wholesale: ws ? ws.price : null, msrp: v.msrp, qty, on,
      });
    }

    // Apps Script answers a POST with a redirect to its result. Followed
    // automatically, a big POST can come back as the public GET feed instead,
    // so the redirect is followed here, by hand, and the answer checked.
    let result: any = null;
    const payload = JSON.stringify({ action: "mirrorFromSupabase", key, dry: body.apply !== true, inventory, parts });
    for (let attempt = 1; attempt <= 3 && !result; attempt++) {
      const first = await fetch(EXPORT_URL, {
        method: "POST", redirect: "manual",
        headers: { "Content-Type": "text/plain;charset=utf-8" }, body: payload,
      });
      const to = first.headers.get("location");
      const res = to ? await fetch(to) : first;
      try {
        const got = JSON.parse(await res.text());
        if (got && !Array.isArray(got) && ("inventory" in got || got.ok === false)) result = got;
      } catch { /* a page, not data */ }
      if (!result) await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
    if (!result) return json({ ok: false, error: "Google answered with a page, not data." }, 502);
    if (!result.ok) return json({ ok: false, error: result.error || "The sheet refused the copy." }, 502);
    return json({ ok: true, sent: { inventory: inventory.length, parts: parts.length }, ...result });
  } catch (error) {
    console.error(error);
    return json({ ok: false, error: String((error as Error).message || error) }, 500);
  }
});
