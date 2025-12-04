// API Configuration
// This file centralizes all environment variable access

const getApiUrl = () => {
    // Check if we're in production (Vercel deployment)
    const isProduction = window.location.hostname !== 'localhost';

    // Try to get from environment variable first
    const envApiUrl = process.env.REACT_APP_API_URL;

    if (envApiUrl) {
        console.log('Using API URL from environment:', envApiUrl);
        return envApiUrl;
    }

    // Fallback logic
    if (isProduction) {
        // Production fallback - use Render backend
        const productionUrl = 'https://foodeo-wuda.onrender.com';
        console.warn('REACT_APP_API_URL not set, using production fallback:', productionUrl);
        return productionUrl;
    } else {
        // Local development fallback
        const localUrl = 'http://localhost:8000';
        console.log('Using local development API:', localUrl);
        return localUrl;
    }
};

export const API_BASE_URL = getApiUrl();

// Supabase Configuration
export const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://msytkjavapigijxqreji.supabase.co';
export const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zeXRramF2YXBpZ2lqeHFyZWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMTcyODUsImV4cCI6MjA3OTc5MzI4NX0.a0RkoCttEO5TFVuND6VhkdYzHeP835sGcY-dALXKpbM';

// Razorpay Configuration
export const RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_Rn2y1nsEX5U59v';

// Google Maps Configuration
export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyDopJ5FAcJfD6SWlfhqaFtRSipB7OIZKOs';

// Log configuration on load (only in development)
if (process.env.NODE_ENV === 'development') {
    console.log('Configuration loaded:', {
        API_BASE_URL,
        SUPABASE_URL,
        RAZORPAY_KEY_ID: RAZORPAY_KEY_ID ? 'Set' : 'Not set',
        GOOGLE_MAPS_API_KEY: GOOGLE_MAPS_API_KEY ? 'Set' : 'Not set'
    });
}
