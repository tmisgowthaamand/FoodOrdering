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
import CheckoutPage from './components/CheckoutPage';
import { products } from './data/mockData';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'checkout'
  
  // Ref for products section
  const productsSectionRef = useRef(null);

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
  const fruitsAndVegetables = products.filter(
    (p) => p.category === 'Fruits & Vegetables'
  );
  const dairyProducts = products.filter(
    (p) => p.category === 'Dairy & Breakfast'
  );
  const munchies = products.filter((p) => p.category === 'Munchies');
  const coldDrinks = products.filter(
    (p) => p.category === 'Cold Drinks & Juices'
  );
  const teaCoffee = products.filter(
    (p) => p.category === 'Tea, Coffee & Health Drinks'
  );
  const personalCare = products.filter((p) => p.category === 'Personal Care');
  const cleaningEssentials = products.filter(
    (p) => p.category === 'Cleaning Essentials'
  );

  // Handle category click
  const handleCategoryClick = (category) => {
    toast.info(`Browsing ${category.name}`, {
      description: `${category.itemCount} items available`,
    });
  };

  // Render checkout page
  if (currentPage === 'checkout') {
    return (
      <>
        <Toaster position="top-right" richColors />
        <CheckoutPage 
          cart={cart} 
          onBack={handleBackToHome}
          onOrderSuccess={handleOrderSuccess}
          onUpdateCart={handleAddToCart}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" richColors />
      
      {/* Header */}
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setIsLoginOpen(true)}
      />

      {/* Hero Banner */}
      <HeroBanner onOrderNowClick={handleOrderNowClick} />

      {/* Category Grid */}
      <CategoryGrid onCategoryClick={handleCategoryClick} />

      {/* Today's Deals */}
      <PromoBanner />

      {/* Products Section - with ref for scrolling */}
      <div ref={productsSectionRef} id="products-section">
        {/* Fruits & Vegetables Carousel */}
        <ProductCarousel
          title="Fruits & Vegetables"
          products={fruitsAndVegetables}
          onAddToCart={handleAddToCart}
          cart={cart}
        />

        {/* Dairy & Breakfast Carousel */}
        <ProductCarousel
          title="Dairy & Breakfast"
          products={dairyProducts}
          onAddToCart={handleAddToCart}
          cart={cart}
        />
      </div>

      {/* Features Section */}
      <FeaturesSection />

      {/* Munchies Carousel */}
      <ProductCarousel
        title="Munchies"
        products={munchies}
        onAddToCart={handleAddToCart}
        cart={cart}
      />

      {/* Cold Drinks Carousel */}
      <ProductCarousel
        title="Cold Drinks & Juices"
        products={coldDrinks}
        onAddToCart={handleAddToCart}
        cart={cart}
      />

      {/* Delivery Banner */}
      <DeliveryBanner />

      {/* Tea & Coffee Carousel */}
      <ProductCarousel
        title="Tea, Coffee & Health Drinks"
        products={teaCoffee}
        onAddToCart={handleAddToCart}
        cart={cart}
      />

      {/* Personal Care Carousel */}
      <ProductCarousel
        title="Personal Care"
        products={personalCare}
        onAddToCart={handleAddToCart}
        cart={cart}
      />

      {/* Cleaning Essentials Carousel */}
      <ProductCarousel
        title="Cleaning Essentials"
        products={cleaningEssentials}
        onAddToCart={handleAddToCart}
        cart={cart}
      />

      {/* App Download Section */}
      <AppDownloadSection />

      {/* Footer */}
      <Footer />

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
