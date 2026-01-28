import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../redux/apiSlice';
import { logout } from '../redux/authSlice';
import { ShoppingCart, User, LogOut, Package, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center transform hover:rotate-12 transition-transform">
            <Package className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
             E-shop
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link to="/" className="hover:text-indigo-600 transition-colors">Shop</Link>
          <Link to="/" className="hover:text-indigo-600 transition-colors">Categories</Link>
          {user && (
            <Link to="/add-product" className="hover:text-indigo-600 transition-colors">Add Product</Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block text-gray-600">
            <Search className="w-5 h-5" />
          </button>
          
          {user ? (
            <div className="flex items-center space-x-2 sm:space-x-6">
              <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-indigo-600 text-white text-[10px] flex items-center justify-center rounded-full animate-pulse">2</span>
              </Link>
              
              <div className="flex items-center space-x-3 pl-2 sm:pl-4 border-l border-gray-200">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-gray-800 leading-none">{user.name}</p>
                  <p className="text-xs text-gray-500 mt-1 capitalize">{user.gender}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link 
                to="/login" 
                className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="hidden sm:block px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-95"
              >
                Get Started
              </Link>
            </div>
          )}

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 shadow-xl">
          <Link to="/" className="block text-gray-600 font-medium py-2">Home</Link>
          <Link to="/" className="block text-gray-600 font-medium py-2">Shop</Link>
          {user && (
            <Link to="/add-product" className="block text-gray-600 font-medium py-2">Add Product</Link>
          )}
          {!user && (
            <Link 
              to="/signup" 
              className="block w-full text-center px-5 py-3 bg-indigo-600 text-white font-bold rounded-xl"
            >
              Sign Up
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
