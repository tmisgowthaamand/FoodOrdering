import React from 'react';
import { X, Plus, Minus, Share2, Heart, Clock, Truck, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent } from './ui/dialog';

const ProductDetailsModal = ({ product, isOpen, onClose, onAddToCart, cartQuantity = 0 }) => {
    if (!product) return null;

    const handleAdd = (e) => {
        e.stopPropagation();
        onAddToCart(product, cartQuantity + 1);
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        if (cartQuantity > 0) {
            onAddToCart(product, cartQuantity - 1);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white rounded-2xl border-0">
                <div className="grid md:grid-cols-2 h-[80vh] md:h-auto overflow-y-auto md:overflow-visible">
                    {/* Left: Image Section */}
                    <div className="bg-gray-50 p-8 flex items-center justify-center relative group">
                        <div className="absolute top-4 left-4 z-10">
                            {product.discount > 0 && (
                                <span className="bg-[#8B2FC9] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-purple-500/20">
                                    {product.discount}% OFF
                                </span>
                            )}
                        </div>
                        <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-600">
                                <Share2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-600">
                                <Heart className="w-4 h-4" />
                            </button>
                        </div>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full max-w-[300px] object-contain mix-blend-multiply transition-transform duration-500 hover:scale-110"
                        />
                    </div>

                    {/* Right: Details Section */}
                    <div className="p-6 md:p-8 flex flex-col h-full">
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    {product.category}
                                </div>
                                <div className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-md">
                                    <Clock className="w-3 h-3" />
                                    10 MINS
                                </div>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                                {product.name}
                            </h2>
                            <p className="text-gray-500 font-medium mb-6">{product.weight}</p>

                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                                {product.originalPrice > product.price && (
                                    <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                                )}
                            </div>

                            <div className="border-t border-b py-4 mb-6 space-y-3">
                                <h3 className="font-semibold text-gray-900">Product Details</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {product.description || `Fresh and high-quality ${product.name.toLowerCase()} sourced directly from trusted partners. Carefully packed to ensure freshness and quality upon delivery.`}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                                        <Truck className="w-4 h-4 text-[#8B2FC9]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900">Superfast Delivery</p>
                                        <p className="text-[10px] text-gray-500">Get it in 10 mins</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                                        <ShieldCheck className="w-4 h-4 text-[#8B2FC9]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900">Best Quality</p>
                                        <p className="text-[10px] text-gray-500">Sourced from best</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Action Bar */}
                        <div className="pt-4 mt-auto border-t">
                            {cartQuantity === 0 ? (
                                <Button
                                    onClick={handleAdd}
                                    className="w-full bg-[#8B2FC9] hover:bg-[#7a26b3] text-white py-6 text-lg font-bold rounded-xl shadow-lg shadow-purple-200"
                                >
                                    Add to Cart
                                </Button>
                            ) : (
                                <div className="flex items-center justify-between bg-[#8B2FC9] p-2 rounded-xl shadow-lg shadow-purple-200">
                                    <button
                                        onClick={handleRemove}
                                        className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors"
                                    >
                                        <Minus className="w-6 h-6" />
                                    </button>
                                    <div className="text-center">
                                        <span className="block text-white font-bold text-xl">{cartQuantity}</span>
                                        <span className="text-[10px] text-white/80 font-medium uppercase tracking-wider">in cart</span>
                                    </div>
                                    <button
                                        onClick={handleAdd}
                                        className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors"
                                    >
                                        <Plus className="w-6 h-6" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDetailsModal;
