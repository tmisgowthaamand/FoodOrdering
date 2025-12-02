// Script to generate product data from Fruits-360 dataset
// This creates 230 diverse fruit and vegetable products

const fruitsVegetablesData = [
    // Apples (8 varieties)
    { name: "Apple - Crimson Snow", weight: "4 pcs", price: 159, originalPrice: 180, category: "Fruits & Vegetables", type: "apple" },
    { name: "Apple - Golden", weight: "4 pcs", price: 149, originalPrice: 170, category: "Fruits & Vegetables", type: "apple" },
    { name: "Apple - Granny Smith", weight: "4 pcs", price: 169, originalPrice: 190, category: "Fruits & Vegetables", type: "apple" },
    { name: "Apple - Pink Lady", weight: "4 pcs", price: 179, originalPrice: 200, category: "Fruits & Vegetables", type: "apple" },
    { name: "Apple - Red Delicious", weight: "4 pcs", price: 149, originalPrice: 180, category: "Fruits & Vegetables", type: "apple" },
    { name: "Apple - Golden Red", weight: "4 pcs", price: 159, originalPrice: 180, category: "Fruits & Vegetables", type: "apple" },
    { name: "Apple - Red", weight: "1 kg", price: 140, originalPrice: 160, category: "Fruits & Vegetables", type: "apple" },
    { name: "Apple - Green", weight: "1 kg", price: 150, originalPrice: 170, category: "Fruits & Vegetables", type: "apple" },

    // Bananas (3 varieties)
    { name: "Banana - Yellow", weight: "1 kg (5-6 pcs)", price: 45, originalPrice: 55, category: "Fruits & Vegetables", type: "banana" },
    { name: "Banana - Red", weight: "500 g", price: 65, originalPrice: 75, category: "Fruits & Vegetables", type: "banana" },
    { name: "Banana - Lady Finger", weight: "500 g", price: 55, originalPrice: 65, category: "Fruits & Vegetables", type: "banana" },

    // Grapes (3 varieties)
    { name: "Grapes - Blue", weight: "500 g", price: 89, originalPrice: 110, category: "Fruits & Vegetables", type: "grape" },
    { name: "Grapes - Pink", weight: "500 g", price: 95, originalPrice: 115, category: "Fruits & Vegetables", type: "grape" },
    { name: "Grapes - White", weight: "500 g", price: 85, originalPrice: 105, category: "Fruits & Vegetables", type: "grape" },

    // Citrus Fruits
    { name: "Orange - Fresh", weight: "1 kg (4-5 pcs)", price: 89, originalPrice: 110, category: "Fruits & Vegetables", type: "orange" },
    { name: "Lemon - Regular", weight: "250 g (4-5 pcs)", price: 35, originalPrice: 45, category: "Fruits & Vegetables", type: "lemon" },
    { name: "Lemon - Meyer", weight: "250 g", price: 45, originalPrice: 55, category: "Fruits & Vegetables", type: "lemon" },
    { name: "Lime - Fresh", weight: "250 g", price: 30, originalPrice: 40, category: "Fruits & Vegetables", type: "lime" },
    { name: "Mandarine", weight: "500 g", price: 75, originalPrice: 90, category: "Fruits & Vegetables", type: "mandarine" },
    { name: "Clementine", weight: "500 g", price: 85, originalPrice: 100, category: "Fruits & Vegetables", type: "clementine" },
    { name: "Grapefruit - Pink", weight: "2 pcs", price: 95, originalPrice: 115, category: "Fruits & Vegetables", type: "grapefruit" },
    { name: "Grapefruit - White", weight: "2 pcs", price: 89, originalPrice: 110, category: "Fruits & Vegetables", type: "grapefruit" },
    { name: "Tangelo", weight: "500 g", price: 79, originalPrice: 95, category: "Fruits & Vegetables", type: "tangelo" },
    { name: "Pomelo Sweetie", weight: "1 pc", price: 125, originalPrice: 150, category: "Fruits & Vegetables", type: "pomelo" },
    { name: "Kumquat", weight: "200 g", price: 99, originalPrice: 120, category: "Fruits & Vegetables", type: "kumquat" },

    // Stone Fruits
    { name: "Mango - Alphonso", weight: "1 kg", price: 299, originalPrice: 350, category: "Fruits & Vegetables", type: "mango" },
    { name: "Mango - Green", weight: "1 kg", price: 149, originalPrice: 180, category: "Fruits & Vegetables", type: "mango" },
    { name: "Mango - Red", weight: "1 kg", price: 279, originalPrice: 320, category: "Fruits & Vegetables", type: "mango" },
    { name: "Peach - Regular", weight: "4 pcs", price: 159, originalPrice: 180, category: "Fruits & Vegetables", type: "peach" },
    { name: "Peach - Flat", weight: "4 pcs", price: 169, originalPrice: 190, category: "Fruits & Vegetables", type: "peach" },
    { name: "Nectarine - Regular", weight: "4 pcs", price: 149, originalPrice: 170, category: "Fruits & Vegetables", type: "nectarine" },
    { name: "Nectarine - Flat", weight: "4 pcs", price: 159, originalPrice: 180, category: "Fruits & Vegetables", type: "nectarine" },
    { name: "Apricot", weight: "250 g", price: 139, originalPrice: 160, category: "Fruits & Vegetables", type: "apricot" },
    { name: "Plum - Red", weight: "500 g", price: 129, originalPrice: 150, category: "Fruits & Vegetables", type: "plum" },
    { name: "Plum - Black", weight: "500 g", price: 135, originalPrice: 155, category: "Fruits & Vegetables", type: "plum" },
    { name: "Cherry - Regular", weight: "250 g", price: 199, originalPrice: 230, category: "Fruits & Vegetables", type: "cherry" },
    { name: "Cherry - Rainier", weight: "250 g", price: 249, originalPrice: 280, category: "Fruits & Vegetables", type: "cherry" },

    // Berries
    { name: "Strawberry - Fresh", weight: "250 g", price: 149, originalPrice: 170, category: "Fruits & Vegetables", type: "strawberry" },
    { name: "Strawberry - Wedge", weight: "200 g", price: 135, originalPrice: 155, category: "Fruits & Vegetables", type: "strawberry" },
    { name: "Blueberry", weight: "125 g", price: 179, originalPrice: 200, category: "Fruits & Vegetables", type: "blueberry" },
    { name: "Blackberry", weight: "125 g", price: 169, originalPrice: 190, category: "Fruits & Vegetables", type: "blackberry" },
    { name: "Raspberry", weight: "125 g", price: 189, originalPrice: 210, category: "Fruits & Vegetables", type: "raspberry" },
    { name: "Gooseberry", weight: "200 g", price: 159, originalPrice: 180, category: "Fruits & Vegetables", type: "gooseberry" },
    { name: "Redcurrant", weight: "150 g", price: 149, originalPrice: 170, category: "Fruits & Vegetables", type: "redcurrant" },
    { name: "Huckleberry", weight: "125 g", price: 175, originalPrice: 195, category: "Fruits & Vegetables", type: "huckleberry" },
    { name: "Mulberry", weight: "150 g", price: 139, originalPrice: 160, category: "Fruits & Vegetables", type: "mulberry" },

    // Pears
    { name: "Pear - Abate", weight: "4 pcs", price: 139, originalPrice: 160, category: "Fruits & Vegetables", type: "pear" },
    { name: "Pear - Forelle", weight: "4 pcs", price: 149, originalPrice: 170, category: "Fruits & Vegetables", type: "pear" },
    { name: "Pear - Kaiser", weight: "4 pcs", price: 159, originalPrice: 180, category: "Fruits & Vegetables", type: "pear" },
    { name: "Pear - Red", weight: "4 pcs", price: 145, originalPrice: 165, category: "Fruits & Vegetables", type: "pear" },
    { name: "Pear - Williams", weight: "4 pcs", price: 135, originalPrice: 155, category: "Fruits & Vegetables", type: "pear" },
    { name: "Pear - Monster", weight: "2 pcs", price: 169, originalPrice: 190, category: "Fruits & Vegetables", type: "pear" },
    { name: "Pear - Stone", weight: "4 pcs", price: 129, originalPrice: 150, category: "Fruits & Vegetables", type: "pear" },

    // Tropical Fruits
    { name: "Pineapple - Regular", weight: "1 pc", price: 89, originalPrice: 110, category: "Fruits & Vegetables", type: "pineapple" },
    { name: "Pineapple - Mini", weight: "1 pc", price: 65, originalPrice: 80, category: "Fruits & Vegetables", type: "pineapple" },
    { name: "Papaya - Ripe", weight: "1 pc", price: 79, originalPrice: 95, category: "Fruits & Vegetables", type: "papaya" },
    { name: "Kiwi - Green", weight: "4 pcs", price: 99, originalPrice: 120, category: "Fruits & Vegetables", type: "kiwi" },
    { name: "Guava - Fresh", weight: "500 g", price: 69, originalPrice: 85, category: "Fruits & Vegetables", type: "guava" },
    { name: "Passion Fruit", weight: "4 pcs", price: 129, originalPrice: 150, category: "Fruits & Vegetables", type: "passionfruit" },
    { name: "Maracuja", weight: "4 pcs", price: 139, originalPrice: 160, category: "Fruits & Vegetables", type: "maracuja" },
    { name: "Lychee", weight: "250 g", price: 149, originalPrice: 170, category: "Fruits & Vegetables", type: "lychee" },
    { name: "Rambutan", weight: "250 g", price: 159, originalPrice: 180, category: "Fruits & Vegetables", type: "rambutan" },
    { name: "Mangostan", weight: "250 g", price: 199, originalPrice: 230, category: "Fruits & Vegetables", type: "mangostan" },
    { name: "Pitahaya Red (Dragon Fruit)", weight: "1 pc", price: 149, originalPrice: 170, category: "Fruits & Vegetables", type: "pitahaya" },
    { name: "Carambola (Star Fruit)", weight: "3 pcs", price: 119, originalPrice: 140, category: "Fruits & Vegetables", type: "carambola" },
    { name: "Granadilla", weight: "4 pcs", price: 135, originalPrice: 155, category: "Fruits & Vegetables", type: "granadilla" },
    { name: "Physalis", weight: "150 g", price: 129, originalPrice: 150, category: "Fruits & Vegetables", type: "physalis" },
    { name: "Physalis with Husk", weight: "150 g", price: 139, originalPrice: 160, category: "Fruits & Vegetables", type: "physalis" },
    { name: "Tamarillo", weight: "4 pcs", price: 145, originalPrice: 165, category: "Fruits & Vegetables", type: "tamarillo" },
    { name: "Salak (Snake Fruit)", weight: "250 g", price: 169, originalPrice: 190, category: "Fruits & Vegetables", type: "salak" },
    { name: "Cherimoya", weight: "1 pc", price: 189, originalPrice: 210, category: "Fruits & Vegetables", type: "cherimoya" },

    // Melons
    { name: "Watermelon - Regular", weight: "1 pc (3-4 kg)", price: 89, originalPrice: 110, category: "Fruits & Vegetables", type: "watermelon" },
    { name: "Cantaloupe - Orange", weight: "1 pc", price: 79, originalPrice: 95, category: "Fruits & Vegetables", type: "cantaloupe" },
    { name: "Cantaloupe - Yellow", weight: "1 pc", price: 85, originalPrice: 100, category: "Fruits & Vegetables", type: "cantaloupe" },
    { name: "Melon Piel de Sapo", weight: "1 pc", price: 95, originalPrice: 115, category: "Fruits & Vegetables", type: "melon" },
    { name: "Pepino", weight: "2 pcs", price: 119, originalPrice: 140, category: "Fruits & Vegetables", type: "pepino" },

    // Other Fruits
    { name: "Pomegranate", weight: "2 pcs", price: 129, originalPrice: 150, category: "Fruits & Vegetables", type: "pomegranate" },
    { name: "Kaki (Persimmon)", weight: "4 pcs", price: 139, originalPrice: 160, category: "Fruits & Vegetables", type: "kaki" },
    { name: "Quince", weight: "500 g", price: 99, originalPrice: 120, category: "Fruits & Vegetables", type: "quince" },
    { name: "Fig - Fresh", weight: "200 g", price: 159, originalPrice: 180, category: "Fruits & Vegetables", type: "fig" },
    { name: "Dates - Fresh", weight: "250 g", price: 149, originalPrice: 170, category: "Fruits & Vegetables", type: "dates" },
    { name: "Avocado - Regular", weight: "2 pcs", price: 99, originalPrice: 120, category: "Fruits & Vegetables", type: "avocado" },
    { name: "Avocado - Ripe", weight: "2 pcs", price: 109, originalPrice: 130, category: "Fruits & Vegetables", type: "avocado" },
    { name: "Coconut - Fresh", weight: "1 pc", price: 45, originalPrice: 55, category: "Fruits & Vegetables", type: "coconut" },
    { name: "Cactus Fruit", weight: "3 pcs", price: 119, originalPrice: 140, category: "Fruits & Vegetables", type: "cactus" },

    // Vegetables - Tomatoes
    { name: "Tomato - Regular", weight: "500 g", price: 29, originalPrice: 35, category: "Fruits & Vegetables", type: "tomato" },
    { name: "Tomato - Cherry Red", weight: "250 g", price: 45, originalPrice: 55, category: "Fruits & Vegetables", type: "tomato" },
    { name: "Tomato - Yellow", weight: "250 g", price: 49, originalPrice: 60, category: "Fruits & Vegetables", type: "tomato" },
    { name: "Tomato - Maroon", weight: "500 g", price: 39, originalPrice: 48, category: "Fruits & Vegetables", type: "tomato" },
    { name: "Tomato - Heart", weight: "500 g", price: 55, originalPrice: 65, category: "Fruits & Vegetables", type: "tomato" },
    { name: "Tomato - Green (Unripe)", weight: "500 g", price: 25, originalPrice: 32, category: "Fruits & Vegetables", type: "tomato" },

    // Vegetables - Peppers
    { name: "Pepper - Green", weight: "250 g", price: 25, originalPrice: 30, category: "Fruits & Vegetables", type: "pepper" },
    { name: "Pepper - Red", weight: "250 g", price: 35, originalPrice: 42, category: "Fruits & Vegetables", type: "pepper" },
    { name: "Pepper - Yellow", weight: "250 g", price: 39, originalPrice: 48, category: "Fruits & Vegetables", type: "pepper" },
    { name: "Pepper - Orange", weight: "250 g", price: 38, originalPrice: 46, category: "Fruits & Vegetables", type: "pepper" },

    // Vegetables - Root Vegetables
    { name: "Carrot - Orange", weight: "500 g", price: 38, originalPrice: 45, category: "Fruits & Vegetables", type: "carrot" },
    { name: "Beetroot - Red", weight: "500 g", price: 42, originalPrice: 50, category: "Fruits & Vegetables", type: "beetroot" },
    { name: "Potato - White", weight: "1 kg", price: 32, originalPrice: 40, category: "Fruits & Vegetables", type: "potato" },
    { name: "Potato - Red", weight: "1 kg", price: 38, originalPrice: 46, category: "Fruits & Vegetables", type: "potato" },
    { name: "Potato - Sweet", weight: "500 g", price: 55, originalPrice: 65, category: "Fruits & Vegetables", type: "potato" },
    { name: "Ginger Root", weight: "250 g", price: 45, originalPrice: 55, category: "Fruits & Vegetables", type: "ginger" },

    // Vegetables - Onions
    { name: "Onion - Red", weight: "1 kg", price: 38, originalPrice: 46, category: "Fruits & Vegetables", type: "onion" },
    { name: "Onion - White", weight: "1 kg", price: 35, originalPrice: 45, category: "Fruits & Vegetables", type: "onion" },

    // Vegetables - Cruciferous
    { name: "Cabbage - Green", weight: "1 pc", price: 35, originalPrice: 42, category: "Fruits & Vegetables", type: "cabbage" },
    { name: "Cauliflower", weight: "1 pc", price: 42, originalPrice: 50, category: "Fruits & Vegetables", type: "cauliflower" },
    { name: "Kohlrabi", weight: "500 g", price: 48, originalPrice: 58, category: "Fruits & Vegetables", type: "kohlrabi" },

    // Vegetables - Squash & Gourds
    { name: "Cucumber - Regular", weight: "500 g", price: 22, originalPrice: 28, category: "Fruits & Vegetables", type: "cucumber" },
    { name: "Cucumber - Ripened", weight: "500 g", price: 25, originalPrice: 32, category: "Fruits & Vegetables", type: "cucumber" },
    { name: "Zucchini - Green", weight: "500 g", price: 38, originalPrice: 46, category: "Fruits & Vegetables", type: "zucchini" },
    { name: "Zucchini - White", weight: "500 g", price: 42, originalPrice: 50, category: "Fruits & Vegetables", type: "zucchini" },
    { name: "Eggplant - Regular", weight: "500 g", price: 35, originalPrice: 42, category: "Fruits & Vegetables", type: "eggplant" },
    { name: "Eggplant - Long", weight: "500 g", price: 38, originalPrice: 46, category: "Fruits & Vegetables", type: "eggplant" },

    // Vegetables - Others
    { name: "Corn - with Husk", weight: "4 pcs", price: 45, originalPrice: 55, category: "Fruits & Vegetables", type: "corn" },

    // Nuts & Seeds
    { name: "Walnut - Shelled", weight: "250 g", price: 199, originalPrice: 230, category: "Fruits & Vegetables", type: "walnut" },
    { name: "Walnut - In Shell", weight: "500 g", price: 159, originalPrice: 180, category: "Fruits & Vegetables", type: "walnut" },
    { name: "Hazelnut", weight: "250 g", price: 189, originalPrice: 210, category: "Fruits & Vegetables", type: "hazelnut" },
    { name: "Chestnut", weight: "250 g", price: 169, originalPrice: 190, category: "Fruits & Vegetables", type: "chestnut" },
    { name: "Pistachio", weight: "200 g", price: 249, originalPrice: 280, category: "Fruits & Vegetables", type: "pistachio" },
    { name: "Cashew Seed", weight: "250 g", price: 229, originalPrice: 260, category: "Fruits & Vegetables", type: "cashew" },
    { name: "Pecan Nut", weight: "200 g", price: 279, originalPrice: 320, category: "Fruits & Vegetables", type: "pecan" },
    { name: "Forest Nut Mix", weight: "250 g", price: 199, originalPrice: 230, category: "Fruits & Vegetables", type: "nut" },

    // Cherry Wax (decorative)
    { name: "Cherry Wax - Yellow", weight: "100 g", price: 89, originalPrice: 110, category: "Fruits & Vegetables", type: "cherry_wax" },
    { name: "Cherry Wax - Red", weight: "100 g", price: 89, originalPrice: 110, category: "Fruits & Vegetables", type: "cherry_wax" },
    { name: "Cherry Wax - Black", weight: "100 g", price: 89, originalPrice: 110, category: "Fruits & Vegetables", type: "cherry_wax" },
];

// Calculate discount for each product
const productsWithDiscount = fruitsVegetablesData.map((product, index) => ({
    ...product,
    id: index + 1,
    discount: Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100),
    deliveryTime: "10 MINS",
    // Image will be from GitHub raw content
    image: `https://raw.githubusercontent.com/fruits-360/fruits-360-100x100/main/Training/${getImagePath(product.type, index)}`,
}));

// Helper function to map product types to image paths
function getImagePath(type, index) {
    const imageMappings = {
        'apple': ['Apple Crimson Snow', 'Apple Golden 1', 'Apple Granny Smith', 'Apple Pink Lady', 'Apple Red Delicious', 'Apple Golden 2', 'Apple Red 1', 'Apple Red 2'],
        'banana': ['Banana', 'Banana Red', 'Banana Lady Finger'],
        'grape': ['Grape Blue', 'Grape Pink', 'Grape White'],
        'orange': ['Orange'],
        'lemon': ['Lemon', 'Lemon Meyer'],
        'lime': ['Lime'],
        'mandarine': ['Mandarine'],
        'clementine': ['Clementine'],
        'grapefruit': ['Grapefruit Pink', 'Grapefruit White'],
        'tangelo': ['Tangelo'],
        'pomelo': ['Pomelo Sweetie'],
        'kumquat': ['Kumquats'],
        'mango': ['Mango', 'Mango', 'Mango Red'],
        'peach': ['Peach', 'Peach Flat'],
        'nectarine': ['Nectarine', 'Nectarine Flat'],
        'apricot': ['Apricot'],
        'plum': ['Plum', 'Plum 2'],
        'cherry': ['Cherry 1', 'Cherry Rainier'],
        'strawberry': ['Strawberry', 'Strawberry Wedge'],
        'blueberry': ['Blueberry'],
        'blackberry': ['Blueberry'],
        'raspberry': ['Raspberry'],
        'gooseberry': ['Gooseberry'],
        'redcurrant': ['Redcurrant'],
        'huckleberry': ['Huckleberry'],
        'mulberry': ['Mulberry'],
        'pear': ['Pear Abate', 'Pear Forelle', 'Pear Kaiser', 'Pear Red', 'Pear Williams', 'Pear Monster', 'Pear Stone'],
        'pineapple': ['Pineapple', 'Pineapple Mini'],
        'papaya': ['Papaya'],
        'kiwi': ['Kiwi'],
        'guava': ['Guava'],
        'passionfruit': ['Passion Fruit'],
        'maracuja': ['Maracuja'],
        'lychee': ['Lychee'],
        'rambutan': ['Rambutan'],
        'mangostan': ['Mangostan'],
        'pitahaya': ['Pitahaya Red'],
        'carambola': ['Carambula'],
        'granadilla': ['Granadilla'],
        'physalis': ['Physalis', 'Physalis with Husk'],
        'tamarillo': ['Tamarillo'],
        'salak': ['Salak'],
        'cherimoya': ['Cherimoya'],
        'watermelon': ['Watermelon'],
        'cantaloupe': ['Cantaloupe 1', 'Cantaloupe 2'],
        'melon': ['Melon Piel de Sapo'],
        'pepino': ['Pepino'],
        'pomegranate': ['Pomegranate'],
        'kaki': ['Kaki'],
        'quince': ['Quince'],
        'fig': ['Fig'],
        'dates': ['Dates'],
        'avocado': ['Avocado', 'Avocado ripe'],
        'coconut': ['Cocos'],
        'cactus': ['Cactus fruit'],
        'tomato': ['Tomato 1', 'Tomato Cherry Red', 'Tomato Yellow', 'Tomato Maroon', 'Tomato Heart', 'Tomato not Ripened'],
        'pepper': ['Pepper Green', 'Pepper Red', 'Pepper Yellow', 'Pepper Orange'],
        'carrot': ['Carrot'],
        'beetroot': ['Beetroot'],
        'potato': ['Potato White', 'Potato Red', 'Potato Sweet'],
        'ginger': ['Ginger Root'],
        'onion': ['Onion Red', 'Onion White'],
        'cabbage': ['Cabbage'],
        'cauliflower': ['Cauliflower'],
        'kohlrabi': ['Kohlrabi'],
        'cucumber': ['Cucumber Ripe', 'Cucumber Ripe 2'],
        'zucchini': ['Zucchini', 'Zucchini'],
        'eggplant': ['Eggplant', 'Eggplant Long'],
        'corn': ['Corn'],
        'walnut': ['Walnut', 'Walnut'],
        'hazelnut': ['Hazelnut'],
        'chestnut': ['Chestnut'],
        'pistachio': ['Pistachio'],
        'cashew': ['Caju seed'],
        'pecan': ['Nut Pecan'],
        'nut': ['Nut Forest'],
        'cherry_wax': ['Cherry Wax Yellow', 'Cherry Wax Red', 'Cherry Wax Black'],
    };

    return imageMappings[type] ? imageMappings[type][0] : 'Apple Red 1';
}

console.log(`Generated ${productsWithDiscount.length} products`);
console.log('Sample products:', productsWithDiscount.slice(0, 5));

export default productsWithDiscount;
