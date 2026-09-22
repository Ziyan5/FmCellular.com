# Master List migration map

## Phase 1: public catalog

| Workbook sheet | Destination | Notes |
|---|---|---|
| Inventory | `catalog_products`, `catalog_variants`, `inventory_levels` | Device catalog. Generate stable slugs and SKUs during transformation. |
| Parts Catalogue | `catalog_products`, `catalog_variants`, `inventory_levels` | Parts catalog. Preserve `supplier_sku` as an external reference, not the primary key. |
| Photo Library | `product_images` | Split `all_photos` into one image row per URL. |
| Finishes | `product_finishes` | Connect by normalized model name first, then replace with product IDs. |
| Site text | `cms_content` | Existing key is a suitable stable identifier. |
| Posters | `cms_content` | Store structured poster configuration in `content_json`. |
| Buyback | `cms_content` | Configuration only; customer submissions remain excluded. |

## Phase 2: authenticated commerce

Move retail orders, parts orders, wholesalers, stock alerts, and buyback submissions only after authentication and authorization rules are tested. Replace spreadsheet login/session handling with Supabase Auth. Invalidate legacy setup and session tokens during cutover.

## Phase 3: restricted operations

IMEIs, purchasing, serialized inventory, dispatch, and POS data require staff-only policies, audit logging, backups, and separate testing. They should never be exposed through the public catalog API.

## Current data issues to resolve

- Device inventory has no populated quantity field.
- Parts quantity is mostly blank and should not be treated as exact stock.
- The Samsung source includes a broken reference.
- Product data is duplicated across older brand/pricing sheets and the newer `Inventory` sheet.
- `storage` in Parts Catalogue sometimes acts like a variant/option field rather than literal storage.
- Wholesale authentication/session fields must not remain a production identity system.
