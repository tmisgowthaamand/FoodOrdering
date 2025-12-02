"""
Load Kaggle Groceries Dataset and integrate with FoodOrdering application
Dataset: heeraldedhia/groceries-dataset
"""

import kagglehub
from kagglehub import KaggleDatasetAdapter
import pandas as pd
import json
import os
from pathlib import Path

def load_groceries_dataset():
    """Load the groceries dataset from Kaggle"""
    print("Loading Kaggle groceries dataset...")
    
    try:
        # Download the dataset first
        path = kagglehub.dataset_download("heeraldedhia/groceries-dataset")
        print(f"✓ Dataset downloaded to: {path}")
        
        # Find the CSV file
        csv_files = list(Path(path).glob("*.csv"))
        if not csv_files:
            print("✗ No CSV files found in dataset")
            return None
        
        csv_file = csv_files[0]
        print(f"  Loading file: {csv_file.name}")
        
        # Try different encodings
        encodings = ['utf-8', 'latin-1', 'iso-8859-1', 'cp1252']
        df = None
        
        for encoding in encodings:
            try:
                df = pd.read_csv(csv_file, encoding=encoding)
                print(f"  ✓ Successfully loaded with {encoding} encoding")
                break
            except UnicodeDecodeError:
                continue
        
        if df is None:
            print("✗ Could not load file with any encoding")
            return None
        
        print(f"✓ Dataset loaded successfully!")
        print(f"  Total records: {len(df)}")
        print(f"  Columns: {list(df.columns)}")
        print("\nFirst 5 records:")
        print(df.head())
        
        return df
    
    except Exception as e:
        print(f"✗ Error loading dataset: {e}")
        import traceback
        traceback.print_exc()
        return None

def analyze_dataset(df):
    """Analyze the dataset structure"""
    print("\n" + "="*60)
    print("DATASET ANALYSIS")
    print("="*60)
    
    print(f"\nShape: {df.shape}")
    print(f"\nColumn Info:")
    print(df.info())
    
    print(f"\nSample Data:")
    print(df.head(10))
    
    print(f"\nUnique Values:")
    for col in df.columns:
        print(f"  {col}: {df[col].nunique()} unique values")
    
    # Check for item names if available
    if 'itemDescription' in df.columns:
        print(f"\nTop 20 Items:")
        print(df['itemDescription'].value_counts().head(20))
    
    return df

def map_to_categories(item_name):
    """Map grocery items to Foodeo categories"""
    item_lower = item_name.lower()
    
    # Category mapping based on keywords
    category_map = {
        'Fruits & Vegetables': ['vegetable', 'fruit', 'potato', 'onion', 'tomato', 'carrot', 
                                'apple', 'banana', 'orange', 'grape', 'mango', 'spinach', 
                                'cabbage', 'lettuce', 'cucumber', 'pepper', 'broccoli'],
        'Dairy & Breakfast': ['milk', 'yogurt', 'cheese', 'butter', 'cream', 'egg', 'bread',
                              'cereal', 'oats', 'cornflakes', 'paneer', 'curd'],
        'Munchies': ['chips', 'snack', 'popcorn', 'crackers', 'namkeen', 'bhujia'],
        'Cold Drinks & Juices': ['juice', 'soda', 'cola', 'drink', 'water', 'beverage'],
        'Instant & Frozen Food': ['frozen', 'instant', 'noodle', 'pasta', 'pizza', 'ready'],
        'Tea, Coffee & Health Drinks': ['tea', 'coffee', 'green tea', 'herbal'],
        'Bakery & Biscuits': ['biscuit', 'cookie', 'cake', 'pastry', 'bread', 'bun'],
        'Sweet Tooth': ['chocolate', 'candy', 'sweet', 'ice cream', 'dessert', 'sugar'],
        'Atta, Rice & Dal': ['rice', 'wheat', 'atta', 'dal', 'lentil', 'flour', 'grain'],
        'Masala, Oil & More': ['oil', 'spice', 'masala', 'salt', 'pepper', 'turmeric'],
        'Sauces & Spreads': ['sauce', 'ketchup', 'mayonnaise', 'jam', 'spread', 'pickle'],
        'Chicken, Meat & Fish': ['chicken', 'meat', 'fish', 'mutton', 'beef', 'pork'],
        'Organic & Healthy Living': ['organic', 'health', 'natural', 'quinoa', 'chia'],
        'Cleaning Essentials': ['detergent', 'soap', 'cleaner', 'wash', 'liquid'],
        'Personal Care': ['shampoo', 'toothpaste', 'soap', 'lotion', 'cream'],
    }
    
    for category, keywords in category_map.items():
        if any(keyword in item_lower for keyword in keywords):
            return category
    
    return 'Munchies'  # Default category

def generate_mock_products(df, num_products=100):
    """Generate mock products from the dataset"""
    print("\n" + "="*60)
    print("GENERATING MOCK PRODUCTS")
    print("="*60)
    
    products = []
    
    # Get unique items
    if 'itemDescription' in df.columns:
        unique_items = df['itemDescription'].unique()[:num_products]
    else:
        print("Column 'itemDescription' not found. Using available columns...")
        # Try to find the item column
        for col in df.columns:
            if 'item' in col.lower() or 'product' in col.lower() or 'description' in col.lower():
                unique_items = df[col].unique()[:num_products]
                break
        else:
            print("Could not find item column. Using first column...")
            unique_items = df.iloc[:, 0].unique()[:num_products]
    
    print(f"\nGenerating {len(unique_items)} products...")
    
    # Image URLs for different categories
    category_images = {
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
        'Organic & Healthy Living': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=300&fit=crop',
        'Cleaning Essentials': 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop',
        'Personal Care': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop',
    }
    
    weights = ['250 g', '500 g', '1 kg', '100 ml', '200 ml', '500 ml', '1 L', '1 pc', '2 pcs', '5 pcs']
    
    for idx, item in enumerate(unique_items, start=1000):
        category = map_to_categories(str(item))
        
        # Generate realistic prices in INR
        base_price = hash(str(item)) % 500 + 20  # Random price between 20-520
        discount = hash(str(item)) % 30  # Random discount 0-30%
        original_price = int(base_price * (100 / (100 - discount)))
        
        product = {
            'id': idx,
            'name': str(item).title(),
            'weight': weights[hash(str(item)) % len(weights)],
            'price': base_price,
            'originalPrice': original_price,
            'image': category_images.get(category, category_images['Munchies']),
            'category': category,
            'discount': discount
        }
        
        products.append(product)
    
    print(f"✓ Generated {len(products)} products")
    
    # Show category distribution
    category_counts = {}
    for p in products:
        category_counts[p['category']] = category_counts.get(p['category'], 0) + 1
    
    print("\nCategory Distribution:")
    for cat, count in sorted(category_counts.items(), key=lambda x: x[1], reverse=True):
        print(f"  {cat}: {count} products")
    
    return products

def save_products_json(products, output_file='kaggle_products.json'):
    """Save products to JSON file"""
    output_path = Path(__file__).parent / output_file
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Products saved to: {output_path}")
    return output_path

def save_products_js(products, output_file='kaggle_products.js'):
    """Save products as JavaScript module"""
    output_path = Path(__file__).parent / output_file
    
    js_content = f"""// Auto-generated products from Kaggle Groceries Dataset
// Generated on: {pd.Timestamp.now()}
// Total products: {len(products)}

export const kaggleProducts = {json.dumps(products, indent=2, ensure_ascii=False)};

export default kaggleProducts;
"""
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"✓ JavaScript module saved to: {output_path}")
    return output_path

def main():
    """Main execution function"""
    print("="*60)
    print("KAGGLE GROCERIES DATASET LOADER")
    print("="*60)
    
    # Load dataset
    df = load_groceries_dataset()
    
    if df is None:
        print("\n✗ Failed to load dataset. Exiting...")
        return
    
    # Analyze dataset
    df = analyze_dataset(df)
    
    # Generate mock products
    products = generate_mock_products(df, num_products=100)
    
    # Save products
    json_path = save_products_json(products)
    js_path = save_products_js(products)
    
    print("\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    print(f"✓ Dataset loaded: {len(df)} records")
    print(f"✓ Products generated: {len(products)}")
    print(f"✓ JSON file: {json_path}")
    print(f"✓ JavaScript file: {js_path}")
    print("\nNext steps:")
    print("1. Review the generated products in the JSON/JS files")
    print("2. Import kaggleProducts in your mockData.js:")
    print("   import { kaggleProducts } from './kaggle_products.js';")
    print("   export const products = [...staticProducts, ...generateProducts(1000), ...kaggleProducts];")
    print("="*60)

if __name__ == "__main__":
    main()
