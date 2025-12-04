-- ==========================================
-- FIXED ADMIN SETUP SCRIPT
-- Fixes "operator does not exist: uuid = text"
-- ==========================================

-- 1. Create public.users table (if it doesn't exist)
create table if not exists public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  role text default 'customer' check (role in ('customer', 'admin', 'delivery')),
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Security
alter table public.users enable row level security;

-- 3. Create Policies (with ::text casting fixes)
-- We drop existing policies first to avoid "policy already exists" errors
drop policy if exists "Public profiles are viewable by everyone." on public.users;
create policy "Public profiles are viewable by everyone." on public.users
  for select using (true);

drop policy if exists "Users can insert their own profile." on public.users;
create policy "Users can insert their own profile." on public.users
  for insert with check (auth.uid()::text = id::text);

drop policy if exists "Users can update own profile." on public.users;
create policy "Users can update own profile." on public.users
  for update using (auth.uid()::text = id::text);

-- 4. Auto-create user trigger
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'customer');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. Create Products Table
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price numeric not null,
  original_price numeric,
  image text,
  category text,
  weight text,
  discount integer default 0,
  is_out_of_stock boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.products enable row level security;

-- 6. Product Policies (with ::text casting fixes)
drop policy if exists "Products are viewable by everyone." on public.products;
create policy "Products are viewable by everyone." on public.products
  for select using (true);

drop policy if exists "Only admins can insert products." on public.products;
create policy "Only admins can insert products." on public.products
  for insert with check (
    exists (select 1 from public.users where id::text = auth.uid()::text and role = 'admin')
  );

drop policy if exists "Only admins can update products." on public.products;
create policy "Only admins can update products." on public.products
  for update using (
    exists (select 1 from public.users where id::text = auth.uid()::text and role = 'admin')
  );

drop policy if exists "Only admins can delete products." on public.products;
create policy "Only admins can delete products." on public.products
  for delete using (
    exists (select 1 from public.users where id::text = auth.uid()::text and role = 'admin')
  );

-- 7. Create Orders Table
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users,
  total_amount numeric,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.orders enable row level security;

-- 8. Order Policies (with ::text casting fixes)
drop policy if exists "Users can view own orders" on public.orders;
create policy "Users can view own orders" on public.orders
  for select using (auth.uid()::text = user_id::text);

drop policy if exists "Users can create orders" on public.orders;
create policy "Users can create orders" on public.orders
  for insert with check (auth.uid()::text = user_id::text);

drop policy if exists "Admins can view all orders" on public.orders;
create policy "Admins can view all orders" on public.orders
  for select using (
    exists (select 1 from public.users where id::text = auth.uid()::text and role = 'admin')
  );

drop policy if exists "Admins can update orders" on public.orders;
create policy "Admins can update orders" on public.orders
  for update using (
    exists (select 1 from public.users where id::text = auth.uid()::text and role = 'admin')
  );
