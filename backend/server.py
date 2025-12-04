from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
# from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import razorpay
from supabase import create_client, Client
import json


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection removed
# mongo_url = os.environ['MONGO_URL']
# client = AsyncIOMotorClient(mongo_url)
# db = client[os.environ['DB_NAME']]

# Razorpay client with retry logic
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

session = requests.Session()
retries = Retry(total=3, backoff_factor=0.5, status_forcelist=[500, 502, 503, 504])
session.mount('https://', HTTPAdapter(max_retries=retries))

razorpay_key_id = os.environ.get('RAZORPAY_KEY_ID')
razorpay_key_secret = os.environ.get('RAZORPAY_KEY_SECRET')

if not razorpay_key_id or not razorpay_key_secret:
    logger.warning("RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing. Payment features will fail.")

razorpay_client = razorpay.Client(
    auth=(razorpay_key_id or "", razorpay_key_secret or "")
)
# razorpay_client.set_session(session) # Method does not exist, removing to fix crash

# Supabase client
supabase_url = os.environ.get('SUPABASE_URL')
supabase_key = os.environ.get('SUPABASE_KEY')

if not supabase_url or not supabase_key:
    logger.error("SUPABASE_URL or SUPABASE_KEY is missing. Database connection will fail.")
    # We might want to raise here, but logging allows the app to start and show the error in logs
    # raise ValueError("Missing Supabase credentials")

try:
    supabase: Client = create_client(supabase_url or "", supabase_key or "")
except Exception as e:
    logger.error(f"Failed to initialize Supabase client: {e}")
    # Create a dummy client or let it fail later
    raise e

# Create the main app without a prefix
app = FastAPI(title="Foodeo API", description="Backend for Foodeo Food Ordering Application")

@app.get("/")
async def root():
    return {
        "message": "Welcome to Foodeo Backend API",
        "status": "active",
        "documentation": "/docs"
    }

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
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

class UserAddress(BaseModel):
    id: Optional[str] = None
    user_id: str
    label: str
    address: str
    city: str
    pincode: str
    phone: str
    is_default: bool = False

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

class CancelOrderRequest(BaseModel):
    order_id: str
    cancellation_reason: str
    cancelled_by: str = "customer"  # 'customer', 'restaurant', 'admin'

class UpdateOrderStatusRequest(BaseModel):
    status: str
    delivery_partner_name: Optional[str] = None
    delivery_partner_phone: Optional[str] = None
    estimated_delivery_time: Optional[str] = None

class DeliveryLocationUpdate(BaseModel):
    latitude: float
    longitude: float
    delivery_partner_name: Optional[str] = None


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Foodeo API v1"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    # Simple echo for status check without database persistence for now
    # or you could save to a 'status_checks' table in Supabase if needed
    status_obj = StatusCheck(
        client_name=input.client_name,
        timestamp=datetime.now(timezone.utc)
    )
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Return a dummy list or fetch from Supabase if implemented
    return [
        StatusCheck(client_name="System", timestamp=datetime.now(timezone.utc))
    ]


# Razorpay Routes
@api_router.post("/razorpay/create-order")
async def create_razorpay_order(order_data: RazorpayOrderCreate):
    """Create a Razorpay order for payment"""
    try:
        # Log credentials status (without exposing actual values)
        key_id = os.environ.get('RAZORPAY_KEY_ID')
        key_secret = os.environ.get('RAZORPAY_KEY_SECRET')
        
        # Enhanced logging
        logger.info(f"Razorpay order creation request - Amount: {order_data.amount} paise")
        logger.info(f"Razorpay Key ID present: {bool(key_id)}, Key Secret present: {bool(key_secret)}")
        
        if key_id:
            logger.info(f"Key ID starts with: {key_id[:10]}...")
        
        if not key_id or not key_secret:
            logger.error("❌ CRITICAL: Razorpay credentials are missing from environment variables!")
            logger.error("Please configure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Render dashboard")
            raise HTTPException(
                status_code=500, 
                detail="Payment gateway not configured. Please contact support."
            )
        
        logger.info("Creating Razorpay order...")
        razorpay_order = razorpay_client.order.create({
            "amount": order_data.amount,
            "currency": order_data.currency,
            "payment_capture": 1
        })
        
        logger.info(f"✅ Razorpay order created successfully: {razorpay_order['id']}")
        
        return {
            "id": razorpay_order["id"],
            "amount": razorpay_order["amount"],
            "currency": razorpay_order["currency"],
            "key_id": key_id
        }
    except razorpay.errors.BadRequestError as e:
        error_msg = str(e)
        logger.error(f"❌ Razorpay BadRequest Error: {error_msg}")
        
        # Provide specific error messages
        if "Authentication failed" in error_msg or "authentication" in error_msg.lower():
            logger.error("Authentication failed - This usually means:")
            logger.error("1. Invalid API Key ID or Secret")
            logger.error("2. Keys not configured in deployment environment")
            logger.error("3. Test mode not enabled in Razorpay dashboard")
            logger.error(f"Current Key ID: {key_id[:15] if key_id else 'MISSING'}...")
            raise HTTPException(
                status_code=400, 
                detail="Payment gateway authentication failed. Please ensure Razorpay credentials are correctly configured on the server."
            )
        else:
            raise HTTPException(status_code=400, detail=f"Invalid payment request: {error_msg}")
            
    except razorpay.errors.ServerError as e:
        logger.error(f"❌ Razorpay Server Error: {str(e)}")
        raise HTTPException(status_code=503, detail="Payment gateway temporarily unavailable")
    except Exception as e:
        logger.error(f"❌ Unexpected error creating Razorpay order: {type(e).__name__}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create payment order: {str(e)}")


@api_router.post("/razorpay/verify-payment")
async def verify_razorpay_payment(payment_data: VerifyPaymentRequest):
    """Verify Razorpay payment signature and update order in Supabase"""
    try:
        # Verify signature
        params_dict = {
            'razorpay_order_id': payment_data.razorpay_order_id,
            'razorpay_payment_id': payment_data.razorpay_payment_id,
            'razorpay_signature': payment_data.razorpay_signature
        }
        razorpay_client.utility.verify_payment_signature(params_dict)
        
        # Update order status in Supabase
        try:
            supabase.table('orders').update({
                "payment_status": "paid",
                "razorpay_payment_id": payment_data.razorpay_payment_id,
                "razorpay_order_id": payment_data.razorpay_order_id,
                "order_status": "confirmed",
                "updated_at": datetime.now(timezone.utc).isoformat()
            }).eq('id', payment_data.order_id).execute()
            logger.info(f"Order {payment_data.order_id} updated in Supabase after payment verification")
        except Exception as e:
            logger.error(f"Error updating order in Supabase: {str(e)}")
        
        return {"status": "success", "message": "Payment verified successfully"}
    except razorpay.errors.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Payment verification failed")
    except Exception as e:
        logger.error(f"Error verifying payment: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Payment verification error: {str(e)}")


# Order Routes (Supabase)
@api_router.post("/orders")
async def create_order(order_data: CreateOrderRequest):
    """Create a new order and store in Supabase"""
    try:
        order_id = str(uuid.uuid4())
        
        # Prepare order data for Supabase
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
        
        # Insert into Supabase
        result = supabase.table('orders').insert(order_doc).execute()
        logger.info(f"Order {order_id} created in Supabase successfully")
        
        return {
            "success": True,
            "order_id": order_id,
            "message": "Order created successfully",
            "order": order_doc
        }
    except Exception as e:
        logger.error(f"Error creating order in Supabase: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create order: {str(e)}")


@api_router.get("/orders/{order_id}")
async def get_order(order_id: str):
    """Get order by ID from Supabase"""
    try:
        result = supabase.table('orders').select('*').eq('id', order_id).execute()
        
        if not result.data or len(result.data) == 0:
            raise HTTPException(status_code=404, detail="Order not found")
        
        return result.data[0]
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching order from Supabase: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch order: {str(e)}")


@api_router.get("/orders")
async def get_all_orders():
    """Get all orders from Supabase"""
    try:
        result = supabase.table('orders').select('*').order('created_at', desc=True).execute()
        return result.data
    except Exception as e:
        logger.error(f"Error fetching orders from Supabase: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch orders: {str(e)}")


@api_router.patch("/orders/{order_id}/status")
async def update_order_status(order_id: str, status_data: UpdateOrderStatusRequest):
    """Update order status with delivery tracking information"""
    try:
        # Get current order
        result = supabase.table('orders').select('*').eq('id', order_id).execute()
        if not result.data or len(result.data) == 0:
            raise HTTPException(status_code=404, detail="Order not found")
        
        current_order = result.data[0]
        
        # Prepare update data
        update_data = {
            "order_status": status_data.status,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        
        # Add timestamp for specific status changes
        status_timestamp_map = {
            "confirmed": "confirmed_at",
            "preparing": "preparing_at",
            "ready_for_pickup": "ready_at",
            "out_for_delivery": "out_for_delivery_at",
            "delivered": "delivered_at"
        }
        
        if status_data.status in status_timestamp_map:
            update_data[status_timestamp_map[status_data.status]] = datetime.now(timezone.utc).isoformat()
        
        # Add delivery partner info if provided
        if status_data.delivery_partner_name:
            update_data["delivery_partner_name"] = status_data.delivery_partner_name
        if status_data.delivery_partner_phone:
            update_data["delivery_partner_phone"] = status_data.delivery_partner_phone
        if status_data.estimated_delivery_time:
            update_data["estimated_delivery_time"] = status_data.estimated_delivery_time
        
        # Update in Supabase
        result = supabase.table('orders').update(update_data).eq('id', order_id).execute()
        
        logger.info(f"Order {order_id} status updated to {status_data.status}")
        
        return {
            "success": True, 
            "message": f"Order status updated to {status_data.status}",
            "order": result.data[0] if result.data else None
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating order status in Supabase: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to update order status: {str(e)}")


@api_router.post("/orders/{order_id}/cancel")
async def cancel_order(order_id: str, cancel_data: CancelOrderRequest):
    """Cancel order and initiate refund if payment was made"""
    try:
        # Get current order
        result = supabase.table('orders').select('*').eq('id', order_id).execute()
        if not result.data or len(result.data) == 0:
            raise HTTPException(status_code=404, detail="Order not found")
        
        order = result.data[0]
        
        # Check if order can be cancelled
        current_status = order.get('order_status', '')
        payment_method = order.get('payment_method', '')
        payment_status = order.get('payment_status', '')
        created_at = datetime.fromisoformat(order.get('created_at', '').replace('Z', '+00:00'))
        time_elapsed = (datetime.now(timezone.utc) - created_at).total_seconds() / 60  # minutes
        
        # Define cancellation rules
        non_cancellable_statuses = ['ready_for_pickup', 'out_for_delivery', 'nearby', 'delivered']
        
        if current_status in non_cancellable_statuses:
            raise HTTPException(
                status_code=400, 
                detail=f"Cannot cancel order in '{current_status}' status. Please contact support."
            )
        
        # Check time-based restrictions
        # RELAXED FOR TESTING: Increased from 2 mins to 1440 mins (24 hours)
        if current_status == 'confirmed' and time_elapsed > 1440:
            raise HTTPException(
                status_code=400,
                detail="Cancellation window expired. Orders can only be cancelled within 24 hours of confirmation."
            )
        
        if current_status == 'preparing':
            preparing_at = order.get('preparing_at')
            if preparing_at:
                preparing_time = datetime.fromisoformat(preparing_at.replace('Z', '+00:00'))
                preparing_elapsed = (datetime.now(timezone.utc) - preparing_time).total_seconds() / 60
                # RELAXED FOR TESTING: Increased from 5 mins to 60 mins
                if preparing_elapsed > 60:
                    raise HTTPException(
                        status_code=400,
                        detail="Cannot cancel order after 60 minutes of preparation. Please contact support."
                    )
        
        # Prepare cancellation data
        cancel_update = {
            "order_status": "cancelled",
            "cancelled_at": datetime.now(timezone.utc).isoformat(),
            "cancellation_reason": cancel_data.cancellation_reason,
            "cancelled_by": cancel_data.cancelled_by,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        
        # Initiate refund if payment was made via Razorpay
        refund_initiated = False
        refund_details = None
        
        if payment_method == 'razorpay' and payment_status == 'paid':
            razorpay_payment_id = order.get('razorpay_payment_id')
            total_amount = order.get('total_amount', 0)
            
            if razorpay_payment_id:
                try:
                    # Create refund in Razorpay
                    refund = razorpay_client.payment.refund(
                        razorpay_payment_id,
                        {
                            "amount": int(total_amount * 100),  # Convert to paise
                            "speed": "normal",  # 'normal' or 'optimum'
                            "notes": {
                                "reason": cancel_data.cancellation_reason,
                                "order_id": order_id
                            }
                        }
                    )
                    
                    refund_initiated = True
                    refund_details = refund
                    
                    # Update order with refund details
                    cancel_update.update({
                        "refund_id": refund['id'],
                        "refund_status": refund['status'],  # 'pending', 'processed'
                        "refund_amount": total_amount,
                        "payment_status": "refunded"
                    })
                    
                    logger.info(f"Refund initiated for order {order_id}: {refund['id']}")
                    
                except razorpay.errors.BadRequestError as e:
                    logger.error(f"Razorpay refund error: {str(e)}")
                    # Still cancel the order but mark refund as failed
                    cancel_update.update({
                        "refund_status": "failed",
                        "refund_error": str(e)
                    })
                except Exception as e:
                    logger.error(f"Unexpected refund error: {str(e)}")
                    cancel_update.update({
                        "refund_status": "failed",
                        "refund_error": str(e)
                    })
        
        # Update order in database
        result = supabase.table('orders').update(cancel_update).eq('id', order_id).execute()
        
        response_data = {
            "success": True,
            "message": "Order cancelled successfully",
            "order_id": order_id,
            "refund_initiated": refund_initiated
        }
        
        if refund_initiated and refund_details:
            response_data["refund"] = {
                "refund_id": refund_details['id'],
                "amount": refund_details['amount'] / 100,  # Convert back to rupees
                "status": refund_details['status'],
                "expected_at": "5-7 business days"
            }
        elif payment_method == 'cod':
            response_data["message"] = "COD order cancelled successfully. No refund needed."
        
        return response_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error cancelling order: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to cancel order: {str(e)}")


@api_router.get("/orders/{order_id}/refund-status")
async def get_refund_status(order_id: str):
    """Get refund status for a cancelled order"""
    try:
        result = supabase.table('orders').select('*').eq('id', order_id).execute()
        
        if not result.data or len(result.data) == 0:
            raise HTTPException(status_code=404, detail="Order not found")
        
        order = result.data[0]
        refund_id = order.get('refund_id')
        
        if not refund_id:
            return {
                "order_id": order_id,
                "refund_status": "no_refund",
                "message": "No refund initiated for this order"
            }
        
        # Fetch latest refund status from Razorpay
        try:
            refund = razorpay_client.refund.fetch(refund_id)
            
            # Update local database with latest status
            if refund['status'] != order.get('refund_status'):
                supabase.table('orders').update({
                    "refund_status": refund['status'],
                    "updated_at": datetime.now(timezone.utc).isoformat()
                }).eq('id', order_id).execute()
            
            return {
                "order_id": order_id,
                "refund_id": refund_id,
                "refund_status": refund['status'],
                "refund_amount": refund['amount'] / 100,
                "created_at": refund.get('created_at'),
                "message": "Refund will be credited to your account within 5-7 business days"
            }
        except Exception as e:
            logger.error(f"Error fetching refund status from Razorpay: {str(e)}")
            # Return cached status from database
            return {
                "order_id": order_id,
                "refund_id": refund_id,
                "refund_status": order.get('refund_status', 'unknown'),
                "refund_amount": order.get('refund_amount', 0),
                "message": "Using cached refund status"
            }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting refund status: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to get refund status: {str(e)}")


@api_router.post("/orders/{order_id}/delivery-location")
async def update_delivery_location(order_id: str, location_data: DeliveryLocationUpdate):
    """Update delivery partner's current location for live tracking"""
    try:
        location_json = {
            "lat": location_data.latitude,
            "lng": location_data.longitude,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        
        update_data = {
            "delivery_partner_location": json.dumps(location_json),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        
        if location_data.delivery_partner_name:
            update_data["delivery_partner_name"] = location_data.delivery_partner_name
        
        result = supabase.table('orders').update(update_data).eq('id', order_id).execute()
        
        if not result.data or len(result.data) == 0:
            raise HTTPException(status_code=404, detail="Order not found")
        
        return {
            "success": True,
            "message": "Delivery location updated",
            "location": location_json
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating delivery location: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to update delivery location: {str(e)}")


@api_router.get("/orders/{order_id}/tracking")
async def get_order_tracking(order_id: str):
    """Get complete order tracking information including delivery status and location"""
    try:
        result = supabase.table('orders').select('*').eq('id', order_id).execute()
        
        if not result.data or len(result.data) == 0:
            raise HTTPException(status_code=404, detail="Order not found")
        
        order = result.data[0]
        
        # Parse delivery location if available
        delivery_location = None
        if order.get('delivery_partner_location'):
            try:
                delivery_location = json.loads(order['delivery_partner_location'])
            except:
                pass
        
        # Determine if cancellation is allowed
        can_cancel = False
        cancel_deadline = None
        current_status = order.get('order_status', '')
        
        if current_status not in ['ready_for_pickup', 'out_for_delivery', 'nearby', 'delivered', 'cancelled']:
            can_cancel = True
            
            # Calculate deadline for cancellation
            if current_status == 'confirmed':
                confirmed_at = order.get('confirmed_at')
                if confirmed_at:
                    confirmed_time = datetime.fromisoformat(confirmed_at.replace('Z', '+00:00'))
                    # RELAXED: 24 hours
                    cancel_deadline = (confirmed_time + timedelta(minutes=1440)).isoformat()
            elif current_status == 'preparing':
                preparing_at = order.get('preparing_at')
                if preparing_at:
                    preparing_time = datetime.fromisoformat(preparing_at.replace('Z', '+00:00'))
                    # RELAXED: 60 minutes
                    cancel_deadline = (preparing_time + timedelta(minutes=60)).isoformat()
        
        # Build tracking response
        tracking_data = {
            "order_id": order_id,
            "order_status": current_status,
            "payment_status": order.get('payment_status'),
            "payment_method": order.get('payment_method'),
            "total_amount": order.get('total_amount'),
            "can_cancel": can_cancel,
            "cancel_deadline": cancel_deadline,
            "timeline": {
                "created_at": order.get('created_at'),
                "confirmed_at": order.get('confirmed_at'),
                "preparing_at": order.get('preparing_at'),
                "ready_at": order.get('ready_at'),
                "out_for_delivery_at": order.get('out_for_delivery_at'),
                "delivered_at": order.get('delivered_at'),
                "cancelled_at": order.get('cancelled_at')
            },
            "delivery": {
                "partner_name": order.get('delivery_partner_name'),
                "partner_phone": order.get('delivery_partner_phone'),
                "current_location": delivery_location,
                "estimated_delivery_time": order.get('estimated_delivery_time')
            },
            "customer": {
                "name": order.get('customer_name'),
                "phone": order.get('customer_phone'),
                "address": order.get('customer_address'),
                "city": order.get('customer_city'),
                "pincode": order.get('customer_pincode')
            }
        }
        
        # Add refund info if order is cancelled
        if current_status == 'cancelled':
            tracking_data["refund"] = {
                "refund_id": order.get('refund_id'),
                "refund_status": order.get('refund_status'),
                "refund_amount": order.get('refund_amount'),
                "cancellation_reason": order.get('cancellation_reason'),
                "cancelled_by": order.get('cancelled_by')
            }
        
        return tracking_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting order tracking: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to get order tracking: {str(e)}")

# Address Management Endpoints

@api_router.get("/addresses/{user_id}")
async def get_user_addresses(user_id: str):
    """Get all saved addresses for a user"""
    try:
        result = supabase.table('user_addresses').select('*').eq('user_id', user_id).execute()
        return result.data
    except Exception as e:
        logger.error(f"Error fetching addresses: {str(e)}")
        # If table doesn't exist, return empty list instead of crashing
        if "relation \"user_addresses\" does not exist" in str(e):
            return []
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/addresses")
async def save_user_address(address: UserAddress):
    """Save a new address"""
    try:
        data = address.dict(exclude={'id'})
        
        # If set as default, unset others
        if data.get('is_default'):
            supabase.table('user_addresses').update({'is_default': False}).eq('user_id', data['user_id']).execute()
            
        result = supabase.table('user_addresses').insert(data).execute()
        return {"success": True, "data": result.data}
    except Exception as e:
        logger.error(f"Error saving address: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.delete("/addresses/{address_id}")
async def delete_user_address(address_id: str):
    """Delete an address"""
    try:
        result = supabase.table('user_addresses').delete().eq('id', address_id).execute()
        return {"success": True}
    except Exception as e:
        logger.error(f"Error deleting address: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# Add CORS middleware BEFORE including routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the router in the main app
app.include_router(api_router)

# @app.on_event("shutdown")
# async def shutdown_db_client():
#     client.close()
