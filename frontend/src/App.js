import React, { useState, useMemo, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategoryGrid from './components/CategoryGrid';
import ProductCarousel from './components/ProductCarousel';
import PromoBanner from './components/PromoBanner';
import FeaturesSection from './components/FeaturesSection';
import DeliveryBanner from './components/DeliveryBanner';
import AppDownloadSection from './components/AppDownloadSection';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import LoginModal from './components/LoginModal';
import Loader from './components/Loader';
import LazyLoadSection from './components/LazyLoadSection';
import WhatsAppButton from './components/WhatsAppButton';

// Lazy load components for performance
const CheckoutPage = React.lazy(() => import('./components/CheckoutPage'));
const SearchResults = React.lazy(() => import('./components/SearchResults'));
const PrivacyPolicy = React.lazy(() => import('./components/PolicyPages').then(module => ({ default: module.PrivacyPolicy })));
const TermsConditions = React.lazy(() => import('./components/PolicyPages').then(module => ({ default: module.TermsConditions })));
const ShippingPolicy = React.lazy(() => import('./components/PolicyPages').then(module => ({ default: module.ShippingPolicy })));
const RefundPolicy = React.lazy(() => import('./components/PolicyPages').then(module => ({ default: module.RefundPolicy })));
import { products, categories } from './data/mockData';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { AuthProvider } from './context/AuthContext';

function App() {
  React.useEffect(() => {
    document.title = "Foodeo Grocery Online Shopping";
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'checkout'
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top on page change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Refs for products sections
  const productsSectionRef = useRef(null);
  const categoryRefs = useRef({});

  // Calculate cart count
  const cartCount = useMemo(() => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }, [cart]);

  // Handle add to cart
  const handleAddToCart = (product, quantity) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: quantity,
    }));

    if (quantity > 0) {
      toast.success(`${product.name} added to cart`, {
        description: `Quantity: ${quantity}`,
        duration: 2000,
      });
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    setCurrentPage('checkout');
  };

  // Handle back to home
  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  // Handle order success - clear cart
  const handleOrderSuccess = () => {
    setCart({});
  };

  // Handle Order Now click from Hero Banner
  const handleOrderNowClick = () => {
    // Scroll to products section
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    toast.info('Browse our products and add items to cart!', {
      description: 'Free delivery on all orders',
      duration: 3000,
    });
  };

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Handle category click - scroll to relevant section
  const handleCategoryClick = (category) => {
    const targetRef = categoryRefs.current[category.name];

    if (targetRef) {
      targetRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
      toast.success(`Showing ${category.name}`, {
        description: `${category.itemCount} items available`,
        duration: 2000,
      });
    } else {
      // Fallback - scroll to products section
      if (productsSectionRef.current) {
        productsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      toast.info(`Browsing ${category.name}`, {
        description: `${category.itemCount} items available`,
      });
    }
  };

  // Render checkout page
  if (currentPage === 'checkout') {
    return (
      <AuthProvider>
        <Toaster position="top-right" richColors />
        <React.Suspense fallback={<Loader />}>
          <CheckoutPage
            cart={cart}
            onBack={handleBackToHome}
            onOrderSuccess={handleOrderSuccess}
            onUpdateCart={handleAddToCart}
          />
        </React.Suspense>
      </AuthProvider>
    );
  }

  if (currentPage === 'privacy') return <React.Suspense fallback={<Loader />}><PrivacyPolicy onBack={handleBackToHome} /></React.Suspense>;
  if (currentPage === 'terms') return <React.Suspense fallback={<Loader />}><TermsConditions onBack={handleBackToHome} /></React.Suspense>;
  if (currentPage === 'shipping') return <React.Suspense fallback={<Loader />}><ShippingPolicy onBack={handleBackToHome} /></React.Suspense>;
  if (currentPage === 'refund') return <React.Suspense fallback={<Loader />}><RefundPolicy onBack={handleBackToHome} /></React.Suspense>;

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" richColors />

      {isLoading && <Loader />}

      {/* Header */}
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setIsLoginOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {searchQuery ? (
        <React.Suspense fallback={<Loader />}>
          <SearchResults
            products={filteredProducts}
            onAddToCart={handleAddToCart}
            cart={cart}
            searchQuery={searchQuery}
          />
        </React.Suspense>
      ) : (
        <>
          {/* Hero Banner */}
          <HeroBanner onOrderNowClick={handleOrderNowClick} />

          {/* Category Grid */}
          <CategoryGrid onCategoryClick={handleCategoryClick} />

          {/* Today's Deals */}
          <PromoBanner />

          {/* Products Section - with ref for scrolling */}
          <div ref={productsSectionRef} id="products-section">
            {categories.map((category, index) => {
              const categoryProducts = filteredProducts.filter(
                (p) => p.category === category.name
              );

              if (categoryProducts.length === 0) return null;

              return (
                <LazyLoadSection key={category.id}>
                  <div ref={el => categoryRefs.current[category.name] = el}>
                    <ProductCarousel
                      title={category.name}
                      products={categoryProducts}
                      onAddToCart={handleAddToCart}
                      cart={cart}
                      searchQuery={searchQuery}
                    />
                    {index === 1 && <FeaturesSection />}
                    {index === 4 && <DeliveryBanner />}
                  </div>
                </LazyLoadSection>
              );
            })}
          </div>

          {/* App Download Section */}
          <AppDownloadSection />
        </>
      )}

      {/* Footer */}
      <Footer onNavigate={setCurrentPage} />

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateCart={handleAddToCart}
        onCheckout={handleCheckout}
      />

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );
}

function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWrapper;
