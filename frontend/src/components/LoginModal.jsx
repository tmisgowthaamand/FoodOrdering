import React, { useState } from 'react';
import { X, Phone, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const LoginModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('login'); // login, signup, otp
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = () => {
    if (phone.length === 10) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setMode('otp');
      }, 1500);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onClose();
        // Reset states
        setPhone('');
        setOtp('');
        setMode('login');
      }, 1500);
    }
  };

  const handleSignup = () => {
    if (name && email && phone.length === 10) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setMode('otp');
      }, 1500);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-[#8B2FC9] to-purple-600 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              {mode === 'login' && 'Welcome Back!'}
              {mode === 'signup' && 'Create Account'}
              {mode === 'otp' && 'Verify OTP'}
            </DialogTitle>
          </DialogHeader>
          <p className="text-purple-200 mt-1">
            {mode === 'login' && 'Login to get groceries in 10 minutes'}
            {mode === 'signup' && 'Join us for amazing deals'}
            {mode === 'otp' && `We sent a code to +91 ${phone}`}
          </p>
        </div>

        <div className="p-6">
          {/* Login Form */}
          {mode === 'login' && (
            <div className="space-y-4">
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="pl-10 py-3"
                  maxLength={10}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  +91
                </span>
              </div>

              <Button
                onClick={handleSendOtp}
                disabled={phone.length !== 10 || isLoading}
                className="w-full bg-[#8B2FC9] hover:bg-[#7a26b3] text-white py-3 rounded-lg font-semibold"
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="text-[#8B2FC9] font-semibold hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
          )}

          {/* Signup Form */}
          {mode === 'signup' && (
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 py-3"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 py-3"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="tel"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="pl-10 py-3"
                  maxLength={10}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  +91
                </span>
              </div>

              <Button
                onClick={handleSignup}
                disabled={!name || !email || phone.length !== 10 || isLoading}
                className="w-full bg-[#8B2FC9] hover:bg-[#7a26b3] text-white py-3 rounded-lg font-semibold"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-[#8B2FC9] font-semibold hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          )}

          {/* OTP Verification */}
          {mode === 'otp' && (
            <div className="space-y-4">
              <div className="flex justify-center gap-2">
                {[...Array(6)].map((_, i) => (
                  <Input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={otp[i] || ''}
                    onChange={(e) => {
                      const newOtp = otp.split('');
                      newOtp[i] = e.target.value;
                      setOtp(newOtp.join('').slice(0, 6));
                      if (e.target.value && e.target.nextSibling) {
                        e.target.nextSibling.focus();
                      }
                    }}
                    className="w-12 h-12 text-center text-lg font-semibold"
                  />
                ))}
              </div>

              <Button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6 || isLoading}
                className="w-full bg-[#8B2FC9] hover:bg-[#7a26b3] text-white py-3 rounded-lg font-semibold"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Button>

              <p className="text-center text-sm text-gray-600">
                Didn't receive OTP?{' '}
                <button className="text-[#8B2FC9] font-semibold hover:underline">
                  Resend OTP
                </button>
              </p>

              <button
                onClick={() => setMode('login')}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700"
              >
                ← Back to Login
              </button>
            </div>
          )}

          <p className="text-xs text-gray-400 text-center mt-6">
            By continuing, you agree to our{' '}
            <a href="#" className="text-[#8B2FC9] hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-[#8B2FC9] hover:underline">Privacy Policy</a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
