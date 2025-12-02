import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';

const HighlightText = ({ text, highlight }) => {
  if (!highlight || !highlight.trim()) {
    return <span>{text}</span>;
  }
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="bg-yellow-200 text-black font-bold rounded-sm px-0.5">{part}</span>
        ) : (
          part
        )
      )}
    </span>
  );
};

const ProductCard = ({ product, onAddToCart, cartQuantity = 0, searchQuery = '' }) => {
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
      className="bg-white rounded-2xl border border-gray-100/50 overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-purple-100 relative group h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10 shadow-lg shadow-purple-500/20 tracking-wide">
          {product.discount}% OFF
        </div>
      )}

      {/* Product Image Container */}
      <div className="relative aspect-[4/3] p-4 bg-gradient-to-b from-gray-50/50 to-white overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
        />

        {/* Quick Add Overlay (Desktop) */}
        <div className={`absolute inset-0 bg-black/5 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} pointer-events-none`} />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Delivery Time */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-3 h-3 rounded-full bg-green-100 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
          </div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            10 MINS
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-800 text-[15px] leading-tight line-clamp-2 mb-1.5 min-h-[40px] group-hover:text-[#8B2FC9] transition-colors">
          <HighlightText text={product.name} highlight={searchQuery} />
        </h3>

        {/* Weight */}
        <p className="text-xs font-medium text-gray-400 mb-3">{product.weight}</p>

        {/* Price & Add Button */}
        <div className="flex items-end justify-between mt-auto pt-2 border-t border-dashed border-gray-100">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through mb-0.5">
              {product.originalPrice > product.price && `₹${product.originalPrice}`}
            </span>
            <span className="font-bold text-gray-900 text-lg">₹{product.price}</span>
          </div>

          {/* Add to Cart Button */}
          {quantity === 0 ? (
            <Button
              onClick={handleAdd}
              className="bg-white border border-[#8B2FC9] text-[#8B2FC9] hover:bg-[#8B2FC9] hover:text-white px-6 py-2 rounded-lg font-bold text-xs shadow-sm hover:shadow-md hover:shadow-purple-200 transition-all duration-300 active:scale-95"
            >
              ADD
            </Button>
          ) : (
            <div className="flex items-center gap-1 bg-[#8B2FC9] rounded-lg overflow-hidden shadow-lg shadow-purple-500/30 ring-2 ring-purple-100">
              <button
                onClick={handleRemove}
                className="p-2 text-white hover:bg-white/20 transition-colors active:bg-white/30"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-white font-bold text-sm min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                onClick={handleAdd}
                className="p-2 text-white hover:bg-white/20 transition-colors active:bg-white/30"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
