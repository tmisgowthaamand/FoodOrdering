import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { products } from '../data/mockData';

const CartSidebar = ({ isOpen, onClose, cart, onUpdateCart }) => {
  const cartItems = Object.entries(cart)
    .filter(([_, qty]) => qty > 0)
    .map(([productId, quantity]) => {
      const product = products.find((p) => p.id === parseInt(productId));
      return { ...product, quantity };
    })
    .filter((item) => item.id);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalSavings = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );

  const handleQuantityChange = (productId, newQuantity) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      onUpdateCart(product, newQuantity);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-[#8B2FC9]" />
              <h2 className="text-lg font-bold">Your Cart</h2>
              <span className="text-sm text-gray-500">({cartItems.length} items)</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          {cartItems.length > 0 ? (
            <>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">{item.weight}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <span className="font-bold">₹{item.price}</span>
                            {item.originalPrice > item.price && (
                              <span className="text-xs text-gray-400 line-through ml-1">
                                ₹{item.originalPrice}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 bg-[#8B2FC9] rounded-lg">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              className="p-1.5 text-white hover:bg-purple-700 rounded-l-lg"
                            >
                              {item.quantity === 1 ? (
                                <Trash2 className="w-4 h-4" />
                              ) : (
                                <Minus className="w-4 h-4" />
                              )}
                            </button>
                            <span className="px-3 text-white font-semibold text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              className="p-1.5 text-white hover:bg-purple-700 rounded-r-lg"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Cart Footer */}
              <div className="border-t p-4 space-y-3">
                {totalSavings > 0 && (
                  <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium">
                    You're saving ₹{totalSavings.toFixed(0)} on this order!
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>
                <Button className="w-full bg-[#8B2FC9] hover:bg-[#7a26b3] text-white py-4 rounded-xl font-semibold text-base">
                  Proceed to Checkout
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-16 h-16 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 text-center mb-6">
                Looks like you have not added anything to your cart yet.
              </p>
              <Button
                onClick={onClose}
                className="bg-[#8B2FC9] hover:bg-[#7a26b3] text-white px-8"
              >
                Start Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
