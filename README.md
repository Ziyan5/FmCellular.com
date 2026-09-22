# FM Cellular Supabase Starter

This package is the first migration phase for `fmcellular.com`. It creates a scalable catalog database and safely exports only public catalog/content data from `Master List.xlsx`.

It intentionally excludes customer details, orders, wholesale login data, password hashes, sessions, setup tokens, IMEIs, purchase history, and POS records.

## Included

- `supabase/schema.sql` — production-ready catalog schema, indexes, timestamps, and Row Level Security.
- `admin_users` + `is_admin()` — authenticated admin authorization for catalog, pricing, inventory, images, and site content.
- `tools/export_public_catalog.py` — read-only Excel exporter for approved public sheets.
- `tools/build_seed_sql.py` — idempotent normalized catalog seed builder.
- `tools/generate_static_pages.py` — generates one SEO-ready HTML page per public product, plus a catalog index, sitemap, robots file, and shared styling.
- `supabase/functions/feed/index.ts` — compatibility feed for the existing storefront.
- `mapping.md` — source-to-database migration map and rollout order.
- `requirements.txt` — Python dependency for the exporter.

## Safe rollout

1. Create a new Supabase project.
2. Open Supabase SQL Editor and run `supabase/schema.sql`.
3. Make a copy of `Master List.xlsx`; do not use the live workbook as an import target.
4. Install the exporter dependency: `python -m pip install -r requirements.txt`.
5. Export approved data: `python tools/export_public_catalog.py "Master List.xlsx" exports`.
6. Review the generated CSV files before importing anything.
7. Connect a staging version of the website to Supabase.
8. Create the owner's Supabase Auth account, then add that auth user ID to `public.admin_users` from the SQL Editor. Never expose this operation to public website code.
9. Confirm the existing admin workflows in staging: sign-in, product edits, pricing, inventory, images, and content.
10. Compare the staging catalog with the current live site.
11. Switch `/api/feed` only after the comparison and admin checks pass.

The live admin login must stay enabled until the staging admin login has passed these checks. This migration does not remove, overwrite, or redirect the existing login.

## Generate the static SEO catalog

Run `python tools/generate_static_pages.py "Master List.xlsx" site`. The generator reads only the approved public catalog sheets and writes the static website into `site/`. Upload that folder to a staging host first, confirm links and checkout/contact behavior, and only then deploy it to the live domain.

Do not put a Supabase service-role key in website JavaScript. Browser code should use only the public anonymous key, protected by Row Level Security.

## Claude compatibility

This is a normal SQL/Python project, so Claude Code can work with it through GitHub. Supabase also provides official MCP integration for supported AI coding clients. Keep secrets in local environment variables and never commit them.
