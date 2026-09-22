begin;

create extension if not exists pgcrypto;

create type public.catalog_item_type as enum ('device', 'part', 'accessory', 'other');
create type public.price_audience as enum ('retail', 'wholesale');

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and is_active
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create table public.catalog_products (
  id uuid primary key default gen_random_uuid(),
  item_type public.catalog_item_type not null,
  category text not null,
  brand text,
  model text not null,
  part_name text,
  slug text not null unique,
  description text,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.catalog_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.catalog_products(id) on delete cascade,
  sku text not null unique,
  supplier_sku text,
  storage text,
  condition text,
  color text,
  retail_price numeric(12,2) check (retail_price is null or retail_price >= 0),
  msrp numeric(12,2) check (msrp is null or msrp >= 0),
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.inventory_levels (
  variant_id uuid primary key references public.catalog_variants(id) on delete cascade,
  quantity integer check (quantity is null or quantity >= 0),
  available boolean not null default false,
  low_stock_threshold integer not null default 2 check (low_stock_threshold >= 0),
  updated_at timestamptz not null default now()
);

create table public.wholesale_prices (
  variant_id uuid primary key references public.catalog_variants(id) on delete cascade,
  price numeric(12,2) not null check (price >= 0),
  minimum_quantity integer not null default 1 check (minimum_quantity > 0),
  updated_at timestamptz not null default now()
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.catalog_products(id) on delete cascade,
  variant_id uuid references public.catalog_variants(id) on delete cascade,
  url text not null,
  alt_text text,
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  unique (product_id, url)
);

create table public.product_finishes (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.catalog_products(id) on delete cascade,
  color text not null,
  hex_color text,
  image_url text,
  extra_urls jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  is_hidden boolean not null default false,
  unique (product_id, color)
);

create table public.cms_content (
  content_key text primary key,
  page text not null,
  element text not null,
  text_value text,
  content_json jsonb,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

create index catalog_products_lookup_idx on public.catalog_products (item_type, category, brand, model);
create index catalog_variants_product_idx on public.catalog_variants (product_id);
create index catalog_variants_supplier_sku_idx on public.catalog_variants (supplier_sku) where supplier_sku is not null;
create index catalog_variants_price_idx on public.catalog_variants (retail_price) where is_active;
create index product_images_product_sort_idx on public.product_images (product_id, sort_order);
create index cms_content_page_idx on public.cms_content (page, element) where is_active;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger catalog_products_set_updated_at before update on public.catalog_products
for each row execute function public.set_updated_at();
create trigger catalog_variants_set_updated_at before update on public.catalog_variants
for each row execute function public.set_updated_at();
create trigger inventory_levels_set_updated_at before update on public.inventory_levels
for each row execute function public.set_updated_at();
create trigger wholesale_prices_set_updated_at before update on public.wholesale_prices
for each row execute function public.set_updated_at();
create trigger cms_content_set_updated_at before update on public.cms_content
for each row execute function public.set_updated_at();
create trigger admin_users_set_updated_at before update on public.admin_users
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.catalog_products enable row level security;
alter table public.catalog_variants enable row level security;
alter table public.inventory_levels enable row level security;
alter table public.wholesale_prices enable row level security;
alter table public.product_images enable row level security;
alter table public.product_finishes enable row level security;
alter table public.cms_content enable row level security;

create policy "Public reads active products" on public.catalog_products
for select using (is_active);
create policy "Public reads active variants" on public.catalog_variants
for select using (is_active);
create policy "Public reads inventory availability" on public.inventory_levels
for select using (true);
create policy "Public reads product images" on public.product_images
for select using (true);
create policy "Public reads visible finishes" on public.product_finishes
for select using (not is_hidden);
create policy "Public reads active content" on public.cms_content
for select using (is_active);

create policy "Admins read their access record" on public.admin_users
for select to authenticated using (user_id = auth.uid() and is_active);

create policy "Admins manage products" on public.catalog_products
for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage variants" on public.catalog_variants
for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage inventory" on public.inventory_levels
for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage wholesale prices" on public.wholesale_prices
for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage product images" on public.product_images
for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage product finishes" on public.product_finishes
for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage content" on public.cms_content
for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- No browser-facing policy is created for wholesale_prices.
-- Trusted server code or a later approved-wholesaler policy must handle it.

commit;
