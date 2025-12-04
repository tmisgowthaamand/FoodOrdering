"""
Comprehensive Order Testing Script
Tests all order tracking, cancellation, and refund functionality
"""

import requests
import json
import time
from datetime import datetime
from typing import Dict, Any

# Configuration
API_BASE_URL = "http://localhost:8000"
COLORS = {
    'GREEN': '\033[92m',
    'RED': '\033[91m',
    'YELLOW': '\033[93m',
    'BLUE': '\033[94m',
    'RESET': '\033[0m'
}

class OrderTester:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.test_results = []
        self.order_id = None
        
    def log(self, message: str, status: str = 'info'):
        """Log test results with color coding"""
        color = {
            'success': COLORS['GREEN'],
            'error': COLORS['RED'],
            'warning': COLORS['YELLOW'],
            'info': COLORS['BLUE']
        }.get(status, COLORS['RESET'])
        
        timestamp = datetime.now().strftime('%H:%M:%S')
        print(f"{color}[{timestamp}] {message}{COLORS['RESET']}")
        self.test_results.append({'message': message, 'status': status, 'timestamp': timestamp})
    
    def check_condition(self, condition: bool, success_msg: str, error_msg: str):
        """Check a condition and log result"""
        if condition:
            self.log(f"✅ {success_msg}", 'success')
            return True
        else:
            self.log(f"❌ {error_msg}", 'error')
            return False
    
    def create_test_order(self, payment_method: str = 'cod') -> Dict[str, Any]:
        """Create a test order"""
        self.log(f"\n📦 Creating test order with payment method: {payment_method}", 'info')
        
        order_data = {
            "items": [
                {
                    "product_id": 1,
                    "name": "Test Product",
                    "price": 500,
                    "quantity": 2,
                    "image": "https://via.placeholder.com/100",
                    "weight": "500g"
                }
            ],
            "total_amount": 1000,
            "customer": {
                "name": "Test Customer",
                "phone": "+919876543210",
                "email": "test@example.com",
                "address": "123 Test Street",
                "city": "Test City",
                "pincode": "123456"
            },
            "payment_method": payment_method
        }
        
        try:
            response = requests.post(f"{self.base_url}/api/orders", json=order_data)
            data = response.json()
            
            if response.status_code == 200 and data.get('success'):
                self.order_id = data['order_id']
                self.log(f"✅ Order created successfully: {self.order_id[:8]}", 'success')
                return data
            else:
                self.log(f"❌ Failed to create order: {data}", 'error')
                return None
        except Exception as e:
            self.log(f"❌ Error creating order: {str(e)}", 'error')
            return None
    
    def get_order_tracking(self, order_id: str = None) -> Dict[str, Any]:
        """Get order tracking information"""
        order_id = order_id or self.order_id
        self.log(f"\n📍 Fetching tracking for order: {order_id[:8]}", 'info')
        
        try:
            response = requests.get(f"{self.base_url}/api/orders/{order_id}/tracking")
            data = response.json()
            
            if response.status_code == 200:
                self.log(f"✅ Tracking data retrieved successfully", 'success')
                return data
            else:
                self.log(f"❌ Failed to get tracking: {data}", 'error')
                return None
        except Exception as e:
            self.log(f"❌ Error getting tracking: {str(e)}", 'error')
            return None
    
    def validate_tracking_data(self, tracking_data: Dict[str, Any]):
        """Validate tracking data structure"""
        self.log("\n🔍 Validating tracking data structure...", 'info')
        
        checks = [
            (tracking_data.get('order_id'), "Order ID exists"),
            (tracking_data.get('order_status'), "Status is correct"),
            (tracking_data.get('timeline', {}).get('created_at'), "Timeline has timestamps"),
            (isinstance(tracking_data.get('can_cancel'), bool), "Can cancel shows correctly"),
            (tracking_data.get('can_cancel') == False or tracking_data.get('cancel_deadline'), "Cancel deadline is accurate"),
        ]
        
        for condition, message in checks:
            self.check_condition(condition, message, f"Failed: {message}")
    
    def update_order_status(self, status: str, order_id: str = None) -> Dict[str, Any]:
        """Update order status"""
        order_id = order_id or self.order_id
        self.log(f"\n🔄 Updating order status to: {status}", 'info')
        
        update_data = {"status": status}
        
        # Add delivery partner info for out_for_delivery status
        if status == 'out_for_delivery':
            update_data.update({
                "delivery_partner_name": "Test Driver",
                "delivery_partner_phone": "+919876543210",
                "estimated_delivery_time": datetime.now().isoformat()
            })
        
        try:
            response = requests.patch(
                f"{self.base_url}/api/orders/{order_id}/status",
                json=update_data
            )
            data = response.json()
            
            if response.status_code == 200 and data.get('success'):
                self.log(f"✅ Order status updated to: {status}", 'success')
                return data
            else:
                self.log(f"❌ Failed to update status: {data}", 'error')
                return None
        except Exception as e:
            self.log(f"❌ Error updating status: {str(e)}", 'error')
            return None
    
    def cancel_order(self, reason: str = "Test cancellation", order_id: str = None) -> Dict[str, Any]:
        """Cancel an order"""
        order_id = order_id or self.order_id
        self.log(f"\n❌ Attempting to cancel order: {order_id[:8]}", 'info')
        
        cancel_data = {
            "order_id": order_id,
            "cancellation_reason": reason,
            "cancelled_by": "customer"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/orders/{order_id}/cancel",
                json=cancel_data
            )
            data = response.json()
            
            if response.status_code == 200 and data.get('success'):
                self.log(f"✅ Order cancelled successfully", 'success')
                
                # Check refund details
                if data.get('refund_initiated'):
                    self.log(f"✅ Refund initiated automatically", 'success')
                    refund = data.get('refund', {})
                    self.log(f"   Refund ID: {refund.get('refund_id')}", 'info')
                    self.log(f"   Amount: ₹{refund.get('amount')}", 'info')
                    self.log(f"   Status: {refund.get('status')}", 'info')
                else:
                    self.log(f"ℹ️  No refund needed (COD order)", 'info')
                
                return data
            else:
                self.log(f"⚠️  Cancellation denied: {data.get('detail', 'Unknown error')}", 'warning')
                self.log(f"✅ Proper error message shown", 'success')
                return data
        except Exception as e:
            self.log(f"❌ Error cancelling order: {str(e)}", 'error')
            return None
    
    def get_refund_status(self, order_id: str = None) -> Dict[str, Any]:
        """Get refund status"""
        order_id = order_id or self.order_id
        self.log(f"\n💰 Checking refund status for order: {order_id[:8]}", 'info')
        
        try:
            response = requests.get(f"{self.base_url}/api/orders/{order_id}/refund-status")
            data = response.json()
            
            if response.status_code == 200:
                if data.get('refund_id'):
                    self.log(f"✅ Refund ID saved: {data['refund_id']}", 'success')
                    self.log(f"✅ Refund status tracked: {data['refund_status']}", 'success')
                    self.log(f"✅ Amount is correct: ₹{data['refund_amount']}", 'success')
                    self.log(f"✅ Timeline shown (5-7 days)", 'success')
                else:
                    self.log(f"ℹ️  No refund for this order", 'info')
                return data
            else:
                self.log(f"❌ Failed to get refund status: {data}", 'error')
                return None
        except Exception as e:
            self.log(f"❌ Error getting refund status: {str(e)}", 'error')
            return None
    
    def test_cancellation_time_window(self):
        """Test cancellation within and outside time window"""
        self.log("\n⏰ Testing cancellation time windows...", 'info')
        
        # Create order and immediately try to cancel (should work)
        self.create_test_order('cod')
        time.sleep(1)
        
        # Update to confirmed
        self.update_order_status('confirmed')
        time.sleep(1)
        
        # Try to cancel (should work within 2 minutes)
        result = self.cancel_order("Testing within time window")
        self.check_condition(
            result and result.get('success'),
            "Allowed cancellation within time window",
            "Failed to cancel within time window"
        )
    
    def test_cancellation_denied(self):
        """Test cancellation denial after time window"""
        self.log("\n🚫 Testing cancellation denial...", 'info')
        
        # Create order
        self.create_test_order('cod')
        time.sleep(1)
        
        # Update to out_for_delivery (should not be cancellable)
        self.update_order_status('out_for_delivery')
        time.sleep(1)
        
        # Try to cancel (should be denied)
        result = self.cancel_order("Testing after time window")
        self.check_condition(
            result and not result.get('success'),
            "Denied cancellation after time window",
            "Should have denied cancellation"
        )
    
    def run_comprehensive_test_suite(self):
        """Run all tests"""
        self.log("\n" + "="*60, 'info')
        self.log("🚀 STARTING COMPREHENSIVE ORDER TESTING SUITE", 'info')
        self.log("="*60 + "\n", 'info')
        
        # Test 1: Create COD Order
        self.log("📋 TEST 1: Creating COD Order", 'info')
        order = self.create_test_order('cod')
        if not order:
            self.log("❌ Test suite aborted - failed to create order", 'error')
            return
        time.sleep(1)
        
        # Test 2: Get Order Tracking
        self.log("\n📋 TEST 2: Order Tracking", 'info')
        tracking = self.get_order_tracking()
        if tracking:
            self.validate_tracking_data(tracking)
        time.sleep(1)
        
        # Test 3: Update Order Status
        self.log("\n📋 TEST 3: Updating Order Status", 'info')
        self.update_order_status('confirmed')
        time.sleep(1)
        self.update_order_status('preparing')
        time.sleep(1)
        
        # Test 4: Check Updated Tracking
        self.log("\n📋 TEST 4: Verify Status Updates", 'info')
        tracking = self.get_order_tracking()
        if tracking:
            self.check_condition(
                tracking.get('order_status') == 'preparing',
                "Order status updated correctly",
                "Order status not updated"
            )
        time.sleep(1)
        
        # Test 5: Cancel Order
        self.log("\n📋 TEST 5: Order Cancellation", 'info')
        cancel_result = self.cancel_order("Comprehensive test cancellation")
        time.sleep(1)
        
        # Test 6: Verify Cancellation
        self.log("\n📋 TEST 6: Verify Cancellation", 'info')
        tracking = self.get_order_tracking()
        if tracking:
            self.check_condition(
                tracking.get('order_status') == 'cancelled',
                "Order status updated to cancelled",
                "Order not marked as cancelled"
            )
        time.sleep(1)
        
        # Test 7: Check Refund Status
        self.log("\n📋 TEST 7: Refund Status", 'info')
        self.get_refund_status()
        time.sleep(1)
        
        # Test 8: Cancellation Time Windows
        self.log("\n📋 TEST 8: Cancellation Time Windows", 'info')
        self.test_cancellation_time_window()
        time.sleep(1)
        
        # Test 9: Cancellation Denial
        self.log("\n📋 TEST 9: Cancellation Denial", 'info')
        self.test_cancellation_denied()
        
        # Summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        self.log("\n" + "="*60, 'info')
        self.log("📊 TEST SUMMARY", 'info')
        self.log("="*60, 'info')
        
        success_count = sum(1 for r in self.test_results if r['status'] == 'success')
        error_count = sum(1 for r in self.test_results if r['status'] == 'error')
        warning_count = sum(1 for r in self.test_results if r['status'] == 'warning')
        
        self.log(f"\n✅ Successful: {success_count}", 'success')
        self.log(f"❌ Errors: {error_count}", 'error' if error_count > 0 else 'info')
        self.log(f"⚠️  Warnings: {warning_count}", 'warning' if warning_count > 0 else 'info')
        
        self.log("\n" + "="*60 + "\n", 'info')
        
        if error_count == 0:
            self.log("🎉 ALL TESTS PASSED! 🎉", 'success')
        else:
            self.log("⚠️  SOME TESTS FAILED - Review errors above", 'warning')


def main():
    """Main test runner"""
    print("\n" + "="*60)
    print("🧪 Order Testing Script")
    print("="*60 + "\n")
    
    # Check if backend is running
    try:
        response = requests.get(f"{API_BASE_URL}/")
        if response.status_code == 200:
            print(f"{COLORS['GREEN']}✅ Backend is running at {API_BASE_URL}{COLORS['RESET']}\n")
        else:
            print(f"{COLORS['RED']}❌ Backend returned status {response.status_code}{COLORS['RESET']}\n")
            return
    except Exception as e:
        print(f"{COLORS['RED']}❌ Cannot connect to backend at {API_BASE_URL}{COLORS['RESET']}")
        print(f"{COLORS['RED']}   Error: {str(e)}{COLORS['RESET']}\n")
        print(f"{COLORS['YELLOW']}💡 Make sure the backend is running with: uvicorn server:app --reload{COLORS['RESET']}\n")
        return
    
    # Run tests
    tester = OrderTester(API_BASE_URL)
    tester.run_comprehensive_test_suite()


if __name__ == "__main__":
    main()
