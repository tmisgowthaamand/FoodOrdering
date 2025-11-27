import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';

const ProductCard = ({ product, onAddToCart, cartQuantity = 0 }) => {
  const [quantity, setQuantity] = useState(cartQuantity);
  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onAddToCart && onAddToCart(product, newQty);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onAddToCart && onAddToCart(product, newQty);
    }
  };

  return (
    <div
      className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-purple-200 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-2 left-2 bg-[#8B2FC9] text-white text-xs font-bold px-2 py-1 rounded-md z-10">
          {product.discount}% OFF
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-square p-3 bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover rounded-lg transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
        />
      </div>

      {/* Product Info */}
      <div className="p-3">
        {/* Delivery Time */}
        <div className="flex items-center gap-1 mb-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            10 MINS
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 min-h-[40px] mb-1">
          {product.name}
        </h3>

        {/* Weight */}
        <p className="text-xs text-gray-500 mb-2">{product.weight}</p>

        {/* Price & Add Button */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          {quantity === 0 ? (
            <Button
              onClick={handleAdd}
              className="bg-white border-2 border-[#8B2FC9] text-[#8B2FC9] hover:bg-[#8B2FC9] hover:text-white px-4 py-1.5 rounded-lg font-semibold text-sm transition-all"
            >
              ADD
            </Button>
          ) : (
            <div className="flex items-center gap-1 bg-[#8B2FC9] rounded-lg overflow-hidden">
              <button
                onClick={handleRemove}
                className="p-1.5 text-white hover:bg-purple-700 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 text-white font-semibold text-sm">
                {quantity}
              </span>
              <button
                onClick={handleAdd}
                className="p-1.5 text-white hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
