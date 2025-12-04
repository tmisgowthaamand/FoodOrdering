import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, Mail, User } from 'lucide-react';

const CustomerManager = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setCustomers(data || []);
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredCustomers = customers.filter(customer =>
        customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search customers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-600 font-medium">
                            <tr>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Joined Date</th>
                                <th className="px-6 py-4">ID</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredCustomers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                                                {customer.full_name ? customer.full_name[0].toUpperCase() : <User className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{customer.full_name || 'No Name'}</div>
                                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                                    <Mail className="w-3 h-3" />
                                                    {customer.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${customer.role === 'admin'
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {customer.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(customer.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs text-gray-400">
                                        {customer.id}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CustomerManager;
