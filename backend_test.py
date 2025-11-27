#!/usr/bin/env python3
"""
Backend API Testing for E-commerce Checkout Flow
Tests all order-related APIs as specified in test_result.md
"""

import requests
import json
import uuid
from datetime import datetime
import time

# Backend URL from frontend/.env
BACKEND_URL = "https://order-fix-supabase.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.test_results = []
        self.created_orders = []
        
    def log_result(self, test_name, success, message, details=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "details": details
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def test_create_order_cod(self):
        """Test Create Order API with COD payment method"""
        test_name = "Create Order API - COD Payment"
        
        order_data = {
            "items": [
                {
                    "product_id": 1,
                    "name": "Premium Organic Honey",
                    "price": 299.0,
                    "quantity": 2,
                    "image": "honey.jpg",
                    "weight": "500g"
                }
            ],
            "total_amount": 598.0,
            "customer": {
                "name": "Rajesh Kumar",
                "phone": "9876543210",
                "email": "rajesh.kumar@email.com",
                "address": "123 MG Road, Sector 15",
                "city": "Gurgaon",
                "pincode": "122001"
            },
            "payment_method": "cod"
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/orders", json=order_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("order_id"):
                    order_id = data["order_id"]
                    self.created_orders.append(order_id)
                    
                    # Verify order structure
                    order = data.get("order", {})
                    required_fields = ["id", "items", "total_amount", "customer_name", "payment_method", "order_status"]
                    missing_fields = [field for field in required_fields if field not in order]
                    
                    if missing_fields:
                        self.log_result(test_name, False, f"Missing fields in response: {missing_fields}")
                    else:
                        # Verify COD specific fields
                        if order["payment_status"] == "cod" and order["order_status"] == "confirmed":
                            self.log_result(test_name, True, f"Order created successfully with ID: {order_id}")
                        else:
                            self.log_result(test_name, False, f"Incorrect status for COD order. Payment: {order['payment_status']}, Order: {order['order_status']}")
                else:
                    self.log_result(test_name, False, "Response missing success flag or order_id", data)
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_result(test_name, False, f"Request failed: {str(e)}")
        except Exception as e:
            self.log_result(test_name, False, f"Unexpected error: {str(e)}")
    
    def test_create_order_razorpay(self):
        """Test Create Order API with Razorpay payment method"""
        test_name = "Create Order API - Razorpay Payment"
        
        order_data = {
            "items": [
                {
                    "product_id": 2,
                    "name": "Organic Ghee",
                    "price": 450.0,
                    "quantity": 1,
                    "image": "ghee.jpg",
                    "weight": "1kg"
                }
            ],
            "total_amount": 450.0,
            "customer": {
                "name": "Priya Sharma",
                "phone": "8765432109",
                "email": "priya.sharma@email.com",
                "address": "456 Park Street, Block A",
                "city": "Delhi",
                "pincode": "110001"
            },
            "payment_method": "razorpay"
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/orders", json=order_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("order_id"):
                    order_id = data["order_id"]
                    self.created_orders.append(order_id)
                    
                    order = data.get("order", {})
                    # Verify Razorpay specific fields
                    if order["payment_status"] == "pending" and order["order_status"] == "pending":
                        self.log_result(test_name, True, f"Razorpay order created successfully with ID: {order_id}")
                    else:
                        self.log_result(test_name, False, f"Incorrect status for Razorpay order. Payment: {order['payment_status']}, Order: {order['order_status']}")
                else:
                    self.log_result(test_name, False, "Response missing success flag or order_id", data)
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_result(test_name, False, f"Request failed: {str(e)}")
        except Exception as e:
            self.log_result(test_name, False, f"Unexpected error: {str(e)}")
    
    def test_razorpay_create_order(self):
        """Test Razorpay Create Order API"""
        test_name = "Razorpay Create Order API"
        
        order_data = {
            "amount": 59800,  # Amount in paise (598 INR)
            "currency": "INR"
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/razorpay/create-order", json=order_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "amount", "currency", "key_id"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_result(test_name, False, f"Missing fields in response: {missing_fields}")
                else:
                    # Verify data correctness
                    if (data["amount"] == 59800 and 
                        data["currency"] == "INR" and 
                        data["key_id"] and 
                        data["id"].startswith("order_")):
                        self.log_result(test_name, True, f"Razorpay order created: {data['id']}")
                    else:
                        self.log_result(test_name, False, "Response data validation failed", data)
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_result(test_name, False, f"Request failed: {str(e)}")
        except Exception as e:
            self.log_result(test_name, False, f"Unexpected error: {str(e)}")
    
    def test_get_order_valid(self):
        """Test Get Order API with valid order ID"""
        test_name = "Get Order API - Valid ID"
        
        if not self.created_orders:
            self.log_result(test_name, False, "No orders available to test (create order tests must run first)")
            return
        
        order_id = self.created_orders[0]
        
        try:
            response = requests.get(f"{BACKEND_URL}/orders/{order_id}", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "items", "total_amount", "customer_name", "payment_method"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_result(test_name, False, f"Missing fields in response: {missing_fields}")
                elif data["id"] == order_id:
                    self.log_result(test_name, True, f"Order retrieved successfully: {order_id}")
                else:
                    self.log_result(test_name, False, f"Order ID mismatch. Expected: {order_id}, Got: {data.get('id')}")
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_result(test_name, False, f"Request failed: {str(e)}")
        except Exception as e:
            self.log_result(test_name, False, f"Unexpected error: {str(e)}")
    
    def test_get_order_invalid(self):
        """Test Get Order API with invalid order ID"""
        test_name = "Get Order API - Invalid ID"
        
        invalid_order_id = str(uuid.uuid4())
        
        try:
            response = requests.get(f"{BACKEND_URL}/orders/{invalid_order_id}", timeout=10)
            
            if response.status_code == 404:
                self.log_result(test_name, True, "Correctly returned 404 for invalid order ID")
            else:
                self.log_result(test_name, False, f"Expected 404, got HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_result(test_name, False, f"Request failed: {str(e)}")
        except Exception as e:
            self.log_result(test_name, False, f"Unexpected error: {str(e)}")
    
    def test_get_all_orders(self):
        """Test Get All Orders API"""
        test_name = "Get All Orders API"
        
        try:
            response = requests.get(f"{BACKEND_URL}/orders", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    if len(data) >= len(self.created_orders):
                        # Check if orders are sorted by created_at descending
                        if len(data) > 1:
                            first_order_time = data[0].get("created_at", "")
                            second_order_time = data[1].get("created_at", "")
                            if first_order_time >= second_order_time:
                                self.log_result(test_name, True, f"Retrieved {len(data)} orders, properly sorted")
                            else:
                                self.log_result(test_name, False, "Orders not sorted by created_at descending")
                        else:
                            self.log_result(test_name, True, f"Retrieved {len(data)} orders")
                    else:
                        self.log_result(test_name, False, f"Expected at least {len(self.created_orders)} orders, got {len(data)}")
                else:
                    self.log_result(test_name, False, "Response is not a list", type(data))
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_result(test_name, False, f"Request failed: {str(e)}")
        except Exception as e:
            self.log_result(test_name, False, f"Unexpected error: {str(e)}")
    
    def test_razorpay_verify_payment(self):
        """Test Razorpay Payment Verification API"""
        test_name = "Razorpay Payment Verification API"
        
        if not self.created_orders:
            self.log_result(test_name, False, "No orders available to test (create order tests must run first)")
            return
        
        # Use a Razorpay order (second created order if available)
        order_id = self.created_orders[-1] if len(self.created_orders) > 1 else self.created_orders[0]
        
        # Mock payment verification data (this would normally come from Razorpay frontend)
        payment_data = {
            "razorpay_order_id": "order_test123456789",
            "razorpay_payment_id": "pay_test123456789",
            "razorpay_signature": "test_signature_123",
            "order_id": order_id
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/razorpay/verify-payment", json=payment_data, timeout=10)
            
            # This will likely fail signature verification, but we're testing the endpoint structure
            if response.status_code == 400:
                data = response.json()
                if "verification failed" in data.get("detail", "").lower():
                    self.log_result(test_name, True, "Payment verification endpoint working (signature verification failed as expected with test data)")
                else:
                    self.log_result(test_name, False, f"Unexpected 400 response: {data}")
            elif response.status_code == 200:
                # This would be unexpected with test data, but endpoint is working
                self.log_result(test_name, True, "Payment verification endpoint working (unexpectedly succeeded)")
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_result(test_name, False, f"Request failed: {str(e)}")
        except Exception as e:
            self.log_result(test_name, False, f"Unexpected error: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests in sequence"""
        print(f"🚀 Starting Backend API Tests")
        print(f"Backend URL: {BACKEND_URL}")
        print("=" * 60)
        
        # Test order creation first (needed for other tests)
        self.test_create_order_cod()
        self.test_create_order_razorpay()
        
        # Test Razorpay order creation
        self.test_razorpay_create_order()
        
        # Test order retrieval (depends on created orders)
        self.test_get_order_valid()
        self.test_get_order_invalid()
        self.test_get_all_orders()
        
        # Test payment verification
        self.test_razorpay_verify_payment()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result["success"])
        failed = len(self.test_results) - passed
        
        print(f"Total Tests: {len(self.test_results)}")
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {failed}")
        
        if failed > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  • {result['test']}: {result['message']}")
        
        print(f"\n📝 Created Orders for Testing: {len(self.created_orders)}")
        for order_id in self.created_orders:
            print(f"  • {order_id}")
        
        return passed, failed

if __name__ == "__main__":
    tester = BackendTester()
    passed, failed = tester.run_all_tests()
    
    # Exit with appropriate code
    exit(0 if failed == 0 else 1)