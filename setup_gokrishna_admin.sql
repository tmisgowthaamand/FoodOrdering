-- Run this command in your Supabase SQL Editor to set the password and role.

-- 1. Update the user's password (if you want to reset it) and metadata
UPDATE auth.users
SET encrypted_password = crypt('87654321', gen_salt('bf'))
WHERE email = 'gokrishna98@gmail.com';

-- 2. Promote to Admin
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'gokrishna98@gmail.com';

-- 3. Ensure the user exists in public.users if not already
INSERT INTO public.users (id, email, role, full_name)
SELECT id, email, 'admin', 'Admin User'
FROM auth.users
WHERE email = 'gokrishna98@gmail.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
