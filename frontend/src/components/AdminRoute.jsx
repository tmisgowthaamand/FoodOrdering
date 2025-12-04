import React from 'react';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

const AdminRoute = ({ children }) => {
    const { user, loading, signInWithEmail } = useAuth();

    // State for admin login
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loginError, setLoginError] = React.useState('');
    const [isLoggingIn, setIsLoggingIn] = React.useState(false);

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setLoginError('');

        const { error } = await signInWithEmail(email, password);
        if (error) {
            setLoginError(error.message);
        }
        setIsLoggingIn(false);
    };

    if (loading) {
        return <Loader />;
    }

    // 1. Not Logged In - Show Login Form
    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-[#8B2FC9]">Foodeo Admin</h1>
                        <p className="text-gray-500 mt-2">Please sign in to continue</p>
                    </div>

                    <form onSubmit={handleAdminLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] focus:border-transparent"
                                placeholder="admin@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B2FC9] focus:border-transparent"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {loginError && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                                {loginError}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="w-full py-3 bg-[#8B2FC9] text-white rounded-xl hover:bg-[#7A28B0] transition-colors font-medium disabled:opacity-70"
                        >
                            {isLoggingIn ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                        >
                            ← Back to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // 2. Logged In but Not Admin - Show Access Denied
    if (user.role !== 'admin') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
                    <p className="text-gray-500 mb-6">
                        You do not have permission to access the admin panel.
                        Current role: <span className="font-mono font-medium text-gray-700">{user.role || 'none'}</span>
                    </p>
                    <div className="space-y-3">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full py-2.5 px-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
                        >
                            Return Home
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-2.5 px-4 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                        >
                            Retry
                        </button>
                    </div>
                    {/* Debug Info */}
                    <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400 text-left">
                        <p className="font-mono">User ID: {user.id}</p>
                        <p className="font-mono mt-1">Email: {user.email}</p>
                    </div>
                </div>
            </div>
        );
    }

    return children;
};

export default AdminRoute;
