// Mock data for Foodeo
import { generateProducts } from './productGenerator';
import { kaggleProducts } from './kaggle_products';
import { dummyJsonProducts } from './dummyJsonProducts';
import { openFoodFactsProducts } from './openFoodFactsProducts';

export const categories = [
    { id: 1, name: "Fruits & Vegetables", image: "https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=200&h=200&fit=crop", itemCount: 234 },
    { id: 2, name: "Dairy & Breakfast", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=200&fit=crop", itemCount: 156 },
    { id: 3, name: "Munchies", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=200&h=200&fit=crop", itemCount: 189 },
    { id: 4, name: "Cold Drinks & Juices", image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=200&h=200&fit=crop", itemCount: 98 },
    { id: 5, name: "Instant & Frozen Food", image: "https://images.unsplash.com/photo-1569058242567-93de6f36f8e6?w=200&h=200&fit=crop", itemCount: 145 },
    { id: 6, name: "Tea, Coffee & Health Drinks", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&h=200&fit=crop", itemCount: 87 },
    { id: 7, name: "Bakery & Biscuits", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop", itemCount: 167 },
    { id: 8, name: "Sweet Tooth", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop", itemCount: 123 },
    { id: 9, name: "Atta, Rice & Dal", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop", itemCount: 78 },
    { id: 10, name: "Masala, Oil & More", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop", itemCount: 234 },
    { id: 11, name: "Sauces & Spreads", image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=200&h=200&fit=crop", itemCount: 89 },
    { id: 12, name: "Chicken, Meat & Fish", image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=200&h=200&fit=crop", itemCount: 67 },
    { id: 13, name: "Organic & Healthy Living", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&h=200&fit=crop", itemCount: 145 },
    { id: 14, name: "Baby Care", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=200&h=200&fit=crop", itemCount: 98 },
    { id: 15, name: "Pharma & Wellness", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop", itemCount: 187 },
    { id: 16, name: "Cleaning Essentials", image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200&h=200&fit=crop", itemCount: 156 },
    { id: 17, name: "Home & Office", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop", itemCount: 234 },
    { id: 18, name: "Personal Care", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop", itemCount: 189 },
    { id: 19, name: "Pet Care", image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop", itemCount: 45 },
    { id: 20, name: "Paan Corner", image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=200&h=200&fit=crop", itemCount: 34 }
];

const staticProducts = [
    // Fruits & Vegetables
    { id: 1, name: "Fresh Green Beans", weight: "250 g", price: 16, originalPrice: 27, image: "https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Fruits & Vegetables", discount: 40 },
    { id: 2, name: "Fresh Tomatoes", weight: "500 g", price: 55, originalPrice: 63, image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Fruits & Vegetables", discount: 12 },
    { id: 3, name: "Lady Finger (Okra)", weight: "500 g", price: 32, originalPrice: 56, image: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Fruits & Vegetables", discount: 42 },
    { id: 1001, name: "Nano Banana", weight: "1 kg", price: 45, originalPrice: 60, image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Fruits & Vegetables", discount: 25 },

    // Dairy & Breakfast
    { id: 4, name: "Cadbury Dairy Milk Minis", weight: "1 pack (20 x 7 g)", price: 128, originalPrice: 178, image: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Dairy & Breakfast", discount: 28 },
    { id: 5, name: "Milky Mist High Protein Paneer", weight: "200 g", price: 109, originalPrice: 150, image: "https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Dairy & Breakfast", discount: 27 },
    { id: 6, name: "Cadbury Dairy Milk Chocolate", weight: "26 g", price: 25, originalPrice: 26, image: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Dairy & Breakfast", discount: 4 },

    // Munchies
    { id: 7, name: "Bingo! Tedhe Medhe", weight: "75 g", price: 14, originalPrice: 20, image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Munchies", discount: 30 },
    { id: 8, name: "Kurkure Masala Munch", weight: "75 g", price: 20, originalPrice: 20, image: "https://images.pexels.com/photos/2611817/pexels-photo-2611817.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Munchies", discount: 0 },
    { id: 9, name: "Makhana Puffs Sour Cream", weight: "60 g", price: 46, originalPrice: 80, image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Munchies", discount: 42 },

    // Cold Drinks & Juices
    { id: 10, name: "Thums Up Soft Drink", weight: "750 ml", price: 36, originalPrice: 45, image: "https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Cold Drinks & Juices", discount: 20 },
    { id: 11, name: "Coca-Cola Soft Drink", weight: "750 ml", price: 35, originalPrice: 45, image: "https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Cold Drinks & Juices", discount: 22 },
    { id: 12, name: "Thums Up Soft Drink", weight: "1.25 L", price: 57, originalPrice: 70, image: "https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Cold Drinks & Juices", discount: 18 },

    // Instant & Frozen Food
    { id: 13, name: "ITC Master Chef Potato Shots", weight: "420 g", price: 89, originalPrice: 140, image: "https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Instant & Frozen Food", discount: 36 },
    { id: 14, name: "McCain Chilli Cheesy Nuggets", weight: "250 g", price: 135, originalPrice: 159, image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Instant & Frozen Food", discount: 15 },
    { id: 15, name: "Godrej Yummiez Veg Sticks", weight: "270 g", price: 94, originalPrice: 112, image: "https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Instant & Frozen Food", discount: 16 },

    // Tea, Coffee & Health Drinks
    { id: 16, name: "Girnar Pure & Fresh Tea", weight: "250 g", price: 147, originalPrice: 155, image: "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Tea, Coffee & Health Drinks", discount: 5 },
    { id: 17, name: "Tata Tea Premium", weight: "1 kg", price: 449, originalPrice: 620, image: "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Tea, Coffee & Health Drinks", discount: 27 },
    { id: 18, name: "Society Leaf Tea", weight: "1 kg", price: 533, originalPrice: 620, image: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Tea, Coffee & Health Drinks", discount: 14 },

    // Bakery & Biscuits
    { id: 19, name: "Britannia Milk Slice Bread", weight: "400 g", price: 52, originalPrice: 55, image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Bakery & Biscuits", discount: 5 },
    { id: 20, name: "Modern Whole Wheat Bread", weight: "400 g", price: 51, originalPrice: 60, image: "https://images.pexels.com/photos/209540/pexels-photo-209540.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Bakery & Biscuits", discount: 15 },
    { id: 21, name: "Baker's Loaf Wheat Bread", weight: "350 g", price: 61, originalPrice: 75, image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Bakery & Biscuits", discount: 18 },

    // Sweet Tooth
    { id: 22, name: "Amul Gold TriCone Butterscotch", weight: "120 ml", price: 33, originalPrice: 35, image: "https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Sweet Tooth", discount: 5 },
    { id: 23, name: "Cornetto Double Chocolate", weight: "105 ml", price: 30, originalPrice: 35, image: "https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Sweet Tooth", discount: 14 },
    { id: 24, name: "Magnum Chocolate Almond", weight: "62 g", price: 80, originalPrice: 90, image: "https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Sweet Tooth", discount: 11 },

    // Atta, Rice & Dal
    { id: 25, name: "Krishna Chakki Atta", weight: "5 kg", price: 273, originalPrice: 330, image: "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Atta, Rice & Dal", discount: 17 },
    { id: 26, name: "Naga Whole Wheat Atta", weight: "1 kg", price: 60, originalPrice: 73, image: "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Atta, Rice & Dal", discount: 17 },
    { id: 27, name: "Naga Whole Wheat Atta (5kg)", weight: "5 kg", price: 280, originalPrice: 355, image: "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Atta, Rice & Dal", discount: 21 },

    // Masala, Oil & More
    { id: 28, name: "Fortune Sunlite Sunflower Oil", weight: "1 L", price: 135, originalPrice: 160, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop", category: "Masala, Oil & More", discount: 15 },
    { id: 29, name: "Gold Winner Sunflower Oil", weight: "1 L", price: 153, originalPrice: 180, image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=300&h=300&fit=crop", category: "Masala, Oil & More", discount: 15 },
    { id: 30, name: "Sunpure Groundnut Oil", weight: "1 L", price: 153, originalPrice: 180, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", category: "Masala, Oil & More", discount: 15 },

    // Chicken, Meat & Fish
    { id: 31, name: "Relish Chicken Curry Cut", weight: "500 g", price: 137, originalPrice: 160, image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=300&fit=crop", category: "Chicken, Meat & Fish", discount: 14 },
    { id: 32, name: "Relish Chicken With Skin", weight: "500 g", price: 129, originalPrice: 150, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&h=300&fit=crop", category: "Chicken, Meat & Fish", discount: 14 },
    { id: 33, name: "Godrej Chicken Curry Cut", weight: "500 g", price: 170, originalPrice: 200, image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=300&h=300&fit=crop", category: "Chicken, Meat & Fish", discount: 15 },

    // Sauces & Spreads (Mock Data)
    { id: 34, name: "Tomato Ketchup", weight: "950 g", price: 120, originalPrice: 135, image: "https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=300&h=300&fit=crop", category: "Sauces & Spreads", discount: 11 },
    { id: 35, name: "Mayonnaise", weight: "250 g", price: 85, originalPrice: 99, image: "https://images.unsplash.com/photo-1585325701165-351af916e581?w=300&h=300&fit=crop", category: "Sauces & Spreads", discount: 14 },
    { id: 36, name: "Peanut Butter", weight: "340 g", price: 165, originalPrice: 180, image: "https://images.unsplash.com/photo-1528750997573-59b8b6e76c4b?w=300&h=300&fit=crop", category: "Sauces & Spreads", discount: 8 },

    // Organic & Healthy Living (Mock Data)
    { id: 37, name: "Rolled Oats", weight: "1 kg", price: 199, originalPrice: 240, image: "https://images.unsplash.com/photo-1517093725452-68704c4aa713?w=300&h=300&fit=crop", category: "Organic & Healthy Living", discount: 17 },
    { id: 38, name: "Organic Honey", weight: "500 g", price: 350, originalPrice: 400, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&h=300&fit=crop", category: "Organic & Healthy Living", discount: 12 },
    { id: 39, name: "Chia Seeds", weight: "200 g", price: 180, originalPrice: 220, image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=300&h=300&fit=crop", category: "Organic & Healthy Living", discount: 18 },

    // Baby Care (Mock Data)
    { id: 40, name: "Pampers Diapers L", weight: "60 pcs", price: 899, originalPrice: 1099, image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=300&fit=crop", category: "Baby Care", discount: 18 },
    { id: 41, name: "Baby Wipes", weight: "72 pcs", price: 199, originalPrice: 249, image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=300&fit=crop", category: "Baby Care", discount: 20 },
    { id: 42, name: "Cerelac Wheat", weight: "300 g", price: 245, originalPrice: 260, image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=300&fit=crop", category: "Baby Care", discount: 6 },

    // Pharma & Wellness (Mock Data)
    { id: 43, name: "Dettol Antiseptic", weight: "500 ml", price: 185, originalPrice: 195, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop", category: "Pharma & Wellness", discount: 5 },
    { id: 44, name: "Vicks VapoRub", weight: "50 g", price: 145, originalPrice: 155, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop", category: "Pharma & Wellness", discount: 6 },
    { id: 45, name: "Bandages", weight: "20 pcs", price: 45, originalPrice: 50, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop", category: "Pharma & Wellness", discount: 10 },

    // Cleaning Essentials (Mock Data)
    { id: 46, name: "Vim Dishwash Bar", weight: "500 g", price: 49, originalPrice: 55, image: "https://images.unsplash.com/photo-1585441695325-21557c8a0a88?w=300&h=300&fit=crop", category: "Cleaning Essentials", discount: 11 },
    { id: 47, name: "Harpic Power Plus", weight: "500 ml", price: 119, originalPrice: 135, image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop", category: "Cleaning Essentials", discount: 12 },
    { id: 48, name: "Surf Excel Matic", weight: "1 kg", price: 299, originalPrice: 350, image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&h=300&fit=crop", category: "Cleaning Essentials", discount: 15 },

    // Home & Office (Mock Data)
    { id: 49, name: "A4 Notebook", weight: "1 pc", price: 60, originalPrice: 80, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&h=300&fit=crop", category: "Home & Office", discount: 25 },
    { id: 50, name: "Ball Pens Blue", weight: "5 pcs", price: 40, originalPrice: 50, image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=300&h=300&fit=crop", category: "Home & Office", discount: 20 },
    { id: 51, name: "Scissors", weight: "1 pc", price: 120, originalPrice: 150, image: "https://images.unsplash.com/photo-1590986062692-2865e23c726d?w=300&h=300&fit=crop", category: "Home & Office", discount: 20 },

    // Personal Care (Mock Data)
    { id: 52, name: "Colgate MaxFresh", weight: "150 g", price: 99, originalPrice: 110, image: "https://images.unsplash.com/photo-1559624707-0c531e65d47d?w=300&h=300&fit=crop", category: "Personal Care", discount: 10 },
    { id: 53, name: "Dove Soap", weight: "100 g x 3", price: 195, originalPrice: 225, image: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=300&h=300&fit=crop", category: "Personal Care", discount: 13 },
    { id: 54, name: "Head & Shoulders", weight: "340 ml", price: 399, originalPrice: 450, image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300&h=300&fit=crop", category: "Personal Care", discount: 11 },
    { id: 55, name: "Nivea Body Lotion", weight: "200 ml", price: 225, originalPrice: 260, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop", category: "Personal Care", discount: 13 },

    // Pet Care (Mock Data)
    { id: 56, name: "Pedigree Dog Food", weight: "3 kg", price: 650, originalPrice: 750, image: "https://images.unsplash.com/photo-1589924691195-41432c84c161?w=300&h=300&fit=crop", category: "Pet Care", discount: 13 },
    { id: 57, name: "Whiskas Cat Food", weight: "1.2 kg", price: 450, originalPrice: 500, image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop", category: "Pet Care", discount: 10 },

    // Paan Corner (Mock Data)
    { id: 58, name: "Betel Leaves", weight: "10 pcs", price: 30, originalPrice: 40, image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=300&h=300&fit=crop", category: "Paan Corner", discount: 25 },
    { id: 59, name: "Lighter", weight: "1 pc", price: 20, originalPrice: 25, image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=300&h=300&fit=crop", category: "Paan Corner", discount: 20 },

    // Milky Mist Drinks (Keeping existing)
    { id: 80, name: "Milky Mist Lassi - Mango", weight: "200 ml", price: 33, originalPrice: 35, image: "https://www.bbassets.com/media/uploads/p/l/40262042_5-milky-mist-lassi-mango-hydrating-creamy.jpg", category: "Cold Drinks & Juices", discount: 5 },
    { id: 81, name: "Milky Mist Spiced Butter Milk", weight: "200 ml", price: 20, originalPrice: 20, image: "https://images.pexels.com/photos/1435903/pexels-photo-1435903.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Cold Drinks & Juices", discount: 0 },
    { id: 82, name: "Milky Mist Vanilla Milkshake", weight: "220 ml", price: 40, originalPrice: 40, image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Cold Drinks & Juices", discount: 0 },
    { id: 83, name: "Milky Mist Chocolate Milkshake", weight: "220 ml", price: 40, originalPrice: 45, image: "https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", category: "Cold Drinks & Juices", discount: 11 },

    // Milky Mist Ice Creams (Keeping existing)
    { id: 68, name: "Milky Mist Chocolate Capella Cone", weight: "120 ml", price: 35, originalPrice: 40, image: "https://www.bbassets.com/media/uploads/p/m/40340897_1-milky-mist-chocolate-capella-cone-ice-cream.jpg?tr=w-154,q-80", category: "Sweet Tooth", discount: 13 },
    { id: 69, name: "Milky Mist Butterscotch Capella Cone", weight: "90 ml", price: 32, originalPrice: 35, image: "https://www.bbassets.com/media/uploads/p/m/40340895_1-milky-mist-butterscotch-capella-cone-ice-cream.jpg?tr=w-154,q-80", category: "Sweet Tooth", discount: 9 },
    { id: 70, name: "Milky Mist Italian Chocolate Ice Cream", weight: "1 L", price: 266, originalPrice: 320, image: "https://www.bbassets.com/media/uploads/p/m/40305862_1-milky-mist-italian-chocolate-ice-cream.jpg?tr=w-154,q-80", category: "Sweet Tooth", discount: 17 },
    { id: 71, name: "Milky Mist Black Current Splash", weight: "500 ml", price: 129, originalPrice: 145, image: "https://www.bbassets.com/media/uploads/p/m/40340890_1-milky-mist-black-current-splash-ice-cream.jpg?tr=w-154,q-80", category: "Sweet Tooth", discount: 11 },
    { id: 72, name: "Milky Mist Almond Capella Bar", weight: "60 ml", price: 39, originalPrice: 45, image: "https://www.bbassets.com/media/uploads/p/m/40324552_1-milky-mist-capella-bar-almond-ice-cream.jpg?tr=w-154,q-80", category: "Sweet Tooth", discount: 13 },
    { id: 73, name: "Milky Mist Butterscotch & Vanilla Bar", weight: "80 ml", price: 47, originalPrice: 55, image: "https://www.bbassets.com/media/uploads/p/m/40340898_1-milky-mist-butterscotch-vanilla-capella-duet-bar.jpg?tr=w-154,q-80", category: "Sweet Tooth", discount: 15 },
    { id: 74, name: "Milky Mist French Vanilla Ice Cream", weight: "1 L", price: 270, originalPrice: 300, image: "https://www.bbassets.com/media/uploads/p/m/40305860_1-milky-mist-french-vanilla-ice-cream.jpg?tr=w-154,q-80", category: "Sweet Tooth", discount: 10 },
    { id: 75, name: "Milky Mist Pista Badam Cone", weight: "90 ml", price: 27, originalPrice: 30, image: "https://www.bbassets.com/media/uploads/p/m/40324549_1-milky-mist-pista-badam-ice-cream-cone.jpg?tr=w-154,q-80", category: "Sweet Tooth", discount: 10 },
    { id: 76, name: "Milky Mist Majestic Roasted Almond", weight: "500 ml", price: 136, originalPrice: 170, image: "https://www.bbassets.com/media/uploads/p/m/40340893_1-milky-mist-majestic-roasted-almond-ice-cream.jpg?tr=w-154,q-80", category: "Sweet Tooth", discount: 20 },
    { id: 77, name: "Milky Mist Banana Caramel Cone", weight: "90 ml", price: 27, originalPrice: 30, image: "https://www.bbassets.com/media/uploads/p/m/40324550_1-milky-mist-banana-caramel-ice-cream-capella-cone.jpg?tr=w-154,q-80", category: "Sweet Tooth", discount: 10 },
    { id: 78, name: "Milky Mist Prime Strawberry Ice Cream", weight: "1 L", price: 224, originalPrice: 280, image: "https://www.bbassets.com/media/uploads/p/m/40305863_1-milky-mist-prime-strawberry-ice-cream.jpg?tr=w-154,q-80", category: "Sweet Tooth", discount: 20 },
    { id: 79, name: "Milky Mist Alphonso Mango Cup", weight: "100 ml", price: 36, originalPrice: 40, image: "https://www.bbassets.com/media/uploads/p/m/40324548_1-milky-mist-alphonso-mango-delight-ice-cream-cups.jpg?tr=w-154,q-80", category: "Sweet Tooth", discount: 10 }
];

export const products = [...staticProducts, ...generateProducts(4000), ...kaggleProducts, ...dummyJsonProducts, ...openFoodFactsProducts];


export const banners = [
    {
        id: 1,
        title: "Groceries delivered in 10 minutes",
        subtitle: "Get your daily essentials delivered at your doorstep",
        bgColor: "from-purple-600 to-purple-800",
        image: "https://images.unsplash.com/photo-1584473457406-6240486418e9?w=600&h=400&fit=crop"
    },
    {
        id: 2,
        title: "Fresh Fruits & Vegetables",
        subtitle: "Farm fresh produce delivered to you",
        bgColor: "from-green-500 to-green-700",
        image: "https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=600&h=400&fit=crop"
    },
    {
        id: 3,
        title: "Dairy Delights",
        subtitle: "Fresh milk, curd, paneer & more",
        bgColor: "from-blue-500 to-blue-700",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=400&fit=crop"
    }
];

export const cities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai",
    "Kolkata", "Pune", "Ahmedabad", "Gurgaon", "Noida"
];

export const deliveryAreas = [
    "Andheri East", "Andheri West", "Bandra", "Borivali", "Churchgate",
    "Dadar", "Goregaon", "Juhu", "Kandivali", "Kurla",
    "Lower Parel", "Malad", "Marine Lines", "Powai", "Thane"
];

export { indianLocations, cityAreas } from './locations';
