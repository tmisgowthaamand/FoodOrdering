import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
    const { user, signOut } = useAuth();

    return (
        <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>

            <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={user?.user_metadata?.full_name || user?.full_name || ''}
                            disabled
                            className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-gray-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            disabled
                            className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-gray-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <input
                            type="text"
                            value={user?.role || 'customer'}
                            disabled
                            className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-gray-500 capitalize"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border shadow-sm p-6">
                <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
                <p className="text-sm text-gray-500 mb-4">
                    Sign out of your admin session.
                </p>
                <button
                    onClick={signOut}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition-colors"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Settings;
