-- 1. Add user_id column to orders table (Critical for Order Privacy)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_id text;

-- 2. Create user_addresses table (Critical for Address Management)
create table if not exists user_addresses (
  id uuid default uuid_generate_v4() primary key,
  user_id text not null,
  label text not null,
  address text not null,
  city text not null,
  pincode text not null,
  phone text not null,
  email text,
  name text,
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable Row Level Security (RLS) - Optional but recommended
alter table user_addresses enable row level security;

-- 4. Create policy to allow public access (Simplest for now)
create policy "Public access" on user_addresses for all using (true);
