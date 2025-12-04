import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, ShoppingBag, Package, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className={`p-3 rounded-xl ${color}`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
    </div>
);

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0,
        totalRevenue: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // Fetch counts
            const { count: productsCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
            const { count: ordersCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });
            const { count: usersCount } = await supabase.from('users').select('*', { count: 'exact', head: true });

            // Calculate revenue (simplified)
            const { data: orders } = await supabase.from('orders').select('total_amount');
            const revenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

            setStats({
                totalOrders: ordersCount || 0,
                totalProducts: productsCount || 0,
                totalUsers: usersCount || 0,
                totalRevenue: revenue
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Orders"
                    value={stats.totalOrders}
                    icon={ShoppingBag}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Total Revenue"
                    value={`₹${stats.totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    color="bg-green-500"
                />
                <StatCard
                    title="Total Products"
                    value={stats.totalProducts}
                    icon={Package}
                    color="bg-purple-500"
                />
                <StatCard
                    title="Total Customers"
                    value={stats.totalUsers}
                    icon={Users}
                    color="bg-orange-500"
                />
            </div>
        </div>
    );
};

export default AdminDashboard;
