import React from 'react';
import ProductCard from './ProductCard';
import { Frown } from 'lucide-react';

const SearchResults = ({ products, onAddToCart, cart, searchQuery, onProductClick }) => {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <Frown className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 max-w-md">
                    We couldn't find any products matching "{searchQuery}". Try searching for something else like "milk", "bread", or "chocolate".
                </p>
            </div>
        );
    }

    const [displayCount, setDisplayCount] = React.useState(20);

    // Reset display count when search query changes
    React.useEffect(() => {
        setDisplayCount(20);
    }, [searchQuery]);

    const handleLoadMore = () => {
        setDisplayCount((prev) => prev + 20);
    };

    return (
        <section className="py-8 px-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Search Results
                    <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {products.length} items found
                    </span>
                </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-8">
                {products.slice(0, displayCount).map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                        cartQuantity={cart[product.id] || 0}
                        searchQuery={searchQuery}
                        onProductClick={onProductClick}
                    />
                ))}
            </div>

            {products.length > displayCount && (
                <div className="flex justify-center">
                    <button
                        onClick={handleLoadMore}
                        className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-6 rounded-lg transition-colors"
                    >
                        Load More
                    </button>
                </div>
            )}
        </section>
    );
};

export default SearchResults;
