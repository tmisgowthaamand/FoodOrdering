import razorpay
import os
from dotenv import load_dotenv

load_dotenv()

key_id = os.environ.get('RAZORPAY_KEY_ID')
key_secret = os.environ.get('RAZORPAY_KEY_SECRET')

print(f"Testing Razorpay connection with:")
print(f"Key ID: {key_id}")
print(f"Key Secret: {key_secret[:4]}...{key_secret[-4:]} if key_secret else None")

if not key_id or not key_secret:
    print("Error: Credentials missing in .env")
    exit(1)

client = razorpay.Client(auth=(key_id, key_secret))

try:
    order = client.order.create({
        "amount": 100,  # 1.00 INR
        "currency": "INR",
        "payment_capture": 1
    })
    print("Success! Order created:")
    print(order)
except Exception as e:
    print("Failed to create order:")
    print(e)
