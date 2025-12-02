// DummyJSON Grocery Products - Transformed for Foodeo
// Source: https://dummyjson.com/products/category/groceries
// Total products: 27
// Generated: 2025-11-28

const EXCHANGE_RATE = 83; // USD to INR

// Category mapping function
function mapCategory(title) {
    const categoryMap = {
        'Apple': 'Fruits & Vegetables',
        'Kiwi': 'Fruits & Vegetables',
        'Lemon': 'Fruits & Vegetables',
        'Mulberry': 'Fruits & Vegetables',
        'Strawberry': 'Fruits & Vegetables',
        'Cucumber': 'Fruits & Vegetables',
        'Green Bell Pepper': 'Fruits & Vegetables',
        'Green Chili Pepper': 'Fruits & Vegetables',
        'Potatoes': 'Fruits & Vegetables',
        'Red Onions': 'Fruits & Vegetables',
        'Beef Steak': 'Chicken, Meat & Fish',
        'Chicken Meat': 'Chicken, Meat & Fish',
        'Fish Steak': 'Chicken, Meat & Fish',
        'Eggs': 'Dairy & Breakfast',
        'Milk': 'Dairy & Breakfast',
        'Juice': 'Cold Drinks & Juices',
        'Soft Drinks': 'Cold Drinks & Juices',
        'Water': 'Cold Drinks & Juices',
        'Cooking Oil': 'Masala, Oil & More',
        'Honey Jar': 'Sauces & Spreads',
        'Rice': 'Atta, Rice & Dal',
        'Nescafe Coffee': 'Tea, Coffee & Health Drinks',
        'Protein Powder': 'Organic & Healthy Living',
        'Cat Food': 'Pet Care',
        'Dog Food': 'Pet Care',
        'Tissue Paper Box': 'Home & Office',
        'Ice Cream': 'Sweet Tooth'
    };
    return categoryMap[title] || 'Munchies';
}

// Weight unit mapping
function getWeightUnit(title) {
    const weightMap = {
        'Apple': '1 kg',
        'Beef Steak': '500 g',
        'Cat Food': '1 kg',
        'Chicken Meat': '500 g',
        'Cooking Oil': '1 L',
        'Cucumber': '500 g',
        'Dog Food': '3 kg',
        'Eggs': '12 pcs',
        'Fish Steak': '500 g',
        'Green Bell Pepper': '250 g',
        'Green Chili Pepper': '100 g',
        'Honey Jar': '500 g',
        'Ice Cream': '1 L',
        'Juice': '1 L',
        'Kiwi': '500 g',
        'Lemon': '250 g',
        'Milk': '1 L',
        'Mulberry': '250 g',
        'Nescafe Coffee': '200 g',
        'Potatoes': '1 kg',
        'Protein Powder': '1 kg',
        'Red Onions': '1 kg',
        'Rice': '5 kg',
        'Soft Drinks': '2 L',
        'Strawberry': '250 g',
        'Tissue Paper Box': '100 sheets',
        'Water': '1 L'
    };
    return weightMap[title] || '1 pc';
}

export const dummyJsonProducts = [
    {
        id: 10016,
        name: "Apple",
        weight: "1 kg",
        price: 165,
        originalPrice: 189,
        image: "https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp",
        category: "Fruits & Vegetables",
        discount: 13,
        description: "Fresh and crisp apples, perfect for snacking or incorporating into various recipes.",
        rating: 4.19,
        stock: 8,
        sku: "GRO-BRD-APP-016",
        tags: ["fruits"],
        reviews: [
            { rating: 5, comment: "Very satisfied!", reviewerName: "Sophia Brown" },
            { rating: 1, comment: "Very dissatisfied!", reviewerName: "Scarlett Bowman" },
            { rating: 3, comment: "Very unhappy with my purchase!", reviewerName: "William Gonzalez" }
        ]
    },
    {
        id: 10017,
        name: "Beef Steak",
        weight: "500 g",
        price: 1078,
        originalPrice: 1192,
        image: "https://cdn.dummyjson.com/product-images/groceries/beef-steak/thumbnail.webp",
        category: "Chicken, Meat & Fish",
        discount: 10,
        description: "High-quality beef steak, great for grilling or cooking to your preferred level of doneness.",
        rating: 4.47,
        stock: 86,
        sku: "GRO-BRD-BEE-017",
        tags: ["meat"],
        reviews: [
            { rating: 3, comment: "Would not recommend!", reviewerName: "Eleanor Tyler" },
            { rating: 4, comment: "Fast shipping!", reviewerName: "Alexander Jones" },
            { rating: 5, comment: "Great value for money!", reviewerName: "Natalie Harris" }
        ]
    },
    {
        id: 10018,
        name: "Cat Food",
        weight: "1 kg",
        price: 746,
        originalPrice: 825,
        image: "https://cdn.dummyjson.com/product-images/groceries/cat-food/thumbnail.webp",
        category: "Pet Care",
        discount: 10,
        description: "Nutritious cat food formulated to meet the dietary needs of your feline friend.",
        rating: 3.13,
        stock: 46,
        sku: "GRO-BRD-FOO-018",
        tags: ["pet supplies", "cat food"],
        reviews: [
            { rating: 3, comment: "Would not recommend!", reviewerName: "Noah Lewis" },
            { rating: 3, comment: "Very unhappy with my purchase!", reviewerName: "Ruby Andrews" },
            { rating: 2, comment: "Very disappointed!", reviewerName: "Ethan Thompson" }
        ]
    },
    {
        id: 10019,
        name: "Chicken Meat",
        weight: "500 g",
        price: 829,
        originalPrice: 961,
        image: "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/thumbnail.webp",
        category: "Chicken, Meat & Fish",
        discount: 14,
        description: "Fresh and tender chicken meat, suitable for various culinary preparations.",
        rating: 3.19,
        stock: 97,
        sku: "GRO-BRD-CHI-019",
        tags: ["meat"],
        reviews: [
            { rating: 5, comment: "Great product!", reviewerName: "Mateo Bennett" },
            { rating: 4, comment: "Highly recommended!", reviewerName: "Jackson Evans" },
            { rating: 3, comment: "Not worth the price!", reviewerName: "Sadie Morales" }
        ]
    },
    {
        id: 10020,
        name: "Cooking Oil",
        weight: "1 L",
        price: 414,
        originalPrice: 457,
        image: "https://cdn.dummyjson.com/product-images/groceries/cooking-oil/thumbnail.webp",
        category: "Masala, Oil & More",
        discount: 9,
        description: "Versatile cooking oil suitable for frying, sautéing, and various culinary applications.",
        rating: 4.8,
        stock: 10,
        sku: "GRO-BRD-COO-020",
        tags: ["cooking essentials"],
        reviews: [
            { rating: 5, comment: "Very happy with my purchase!", reviewerName: "Victoria McDonald" },
            { rating: 2, comment: "Would not recommend!", reviewerName: "Hazel Evans" },
            { rating: 5, comment: "Would buy again!", reviewerName: "Zoe Bennett" }
        ]
    },
    {
        id: 10021,
        name: "Cucumber",
        weight: "500 g",
        price: 124,
        originalPrice: 124,
        image: "https://cdn.dummyjson.com/product-images/groceries/cucumber/thumbnail.webp",
        category: "Fruits & Vegetables",
        discount: 0,
        description: "Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.",
        rating: 4.07,
        stock: 84,
        sku: "GRO-BRD-CUC-021",
        tags: ["vegetables"],
        reviews: [
            { rating: 4, comment: "Great product!", reviewerName: "Lincoln Kelly" },
            { rating: 4, comment: "Great value for money!", reviewerName: "Savannah Gomez" },
            { rating: 2, comment: "Poor quality!", reviewerName: "James Davis" }
        ]
    },
    {
        id: 10022,
        name: "Dog Food",
        weight: "3 kg",
        price: 912,
        originalPrice: 1016,
        image: "https://cdn.dummyjson.com/product-images/groceries/dog-food/thumbnail.webp",
        category: "Pet Care",
        discount: 10,
        description: "Specially formulated dog food designed to provide essential nutrients for your canine companion.",
        rating: 4.55,
        stock: 71,
        sku: "GRO-BRD-FOO-022",
        tags: ["pet supplies", "dog food"],
        reviews: [
            { rating: 5, comment: "Excellent quality!", reviewerName: "Nicholas Edwards" },
            { rating: 5, comment: "Awesome product!", reviewerName: "Zachary Lee" },
            { rating: 4, comment: "Great product!", reviewerName: "Nova Cooper" }
        ]
    },
    {
        id: 10023,
        name: "Eggs",
        weight: "12 pcs",
        price: 248,
        originalPrice: 279,
        image: "https://cdn.dummyjson.com/product-images/groceries/eggs/thumbnail.webp",
        category: "Dairy & Breakfast",
        discount: 11,
        description: "Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.",
        rating: 2.53,
        stock: 9,
        sku: "GRO-BRD-EGG-023",
        tags: ["dairy"],
        reviews: [
            { rating: 3, comment: "Disappointing product!", reviewerName: "Penelope King" },
            { rating: 3, comment: "Poor quality!", reviewerName: "Eleanor Tyler" },
            { rating: 4, comment: "Very pleased!", reviewerName: "Benjamin Foster" }
        ]
    },
    {
        id: 10024,
        name: "Fish Steak",
        weight: "500 g",
        price: 1244,
        originalPrice: 1299,
        image: "https://cdn.dummyjson.com/product-images/groceries/fish-steak/thumbnail.webp",
        category: "Chicken, Meat & Fish",
        discount: 4,
        description: "Quality fish steak, suitable for grilling, baking, or pan-searing.",
        rating: 3.78,
        stock: 74,
        sku: "GRO-BRD-FIS-024",
        tags: ["seafood"],
        reviews: [
            { rating: 2, comment: "Would not buy again!", reviewerName: "Caleb Perkins" },
            { rating: 5, comment: "Excellent quality!", reviewerName: "Isabella Jackson" },
            { rating: 4, comment: "Great value for money!", reviewerName: "Nathan Dixon" }
        ]
    },
    {
        id: 10025,
        name: "Green Bell Pepper",
        weight: "250 g",
        price: 107,
        originalPrice: 107,
        image: "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/thumbnail.webp",
        category: "Fruits & Vegetables",
        discount: 0,
        description: "Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.",
        rating: 3.25,
        stock: 33,
        sku: "GRO-BRD-GRE-025",
        tags: ["vegetables"],
        reviews: [
            { rating: 4, comment: "Highly recommended!", reviewerName: "Avery Carter" },
            { rating: 3, comment: "Would not recommend!", reviewerName: "Henry Hill" },
            { rating: 5, comment: "Excellent quality!", reviewerName: "Addison Wright" }
        ]
    },
    {
        id: 10026,
        name: "Green Chili Pepper",
        weight: "100 g",
        price: 82,
        originalPrice: 83,
        image: "https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/thumbnail.webp",
        category: "Fruits & Vegetables",
        discount: 1,
        description: "Spicy green chili pepper, ideal for adding heat to your favorite recipes.",
        rating: 3.66,
        stock: 3,
        sku: "GRO-BRD-GRE-026",
        tags: ["vegetables"],
        reviews: [
            { rating: 4, comment: "Great product!", reviewerName: "Luna Russell" },
            { rating: 1, comment: "Waste of money!", reviewerName: "Noah Lewis" },
            { rating: 3, comment: "Very disappointed!", reviewerName: "Clara Berry" }
        ]
    },
    {
        id: 10027,
        name: "Honey Jar",
        weight: "500 g",
        price: 580,
        originalPrice: 678,
        image: "https://cdn.dummyjson.com/product-images/groceries/honey-jar/thumbnail.webp",
        category: "Sauces & Spreads",
        discount: 14,
        description: "Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food.",
        rating: 3.97,
        stock: 34,
        sku: "GRO-BRD-HON-027",
        tags: ["condiments"],
        reviews: [
            { rating: 1, comment: "Very disappointed!", reviewerName: "Autumn Gomez" },
            { rating: 4, comment: "Highly impressed!", reviewerName: "Benjamin Wilson" },
            { rating: 2, comment: "Very disappointed!", reviewerName: "Nicholas Edwards" }
        ]
    },
    {
        id: 10028,
        name: "Ice Cream",
        weight: "1 L",
        price: 456,
        originalPrice: 499,
        image: "https://cdn.dummyjson.com/product-images/groceries/ice-cream/thumbnail.webp",
        category: "Sweet Tooth",
        discount: 9,
        description: "Creamy and delicious ice cream, available in various flavors for a delightful treat.",
        rating: 3.39,
        stock: 27,
        sku: "GRO-BRD-CRE-028",
        tags: ["desserts"],
        reviews: [
            { rating: 5, comment: "Very pleased!", reviewerName: "Elijah Cruz" },
            { rating: 4, comment: "Excellent quality!", reviewerName: "Jace Smith" },
            { rating: 5, comment: "Highly impressed!", reviewerName: "Sadie Morales" }
        ]
    },
    {
        id: 10029,
        name: "Juice",
        weight: "1 L",
        price: 331,
        originalPrice: 377,
        image: "https://cdn.dummyjson.com/product-images/groceries/juice/thumbnail.webp",
        category: "Cold Drinks & Juices",
        discount: 12,
        description: "Refreshing fruit juice, packed with vitamins and great for staying hydrated.",
        rating: 3.94,
        stock: 50,
        sku: "GRO-BRD-JUI-029",
        tags: ["beverages"],
        reviews: [
            { rating: 5, comment: "Excellent quality!", reviewerName: "Nolan Gonzalez" },
            { rating: 4, comment: "Would buy again!", reviewerName: "Bella Grant" },
            { rating: 5, comment: "Awesome product!", reviewerName: "Aria Flores" }
        ]
    },
    {
        id: 10030,
        name: "Kiwi",
        weight: "500 g",
        price: 207,
        originalPrice: 244,
        image: "https://cdn.dummyjson.com/product-images/groceries/kiwi/thumbnail.webp",
        category: "Fruits & Vegetables",
        discount: 15,
        description: "Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes.",
        rating: 4.93,
        stock: 99,
        sku: "GRO-BRD-KIW-030",
        tags: ["fruits"],
        reviews: [
            { rating: 4, comment: "Highly recommended!", reviewerName: "Emily Brown" },
            { rating: 2, comment: "Would not buy again!", reviewerName: "Jackson Morales" },
            { rating: 4, comment: "Fast shipping!", reviewerName: "Nora Russell" }
        ]
    },
    {
        id: 10031,
        name: "Lemon",
        weight: "250 g",
        price: 66,
        originalPrice: 73,
        image: "https://cdn.dummyjson.com/product-images/groceries/lemon/thumbnail.webp",
        category: "Fruits & Vegetables",
        discount: 10,
        description: "Zesty and tangy lemons, versatile for cooking, baking, or making refreshing beverages.",
        rating: 3.53,
        stock: 31,
        sku: "GRO-BRD-LEM-031",
        tags: ["fruits"],
        reviews: [
            { rating: 5, comment: "Awesome product!", reviewerName: "Logan Lawson" },
            { rating: 5, comment: "Highly impressed!", reviewerName: "Avery Perez" },
            { rating: 5, comment: "Very satisfied!", reviewerName: "Benjamin Foster" }
        ]
    },
    {
        id: 10032,
        name: "Milk",
        weight: "1 L",
        price: 290,
        originalPrice: 336,
        image: "https://cdn.dummyjson.com/product-images/groceries/milk/thumbnail.webp",
        category: "Dairy & Breakfast",
        discount: 14,
        description: "Fresh and nutritious milk, a staple for various recipes and daily consumption.",
        rating: 2.61,
        stock: 27,
        sku: "GRO-BRD-MIL-032",
        tags: ["dairy"],
        reviews: [
            { rating: 4, comment: "Very satisfied!", reviewerName: "Nicholas Bailey" },
            { rating: 3, comment: "Would not buy again!", reviewerName: "Harper Turner" },
            { rating: 5, comment: "Great value for money!", reviewerName: "Autumn Gomez" }
        ]
    },
    {
        id: 10033,
        name: "Mulberry",
        weight: "250 g",
        price: 414,
        originalPrice: 475,
        image: "https://cdn.dummyjson.com/product-images/groceries/mulberry/thumbnail.webp",
        category: "Fruits & Vegetables",
        discount: 13,
        description: "Sweet and juicy mulberries, perfect for snacking or adding to desserts and cereals.",
        rating: 4.95,
        stock: 99,
        sku: "GRO-BRD-MUL-033",
        tags: ["fruits"],
        reviews: [
            { rating: 5, comment: "Fast shipping!", reviewerName: "Avery Barnes" },
            { rating: 2, comment: "Not worth the price!", reviewerName: "Sadie Morales" },
            { rating: 1, comment: "Would not buy again!", reviewerName: "Oscar Powers" }
        ]
    },
    {
        id: 10034,
        name: "Nescafe Coffee",
        weight: "200 g",
        price: 663,
        originalPrice: 674,
        image: "https://cdn.dummyjson.com/product-images/groceries/nescafe-coffee/thumbnail.webp",
        category: "Tea, Coffee & Health Drinks",
        discount: 2,
        description: "Quality coffee from Nescafe, available in various blends for a rich and satisfying cup.",
        rating: 4.82,
        stock: 57,
        sku: "GRO-BRD-NES-034",
        tags: ["beverages", "coffee"],
        reviews: [
            { rating: 5, comment: "Very pleased!", reviewerName: "Gabriel Adams" },
            { rating: 5, comment: "Highly recommended!", reviewerName: "Ella Cook" },
            { rating: 4, comment: "Would buy again!", reviewerName: "Logan Torres" }
        ]
    },
    {
        id: 10035,
        name: "Potatoes",
        weight: "1 kg",
        price: 190,
        originalPrice: 201,
        image: "https://cdn.dummyjson.com/product-images/groceries/potatoes/thumbnail.webp",
        category: "Fruits & Vegetables",
        discount: 5,
        description: "Versatile and starchy potatoes, great for roasting, mashing, or as a side dish.",
        rating: 4.81,
        stock: 13,
        sku: "GRO-BRD-POT-035",
        tags: ["vegetables"],
        reviews: [
            { rating: 5, comment: "Highly impressed!", reviewerName: "Eleanor Collins" },
            { rating: 4, comment: "Fast shipping!", reviewerName: "Lily Torres" },
            { rating: 5, comment: "Highly recommended!", reviewerName: "Ariana Ross" }
        ]
    },
    {
        id: 10036,
        name: "Protein Powder",
        weight: "1 kg",
        price: 1659,
        originalPrice: 1795,
        image: "https://cdn.dummyjson.com/product-images/groceries/protein-powder/thumbnail.webp",
        category: "Organic & Healthy Living",
        discount: 8,
        description: "Nutrient-packed protein powder, ideal for supplementing your diet with essential proteins.",
        rating: 4.18,
        stock: 80,
        sku: "GRO-BRD-PRO-036",
        tags: ["health supplements"],
        reviews: [
            { rating: 3, comment: "Very unhappy with my purchase!", reviewerName: "Aurora Rodriguez" },
            { rating: 4, comment: "Would buy again!", reviewerName: "Miles Stevenson" },
            { rating: 4, comment: "Very happy with my purchase!", reviewerName: "Clara Berry" }
        ]
    },
    {
        id: 10037,
        name: "Red Onions",
        weight: "1 kg",
        price: 165,
        originalPrice: 183,
        image: "https://cdn.dummyjson.com/product-images/groceries/red-onions/thumbnail.webp",
        category: "Fruits & Vegetables",
        discount: 10,
        description: "Flavorful and aromatic red onions, perfect for adding depth to your savory dishes.",
        rating: 4.2,
        stock: 82,
        sku: "GRO-BRD-ONI-037",
        tags: ["vegetables"],
        reviews: [
            { rating: 4, comment: "Fast shipping!", reviewerName: "Maya Reed" },
            { rating: 3, comment: "Very dissatisfied!", reviewerName: "Evelyn Gonzalez" },
            { rating: 5, comment: "Awesome product!", reviewerName: "Jackson Evans" }
        ]
    },
    {
        id: 10038,
        name: "Rice",
        weight: "5 kg",
        price: 497,
        originalPrice: 548,
        image: "https://cdn.dummyjson.com/product-images/groceries/rice/thumbnail.webp",
        category: "Atta, Rice & Dal",
        discount: 9,
        description: "High-quality rice, a staple for various cuisines and a versatile base for many dishes.",
        rating: 3.18,
        stock: 59,
        sku: "GRO-BRD-RIC-038",
        tags: ["grains"],
        reviews: [
            { rating: 5, comment: "Would buy again!", reviewerName: "Sophia Brown" },
            { rating: 4, comment: "Very satisfied!", reviewerName: "Grace Perry" },
            { rating: 1, comment: "Very disappointed!", reviewerName: "Cameron Burke" }
        ]
    },
    {
        id: 10039,
        name: "Soft Drinks",
        weight: "2 L",
        price: 165,
        originalPrice: 200,
        image: "https://cdn.dummyjson.com/product-images/groceries/soft-drinks/thumbnail.webp",
        category: "Cold Drinks & Juices",
        discount: 17,
        description: "Assorted soft drinks in various flavors, perfect for refreshing beverages.",
        rating: 4.75,
        stock: 53,
        sku: "GRO-BRD-SOF-039",
        tags: ["beverages"],
        reviews: [
            { rating: 2, comment: "Would not recommend!", reviewerName: "Zachary Lee" },
            { rating: 2, comment: "Would not recommend!", reviewerName: "Oscar Powers" },
            { rating: 5, comment: "Highly recommended!", reviewerName: "Hannah Robinson" }
        ]
    },
    {
        id: 10040,
        name: "Strawberry",
        weight: "250 g",
        price: 331,
        originalPrice: 335,
        image: "https://cdn.dummyjson.com/product-images/groceries/strawberry/thumbnail.webp",
        category: "Fruits & Vegetables",
        discount: 1,
        description: "Sweet and succulent strawberries, great for snacking, desserts, or blending into smoothies.",
        rating: 3.08,
        stock: 46,
        sku: "GRO-BRD-STR-040",
        tags: ["fruits"],
        reviews: [
            { rating: 3, comment: "Would not buy again!", reviewerName: "Amelia Perez" },
            { rating: 3, comment: "Would not buy again!", reviewerName: "Olivia Wilson" },
            { rating: 4, comment: "Would buy again!", reviewerName: "Hunter Gordon" }
        ]
    },
    {
        id: 10041,
        name: "Tissue Paper Box",
        weight: "100 sheets",
        price: 207,
        originalPrice: 239,
        image: "https://cdn.dummyjson.com/product-images/groceries/tissue-paper-box/thumbnail.webp",
        category: "Home & Office",
        discount: 13,
        description: "Convenient tissue paper box for everyday use, providing soft and absorbent tissues.",
        rating: 2.69,
        stock: 86,
        sku: "GRO-BRD-TIS-041",
        tags: ["household essentials"],
        reviews: [
            { rating: 1, comment: "Not as described!", reviewerName: "Ariana Ross" },
            { rating: 5, comment: "Fast shipping!", reviewerName: "Carter Baker" },
            { rating: 5, comment: "Great value for money!", reviewerName: "Penelope Harper" }
        ]
    },
    {
        id: 10042,
        name: "Water",
        weight: "1 L",
        price: 82,
        originalPrice: 96,
        image: "https://cdn.dummyjson.com/product-images/groceries/water/thumbnail.webp",
        category: "Cold Drinks & Juices",
        discount: 15,
        description: "Pure and refreshing bottled water, essential for staying hydrated throughout the day.",
        rating: 4.96,
        stock: 53,
        sku: "GRO-BRD-WAT-042",
        tags: ["beverages"],
        reviews: [
            { rating: 5, comment: "Highly impressed!", reviewerName: "Jonathan Pierce" },
            { rating: 2, comment: "Would not recommend!", reviewerName: "Grayson Coleman" },
            { rating: 3, comment: "Not as described!", reviewerName: "Ethan Fletcher" }
        ]
    }
];

// Export count for reference
export const dummyJsonProductCount = dummyJsonProducts.length;

// Export by category for easy filtering
export const dummyJsonByCategory = dummyJsonProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
        acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
}, {});
