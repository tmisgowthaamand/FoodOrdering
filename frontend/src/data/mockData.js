// Mock data for Zepto clone

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

export const products = [
  // Fruits & Vegetables
  { id: 1, name: "Fresh Banana", weight: "1 kg (5-6 pcs)", price: 45, originalPrice: 55, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop", category: "Fruits & Vegetables", discount: 18 },
  { id: 2, name: "Red Apple", weight: "4 pcs (approx. 500g)", price: 149, originalPrice: 180, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop", category: "Fruits & Vegetables", discount: 17 },
  { id: 3, name: "Orange - Imported", weight: "4 pcs (approx. 600g)", price: 129, originalPrice: 150, image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=300&h=300&fit=crop", category: "Fruits & Vegetables", discount: 14 },
  { id: 4, name: "Fresh Tomato", weight: "500 g", price: 29, originalPrice: 35, image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=300&h=300&fit=crop", category: "Fruits & Vegetables", discount: 17 },
  { id: 5, name: "Onion", weight: "1 kg", price: 35, originalPrice: 45, image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&h=300&fit=crop", category: "Fruits & Vegetables", discount: 22 },
  { id: 6, name: "Potato", weight: "1 kg", price: 32, originalPrice: 40, image: "https://images.unsplash.com/photo-1518977676601-b53f82ber6a?w=300&h=300&fit=crop", category: "Fruits & Vegetables", discount: 20 },
  
  // Dairy & Breakfast
  { id: 7, name: "Amul Taaza Milk", weight: "1 L", price: 66, originalPrice: 68, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop", category: "Dairy & Breakfast", discount: 3 },
  { id: 8, name: "Amul Butter", weight: "500 g", price: 275, originalPrice: 290, image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&h=300&fit=crop", category: "Dairy & Breakfast", discount: 5 },
  { id: 9, name: "White Eggs", weight: "12 pcs", price: 89, originalPrice: 99, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=300&fit=crop", category: "Dairy & Breakfast", discount: 10 },
  { id: 10, name: "Bread - White", weight: "400 g", price: 40, originalPrice: 45, image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300&h=300&fit=crop", category: "Dairy & Breakfast", discount: 11 },
  { id: 11, name: "Paneer Fresh", weight: "200 g", price: 89, originalPrice: 99, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop", category: "Dairy & Breakfast", discount: 10 },
  { id: 12, name: "Curd - Plain", weight: "400 g", price: 45, originalPrice: 50, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=300&fit=crop", category: "Dairy & Breakfast", discount: 10 },
  
  // Munchies
  { id: 13, name: "Lay's Classic Salted", weight: "52 g", price: 20, originalPrice: 20, image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=300&h=300&fit=crop", category: "Munchies", discount: 0 },
  { id: 14, name: "Kurkure Masala Munch", weight: "90 g", price: 20, originalPrice: 20, image: "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=300&h=300&fit=crop", category: "Munchies", discount: 0 },
  { id: 15, name: "Haldiram's Aloo Bhujia", weight: "200 g", price: 75, originalPrice: 85, image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=300&h=300&fit=crop", category: "Munchies", discount: 12 },
  { id: 16, name: "Pringles Original", weight: "107 g", price: 149, originalPrice: 169, image: "https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=300&h=300&fit=crop", category: "Munchies", discount: 12 },
  
  // Cold Drinks & Juices
  { id: 17, name: "Coca Cola", weight: "750 ml", price: 40, originalPrice: 40, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&h=300&fit=crop", category: "Cold Drinks & Juices", discount: 0 },
  { id: 18, name: "Tropicana Orange", weight: "1 L", price: 120, originalPrice: 135, image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=300&fit=crop", category: "Cold Drinks & Juices", discount: 11 },
  { id: 19, name: "Paper Boat Aamras", weight: "200 ml", price: 30, originalPrice: 35, image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=300&h=300&fit=crop", category: "Cold Drinks & Juices", discount: 14 },
  { id: 20, name: "Red Bull Energy", weight: "250 ml", price: 125, originalPrice: 125, image: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=300&h=300&fit=crop", category: "Cold Drinks & Juices", discount: 0 },
  
  // Tea & Coffee
  { id: 21, name: "Tata Tea Gold", weight: "500 g", price: 285, originalPrice: 310, image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=300&h=300&fit=crop", category: "Tea, Coffee & Health Drinks", discount: 8 },
  { id: 22, name: "Nescafe Classic", weight: "100 g", price: 350, originalPrice: 385, image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=300&h=300&fit=crop", category: "Tea, Coffee & Health Drinks", discount: 9 },
  { id: 23, name: "Bournvita", weight: "500 g", price: 249, originalPrice: 275, image: "https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=300&h=300&fit=crop", category: "Tea, Coffee & Health Drinks", discount: 9 },
  
  // Cleaning
  { id: 24, name: "Vim Dishwash Bar", weight: "500 g", price: 49, originalPrice: 55, image: "https://images.unsplash.com/photo-1585441695325-21557c8a0a88?w=300&h=300&fit=crop", category: "Cleaning Essentials", discount: 11 },
  { id: 25, name: "Harpic Power Plus", weight: "500 ml", price: 119, originalPrice: 135, image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop", category: "Cleaning Essentials", discount: 12 },
  { id: 26, name: "Surf Excel Matic", weight: "1 kg", price: 299, originalPrice: 350, image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&h=300&fit=crop", category: "Cleaning Essentials", discount: 15 },
  
  // Personal Care
  { id: 27, name: "Colgate MaxFresh", weight: "150 g", price: 99, originalPrice: 110, image: "https://images.unsplash.com/photo-1559624707-0c531e65d47d?w=300&h=300&fit=crop", category: "Personal Care", discount: 10 },
  { id: 28, name: "Dove Soap", weight: "100 g x 3", price: 195, originalPrice: 225, image: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=300&h=300&fit=crop", category: "Personal Care", discount: 13 },
  { id: 29, name: "Head & Shoulders", weight: "340 ml", price: 399, originalPrice: 450, image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300&h=300&fit=crop", category: "Personal Care", discount: 11 },
  { id: 30, name: "Nivea Body Lotion", weight: "200 ml", price: 225, originalPrice: 260, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop", category: "Personal Care", discount: 13 }
];

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
