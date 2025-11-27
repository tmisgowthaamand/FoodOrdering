import React, { useState } from 'react';
import { Search, MapPin, User, ShoppingCart, ChevronDown, Menu, X, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { cities, deliveryAreas } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const Header = ({ cartCount = 0, onCartClick, onLoginClick }) => {
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [selectedArea, setSelectedArea] = useState('Andheri East');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { user, isAuthenticated, signOut, loading } = useAuth();

  // Get display name from user
  const getUserDisplayName = () => {
    if (!user) return '';
    // Try to get name from user metadata
    const metadata = user.user_metadata || {};
    if (metadata.full_name) return metadata.full_name;
    if (metadata.name) return metadata.name;
    // Fall back to email
    if (user.email) return user.email.split('@')[0];
    // Fall back to phone
    if (user.phone) return user.phone;
    return 'User';
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar - delivery info */}
      <div className="bg-[#8B2FC9] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-sm">
          <span className="font-medium">🚀 Get your groceries delivered in 10 minutes!</span>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-2xl md:text-3xl font-bold text-[#8B2FC9] tracking-tight">
              Foodeo
            </div>
          </div>

          {/* Location Selector - Desktop */}
          <div className="hidden md:flex items-center gap-2 min-w-[200px]">
            <MapPin className="w-5 h-5 text-[#8B2FC9]" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Deliver to</span>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-[#8B2FC9] transition-colors">
                  {selectedArea}, {selectedCity}
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 max-h-64 overflow-y-auto">
                  <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">Select City</div>
                  {cities.map((city) => (
                    <DropdownMenuItem
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={city === selectedCity ? 'bg-purple-50 text-[#8B2FC9]' : ''}
                    >
                      {city}
                    </DropdownMenuItem>
                  ))}
                  <div className="border-t my-1"></div>
                  <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">Select Area</div>
                  {deliveryAreas.map((area) => (
                    <DropdownMenuItem
                      key={area}
                      onClick={() => setSelectedArea(area)}
                      className={area === selectedArea ? 'bg-purple-50 text-[#8B2FC9]' : ''}
                    >
                      {area}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for atta, dal, coke and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full bg-gray-100 border-0 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#8B2FC9] transition-all"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Login/User Button */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hidden md:flex items-center gap-2 text-gray-700 hover:text-[#8B2FC9] hover:bg-purple-50"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#8B2FC9] text-white flex items-center justify-center text-sm font-semibold">
                      {getUserDisplayName().charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium max-w-[100px] truncate">{getUserDisplayName()}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium truncate">{getUserDisplayName()}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || user?.phone}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                onClick={onLoginClick}
                className="hidden md:flex items-center gap-2 text-gray-700 hover:text-[#8B2FC9] hover:bg-purple-50"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Login</span>
              </Button>
            )}

            {/* Cart Button */}
            <Button
              onClick={onCartClick}
              className="relative bg-[#8B2FC9] hover:bg-[#7a26b3] text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden md:inline font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for atta, dal, coke and more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full bg-gray-100 border-0 rounded-lg"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t space-y-4">
            {/* Location */}
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#8B2FC9]" />
              <div>
                <span className="text-xs text-gray-500">Deliver to</span>
                <p className="text-sm font-medium">{selectedArea}, {selectedCity}</p>
              </div>
            </div>
            {/* Login/User */}
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-10 h-10 rounded-full bg-[#8B2FC9] text-white flex items-center justify-center text-lg font-semibold">
                    {getUserDisplayName().charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{getUserDisplayName()}</p>
                    <p className="text-xs text-gray-500">{user?.email || user?.phone}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={onLoginClick}
                className="w-full flex items-center justify-center gap-2"
              >
                <User className="w-5 h-5" />
                <span>Login / Sign Up</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
