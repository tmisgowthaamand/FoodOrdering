import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, MapPin, CreditCard, Truck, CheckCircle, Loader2, Plus, Trash2, Home, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { products } from '../data/mockData';
import { toast } from 'sonner';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = ({ cart, onBack, onOrderSuccess, onUpdateCart }) => {
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [userId, setUserId] = useState('');

  const { user } = useAuth();

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    label: 'Home' // Home, Work, Other
  });

  // Initialize User ID
  useEffect(() => {
    let effectiveUserId = user?.id;

    if (!effectiveUserId) {
      effectiveUserId = localStorage.getItem('foodeo_user_id');
      if (!effectiveUserId) {
        effectiveUserId = 'guest_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('foodeo_user_id', effectiveUserId);
      }
    }

    setUserId(effectiveUserId);
    fetchAddresses(effectiveUserId);
  }, [user]);

  const fetchAddresses = async (uid) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/addresses/${uid}`);
      if (response.ok) {
        const data = await response.json();
        setSavedAddresses(data);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

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
    if (String(phone).length < 10) {
      toast.error('Please enter a valid phone number');
      return false;
    }
    if (String(pincode).length !== 6) {
      toast.error('Please enter a valid 6-digit pincode');
      return false;
    }
    return true;
  };

  const handleSaveAddress = async () => {
    if (!validateAddress()) return;

    setIsLoading(true);
    try {
      const addressData = {
        ...customerInfo,
        user_id: userId,
        is_default: savedAddresses.length === 0
      };

      const response = await fetch(`${API_BASE_URL}/api/addresses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addressData)
      });

      if (response.ok) {
        toast.success('Address saved successfully');
        fetchAddresses(userId);
        setShowAddressForm(false);
        // If it's the first address, automatically select it (which is done by default logic usually, but here we just saved it)
      } else {
        toast.error('Failed to save address');
      }
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error('Error saving address');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId, e) => {
    e.stopPropagation();
    // Removed confirmation dialog as requested

    try {
      const response = await fetch(`${API_BASE_URL}/api/addresses/${addressId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success('Address deleted');
        fetchAddresses(userId);
        // Clear selection if deleted
        if (customerInfo.id === addressId) {
          setCustomerInfo({
            name: '',
            phone: '',
            email: '',
            address: '',
            city: '',
            pincode: '',
            label: 'Home'
          });
        }
      }
    } catch (error) {
      toast.error('Failed to delete address');
    }
  };

  const selectAddress = (addr) => {
    setCustomerInfo({
      ...addr,
      name: addr.name || 'Guest', // Fallback if name is missing
      pincode: String(addr.pincode), // Ensure pincode is string
      email: customerInfo.email || addr.email || '' // Preserve email if entered
    });
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
      payment_method: paymentMethod,
      user_id: userId
    };

    const response = await fetch(`${API_BASE_URL}/api/orders`, {
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
      const razorpayResponse = await fetch(`${API_BASE_URL}/api/razorpay/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(totalAmount * 100), // Convert to paise
          currency: 'INR'
        })
      });

      if (!razorpayResponse.ok) {
        const errorData = await razorpayResponse.json();
        console.error('Razorpay Order Creation Error:', errorData);
        throw new Error(errorData.detail || 'Failed to create Razorpay order');
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
            const verifyResponse = await fetch(`${API_BASE_URL}/api/razorpay/verify-payment`, {
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
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#8B2FC9]" />
                    <h2 className="text-lg font-semibold">Delivery Details</h2>
                  </div>
                  {!showAddressForm && savedAddresses.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCustomerInfo({
                          name: '',
                          phone: '',
                          email: '',
                          address: '',
                          city: '',
                          pincode: '',
                          label: 'Home'
                        });
                        setShowAddressForm(true);
                      }}
                      className="flex items-center gap-2"
                    >
                      <Plus size={16} /> Add New
                    </Button>
                  )}
                </div>

                {!showAddressForm && savedAddresses.length > 0 ? (
                  <div className="grid gap-4">
                    {savedAddresses.map((addr) => (
                      <div
                        key={addr.id}
                        onClick={() => selectAddress(addr)}
                        className={`p-4 border rounded-xl cursor-pointer transition-all ${customerInfo.address === addr.address
                          ? 'border-[#8B2FC9] bg-purple-50 ring-1 ring-[#8B2FC9]'
                          : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2 mb-2">
                            {addr.label === 'Home' && <Home size={16} className="text-[#8B2FC9]" />}
                            {addr.label === 'Work' && <Briefcase size={16} className="text-[#8B2FC9]" />}
                            {addr.label === 'Other' && <MapPin size={16} className="text-[#8B2FC9]" />}
                            <span className="font-semibold">{addr.label}</span>
                          </div>
                          <button
                            onClick={(e) => handleDeleteAddress(addr.id, e)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="font-medium">{addr.name}</p>
                        <p className="text-sm text-gray-600">{addr.address}</p>
                        <p className="text-sm text-gray-600">{addr.city}, {addr.pincode}</p>
                        <p className="text-sm text-gray-600 mt-1">Phone: {addr.phone}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Label Selection */}
                    <div className="flex gap-4 mb-4">
                      {['Home', 'Work', 'Other'].map((label) => (
                        <button
                          key={label}
                          onClick={() => setCustomerInfo(prev => ({ ...prev, label }))}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${customerInfo.label === label
                            ? 'bg-[#8B2FC9] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

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

                    <div className="flex gap-3 mt-6">
                      {savedAddresses.length > 0 && (
                        <Button
                          variant="outline"
                          onClick={() => setShowAddressForm(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      )}
                      <Button
                        onClick={handleSaveAddress}
                        disabled={isLoading}
                        className="flex-1 bg-[#8B2FC9] hover:bg-[#7a26b3]"
                      >
                        {isLoading ? <Loader2 className="animate-spin" /> : 'Save & Proceed'}
                      </Button>
                    </div>
                  </div>
                )}

                {!showAddressForm && savedAddresses.length > 0 && (
                  <Button
                    onClick={handleProceedToPayment}
                    className="w-full mt-6 bg-[#8B2FC9] hover:bg-[#7a26b3] py-3"
                  >
                    Proceed to Payment
                  </Button>
                )}
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
