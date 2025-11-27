import React, { useState, useRef } from 'react';
import { Phone, Mail, User, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

// Google Icon SVG Component
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const LoginModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('login'); // login, signup, otp
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const otpRefs = useRef([]);

  const { signInWithGoogle, signInWithPhone, verifyOtp } = useAuth();

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setError(error.message);
        toast.error('Google sign-in failed', { description: error.message });
      }
      // Note: User will be redirected to Google for authentication
      // The modal will close automatically when auth state changes
    } catch (err) {
      setError(err.message || 'Failed to sign in with Google');
      toast.error('Sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Send OTP
  const handleSendOtp = async () => {
    if (phone.length !== 10) return;
    
    setIsLoading(true);
    setError('');
    try {
      const { error } = await signInWithPhone(phone);
      if (error) {
        setError(error.message);
        toast.error('Failed to send OTP', { description: error.message });
      } else {
        setMode('otp');
        toast.success('OTP sent!', { description: `Check your phone +91 ${phone}` });
      }
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
      toast.error('Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP Input Change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // Handle OTP Key Down (for backspace)
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) return;
    
    setIsLoading(true);
    setError('');
    try {
      const { error } = await verifyOtp(phone, otpString);
      if (error) {
        setError(error.message);
        toast.error('Invalid OTP', { description: error.message });
      } else {
        toast.success('Login successful!');
        onClose();
        resetForm();
      }
    } catch (err) {
      setError(err.message || 'Failed to verify OTP');
      toast.error('Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Signup (for phone-based signup)
  const handleSignup = async () => {
    if (!name || !email || phone.length !== 10) return;
    
    setIsLoading(true);
    setError('');
    try {
      const { error } = await signInWithPhone(phone);
      if (error) {
        setError(error.message);
        toast.error('Failed to send OTP', { description: error.message });
      } else {
        setMode('otp');
        toast.success('OTP sent!', { description: `Check your phone +91 ${phone}` });
      }
    } catch (err) {
      setError(err.message || 'Failed to create account');
      toast.error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    setIsLoading(true);
    setError('');
    try {
      const { error } = await signInWithPhone(phone);
      if (error) {
        setError(error.message);
        toast.error('Failed to resend OTP');
      } else {
        toast.success('OTP resent!');
        setOtp(['', '', '', '', '', '']);
      }
    } catch (err) {
      setError(err.message);
      toast.error('Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setPhone('');
    setOtp(['', '', '', '', '', '']);
    setName('');
    setEmail('');
    setMode('login');
    setError('');
  };

  // Handle modal close
  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          {mode === 'login' && (
            <div className="space-y-4">
              {/* Google Sign In Button */}
              <Button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                variant="outline"
                className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-3 border-2 hover:bg-gray-50"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <GoogleIcon />
                )}
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or login with phone</span>
                </div>
              </div>

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
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : null}
                {isLoading ? 'Sending...' : 'Send OTP'}
              </Button>

              <p className="text-center text-sm text-gray-600">
                {"Don't have an account?"}{' '}
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
              {/* Google Sign Up Button */}
              <Button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                variant="outline"
                className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-3 border-2 hover:bg-gray-50"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <GoogleIcon />
                )}
                Sign up with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or sign up with phone</span>
                </div>
              </div>

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
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : null}
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
                {otp.map((digit, i) => (
                  <Input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value.replace(/\D/g, ''))}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-12 h-12 text-center text-lg font-semibold"
                  />
                ))}
              </div>

              <Button
                onClick={handleVerifyOtp}
                disabled={otp.join('').length !== 6 || isLoading}
                className="w-full bg-[#8B2FC9] hover:bg-[#7a26b3] text-white py-3 rounded-lg font-semibold"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : null}
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Button>

              <p className="text-center text-sm text-gray-600">
                Didn't receive OTP?{' '}
                <button 
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className="text-[#8B2FC9] font-semibold hover:underline"
                >
                  Resend OTP
                </button>
              </p>

              <button
                onClick={() => {
                  setMode('login');
                  setOtp(['', '', '', '', '', '']);
                }}
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
