import React from 'react';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loader />;
    }

    if (!user || user.role !== 'admin') {
        // Redirect to home if not admin
        // You might want to show a "Access Denied" page or toast instead
        window.location.href = '/';
        return null;
    }

    return children;
};

export default AdminRoute;
