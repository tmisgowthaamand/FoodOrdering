import React, { useState, useEffect, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import { Package, Truck, MapPin, Phone, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { GOOGLE_MAPS_API_KEY } from '../config';
import './LiveOrderTracking.css';

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '16px',
};

// Mock coordinates for demo (Store in Chennai)
const STORE_LOCATION = { lat: 13.0827, lng: 80.2707 };

const LiveOrderTracking = ({ order, trackingData, onCancel }) => {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
    });

    const [map, setMap] = useState(null);
    const [driverLocation, setDriverLocation] = useState(STORE_LOCATION);
    const [customerLocation, setCustomerLocation] = useState(null);
    const [eta, setEta] = useState('15 mins');
    const [progress, setProgress] = useState(0);

    // Calculate progress based on status
    useEffect(() => {
        if (!trackingData) return;

        const status = trackingData.order_status;
        let newProgress = 0;

        switch (status) {
            case 'confirmed': newProgress = 10; break;
            case 'preparing': newProgress = 30; break;
            case 'ready_for_pickup': newProgress = 50; break;
            case 'out_for_delivery': newProgress = 75; break;
            case 'nearby': newProgress = 90; break;
            case 'delivered': newProgress = 100; break;
            default: newProgress = 0;
        }

        setProgress(newProgress);
    }, [trackingData]);

    // Simulate driver movement if out for delivery
    useEffect(() => {
        if (trackingData?.order_status === 'out_for_delivery' && customerLocation) {
            const interval = setInterval(() => {
                setDriverLocation(prev => {
                    // Simple linear interpolation for demo
                    const latDiff = customerLocation.lat - prev.lat;
                    const lngDiff = customerLocation.lng - prev.lng;

                    if (Math.abs(latDiff) < 0.0001 && Math.abs(lngDiff) < 0.0001) {
                        return prev;
                    }

                    return {
                        lat: prev.lat + latDiff * 0.05,
                        lng: prev.lng + lngDiff * 0.05
                    };
                });
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [trackingData?.order_status, customerLocation]);

    // Geocode customer address (Mock for now, using a fixed offset from store)
    useEffect(() => {
        // In a real app, use Geocoding API here
        // For demo, place customer slightly away from store
        setCustomerLocation({
            lat: STORE_LOCATION.lat + 0.02,
            lng: STORE_LOCATION.lng + 0.02
        });
    }, []);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(STORE_LOCATION);
        if (customerLocation) bounds.extend(customerLocation);
        map.fitBounds(bounds);
        setMap(map);
    }, [customerLocation]);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    const getStatusMessage = (status) => {
        switch (status) {
            case 'confirmed': return 'Order Confirmed';
            case 'preparing': return 'Preparing your food';
            case 'out_for_delivery': return 'Out for Delivery';
            case 'delivered': return 'Delivered';
            case 'cancelled': return 'Order Cancelled';
            default: return 'Processing';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'preparing': return <Package className="w-6 h-6 text-blue-500" />;
            case 'out_for_delivery': return <Truck className="w-6 h-6 text-orange-500" />;
            case 'delivered': return <CheckCircle className="w-6 h-6 text-green-500" />;
            default: return <Clock className="w-6 h-6 text-gray-500" />;
        }
    };

    if (loadError) {
        return (
            <div className="live-tracking-container error-state">
                <div className="p-8 text-center">
                    <p className="text-red-500 mb-2">Unable to load map</p>
                    <p className="text-sm text-gray-500">{loadError.message}</p>
                </div>
                {/* Still show status sheet even if map fails */}
                <div className="tracking-sheet static-sheet">
                    <div className="status-header-row">
                        <div className="status-icon-wrapper">
                            {getStatusIcon(trackingData.order_status)}
                        </div>
                        <div className="status-text">
                            <h3>{getStatusMessage(trackingData.order_status)}</h3>
                            <p>{trackingData.order_status === 'delivered' ? 'Enjoy your meal!' : `Arriving in ${eta}`}</p>
                        </div>
                    </div>
                    {/* Cancel Button (if applicable) */}
                    {trackingData.can_cancel && (
                        <button
                            onClick={onCancel}
                            className="w-full mt-4 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors"
                        >
                            Cancel Order
                        </button>
                    )}
                </div>
            </div>
        );
    }

    if (!isLoaded) return <div className="map-loading">Loading Map...</div>;

    return (
        <div className="live-tracking-container">
            {/* Map Section */}
            <div className="map-wrapper">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={STORE_LOCATION}
                    zoom={13}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={{
                        disableDefaultUI: true,
                        styles: [
                            {
                                featureType: "poi",
                                elementType: "labels",
                                stylers: [{ visibility: "off" }]
                            }
                        ]
                    }}
                >
                    {/* Store Marker */}
                    <Marker
                        position={STORE_LOCATION}
                        icon={{
                            url: 'https://cdn-icons-png.flaticon.com/512/3082/3082383.png', // Shop icon
                            scaledSize: new window.google.maps.Size(40, 40)
                        }}
                    />

                    {/* Customer Marker */}
                    {customerLocation && (
                        <Marker
                            position={customerLocation}
                            icon={{
                                url: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Home icon
                                scaledSize: new window.google.maps.Size(40, 40)
                            }}
                        />
                    )}

                    {/* Driver Marker (Moving) */}
                    {trackingData.order_status === 'out_for_delivery' && (
                        <Marker
                            position={driverLocation}
                            icon={{
                                url: 'https://cdn-icons-png.flaticon.com/512/713/713311.png', // Scooter icon
                                scaledSize: new window.google.maps.Size(50, 50)
                            }}
                            animation={window.google.maps.Animation.DROP}
                        />
                    )}

                    {/* Route Line */}
                    {customerLocation && (
                        <Polyline
                            path={[STORE_LOCATION, customerLocation]}
                            options={{
                                strokeColor: "#8B2FC9",
                                strokeOpacity: 0.8,
                                strokeWeight: 4,
                                geodesic: true,
                            }}
                        />
                    )}
                </GoogleMap>

                {/* Live Status Badge */}
                <div className="live-status-badge">
                    <span className="pulse-dot"></span>
                    LIVE TRACKING
                </div>
            </div>

            {/* Bottom Sheet / Status Card */}
            <div className="tracking-sheet">
                <div className="sheet-handle"></div>

                <div className="status-header-row">
                    <div className="status-icon-wrapper">
                        {getStatusIcon(trackingData.order_status)}
                    </div>
                    <div className="status-text">
                        <h3>{getStatusMessage(trackingData.order_status)}</h3>
                        <p>{trackingData.order_status === 'delivered' ? 'Enjoy your meal!' : `Arriving in ${eta}`}</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="tracking-progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Delivery Partner Info */}
                {trackingData.delivery && trackingData.delivery.partner_name && (
                    <div className="driver-info-card">
                        <div className="driver-avatar">
                            <img src="https://cdn-icons-png.flaticon.com/512/4825/4825038.png" alt="Driver" />
                        </div>
                        <div className="driver-details">
                            <h4>{trackingData.delivery.partner_name}</h4>
                            <p>Delivery Partner</p>
                        </div>
                        <a href={`tel:${trackingData.delivery.partner_phone}`} className="call-driver-btn">
                            <Phone size={20} />
                        </a>
                    </div>
                )}

                {/* Cancel Button (if applicable) */}
                {trackingData.can_cancel && (
                    <button
                        onClick={onCancel}
                        className="w-full mt-4 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors"
                    >
                        Cancel Order
                    </button>
                )}
            </div>
        </div>
    );
};

export default LiveOrderTracking;
