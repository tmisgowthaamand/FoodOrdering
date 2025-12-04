const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load env vars
const envPath = path.resolve(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim();
});

const supabase = createClient(env.REACT_APP_SUPABASE_URL, env.REACT_APP_SUPABASE_ANON_KEY);

async function checkOrders() {
    console.log('Checking orders table...');

    // 1. Try to fetch one order to see if it works and what columns come back
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .limit(5);

    if (error) {
        console.error('Error fetching orders:', error);
    } else {
        console.log('Orders found:', data.length);
        if (data.length > 0) {
            console.log('Sample order:', data[0]);
        } else {
            console.log('No orders in the table.');
        }
    }

    // 2. Check current user role (simulated login not possible here easily without password, 
    // but we can check if the admin user exists in public.users)
    console.log('\nChecking admin user...');
    const { data: users, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', 'gokrishna98@gmail.com');

    if (userError) {
        console.error('Error fetching user:', userError);
    } else {
        console.log('Admin user record:', users);
    }
}

checkOrders();
