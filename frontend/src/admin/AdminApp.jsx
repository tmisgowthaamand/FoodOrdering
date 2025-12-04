import React, { useState } from 'react';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import ProductManager from './pages/ProductManager';
import OrderManager from './pages/OrderManager';
import CustomerManager from './pages/CustomerManager';
import Settings from './pages/Settings';

const AdminApp = () => {
    const [activePage, setActivePage] = useState('dashboard');

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard': return <AdminDashboard />;
            case 'products': return <ProductManager />;
            case 'orders': return <OrderManager />;
            case 'customers': return <CustomerManager />;
            case 'settings': return <Settings />;
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
