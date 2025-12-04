import React, { useState } from 'react';
import { Search, MapPin, User, ShoppingCart, ChevronDown, Menu, X, LogOut, AlertCircle, Package } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { indianLocations, cityAreas, categories, products } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import LocationSearch from './LocationSearch';

const Header = ({ cartCount = 0, onCartClick, onLoginClick, onMyOrdersClick, searchQuery = '', onSearchChange }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [showManualSelection, setShowManualSelection] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Manual selection state
  const [manualState, setManualState] = useState('Tamil Nadu');
  const [manualCity, setManualCity] = useState('');
  const [manualArea, setManualArea] = useState('');
  const [areaSuggestions, setAreaSuggestions] = useState([]);
  const [isAreaLoading, setIsAreaLoading] = useState(false);

  const fetchAreaSuggestions = async (query) => {
    if (!query || !manualCity) return;

    setIsAreaLoading(true);
    try {
      // Search for the query within the selected city and state
      const searchText = `${query}, ${manualCity}, ${manualState}`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}&addressdetails=1&countrycodes=in&limit=10`
      );
      const data = await response.json();

      // Extract meaningful area names
      const suggestions = data.map(item => {
        const addr = item.address;
        return addr.suburb || addr.neighbourhood || addr.residential || addr.road || item.name.split(',')[0];
      }).filter((val, index, self) => val && self.indexOf(val) === index); // Unique values

      setAreaSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching areas:", error);
    } finally {
      setIsAreaLoading(false);
    }
  };

  const detectAndFillManualLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsAreaLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          const data = await response.json();

          if (data && data.address) {
            const addr = data.address;
            const state = addr.state;
            const city = addr.city || addr.town || addr.village || addr.county;
            const area = addr.suburb || addr.neighbourhood || addr.residential || addr.road;

            if (state && indianLocations[state]) {
              setManualState(state);

              if (city) {
                // Set city even if not in list
                setManualCity(city);
              }

              if (area) {
                setManualArea(area);
              }
            }
          }
        } catch (error) {
          console.error("Error reverse geocoding:", error);
        } finally {
          setIsAreaLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsAreaLoading(false);
      }
    );
  };

  const [hasGuestId, setHasGuestId] = useState(false);

  useEffect(() => {
    const checkGuestId = () => {
      const guestId = localStorage.getItem('foodeo_user_id');
      setHasGuestId(!!guestId);
    };

    checkGuestId();
    // Listen for storage changes in case order is placed in another tab/window
    window.addEventListener('storage', checkGuestId);
    return () => window.removeEventListener('storage', checkGuestId);
  }, []);

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
    localStorage.removeItem('foodeo_user_id');
    setHasGuestId(false);
    toast.success('Signed out successfully');
  };

  const handleLocationSelect = (locationData) => {
    setSelectedLocation({
      area: locationData.area || locationData.city, // Fallback to city if area is missing
      city: locationData.city,
      state: locationData.state,
      address: locationData.address
    });
    setLocationModalOpen(false);
  };

  const handleManualSubmit = () => {
    if (!manualCity) return;

    const area = manualArea.trim() || manualCity;
    setSelectedLocation({
      area: area,
      city: manualCity,
      state: manualState,
      address: manualArea ? `${manualArea}, ${manualCity}, ${manualState}` : `${manualCity}, ${manualState}`
    });
    setLocationModalOpen(false);
  };

  const states = Object.keys(indianLocations).sort();
  // dynamic cities list that includes the manual city if it's not in the predefined list
  const cities = manualState
    ? (indianLocations[manualState] || []).concat(
      manualCity && !(indianLocations[manualState] || []).includes(manualCity) ? [manualCity] : []
    ).sort()
    : [];
  const areas = manualCity && cityAreas[manualCity] ? cityAreas[manualCity].sort() : [];

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
            <div className="flex flex-col cursor-pointer" onClick={() => setLocationModalOpen(true)}>
              <span className="text-xs text-gray-500">Select Location</span>
              <div className="flex items-center gap-1 text-sm font-medium hover:text-[#8B2FC9] transition-colors">
                <span className="truncate max-w-[200px]">
                  {selectedLocation ? `${selectedLocation.area}, ${selectedLocation.city}` : 'Select Location'}
                </span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search for 2000+ products"
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="pl-10 pr-10 py-2.5 w-full bg-gray-100 border-0 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#8B2FC9] transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange && onSearchChange('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Search Suggestions Dropdown */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 max-h-[80vh] overflow-y-auto">
                  {!searchQuery ? (
                    <>
                      {/* Trending Searches */}
                      <div className="mb-2">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 bg-[#8B2FC9] rounded-full"></span>
                          Trending Searches
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {['Milk', 'Bread', 'Eggs', 'Butter', 'Cheese', 'Curd', 'Paneer', 'Chocolate', 'Chips', 'Ice Cream'].map((term) => (
                            <button
                              key={term}
                              className="px-3 py-1.5 bg-gray-50 hover:bg-purple-50 text-gray-700 hover:text-[#8B2FC9] rounded-full text-sm transition-all duration-200 flex items-center gap-1.5 border border-transparent hover:border-purple-100"
                              onClick={() => onSearchChange && onSearchChange(term)}
                            >
                              <Search className="w-3 h-3 opacity-50" />
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Live Search Results */
                    <div>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-1 h-4 bg-[#8B2FC9] rounded-full"></span>
                        Top Results
                      </h3>
                      <div className="space-y-2">
                        {products
                          .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                          .slice(0, 5)
                          .map((product) => (
                            <button
                              key={product.id}
                              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                              onClick={() => onSearchChange && onSearchChange(product.name)}
                            >
                              <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 border border-gray-100">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 group-hover:text-[#8B2FC9] truncate">
                                  {product.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {product.weight} • ₹{product.price}
                                </p>
                              </div>
                              <div className="text-[#8B2FC9] opacity-0 group-hover:opacity-100 transition-opacity">
                                <Search className="w-4 h-4" />
                              </div>
                            </button>
                          ))}
                        {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                          <div className="text-center py-4 text-gray-500 text-sm">
                            No products found matching "{searchQuery}"
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
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


            {/* My Orders Button */}
            {onMyOrdersClick && (isAuthenticated || hasGuestId) && (
              <Button
                variant="ghost"
                onClick={onMyOrdersClick}
                className="hidden md:flex items-center gap-2 text-gray-700 hover:text-[#8B2FC9] hover:bg-purple-50"
              >
                <Package className="w-5 h-5" />
                <span className="font-medium">My Orders</span>
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
              placeholder="Search for 2000+ products"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="pl-10 pr-10 py-2.5 w-full bg-gray-100 border-0 rounded-lg"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange && onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t space-y-4">
            {/* Location */}
            <div className="flex items-center gap-2" onClick={() => {
              setMobileMenuOpen(false);
              setLocationModalOpen(true);
            }}>
              <MapPin className="w-5 h-5 text-[#8B2FC9]" />
              <div>
                <span className="text-xs text-gray-500">Deliver to</span>
                <p className="text-sm font-medium">
                  {selectedLocation ? `${selectedLocation.area}, ${selectedLocation.city}` : 'Select Location'}
                </p>
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

      {/* Location Modal */}
      <Dialog open={locationModalOpen} onOpenChange={setLocationModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Delivery Location</DialogTitle>
            <DialogDescription>
              Choose your delivery location to see available products and delivery times.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {!showManualSelection ? (
              <>
                <LocationSearch
                  onLocationSelect={handleLocationSelect}
                />
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setShowManualSelection(true)}
                    className="text-sm text-[#8B2FC9] hover:underline"
                  >
                    Can't find your location? Select manually
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div
                  className="flex items-center gap-2 text-[#8B2FC9] cursor-pointer hover:bg-purple-50 p-2 rounded-md transition-colors border border-dashed border-[#8B2FC9] justify-center"
                  onClick={detectAndFillManualLocation}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    {isAreaLoading ? (
                      <div className="w-4 h-4 border-2 border-[#8B2FC9] border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                  </div>
                  <span className="font-medium text-sm">Use Current Location</span>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">State</label>
                  <select
                    className="w-full p-2 border rounded-md bg-white"
                    value={manualState}
                    onChange={(e) => {
                      setManualState(e.target.value);
                      setManualCity('');
                      setManualArea('');
                    }}
                  >
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <select
                    className="w-full p-2 border rounded-md bg-white"
                    value={manualCity}
                    onChange={(e) => {
                      setManualCity(e.target.value);
                      setManualArea('');
                    }}
                  >
                    <option value="">Select City</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 relative">
                  <label className="text-sm font-medium text-gray-700">Area / Locality</label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder={cityAreas[manualCity] ? "Select or search area" : "Type to search area"}
                      value={manualArea}
                      onChange={(e) => {
                        setManualArea(e.target.value);
                        const query = e.target.value.toLowerCase();

                        // If we have hardcoded areas, filter them
                        if (cityAreas[manualCity]) {
                          const filtered = cityAreas[manualCity].filter(area =>
                            area.toLowerCase().includes(query)
                          );
                          setAreaSuggestions(filtered);

                          // If no local matches and query is long enough, try online search
                          if (filtered.length === 0 && query.length > 2) {
                            fetchAreaSuggestions(e.target.value);
                          }
                        } else {
                          // No hardcoded areas, just search online
                          if (query.length > 2) {
                            fetchAreaSuggestions(e.target.value);
                          } else {
                            setAreaSuggestions([]);
                          }
                        }
                      }}
                      onFocus={() => {
                        // On focus, show hardcoded list if available and input is empty
                        if (cityAreas[manualCity] && !manualArea) {
                          setAreaSuggestions(cityAreas[manualCity]);
                        }
                      }}
                      disabled={!manualCity}
                      className="w-full pr-10"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      {isAreaLoading ? (
                        <div className="w-4 h-4 border-2 border-[#8B2FC9] border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                  </div>

                  {areaSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto">
                      {areaSuggestions.map((area, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-purple-50 cursor-pointer text-sm truncate"
                          onClick={() => {
                            setManualArea(area);
                            setAreaSuggestions([]);
                          }}
                        >
                          {area}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  className="w-full bg-[#8B2FC9] hover:bg-[#7a26b3] text-white mt-2"
                  onClick={handleManualSubmit}
                  disabled={!manualCity || !manualArea}
                >
                  Confirm Location
                </Button>

                <div className="mt-2 text-center">
                  <button
                    onClick={() => setShowManualSelection(false)}
                    className="text-sm text-[#8B2FC9] hover:underline"
                  >
                    Back to Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </DialogContent >
      </Dialog >
    </header >
  );
};

export default Header;
