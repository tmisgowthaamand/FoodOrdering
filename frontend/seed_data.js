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

// Static Products Data (Copied from mockData.js)
const staticProducts = [
    { name: "Cadbury Dairy Milk Minis", weight: "1 pack (20 x 7 g)", price: 128, original_price: 178, image: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Dairy & Breakfast", discount: 28 },
    { name: "Milky Mist High Protein Paneer", weight: "200 g", price: 109, original_price: 150, image: "https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Dairy & Breakfast", discount: 27 },
    { name: "Cadbury Dairy Milk Chocolate", weight: "26 g", price: 25, original_price: 26, image: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Dairy & Breakfast", discount: 4 },
    { name: "Bingo! Tedhe Medhe", weight: "75 g", price: 14, original_price: 20, image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Munchies", discount: 30 },
    { name: "Kurkure Masala Munch", weight: "75 g", price: 20, original_price: 20, image: "https://images.pexels.com/photos/2611817/pexels-photo-2611817.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Munchies", discount: 0 },
    { name: "Thums Up Soft Drink", weight: "750 ml", price: 36, original_price: 45, image: "https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Cold Drinks & Juices", discount: 20 },
    { name: "Coca-Cola Soft Drink", weight: "750 ml", price: 35, original_price: 45, image: "https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Cold Drinks & Juices", discount: 22 },
    { name: "ITC Master Chef Potato Shots", weight: "420 g", price: 89, original_price: 140, image: "https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Instant & Frozen Food", discount: 36 },
    { name: "Britannia Milk Slice Bread", weight: "400 g", price: 52, original_price: 55, image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Bakery & Biscuits", discount: 5 },
    { name: "Amul Gold TriCone Butterscotch", weight: "120 ml", price: 33, original_price: 35, image: "https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Sweet Tooth", discount: 5 },
    { name: "Krishna Chakki Atta", weight: "5 kg", price: 273, original_price: 330, image: "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Atta, Rice & Dal", discount: 17 },
    { name: "Fortune Sunlite Sunflower Oil", weight: "1 L", price: 135, original_price: 160, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop", category: "Masala, Oil & More", discount: 15 },
    { name: "Relish Chicken Curry Cut", weight: "500 g", price: 137, original_price: 160, image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=300&fit=crop", category: "Chicken, Meat & Fish", discount: 14 },
    { name: "Tomato Ketchup", weight: "950 g", price: 120, original_price: 135, image: "https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=300&h=300&fit=crop", category: "Sauces & Spreads", discount: 11 },
    { name: "Rolled Oats", weight: "1 kg", price: 199, original_price: 240, image: "https://images.unsplash.com/photo-1517093725452-68704c4aa713?w=300&h=300&fit=crop", category: "Organic & Healthy Living", discount: 17 },
    { name: "Pampers Diapers L", weight: "60 pcs", price: 899, original_price: 1099, image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=300&fit=crop", category: "Baby Care", discount: 18 },
    { name: "Dettol Antiseptic", weight: "500 ml", price: 185, original_price: 195, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop", category: "Pharma & Wellness", discount: 5 },
    { name: "Vim Dishwash Bar", weight: "500 g", price: 49, original_price: 55, image: "https://images.unsplash.com/photo-1585441695325-21557c8a0a88?w=300&h=300&fit=crop", category: "Cleaning Essentials", discount: 11 },
    { name: "A4 Notebook", weight: "1 pc", price: 60, original_price: 80, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&h=300&fit=crop", category: "Home & Office", discount: 25 },
    { name: "Colgate MaxFresh", weight: "150 g", price: 99, original_price: 110, image: "https://images.unsplash.com/photo-1559624707-0c531e65d47d?w=300&h=300&fit=crop", category: "Personal Care", discount: 10 },
    { name: "Pedigree Dog Food", weight: "3 kg", price: 650, original_price: 750, image: "https://images.unsplash.com/photo-1589924691195-41432c84c161?w=300&h=300&fit=crop", category: "Pet Care", discount: 13 },
    { name: "Betel Leaves", weight: "10 pcs", price: 30, original_price: 40, image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=300&h=300&fit=crop", category: "Paan Corner", discount: 25 }
];

async function seedData() {
    console.log('Starting seed process...');

    // 0. Login as Admin
    console.log('Logging in as admin...');
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: 'gokrishna98@gmail.com',
        password: '87654321'
    });

    if (authError) {
        console.error('Login failed:', authError.message);
        return;
    }
    console.log('Logged in successfully.');

    // 1. Seed Products
    console.log('Seeding products...');

    // Check if products exist to avoid duplicates if we just insert
    const { count } = await supabase.from('products').select('*', { count: 'exact', head: true });

    if (count === 0) {
        const { error: productError } = await supabase
            .from('products')
            .insert(staticProducts);

        if (productError) {
            console.error('Error seeding products:', productError);
        } else {
            console.log('Products seeded successfully!');
        }
    } else {
        console.log(`Skipping product seed: ${count} products already exist.`);
    }

    // 2. Seed Dummy Orders
    console.log('Seeding dummy orders...');
    const userId = authData.user.id;

    const dummyOrders = [
        { user_id: userId, total_amount: 1250, status: 'delivered', created_at: new Date(Date.now() - 86400000).toISOString() },
        { user_id: userId, total_amount: 450, status: 'processing', created_at: new Date().toISOString() },
        { user_id: userId, total_amount: 2100, status: 'pending', created_at: new Date().toISOString() },
        { user_id: userId, total_amount: 890, status: 'cancelled', created_at: new Date(Date.now() - 172800000).toISOString() }
    ];

    const { error: orderError } = await supabase
        .from('orders')
        .insert(dummyOrders);

    if (orderError) {
        console.error('Error seeding orders:', orderError);
    } else {
        console.log('Dummy orders seeded successfully!');
    }

    console.log('Seed process completed.');
}

seedData();
