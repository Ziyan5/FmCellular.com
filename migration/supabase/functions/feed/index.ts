import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Cache-Control": "public, max-age=60, s-maxage=300",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json; charset=utf-8" },
  });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (request.method !== "GET") return json({ ok: false, error: "Method not allowed" }, 405);

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const [{ data: variants, error: variantsError }, { data: finishes, error: finishesError }, { data: content, error: contentError }] =
      await Promise.all([
        supabase
          .from("catalog_variants")
          .select("id,storage,condition,color,retail_price,msrp,is_active,catalog_products!inner(item_type,category,model,part_name,is_active),inventory_levels(quantity,available),product_images(url,is_primary,sort_order)")
          .eq("is_active", true)
          .eq("catalog_products.is_active", true),
        supabase
          .from("product_finishes")
          .select("color,hex_color,image_url,extra_urls,sort_order,is_hidden,catalog_products!inner(model,is_active)")
          .eq("is_hidden", false)
          .eq("catalog_products.is_active", true),
        supabase
          .from("cms_content")
          .select("content_key,page,element,text_value,content_json")
          .eq("is_active", true),
      ]);

    if (variantsError) throw variantsError;
    if (finishesError) throw finishesError;
    if (contentError) throw contentError;

    const rows = (variants || []).map((variant: any) => {
      const product = variant.catalog_products;
      const inventory = Array.isArray(variant.inventory_levels) ? variant.inventory_levels[0] : variant.inventory_levels;
      const images = (variant.product_images || []).slice().sort((a: any, b: any) =>
        Number(Boolean(b.is_primary)) - Number(Boolean(a.is_primary)) || (a.sort_order || 0) - (b.sort_order || 0)
      );
      return {
        category: product.category,
        model: product.model,
        storage: variant.storage || "",
        condition: variant.condition || "",
        color: variant.color || "",
        part: product.part_name || "",
        price: variant.retail_price,
        msrp: variant.msrp,
        // Public feed: a yes/no only. Counts and trade prices never leave the database.
        in_stock: Boolean(inventory?.available) && (inventory?.quantity == null || inventory.quantity > 0),
        image_url: images[0]?.url || "",
        notes: "",
        item_type: product.item_type,
      };
    });

    const deviceRows = rows.filter((row: any) => row.item_type === "device");
    const partRows = rows.filter((row: any) => row.item_type === "part");
    const finishModels: Record<string, any[]> = {};
    for (const finish of finishes || []) {
      const product: any = finish.catalog_products;
      (finishModels[product.model] ||= []).push({
        color: finish.color,
        hex: finish.hex_color,
        image_url: finish.image_url,
        extra: finish.extra_urls || [],
        sort: finish.sort_order,
        hidden: finish.is_hidden,
      });
    }

    const contentMap: Record<string, unknown> = {};
    for (const entry of content || []) {
      contentMap[entry.content_key] = entry.content_json ?? entry.text_value;
    }

    return json({
      ok: true,
      rows: deviceRows,
      parts: { ok: true, rows: partRows },
      finishes: { ok: true, models: finishModels },
      content: contentMap,
      buyback: { ok: true, rows: [] },
      posters: { ok: true, posters: [] },
      checkout: {},
      generated_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);
    return json({ ok: false, error: "Feed temporarily unavailable" }, 500);
  }
});
