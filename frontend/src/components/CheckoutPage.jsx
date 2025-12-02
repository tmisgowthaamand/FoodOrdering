import React, { useState, useMemo } from 'react';
import { ArrowLeft, MapPin, CreditCard, Truck, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { products } from '../data/mockData';
import { toast } from 'sonner';

const CheckoutPage = ({ cart, onBack, onOrderSuccess, onUpdateCart }) => {
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: ''
  });

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .filter(([_, qty]) => qty > 0)
      .map(([productId, quantity]) => {
        const product = products.find((p) => p.id === parseInt(productId));
        return { ...product, quantity };
      })
      .filter((item) => item.id);
  }, [cart]);

  const totalAmount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalSavings = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
      0
    );
  }, [cartItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const validateAddress = () => {
    const { name, phone, address, city, pincode } = customerInfo;
    if (!name || !phone || !address || !city || !pincode) {
      toast.error('Please fill all required fields');
      return false;
    }
    if (phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return false;
    }
    if (pincode.length !== 6) {
      toast.error('Please enter a valid 6-digit pincode');
      return false;
    }
    return true;
  };

  const handleProceedToPayment = () => {
    if (validateAddress()) {
      setStep(2);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createOrder = async () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

    const orderData = {
      items: cartItems.map(item => ({
        product_id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        weight: item.weight
      })),
      total_amount: totalAmount,
      customer: customerInfo,
      payment_method: paymentMethod
    };

    const response = await fetch(`${backendUrl}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return response.json();
  };

  const handleRazorpayPayment = async () => {
    setIsLoading(true);
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      // Create order in database first
      const orderResult = await createOrder();
      const dbOrderId = orderResult.order_id;

      // Create Razorpay order
      const razorpayResponse = await fetch(`${backendUrl}/api/razorpay/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(totalAmount * 100), // Convert to paise
          currency: 'INR'
        })
      });

      if (!razorpayResponse.ok) {
        throw new Error('Failed to create Razorpay order');
      }

      const razorpayOrder = await razorpayResponse.json();

      // Open Razorpay checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Foodeo',
        description: 'Order Payment',
        order_id: razorpayOrder.id,
        handler: async (response) => {
          try {
            // Verify payment
            const verifyResponse = await fetch(`${backendUrl}/api/razorpay/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order_id: dbOrderId
              })
            });

            if (verifyResponse.ok) {
              setOrderId(dbOrderId);
              setStep(3);
              toast.success('Payment successful!');
              // Clear cart
              if (onOrderSuccess) onOrderSuccess();
            } else {
              toast.error('Payment verification failed');
            }
          } catch (error) {
            console.error('Verification error:', error);
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email || '',
          contact: customerInfo.phone
        },
        theme: {
          color: '#8B2FC9'
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
            toast.info('Payment cancelled');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setIsLoading(false);
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Payment failed');
      setIsLoading(false);
    }
  };

  const handleCODPayment = async () => {
    setIsLoading(true);

    try {
      const orderResult = await createOrder();
      setOrderId(orderResult.order_id);
      setStep(3);
      toast.success('Order placed successfully!');
      if (onOrderSuccess) onOrderSuccess();
    } catch (error) {
      console.error('Order error:', error);
      toast.error('Failed to place order');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === 'razorpay') {
      handleRazorpayPayment();
    } else {
      handleCODPayment();
    }
  };

  if (cartItems.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <Button onClick={onBack} className="bg-[#8B2FC9] hover:bg-[#7a26b3]">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {step !== 3 && (
              <button
                onClick={step === 1 ? onBack : () => setStep(1)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}
            <h1 className="text-xl font-bold text-gray-900">
              {step === 1 && 'Delivery Address'}
              {step === 2 && 'Payment Method'}
              {step === 3 && 'Order Confirmed'}
            </h1>
          </div>

          {/* Progress indicator */}
          {step !== 3 && (
            <div className="flex items-center gap-2 mt-4">
              <div className={`flex-1 h-1 rounded ${step >= 1 ? 'bg-[#8B2FC9]' : 'bg-gray-200'}`} />
              <div className={`flex-1 h-1 rounded ${step >= 2 ? 'bg-[#8B2FC9]' : 'bg-gray-200'}`} />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Step 1: Address */}
            {step === 1 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-5 h-5 text-[#8B2FC9]" />
                  <h2 className="text-lg font-semibold">Delivery Details</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        placeholder="10-digit number"
                        maxLength={10}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email (Optional)</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Complete Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      placeholder="House/Flat No., Building, Street, Area"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        placeholder="Enter city"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={customerInfo.pincode}
                        onChange={handleInputChange}
                        placeholder="6-digit pincode"
                        maxLength={6}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleProceedToPayment}
                  className="w-full mt-6 bg-[#8B2FC9] hover:bg-[#7a26b3] py-3"
                >
                  Proceed to Payment
                </Button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="w-5 h-5 text-[#8B2FC9]" />
                  <h2 className="text-lg font-semibold">Select Payment Method</h2>
                </div>

                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  <div className={`flex items-center space-x-4 p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'razorpay' ? 'border-[#8B2FC9] bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <RadioGroupItem value="razorpay" id="razorpay" />
                    <Label htmlFor="razorpay" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Pay Online</p>
                          <p className="text-sm text-gray-500">UPI, Cards, Net Banking, Wallets</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1280px-UPI-Logo-vector.svg.png" alt="UPI" className="h-6" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4" />
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className={`flex items-center space-x-4 p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-[#8B2FC9] bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Pay on Delivery</p>
                          <p className="text-sm text-gray-500">Cash or UPI on delivery</p>
                        </div>
                        <Truck className="w-6 h-6 text-gray-400" />
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {/* Delivery Address Summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Delivering to:</span>
                    <button
                      onClick={() => setStep(1)}
                      className="text-sm text-[#8B2FC9] hover:underline"
                    >
                      Change
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    {customerInfo.name}, {customerInfo.phone}
                  </p>
                  <p className="text-sm text-gray-600">
                    {customerInfo.address}, {customerInfo.city} - {customerInfo.pincode}
                  </p>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
                  className="w-full mt-6 bg-[#8B2FC9] hover:bg-[#7a26b3] py-3"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ₹${totalAmount}`
                  )}
                </Button>
              </div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <div className="bg-white rounded-xl p-8 shadow-sm text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                <p className="text-gray-600 mb-4">
                  Thank you for your order. Your order ID is:
                </p>
                <p className="text-lg font-mono bg-gray-100 px-4 py-2 rounded-lg inline-block mb-6">
                  {orderId}
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  {paymentMethod === 'cod'
                    ? 'Please keep the exact amount ready for payment on delivery.'
                    : 'Payment has been successfully processed.'}
                </p>
                <Button
                  onClick={onBack}
                  className="bg-[#8B2FC9] hover:bg-[#7a26b3]"
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {step !== 3 && (
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl p-4 shadow-sm sticky top-24">
                <h3 className="font-semibold mb-4">Order Summary</h3>

                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.weight} × {item.quantity}</p>
                        <p className="text-sm font-semibold">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-4 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery Fee</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>You Save</span>
                      <span>₹{totalSavings.toFixed(0)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
