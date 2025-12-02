
const categories = [
    "Fruits & Vegetables", "Dairy & Breakfast", "Munchies", "Cold Drinks & Juices",
    "Instant & Frozen Food", "Tea, Coffee & Health Drinks", "Bakery & Biscuits",
    "Sweet Tooth", "Atta, Rice & Dal", "Masala, Oil & More", "Sauces & Spreads",
    "Chicken, Meat & Fish", "Organic & Healthy Living", "Baby Care", "Pharma & Wellness",
    "Cleaning Essentials", "Home & Office", "Personal Care", "Pet Care", "Paan Corner"
];

const productNames = {
    "Fruits & Vegetables": ["Apple", "Banana", "Orange", "Grapes", "Mango", "Pineapple", "Watermelon", "Papaya", "Pomegranate", "Kiwi", "Strawberry", "Blueberry", "Potato", "Onion", "Tomato", "Carrot", "Cucumber", "Spinach", "Broccoli", "Cauliflower", "Capsicum", "Brinjal", "Lady Finger", "Beans", "Peas", "Ginger", "Garlic", "Chilli", "Lemon", "Coriander", "Mint"],
    "Dairy & Breakfast": ["Milk", "Curd", "Paneer", "Butter", "Cheese", "Cream", "Yogurt", "Bread", "Eggs", "Corn Flakes", "Oats", "Muesli", "Honey", "Jam", "Peanut Butter", "Mayonnaise", "Cheese Spread", "Milkshake", "Lassi", "Buttermilk"],
    "Munchies": ["Chips", "Nachos", "Popcorn", "Bhujia", "Mixture", "Sev", "Peanuts", "Cashews", "Almonds", "Walnuts", "Pistachios", "Raisins", "Dates", "Chocolates", "Biscuits", "Cookies", "Crackers", "Rusks", "Cakes", "Muffins"],
    "Cold Drinks & Juices": ["Cola", "Orange Soda", "Lemon Soda", "Mango Juice", "Apple Juice", "Orange Juice", "Pineapple Juice", "Grape Juice", "Mixed Fruit Juice", "Energy Drink", "Soda Water", "Tonic Water", "Iced Tea", "Cold Coffee", "Coconut Water", "Sugarcane Juice", "Lemonade"],
    "Instant & Frozen Food": ["Noodles", "Pasta", "Soup", "Ready to Eat Curries", "Frozen Peas", "Frozen Corn", "Frozen French Fries", "Frozen Nuggets", "Frozen Parathas", "Frozen Momos", "Frozen Pizza", "Instant Popcorn", "Instant Upma", "Instant Poha", "Instant Idli Mix", "Instant Dosa Mix"],
    "Tea, Coffee & Health Drinks": ["Tea Powder", "Tea Bags", "Green Tea", "Coffee Powder", "Coffee Beans", "Health Drink Powder", "Protein Powder", "Glucose Powder", "Herbal Tea", "Lemon Tea", "Masala Tea", "Filter Coffee", "Instant Coffee"],
    "Bakery & Biscuits": ["White Bread", "Brown Bread", "Multigrain Bread", "Buns", "Pav", "Croissant", "Donut", "Pastry", "Cake", "Muffin", "Cream Biscuits", "Digestive Biscuits", "Marie Biscuits", "Salted Biscuits", "Cookies", "Rusks", "Khari"],
    "Sweet Tooth": ["Chocolate Bar", "Chocolate Box", "Ice Cream Tub", "Ice Cream Cone", "Ice Cream Stick", "Gulab Jamun", "Rasgulla", "Soan Papdi", "Kaju Katli", "Laddu", "Barfi", "Pedha", "Halwa", "Mysore Pak", "Jalebi"],
    "Atta, Rice & Dal": ["Wheat Flour", "Rice Flour", "Maida", "Besan", "Rava", "Basmati Rice", "Sona Masoori Rice", "Brown Rice", "Toor Dal", "Moong Dal", "Masoor Dal", "Urad Dal", "Chana Dal", "Rajma", "Kabuli Chana", "Green Gram", "Black Eyed Peas"],
    "Masala, Oil & More": ["Sunflower Oil", "Groundnut Oil", "Mustard Oil", "Olive Oil", "Ghee", "Salt", "Sugar", "Jaggery", "Turmeric Powder", "Chilli Powder", "Coriander Powder", "Cumin Powder", "Garam Masala", "Chicken Masala", "Mutton Masala", "Biryani Masala", "Sambar Powder", "Rasam Powder"],
    "Sauces & Spreads": ["Tomato Ketchup", "Chilli Sauce", "Soya Sauce", "Vinegar", "Mayonnaise", "Cheese Spread", "Jam", "Honey", "Peanut Butter", "Chocolate Spread", "Mustard Sauce", "Barbeque Sauce", "Pizza Sauce", "Pasta Sauce", "Schezwan Sauce"],
    "Chicken, Meat & Fish": ["Chicken Curry Cut", "Chicken Breast", "Chicken Drumsticks", "Chicken Wings", "Chicken Keema", "Mutton Curry Cut", "Mutton Keema", "Fish Curry Cut", "Fish Fillet", "Prawns", "Crab", "Eggs"],
    "Organic & Healthy Living": ["Organic Wheat Flour", "Organic Rice", "Organic Dal", "Organic Spices", "Organic Honey", "Organic Sugar", "Organic Jaggery", "Organic Tea", "Organic Coffee", "Quinoa", "Chia Seeds", "Flax Seeds", "Pumpkin Seeds", "Sunflower Seeds"],
    "Baby Care": ["Diapers", "Baby Wipes", "Baby Soap", "Baby Shampoo", "Baby Oil", "Baby Powder", "Baby Lotion", "Baby Cream", "Baby Food", "Feeding Bottle", "Nipple", "Teether"],
    "Pharma & Wellness": ["Pain Relief Spray", "Pain Relief Balm", "Antiseptic Liquid", "Bandages", "Cotton", "Thermometer", "Face Mask", "Sanitizer", "Vitamins", "Supplements", "Protein Powder", "ORS", "Cough Syrup", "Digestive Tablets"],
    "Cleaning Essentials": ["Detergent Powder", "Detergent Liquid", "Dishwash Bar", "Dishwash Liquid", "Floor Cleaner", "Toilet Cleaner", "Glass Cleaner", "Bathroom Cleaner", "Kitchen Cleaner", "Air Freshener", "Garbage Bags", "Scrub Pad", "Sponge", "Broom", "Mop"],
    "Home & Office": ["Notebook", "Pen", "Pencil", "Eraser", "Sharpener", "Scale", "Stapler", "Scissors", "Glue", "Tape", "Calculator", "Battery", "Bulb", "Extension Cord", "Plug"],
    "Personal Care": ["Soap", "Body Wash", "Shampoo", "Conditioner", "Hair Oil", "Face Wash", "Face Scrub", "Face Cream", "Body Lotion", "Deodorant", "Perfume", "Talcum Powder", "Shaving Cream", "Razor", "Blade", "Toothpaste", "Toothbrush", "Mouthwash"],
    "Pet Care": ["Dog Food", "Cat Food", "Dog Biscuits", "Cat Treats", "Pet Shampoo", "Pet Soap", "Pet Brush", "Pet Bowl", "Pet Toy", "Pet Bed", "Pet Leash", "Pet Collar"],
    "Paan Corner": ["Betel Leaves", "Supari", "Gulkand", "Katha", "Chuna", "Cardamom", "Clove", "Fennel Seeds", "Mouth Freshener", "Lighter", "Matchbox"]
};

// Specific product images from Pexels for better reliability
const productImages = {
    "Fruits & Vegetables": [
        "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=300", // tomatoes
        "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=300", // carrots
        "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=300", // potatoes
        "https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=300", // green beans
        "https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=300", // apples
        "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=300", // bananas
        "https://images.pexels.com/photos/1071878/pexels-photo-1071878.jpeg?auto=compress&cs=tinysrgb&w=300", // oranges
    ],
    "Dairy & Breakfast": [
        "https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=300", // milk
        "https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=300", // bread
        "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=300", // eggs
        "https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=300", // cheese
        "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=300", // butter
    ],
    "Munchies": [
        "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=300", // chips
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300", // snacks
        "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=300", // nuts
        "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=300", // cookies
    ],
    "Cold Drinks & Juices": [
        "https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=300", // cola
        "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=300", // juice
        "https://images.pexels.com/photos/1337824/pexels-photo-1337824.jpeg?auto=compress&cs=tinysrgb&w=300", // orange juice
        "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=300", // drinks
    ],
    "Instant & Frozen Food": [
        "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300", // pizza
        "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=300", // noodles
        "https://images.pexels.com/photos/1893555/pexels-photo-1893555.jpeg?auto=compress&cs=tinysrgb&w=300", // fries
        "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300", // frozen
    ],
    "Tea, Coffee & Health Drinks": [
        "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=300", // tea
        "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=300", // coffee
        "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=300", // green tea
    ],
    "Bakery & Biscuits": [
        "https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=300", // bread
        "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=300", // biscuits
        "https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=300", // bakery
    ],
    "Sweet Tooth": [
        "https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=300", // ice cream
        "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=300", // chocolate
        "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=300", // candy
    ],
    "Atta, Rice & Dal": [
        "https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=300", // rice
        "https://images.pexels.com/photos/1537169/pexels-photo-1537169.jpeg?auto=compress&cs=tinysrgb&w=300", // flour
        "https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=300", // lentils
    ],
    "Masala, Oil & More": [
        "https://images.pexels.com/photos/531446/pexels-photo-531446.jpeg?auto=compress&cs=tinysrgb&w=300", // spices
        "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=300", // oil
        "https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&w=300", // masala
    ],
    "Sauces & Spreads": [
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300", // ketchup
        "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=300", // sauce
    ],
    "Chicken, Meat & Fish": [
        "https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?auto=compress&cs=tinysrgb&w=300", // chicken
        "https://images.pexels.com/photos/3688/food-dinner-lunch-chicken.jpg?auto=compress&cs=tinysrgb&w=300", // meat
        "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=300", // fish
    ],
    "Organic & Healthy Living": [
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300", // organic
        "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=300", // healthy
    ],
    "Baby Care": [
        "https://images.pexels.com/photos/1912868/pexels-photo-1912868.jpeg?auto=compress&cs=tinysrgb&w=300", // baby
    ],
    "Pharma & Wellness": [
        "https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?auto=compress&cs=tinysrgb&w=300", // medicine
    ],
    "Cleaning Essentials": [
        "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=300", // cleaning
    ],
    "Home & Office": [
        "https://images.pexels.com/photos/159519/back-to-school-paper-colored-paper-stationery-159519.jpeg?auto=compress&cs=tinysrgb&w=300", // stationery
    ],
    "Personal Care": [
        "https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&w=300", // personal care
    ],
    "Pet Care": [
        "https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg?auto=compress&cs=tinysrgb&w=300", // pet
    ],
    "Paan Corner": [
        "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=300", // paan
    ]
};

export const generateProducts = (count = 1000) => {
    const products = [];
    let idCounter = 1000; // Start IDs from 1000 to avoid conflict with static data

    for (let i = 0; i < count; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const names = productNames[category] || ["Generic Product"];
        const baseName = names[Math.floor(Math.random() * names.length)];

        // Add some variety to names
        const adjectives = ["Fresh", "Premium", "Organic", "Classic", "Best", "Tasty", "Healthy", "Pure", "Natural", "Authentic"];
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const name = `${adjective} ${baseName}`;

        const price = Math.floor(Math.random() * 450) + 10; // Price between 10 and 460
        const discount = Math.floor(Math.random() * 30); // Discount between 0 and 30%
        const originalPrice = Math.floor(price * (1 + discount / 100));

        const weights = ["100 g", "200 g", "500 g", "1 kg", "1 L", "500 ml", "250 ml", "1 pc", "Pack of 2", "Pack of 4"];
        const weight = weights[Math.floor(Math.random() * weights.length)];

        // Randomly select an image from the category's image array
        const categoryImageArray = productImages[category] || productImages["Fruits & Vegetables"];
        const image = categoryImageArray[Math.floor(Math.random() * categoryImageArray.length)];

        products.push({
            id: idCounter++,
            name: name,
            weight: weight,
            price: price,
            originalPrice: originalPrice,
            image: image,
            category: category,
            discount: discount
        });
    }
    return products;
};
