"""
Process Open Products Facts CSV and convert to Foodeo format
"""
import csv
import json
import random
from pathlib import Path
import sys

# Increase CSV field size limit (use reasonable max for Windows)
csv.field_size_limit(10485760)  # 10MB limit

# Exchange rate
USD_TO_INR = 83
EUR_TO_INR = 90

# Extended Category mapping
CATEGORY_MAP = {
    # Cold Drinks & Juices
    'beverages': 'Cold Drinks & Juices',
    'drinks': 'Cold Drinks & Juices',
    'juices': 'Cold Drinks & Juices',
    'soft-drinks': 'Cold Drinks & Juices',
    'water': 'Cold Drinks & Juices',
    'soda': 'Cold Drinks & Juices',
    'cola': 'Cold Drinks & Juices',
    'nectar': 'Cold Drinks & Juices',
    'syrup': 'Cold Drinks & Juices',
    'lemonade': 'Cold Drinks & Juices',
    
    # Tea, Coffee & Health Drinks
    'coffee': 'Tea, Coffee & Health Drinks',
    'tea': 'Tea, Coffee & Health Drinks',
    'herbal': 'Tea, Coffee & Health Drinks',
    'infusion': 'Tea, Coffee & Health Drinks',
    'cocoa': 'Tea, Coffee & Health Drinks',
    'energy': 'Tea, Coffee & Health Drinks',
    
    # Dairy & Breakfast
    'dairy': 'Dairy & Breakfast',
    'milk': 'Dairy & Breakfast',
    'cheese': 'Dairy & Breakfast',
    'yogurt': 'Dairy & Breakfast',
    'eggs': 'Dairy & Breakfast',
    'butter': 'Dairy & Breakfast',
    'cream': 'Dairy & Breakfast',
    'cereals': 'Dairy & Breakfast',
    'breakfast': 'Dairy & Breakfast',
    'muesli': 'Dairy & Breakfast',
    'flakes': 'Dairy & Breakfast',
    'oats': 'Dairy & Breakfast',
    'granola': 'Dairy & Breakfast',
    
    # Fruits & Vegetables
    'fruits': 'Fruits & Vegetables',
    'vegetables': 'Fruits & Vegetables',
    'apple': 'Fruits & Vegetables',
    'banana': 'Fruits & Vegetables',
    'orange': 'Fruits & Vegetables',
    'potato': 'Fruits & Vegetables',
    'tomato': 'Fruits & Vegetables',
    'onion': 'Fruits & Vegetables',
    'salad': 'Fruits & Vegetables',
    'plant': 'Fruits & Vegetables',
    'fresh': 'Fruits & Vegetables',
    
    # Chicken, Meat & Fish
    'meat': 'Chicken, Meat & Fish',
    'fish': 'Chicken, Meat & Fish',
    'seafood': 'Chicken, Meat & Fish',
    'chicken': 'Chicken, Meat & Fish',
    'beef': 'Chicken, Meat & Fish',
    'pork': 'Chicken, Meat & Fish',
    'ham': 'Chicken, Meat & Fish',
    'sausage': 'Chicken, Meat & Fish',
    'tuna': 'Chicken, Meat & Fish',
    'salmon': 'Chicken, Meat & Fish',
    
    # Munchies
    'snacks': 'Munchies',
    'chips': 'Munchies',
    'crisps': 'Munchies',
    'popcorn': 'Munchies',
    'nuts': 'Munchies',
    'crackers': 'Munchies',
    'appetizer': 'Munchies',
    'salty': 'Munchies',
    
    # Bakery & Biscuits
    'cookies': 'Bakery & Biscuits',
    'biscuits': 'Bakery & Biscuits',
    'bread': 'Bakery & Biscuits',
    'bakery': 'Bakery & Biscuits',
    'cake': 'Bakery & Biscuits',
    'pastry': 'Bakery & Biscuits',
    'bun': 'Bakery & Biscuits',
    'toast': 'Bakery & Biscuits',
    'rusk': 'Bakery & Biscuits',
    
    # Atta, Rice & Dal
    'rice': 'Atta, Rice & Dal',
    'flour': 'Atta, Rice & Dal',
    'wheat': 'Atta, Rice & Dal',
    'grains': 'Atta, Rice & Dal',
    'pulses': 'Atta, Rice & Dal',
    'lentils': 'Atta, Rice & Dal',
    'beans': 'Atta, Rice & Dal',
    'pasta': 'Atta, Rice & Dal',
    'noodles': 'Atta, Rice & Dal',
    'semolina': 'Atta, Rice & Dal',
    
    # Instant & Frozen Food
    'frozen': 'Instant & Frozen Food',
    'instant': 'Instant & Frozen Food',
    'ready': 'Instant & Frozen Food',
    'pizza': 'Instant & Frozen Food',
    'soup': 'Instant & Frozen Food',
    'meal': 'Instant & Frozen Food',
    
    # Sweet Tooth
    'ice-cream': 'Sweet Tooth',
    'desserts': 'Sweet Tooth',
    'chocolate': 'Sweet Tooth',
    'candy': 'Sweet Tooth',
    'sweet': 'Sweet Tooth',
    'sugar': 'Sweet Tooth',
    'honey': 'Sweet Tooth',
    'jam': 'Sweet Tooth',
    'confectionery': 'Sweet Tooth',
    
    # Masala, Oil & More
    'oil': 'Masala, Oil & More',
    'spices': 'Masala, Oil & More',
    'salt': 'Masala, Oil & More',
    'pepper': 'Masala, Oil & More',
    'vinegar': 'Masala, Oil & More',
    'herbs': 'Masala, Oil & More',
    'seasoning': 'Masala, Oil & More',
    'curry': 'Masala, Oil & More',
    
    # Sauces & Spreads
    'condiments': 'Sauces & Spreads',
    'sauces': 'Sauces & Spreads',
    'ketchup': 'Sauces & Spreads',
    'mayonnaise': 'Sauces & Spreads',
    'mustard': 'Sauces & Spreads',
    'dip': 'Sauces & Spreads',
    'spread': 'Sauces & Spreads',
    'paste': 'Sauces & Spreads',
    
    # Baby Care
    'baby': 'Baby Care',
    'infant': 'Baby Care',
    'diaper': 'Baby Care',
    'formula': 'Baby Care',
    
    # Pet Care
    'pet': 'Pet Care',
    'dog': 'Pet Care',
    'cat': 'Pet Care',
    'animal': 'Pet Care',
    
    # Cleaning Essentials
    'cleaning': 'Cleaning Essentials',
    'detergent': 'Cleaning Essentials',
    'soap': 'Cleaning Essentials',
    'wash': 'Cleaning Essentials',
    'cleaner': 'Cleaning Essentials',
    'laundry': 'Cleaning Essentials',
    
    # Personal Care
    'personal': 'Personal Care',
    'shampoo': 'Personal Care',
    'skin': 'Personal Care',
    'hair': 'Personal Care',
    'body': 'Personal Care',
    'face': 'Personal Care',
    'dental': 'Personal Care',
    'hygiene': 'Personal Care',
    
    # Pharma & Wellness
    'health': 'Pharma & Wellness',
    'vitamin': 'Pharma & Wellness',
    'supplement': 'Pharma & Wellness',
    'medicine': 'Pharma & Wellness',
}

def map_category(categories_str):
    """Map Open Food Facts categories to Foodeo categories"""
    if not categories_str:
        return None  # Return None if no category
    
    categories_lower = categories_str.lower()
    
    for key, value in CATEGORY_MAP.items():
        if key in categories_lower:
            return value
    
    return None  # Return None if no match found

def extract_weight(quantity_str):
    """Extract weight from quantity string"""
    if not quantity_str:
        return '1 pc'
    
    quantity_str = str(quantity_str).strip()
    
    # Common patterns
    if 'ml' in quantity_str.lower():
        return quantity_str
    elif 'l' in quantity_str.lower():
        return quantity_str
    elif 'g' in quantity_str.lower():
        return quantity_str
    elif 'kg' in quantity_str.lower():
        return quantity_str
    else:
        return quantity_str if quantity_str else '1 pc'

def generate_price():
    """Generate random realistic price in INR"""
    return random.randint(50, 1500)

def process_csv(input_file, output_file, max_products=200):
    """Process CSV and convert to Foodeo format"""
    
    products = []
    product_id = 20000  # Start from 20000 to avoid conflicts
    
    # Placeholder images by category
    placeholder_images = {
        'Fruits & Vegetables': 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=300&h=300&fit=crop',
        'Dairy & Breakfast': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop',
        'Munchies': 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300&h=300&fit=crop',
        'Cold Drinks & Juices': 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=300&h=300&fit=crop',
        'Instant & Frozen Food': 'https://images.unsplash.com/photo-1569058242567-93de6f36f8e6?w=300&h=300&fit=crop',
        'Tea, Coffee & Health Drinks': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop',
        'Bakery & Biscuits': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
        'Sweet Tooth': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&h=300&fit=crop',
        'Atta, Rice & Dal': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop',
        'Masala, Oil & More': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
        'Sauces & Spreads': 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=300&h=300&fit=crop',
        'Chicken, Meat & Fish': 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=300&h=300&fit=crop',
        'Baby Care': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=300&fit=crop',
        'Pet Care': 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop',
        'Cleaning Essentials': 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop',
        'Personal Care': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop',
        'Pharma & Wellness': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop',
    }
    
    print(f"Processing {input_file}...")
    
    with open(input_file, 'r', encoding='utf-8', errors='ignore') as f:
        reader = csv.DictReader(f, delimiter='\t')
        
        count = 0
        processed = 0
        
        for row in reader:
            processed += 1
            
            if count >= max_products:
                break
            
            # Extract fields
            product_name = row.get('product_name', '').strip()
            brands = row.get('brands', '').strip()
            categories = row.get('categories', '').strip()
            quantity = row.get('quantity', '').strip()
            image_url = row.get('image_url', '').strip()
            
            # Skip if no product name or name too short
            if not product_name or len(product_name) < 3:
                continue
            
            # Skip if name is just numbers or codes
            if product_name.replace('-', '').replace('_', '').isdigit():
                continue
            
            # Map category
            category = map_category(categories)
            
            # Skip if category not found (this filters out non-food items)
            if not category:
                continue
            
            # Use placeholder if no image
            if not image_url or 'http' not in image_url:
                image_url = placeholder_images.get(category, placeholder_images['Munchies'])
            
            # Generate price
            price = generate_price()
            discount = random.randint(0, 30)
            original_price = int(price / (1 - discount/100)) if discount > 0 else price
            
            # Extract weight
            weight = extract_weight(quantity)
            
            # Create product
            product = {
                'id': product_id,
                'name': product_name[:50],  # Limit name length
                'weight': weight[:20],
                'price': price,
                'originalPrice': original_price,
                'image': image_url,
                'category': category,
                'discount': discount,
                'brand': brands[:30] if brands else '',
                'description': f"{product_name} - {brands}" if brands else product_name,
            }
            
            products.append(product)
            product_id += 1
            count += 1
            
            if count % 10 == 0:
                print(f"Processed {processed} rows, found {count} valid products...")
    
    print(f"\nTotal rows processed: {processed}")
    print(f"Total valid products: {len(products)}")
    
    # Write to JSON
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    
    print(f"Saved to {output_file}")
    
    # Generate stats
    categories_count = {}
    for p in products:
        cat = p['category']
        categories_count[cat] = categories_count.get(cat, 0) + 1
    
    print("\n=== Category Distribution ===")
    for cat, count in sorted(categories_count.items(), key=lambda x: x[1], reverse=True):
        print(f"{cat}: {count} products")
    
    return products

def generate_js_file(products, output_file):
    """Generate JavaScript file for frontend"""
    
    js_content = f"""// Open Products Facts Dataset
// Auto-generated from en.openproductsfacts.org.products.csv
// Total products: {len(products)}
// Generated: {Path(__file__).stat().st_mtime}

export const openFoodFactsProducts = {json.dumps(products, indent=2)};

// Export count for reference
export const openFoodFactsProductCount = openFoodFactsProducts.length;

// Export by category
export const openFoodFactsByCategory = openFoodFactsProducts.reduce((acc, product) => {{
  if (!acc[product.category]) {{
    acc[product.category] = [];
  }}
  acc[product.category].push(product);
  return acc;
}}, {{}});
"""
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"\nGenerated JavaScript file: {output_file}")

if __name__ == '__main__':
    # Paths
    csv_file = Path(__file__).parent.parent / 'en.openproductsfacts.org.products.csv'
    json_file = Path(__file__).parent.parent / 'frontend' / 'src' / 'data' / 'openFoodFactsProducts.json'
    js_file = Path(__file__).parent.parent / 'frontend' / 'src' / 'data' / 'openFoodFactsProducts.js'
    
    # Process CSV (limit to 5000 products to find enough valid ones)
    products = process_csv(csv_file, json_file, max_products=5000)
    
    # Generate JS file
    generate_js_file(products, js_file)
    
    print("\n✅ Processing complete!")
    print(f"✅ {len(products)} products ready to use")
    print(f"✅ Import in mockData.js: import {{ openFoodFactsProducts }} from './openFoodFactsProducts';")
