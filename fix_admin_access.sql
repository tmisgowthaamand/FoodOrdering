-- Run this command in your Supabase SQL Editor to fix the Access Denied error.

UPDATE public.users 
SET role = 'admin' 
WHERE email = 'tmis.gowthaaman.d@gmail.com';

-- If the above updates 0 rows, run this instead:
INSERT INTO public.users (id, email, role, full_name)
SELECT id, email, 'admin', raw_user_meta_data->>'full_name'
FROM auth.users
WHERE email = 'tmis.gowthaaman.d@gmail.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
