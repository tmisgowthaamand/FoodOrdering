import React, { useState } from 'react';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import ProductManager from './pages/ProductManager';

const AdminApp = () => {
    const [activePage, setActivePage] = useState('dashboard');

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard': return <AdminDashboard />;
            case 'products': return <ProductManager />;
            case 'orders': return <div className="text-center py-20 text-gray-500">Orders Management Coming Soon</div>;
            case 'customers': return <div className="text-center py-20 text-gray-500">Customer Management Coming Soon</div>;
            case 'settings': return <div className="text-center py-20 text-gray-500">Settings Coming Soon</div>;
            default: return <AdminDashboard />;
        }
    };

    return (
        <AdminLayout activePage={activePage} onNavigate={setActivePage}>
            {renderPage()}
        </AdminLayout>
    );
};

export default AdminApp;
