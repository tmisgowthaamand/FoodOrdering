-- 1. Run the setup script first (admin_setup.sql) to create tables and policies.

-- 2. Then run this command to make yourself an admin.
-- REPLACE 'your_email@example.com' WITH YOUR ACTUAL EMAIL ADDRESS used to login.

INSERT INTO public.users (id, email, role, full_name)
SELECT id, email, 'admin', raw_user_meta_data->>'full_name'
FROM auth.users
WHERE email = 'your_email@example.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- 3. Verify the update
SELECT * FROM public.users WHERE role = 'admin';
