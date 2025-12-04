import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ProductModal = ({ isOpen, onClose, onSave, product }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        original_price: '',
        weight: '',
        image: '',
        discount: 0,
        is_out_of_stock: false
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                category: product.category || '',
                price: product.price || '',
                original_price: product.original_price || '',
                weight: product.weight || '',
                image: product.image || '',
                discount: product.discount || 0,
                is_out_of_stock: product.is_out_of_stock || false
            });
        } else {
            setFormData({
                name: '',
                category: '',
                price: '',
                original_price: '',
                weight: '',
                image: '',
                discount: 0,
                is_out_of_stock: false
            });
        }
    }, [product, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-900">
                        {product ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="e.g. Fresh Apple"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            >
                                <option value="">Select Category</option>
                                <option value="Fruits & Vegetables">Fruits & Vegetables</option>
                                <option value="Dairy & Breakfast">Dairy & Breakfast</option>
                                <option value="Munchies">Munchies</option>
                                <option value="Cold Drinks & Juices">Cold Drinks & Juices</option>
                                <option value="Instant & Frozen Food">Instant & Frozen Food</option>
                                <option value="Tea, Coffee & Health Drinks">Tea, Coffee & Health Drinks</option>
                                <option value="Bakery & Biscuits">Bakery & Biscuits</option>
                                <option value="Sweet Tooth">Sweet Tooth</option>
                                <option value="Atta, Rice & Dal">Atta, Rice & Dal</option>
                                <option value="Masala, Oil & More">Masala, Oil & More</option>
                                <option value="Sauces & Spreads">Sauces & Spreads</option>
                                <option value="Chicken, Meat & Fish">Chicken, Meat & Fish</option>
                                <option value="Organic & Healthy Living">Organic & Healthy Living</option>
                                <option value="Baby Care">Baby Care</option>
                                <option value="Pharma & Wellness">Pharma & Wellness</option>
                                <option value="Cleaning Essentials">Cleaning Essentials</option>
                                <option value="Home & Office">Home & Office</option>
                                <option value="Personal Care">Personal Care</option>
                                <option value="Pet Care">Pet Care</option>
                                <option value="Paan Corner">Paan Corner</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                            <input
                                type="number"
                                min="0"
                                value={formData.original_price}
                                onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Weight/Quantity</label>
                            <input
                                type="text"
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="e.g. 1 kg, 500ml"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={formData.discount}
                                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input
                                type="url"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="https://..."
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.is_out_of_stock}
                                    onChange={(e) => setFormData({ ...formData, is_out_of_stock: e.target.checked })}
                                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Mark as Out of Stock</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#8B2FC9] text-white rounded-xl hover:bg-[#7A28B0] font-medium"
                        >
                            {product ? 'Update Product' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
