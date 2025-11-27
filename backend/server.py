from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import razorpay
from supabase import create_client, Client


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Razorpay client
razorpay_client = razorpay.Client(
    auth=(os.environ.get('RAZORPAY_KEY_ID'), os.environ.get('RAZORPAY_KEY_SECRET'))
)

# Supabase client
supabase_url = os.environ.get('SUPABASE_URL')
supabase_key = os.environ.get('SUPABASE_KEY')
supabase: Client = create_client(supabase_url, supabase_key)

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# Order Models
class OrderItem(BaseModel):
    product_id: int
    name: str
    price: float
    quantity: int
    image: str
    weight: str

class CustomerInfo(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    address: str
    city: str
    pincode: str

class CreateOrderRequest(BaseModel):
    items: List[OrderItem]
    total_amount: float
    customer: CustomerInfo
    payment_method: str  # 'razorpay' or 'cod'

class RazorpayOrderCreate(BaseModel):
    amount: int  # Amount in paise
    currency: str = "INR"

class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    order_id: str


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Razorpay Routes
@api_router.post("/razorpay/create-order")
async def create_razorpay_order(order_data: RazorpayOrderCreate):
    """Create a Razorpay order for payment"""
    try:
        razorpay_order = razorpay_client.order.create({
            "amount": order_data.amount,
            "currency": order_data.currency,
            "payment_capture": 1
        })
        return {
            "id": razorpay_order["id"],
            "amount": razorpay_order["amount"],
            "currency": razorpay_order["currency"],
            "key_id": os.environ.get('RAZORPAY_KEY_ID')
        }
    except Exception as e:
        logger.error(f"Error creating Razorpay order: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create payment order: {str(e)}")


@api_router.post("/razorpay/verify-payment")
async def verify_razorpay_payment(payment_data: VerifyPaymentRequest):
    """Verify Razorpay payment signature"""
    try:
        # Verify signature
        params_dict = {
            'razorpay_order_id': payment_data.razorpay_order_id,
            'razorpay_payment_id': payment_data.razorpay_payment_id,
            'razorpay_signature': payment_data.razorpay_signature
        }
        razorpay_client.utility.verify_payment_signature(params_dict)
        
        # Update order status in MongoDB
        try:
            await db.orders.update_one(
                {"id": payment_data.order_id},
                {"$set": {
                    "payment_status": "paid",
                    "razorpay_payment_id": payment_data.razorpay_payment_id,
                    "razorpay_order_id": payment_data.razorpay_order_id,
                    "order_status": "confirmed",
                    "updated_at": datetime.now(timezone.utc).isoformat()
                }}
            )
        except Exception as e:
            logger.error(f"Error updating order in MongoDB: {str(e)}")
        
        return {"status": "success", "message": "Payment verified successfully"}
    except razorpay.errors.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Payment verification failed")
    except Exception as e:
        logger.error(f"Error verifying payment: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Payment verification error: {str(e)}")


# Order Routes (MongoDB)
@api_router.post("/orders")
async def create_order(order_data: CreateOrderRequest):
    """Create a new order and store in MongoDB"""
    try:
        order_id = str(uuid.uuid4())
        
        # Prepare order data for MongoDB
        order_doc = {
            "id": order_id,
            "items": [item.model_dump() for item in order_data.items],
            "total_amount": order_data.total_amount,
            "customer_name": order_data.customer.name,
            "customer_phone": order_data.customer.phone,
            "customer_email": order_data.customer.email,
            "customer_address": order_data.customer.address,
            "customer_city": order_data.customer.city,
            "customer_pincode": order_data.customer.pincode,
            "payment_method": order_data.payment_method,
            "payment_status": "pending" if order_data.payment_method == "razorpay" else "cod",
            "order_status": "confirmed" if order_data.payment_method == "cod" else "pending",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        
        # Insert into MongoDB
        await db.orders.insert_one(order_doc)
        
        # Remove MongoDB's _id from response
        order_doc.pop('_id', None)
        
        return {
            "success": True,
            "order_id": order_id,
            "message": "Order created successfully",
            "order": order_doc
        }
    except Exception as e:
        logger.error(f"Error creating order: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create order: {str(e)}")


@api_router.get("/orders/{order_id}")
async def get_order(order_id: str):
    """Get order by ID from MongoDB"""
    try:
        result = await db.orders.find_one({"id": order_id}, {"_id": 0})
        
        if not result:
            raise HTTPException(status_code=404, detail="Order not found")
        
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching order: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch order: {str(e)}")


@api_router.get("/orders")
async def get_all_orders():
    """Get all orders from MongoDB"""
    try:
        orders = await db.orders.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
        return orders
    except Exception as e:
        logger.error(f"Error fetching orders: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch orders: {str(e)}")


@api_router.patch("/orders/{order_id}/status")
async def update_order_status(order_id: str, status: str):
    """Update order status in MongoDB"""
    try:
        result = await db.orders.update_one(
            {"id": order_id},
            {"$set": {
                "order_status": status,
                "updated_at": datetime.now(timezone.utc).isoformat()
            }}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Order not found")
        
        return {"success": True, "message": "Order status updated"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating order status: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to update order status: {str(e)}")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()