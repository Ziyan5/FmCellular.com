#!/usr/bin/env python3
"""Generate public, SEO-friendly FM Cellular catalog pages from Master List."""

from __future__ import annotations

import html
import json
import sys
from collections import defaultdict
from decimal import Decimal
from pathlib import Path

from openpyxl import load_workbook

from build_seed_sql import make_statements

BASE_URL = "https://www.fmcellular.com"
SITE_NAME = "FM Cellular"
CATALOG_PAGE_SIZE = 96
SITEMAP_PAGE_SIZE = 500


def esc(value: object) -> str:
    return html.escape(str(value), quote=True)


def price(value: Decimal | None) -> str:
    return f"${value:,.2f}" if value is not None else "Contact us"


def page(title: str, description: str, canonical: str, body: str, json_ld: dict | None = None) -> str:
    structured = ""
    if json_ld:
        structured = (
            '<script type="application/ld+json">'
            + json.dumps(json_ld, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
            + "</script>"
        )
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(description)}">
  <link rel="canonical" href="{esc(canonical)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="{SITE_NAME}">
  <meta property="og:title" content="{esc(title)}">
  <meta property="og:description" content="{esc(description)}">
  <meta property="og:url" content="{esc(canonical)}">
  <link rel="stylesheet" href="/assets/catalog.css">
  {structured}
</head>
<body>
  <header class="site-header"><a class="brand" href="/">FM Cellular</a><nav aria-label="Main navigation"><a href="/products/">Shop catalog</a><a href="/fm-parts.html">Parts</a><a href="/fm-wholesale.html">Wholesale</a><a href="/contact.html">Contact</a></nav></header>
  <main>{body}</main>
  <footer><p>&copy; FM Cellular. Product availability and pricing can change.</p></footer>
</body>
</html>
"""


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("Usage: generate_static_pages.py INPUT.xlsx OUTPUT_DIRECTORY")

    source, output = Path(sys.argv[1]), Path(sys.argv[2])
    product_dir, asset_dir = output / "products", output / "assets"
    product_dir.mkdir(parents=True, exist_ok=True)
    asset_dir.mkdir(parents=True, exist_ok=True)

    workbook = load_workbook(source, read_only=True, data_only=True)
    products, variants, _ = make_statements(workbook)
    variants_by_product: dict[str, list[dict]] = defaultdict(list)
    for variant in variants:
        variants_by_product[variant["product_id"]].append(variant)

    index_cards: list[str] = []
    sitemap_urls = [f"{BASE_URL}/products/"]
    for product in sorted(products.values(), key=lambda p: (p[2].lower(), p[4].lower(), (p[5] or "").lower())):
        product_id, item_type, category, brand, model, part_name, slug = product
        product_variants = variants_by_product[product_id]
        name = " ".join(filter(None, (model, part_name)))
        available = any(v["available"] for v in product_variants)
        public_prices = [v["retail_price"] for v in product_variants if v["retail_price"] is not None]
        low_price = min(public_prices) if public_prices else None
        canonical = f"{BASE_URL}/products/{slug}.html"
        description = (
            f"Shop {name} from FM Cellular. View current options, pricing and availability for this {category} "
            "product. Wholesale inquiries are welcome."
        )
        rows = []
        for variant in sorted(product_variants, key=lambda v: (v["storage"] or "", v["condition"] or "", v["color"] or "")):
            details = " · ".join(filter(None, (variant["storage"], variant["condition"], variant["color"]))) or "Standard option"
            status = "In stock" if variant["available"] else "Check availability"
            rows.append(
                f'<tr><td>{esc(details)}</td><td>{esc(price(variant["retail_price"]))}</td>'
                f'<td><span class="status {"available" if variant["available"] else "check"}">{status}</span></td></tr>'
            )
        breadcrumb = f'<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/products/">Products</a><span>/</span><span>{esc(name)}</span></nav>'
        body = f"""{breadcrumb}
<article class="product-shell">
  <section class="product-hero"><p class="eyebrow">{esc(category)} · {esc(item_type.title())}</p><h1>{esc(name)}</h1><p class="lede">{esc(description)}</p><div class="price">{esc(f'From {price(low_price)}' if low_price is not None else 'Request pricing')}</div><a class="button" href="/contact.html">Ask about this item</a></section>
  <section class="panel"><h2>Available options</h2><div class="table-wrap"><table><thead><tr><th>Option</th><th>Price</th><th>Availability</th></tr></thead><tbody>{''.join(rows)}</tbody></table></div></section>
  <section class="panel"><h2>Why buy from FM Cellular?</h2><p>Clear product choices, responsive support and options for repair businesses, resellers and individual buyers.</p></section>
</article>"""
        offer = {
            "@type": "AggregateOffer",
            "priceCurrency": "USD",
            "offerCount": len(product_variants),
            "availability": "https://schema.org/InStock" if available else "https://schema.org/OutOfStock",
            "url": canonical,
        }
        if low_price is not None:
            offer["lowPrice"] = str(low_price)
            offer["highPrice"] = str(max(public_prices))
        schema = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": name,
            "category": category,
            "description": description,
            "url": canonical,
            "sku": product_id,
            "brand": {"@type": "Brand", "name": brand or "FM Cellular"},
            "offers": offer,
        }
        (product_dir / f"{slug}.html").write_text(page(f"{name} | FM Cellular", description, canonical, body, schema), encoding="utf-8")
        search_text = f"{category} {brand or ''} {name}".lower()
        index_cards.append(f'<article class="card" data-search="{esc(search_text)}"><p class="eyebrow">{esc(category)}</p><h2><a href="/products/{esc(slug)}.html">{esc(name)}</a></h2><p>{esc(f"From {price(low_price)}" if low_price is not None else "Request pricing")}</p><span class="status {"available" if available else "check"}">{"In stock" if available else "Check availability"}</span></article>')
        sitemap_urls.append(canonical)

    catalog_pages = [index_cards[i : i + CATALOG_PAGE_SIZE] for i in range(0, len(index_cards), CATALOG_PAGE_SIZE)]
    for page_number, cards in enumerate(catalog_pages, start=1):
        filename = "index.html" if page_number == 1 else f"page-{page_number}.html"
        canonical = f"{BASE_URL}/products/" if page_number == 1 else f"{BASE_URL}/products/{filename}"
        links = []
        for number in range(1, len(catalog_pages) + 1):
            href = "/products/" if number == 1 else f"/products/page-{number}.html"
            current = ' aria-current="page"' if number == page_number else ""
            links.append(f'<a href="{href}"{current}>{number}</a>')
        pagination = f'<nav class="pagination" aria-label="Catalog pages">{"".join(links)}</nav>'
        index_body = f"""<section class="catalog-hero"><p class="eyebrow">FM Cellular catalog</p><h1>Devices and repair parts</h1><p class="lede">Browse {len(products):,} products across {len(catalog_pages)} fast-loading pages.</p><label class="search-label" for="catalog-search">Filter this page</label><input class="search" id="catalog-search" type="search" placeholder="Try iPhone 15 screen or Galaxy battery" autocomplete="off"><p class="results" id="catalog-results" aria-live="polite">Showing {len(cards):,} products on page {page_number}</p></section>{pagination}<section class="catalog-grid" id="catalog-grid">{''.join(cards)}</section>{pagination}<script>(()=>{{const input=document.querySelector('#catalog-search'),cards=[...document.querySelectorAll('[data-search]')],result=document.querySelector('#catalog-results');input.addEventListener('input',()=>{{const query=input.value.trim().toLowerCase();let shown=0;for(const card of cards){{const match=!query||card.dataset.search.includes(query);card.hidden=!match;if(match)shown++}}result.textContent=`Showing ${{shown.toLocaleString()}} product${{shown===1?'':'s'}} on this page`;}});}})();</script>"""
        (product_dir / filename).write_text(page(f"Phone Parts & Devices – Page {page_number} | FM Cellular", "Browse devices and repair parts from FM Cellular.", canonical, index_body), encoding="utf-8")
    (output / "robots.txt").write_text(f"User-agent: *\nAllow: /\nSitemap: {BASE_URL}/sitemap.xml\n", encoding="utf-8")
    sitemap_files = []
    for sitemap_number, start in enumerate(range(0, len(sitemap_urls), SITEMAP_PAGE_SIZE), start=1):
        sitemap_name = f"sitemap-{sitemap_number}.xml"
        sitemap_files.append(sitemap_name)
        urls = sitemap_urls[start : start + SITEMAP_PAGE_SIZE]
        (output / sitemap_name).write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(f"  <url><loc>{esc(url)}</loc></url>" for url in urls) + "\n</urlset>\n", encoding="utf-8")
    (output / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(f"  <sitemap><loc>{BASE_URL}/{name}</loc></sitemap>" for name in sitemap_files) + "\n</sitemapindex>\n", encoding="utf-8")
    (asset_dir / "catalog.css").write_text(""":root{--ink:#111827;--muted:#5b6472;--accent:#2563eb;--surface:#f4f7fb;--line:#dce3ec}*{box-sizing:border-box}body{margin:0;color:var(--ink);font:16px/1.55 system-ui,-apple-system,Segoe UI,sans-serif;background:#fff}a{color:inherit}.site-header{position:sticky;top:0;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:18px clamp(20px,5vw,72px);background:rgba(255,255,255,.94);border-bottom:1px solid var(--line);backdrop-filter:blur(12px)}.brand{font-size:1.3rem;font-weight:850;text-decoration:none}.site-header nav{display:flex;gap:22px;flex-wrap:wrap}.site-header nav a{text-decoration:none;color:var(--muted)}main{max-width:1180px;margin:auto;padding:42px 22px 80px}.breadcrumbs{display:flex;gap:9px;flex-wrap:wrap;color:var(--muted);font-size:.9rem;margin-bottom:30px}.product-shell{display:grid;gap:24px}.product-hero,.catalog-hero{padding:clamp(30px,6vw,70px);border-radius:24px;background:linear-gradient(135deg,#eef4ff,#f7fbff 55%,#eefaf7)}h1{font-size:clamp(2.25rem,6vw,4.8rem);line-height:1.02;letter-spacing:-.045em;margin:.2em 0}.lede{max-width:720px;color:var(--muted);font-size:1.12rem}.eyebrow{text-transform:uppercase;letter-spacing:.13em;font-weight:800;font-size:.76rem;color:var(--accent)}.price{font-size:1.6rem;font-weight:800;margin:26px 0}.button{display:inline-block;background:var(--ink);color:#fff;padding:13px 19px;border-radius:12px;text-decoration:none;font-weight:750}.panel{padding:28px;border:1px solid var(--line);border-radius:20px}.table-wrap{overflow:auto}table{border-collapse:collapse;width:100%}th,td{text-align:left;padding:14px;border-bottom:1px solid var(--line)}th{font-size:.8rem;text-transform:uppercase;letter-spacing:.07em}.status{display:inline-block;border-radius:999px;padding:5px 9px;font-size:.78rem;font-weight:750}.available{background:#dcfce7;color:#166534}.check{background:#fff4d6;color:#7c4a03}.search-label{display:block;margin-top:28px;font-weight:800}.search{width:min(650px,100%);margin-top:8px;padding:15px 18px;border:1px solid #b9c5d5;border-radius:13px;background:#fff;font:inherit;box-shadow:0 8px 26px rgba(37,99,235,.08)}.search:focus{outline:3px solid rgba(37,99,235,.2);border-color:var(--accent)}.results{color:var(--muted);font-size:.9rem}.catalog-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin-top:24px}.card{padding:22px;border:1px solid var(--line);border-radius:16px;transition:transform .16s ease,box-shadow .16s ease}.card:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(17,24,39,.08)}.card[hidden]{display:none}.card h2{font-size:1.05rem}.card h2 a{text-decoration:none}.card h2 a:hover{text-decoration:underline}footer{padding:32px 22px;text-align:center;color:var(--muted);background:var(--surface)}@media(max-width:720px){.site-header{align-items:flex-start;flex-direction:column}.site-header nav{gap:12px}.product-hero,.catalog-hero{border-radius:18px;padding:26px}main{padding-top:24px}}""", encoding="utf-8")
    print(json.dumps({"products": len(products), "html_pages": len(products) + len(catalog_pages), "catalog_pages": len(catalog_pages), "sitemap_urls": len(sitemap_urls), "sitemap_files": len(sitemap_files)}))


if __name__ == "__main__":
    main()
