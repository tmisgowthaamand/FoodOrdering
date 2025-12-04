import React from 'react';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children, activePage, onNavigate }) => {
    const { signOut } = useAuth();

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar
                activePage={activePage}
                onNavigate={onNavigate}
                onLogout={signOut}
            />
            <main className="flex-1 p-8 overflow-y-auto h-screen">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
