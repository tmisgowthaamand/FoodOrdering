import React, { useState, useEffect, useRef } from 'react';
import { Input } from './ui/input';
import { MapPin, Loader2, Search } from 'lucide-react';

const LocationSearch = ({ onLocationSelect }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    // Debounce utility
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.length > 2) {
                searchLocation(query);
            } else {
                setSuggestions([]);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const searchLocation = async (searchText) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}&addressdetails=1&countrycodes=in&limit=5`
            );
            const data = await response.json();
            setSuggestions(data);
            setShowSuggestions(true);
        } catch (error) {
            console.error("Error fetching location:", error);
        } finally {
            setLoading(false);
        }
    };

    const detectLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
                    );
                    const data = await response.json();

                    if (data && data.address) {
                        handleSelect(data);
                    }
                } catch (error) {
                    console.error("Error reverse geocoding:", error);
                    alert("Failed to fetch address details");
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
                setLoading(false);
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("User denied the request for Geolocation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        alert("The request to get user location timed out.");
                        break;
                    default:
                        alert("An unknown error occurred.");
                        break;
                }
            }
        );
    };

    const handleSelect = (place) => {
        const address = place.address;

        // Extract relevant details
        const area = address.suburb || address.neighbourhood || address.residential || address.road || place.name;
        const city = address.city || address.town || address.village || address.county;
        const state = address.state;
        const pincode = address.postcode;

        onLocationSelect({
            address: place.display_name,
            area: area || city || 'Unknown Area',
            city: city || 'Unknown City',
            state: state || '',
            pincode: pincode || '',
            lat: parseFloat(place.lat),
            lng: parseFloat(place.lon)
        });

        setQuery(place.display_name);
        setShowSuggestions(false);
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                    type="text"
                    placeholder="Search for area, street name..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowSuggestions(true);
                    }}
                    className="pl-10 py-6 text-lg w-full"
                />
                {loading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                    </div>
                )}
            </div>

            {/* Detect Location Button */}
            <div
                className="mt-3 flex items-center gap-2 text-[#8B2FC9] cursor-pointer hover:bg-purple-50 p-2 rounded-md transition-colors"
                onClick={detectLocation}
            >
                <div className="w-5 h-5 flex items-center justify-center">
                    {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                    )}
                </div>
                <div>
                    <p className="font-medium text-sm">Detect my location</p>
                    <p className="text-xs text-gray-500">Using GPS</p>
                </div>
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {suggestions.map((place, index) => (
                        <div
                            key={index}
                            className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 flex items-start gap-2"
                            onClick={() => handleSelect(place)}
                        >
                            <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                            <div className="text-sm text-gray-700">
                                {place.display_name}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-2 flex items-center justify-end gap-1">
                <span className="text-[10px] text-gray-400">Powered by OpenStreetMap</span>
            </div>
        </div>
    );
};

export default LocationSearch;
