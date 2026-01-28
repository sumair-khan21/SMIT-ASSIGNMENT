import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../redux/apiSlice';
import { setUser } from '../redux/authSlice';
import { Mail, Lock, LogIn, ArrowLeft, AlertCircle, ShoppingBag } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const data = await login({ email, password }).unwrap();
      dispatch(setUser(data.user));
      navigate('/');
    } catch (err) {
      setErrorMsg(err.data?.message || err.error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:px-24 xl:px-32 relative">
        <div className="absolute top-10 left-10">
          <Link to="/" className="flex items-center space-x-2 text-gray-400 hover:text-indigo-600 transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold text-sm">Back to store</span>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto space-y-10">
          <div className="text-center sm:text-left">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-8 mx-auto sm:mx-0 shadow-xl shadow-indigo-100 rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <ShoppingBag className="text-white w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Welcome Back</h1>
            <p className="text-gray-500 font-medium">Please enter your details to sign in to your account.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all outline-none text-gray-900 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">Forgot Password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all outline-none text-gray-900 font-medium"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-center space-x-2 p-4 bg-red-50 text-red-600 rounded-2xl animate-in fade-in zoom-in duration-300">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-bold">{errorMsg}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-gray-800 hover:shadow-2xl transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-500 font-medium">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 font-black hover:text-indigo-700 transition-colors hover:underline underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Visual Panel */}
      <div className="hidden lg:block lg:flex-1 relative overflow-hidden bg-indigo-600">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90" />
        <img 
          src="https://images.unsplash.com/photo-1555529669-2269763671c0?q=80&w=2070&auto=format&fit=crop" 
          alt="Login background" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 scale-110"
        />
        <div className="relative h-full flex flex-col justify-center items-center text-center p-20 space-y-12 animate-in fade-in slide-in-from-right-10 duration-1000">
          <div className="space-y-6 max-w-lg">
            <h2 className="text-5xl font-black text-white leading-tight tracking-tight">
              Start Your <br />Premium Shopping <br />Journey Today.
            </h2>
            <p className="text-lg text-indigo-100 font-medium leading-relaxed">
              Join thousands of happy customers and get access to exclusive deals, personalized recommendations, and high-speed delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/10">
              <p className="text-3xl font-black text-white">100%</p>
              <p className="text-indigo-100 font-bold text-sm">Secure Shopping</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/10">
              <p className="text-3xl font-black text-white">24/7</p>
              <p className="text-indigo-100 font-bold text-sm">Support Online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
