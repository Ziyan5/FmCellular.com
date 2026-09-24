-- Shoppers see whether something is in stock, never how many.
--
-- Before this, the "Public reads inventory availability" policy let anyone
-- holding the public anon key read inventory_levels in full, quantity
-- included. The table is now admin-only, and the public reads this view,
-- which carries a single yes/no per active variant.
--
-- The view runs as its owner (security_invoker off) so it can see the
-- inventory rows the public no longer can; it exposes nothing but the flag.

begin;

drop policy if exists "Public reads inventory availability" on public.inventory_levels;

create or replace view public.variant_availability
with (security_invoker = false) as
  select v.id as variant_id,
         coalesce(i.available, false) and (i.quantity is null or i.quantity > 0) as in_stock
  from public.catalog_variants v
  join public.catalog_products p on p.id = v.product_id
  left join public.inventory_levels i on i.variant_id = v.id
  where v.is_active and p.is_active;

revoke all on public.variant_availability from public, anon, authenticated;
grant select on public.variant_availability to anon, authenticated;

commit;
