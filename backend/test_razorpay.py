import razorpay
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Get credentials
key_id = os.environ.get('RAZORPAY_KEY_ID')
key_secret = os.environ.get('RAZORPAY_KEY_SECRET')

print(f"Testing Razorpay Connection...")
print(f"Key ID: {key_id[:10]}... (hidden)")
print(f"Key Secret: {'*' * len(key_secret) if key_secret else 'MISSING'}")
print("-" * 50)

try:
    # Initialize client
    client = razorpay.Client(auth=(key_id, key_secret))
    
    # Try to create a test order
    print("Creating test order...")
    order = client.order.create({
        "amount": 100,  # 1 rupee in paise
        "currency": "INR",
        "payment_capture": 1
    })
    
    print("✅ SUCCESS! Razorpay connection is working!")
    print(f"Test Order ID: {order['id']}")
    print(f"Amount: {order['amount']} paise")
    print(f"Currency: {order['currency']}")
    
except razorpay.errors.BadRequestError as e:
    print("❌ AUTHENTICATION FAILED!")
    print(f"Error: {str(e)}")
    print("\nPossible reasons:")
    print("1. Invalid API Key ID or Secret")
    print("2. Test mode not enabled in Razorpay dashboard")
    print("3. API keys have been regenerated/changed")
    print("\nPlease:")
    print("1. Login to https://dashboard.razorpay.com/")
    print("2. Go to Settings → API Keys")
    print("3. Generate new Test Mode keys")
    print("4. Update the .env file with new credentials")
    
except Exception as e:
    print(f"❌ ERROR: {type(e).__name__}: {str(e)}")
