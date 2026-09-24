-- Shoppers see whether something is in stock, never how many.
--
-- Before this, the "Public reads inventory availability" policy let anyone
-- holding the public anon key read inventory_levels in full, quantity
-- included. The table is now admin-only. The yes/no lives on the variant as
-- in_stock, which the public can already read, and a trigger keeps it in
-- step with inventory_levels - so no view has to run with raised rights.

begin;

drop policy if exists "Public reads inventory availability" on public.inventory_levels;
drop view if exists public.variant_availability;

alter table public.catalog_variants add column if not exists in_stock boolean not null default false;

create or replace function public.sync_variant_in_stock()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if tg_op = 'DELETE' then
    update public.catalog_variants set in_stock = false where id = old.variant_id;
    return old;
  end if;
  update public.catalog_variants
     set in_stock = coalesce(new.available, false) and (new.quantity is null or new.quantity > 0)
   where id = new.variant_id;
  return new;
end;
$$;

drop trigger if exists inventory_levels_sync_in_stock on public.inventory_levels;
create trigger inventory_levels_sync_in_stock
after insert or update or delete on public.inventory_levels
for each row execute function public.sync_variant_in_stock();

update public.catalog_variants v
   set in_stock = coalesce(i.available, false) and (i.quantity is null or i.quantity > 0)
  from public.inventory_levels i
 where i.variant_id = v.id;

commit;
