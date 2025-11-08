import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { 
  Mail, 
  ArrowLeft,
  AlertCircle,
  Loader,
  ShoppingBag,
  CheckCircle,
  Shield,
  Clock,
  Send
} from 'lucide-react';

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateEmail();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setMessage('');
    
    const result = await resetPassword(email);
    
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setIsSuccess(true);
      setEmail('');
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-500/30 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="absolute top-20 left-20 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-40 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Information */}
          <div className="hidden lg:block text-white">
            <div className="space-y-8">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="p-4 bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 shadow-2xl">
                  <ShoppingBag className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">PricePanda</h1>
                  <p className="text-indigo-200">Password Recovery</p>
                </div>
              </div>

              {/* Info Cards */}
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Secure Process</h3>
                      <p className="text-indigo-200 text-sm">
                        We'll send a secure password reset link to your email address. 
                        The link will expire in 1 hour for security purposes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Quick Response</h3>
                      <p className="text-indigo-200 text-sm">
                        You should receive the password reset email within 2-5 minutes. 
                        Don't forget to check your spam folder!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                      <p className="text-indigo-200 text-sm">
                        If you don't receive the email, please contact our support team at 
                        <span className="font-semibold text-white"> support@pricepanda.com</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back to Login Link */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <p className="text-indigo-200 text-center">
                  Remember your password?{' '}
                  <Link to="/login" className="text-white font-semibold hover:underline">
                    Back to Login
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Reset Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/50">
              
              {/* Mobile Logo */}
              <div className="lg:hidden text-center mb-6">
                <Link to="/" className="inline-flex items-center space-x-2">
                  <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl">
                    <ShoppingBag className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    PricePanda
                  </span>
                </Link>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-4">
                  <Mail className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
                <p className="text-gray-600">
                  {isSuccess 
                    ? 'Check your email for reset instructions'
                    : 'No worries, we\'ll send you reset instructions'
                  }
                </p>
              </div>

              {/* Message Alert */}
              {message && (
                <div className={`mb-6 p-4 rounded-xl flex items-start space-x-3 ${
                  message.type === 'success' ? 'bg-green-50 border-2 border-green-200' :
                  'bg-red-50 border-2 border-red-200'
                }`}>
                  {message.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 mt-0.5 text-green-600 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 mt-0.5 text-red-600 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${
                    message.type === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}>{message.text}</span>
                </div>
              )}

              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({});
                        }}
                        className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                          errors.email 
                            ? 'border-red-300 focus:border-red-500 bg-red-50' 
                            : 'border-gray-200 focus:border-purple-500 bg-white'
                        }`}
                        placeholder="Enter your email address"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Reset Link</span>
                      </>
                    )}
                  </button>

                  {/* Back to Login */}
                  <Link
                    to="/login"
                    className="flex items-center justify-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Login</span>
                  </Link>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Success State */}
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-green-800 mb-2">
                      Email Sent Successfully!
                    </h3>
                    <p className="text-sm text-green-700">
                      We've sent password reset instructions to <strong>{email}</strong>
                    </p>
                  </div>

                  {/* Instructions */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Next Steps:</h4>
                    <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside">
                      <li>Check your email inbox</li>
                      <li>Click the reset link in the email</li>
                      <li>Create a new password</li>
                      <li>Sign in with your new password</li>
                    </ol>
                  </div>

                  {/* Resend & Back Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setMessage('');
                      }}
                      className="w-full py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-all"
                    >
                      Resend Email
                    </button>
                    
                    <Link
                      to="/login"
                      className="block w-full py-3 text-center bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                    >
                      Back to Login
                    </Link>
                  </div>
                </div>
              )}

              {/* Help Text */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Didn't receive the email? Check your spam folder or{' '}
                  <Link to="/contact" className="text-indigo-600 hover:text-purple-600 font-medium">
                    contact support
                  </Link>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;