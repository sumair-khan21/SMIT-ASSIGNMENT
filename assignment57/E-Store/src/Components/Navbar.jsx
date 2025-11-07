import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  User, 
  Heart, 
  ChevronDown,
  Package,
  LogOut,
  UserCircle,
  Settings,
  ShoppingBag,
  LogIn,
  UserPlus,
  Gem
} from 'lucide-react';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';
import {   useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems, toggleSidebar } = useCart();
  const wishlistItems = [1, 2, 3];
  const toggleWishlistSidebar = () => console.log('Wishlist sidebar opened');
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const { user, signOut } = useAuth();
const isLoggedIn = !!user;
const username = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userMenuItems = isLoggedIn ? [
  { icon: UserCircle, label: 'My Account', link: '/account' },
  { icon: Package, label: 'My Orders', link: '/orders' },
  { icon: Heart, label: 'My Wishlist', link: '/wishlist' },
  { icon: Settings, label: 'Settings', link: '/settings' },
  { icon: LogOut, label: 'Logout', link: '/logout', isLogout: true }, // ADD isLogout flag
] : [
  { icon: LogIn, label: 'Login', link: '/login' },
  { icon: UserPlus, label: 'Register', link: '/signup' },
];

  return (
    <>
      {/* Font Imports */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&family=Cabinet+Grotesk:wght@700;800&family=Satoshi:wght@400;500;700;900&display=swap');
          
          /* Custom Font Face for Satoshi if Google Fonts doesn't work */
          @font-face {
            font-family: 'Satoshi';
            src: url('https://cdn.jsdelivr.net/npm/@fontsource/satoshi@latest/files/satoshi-variable.woff2') format('woff2');
          }
        `}
      </style>

      <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-indigo-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Enhanced Logo with Purple & Blue Theme */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-3">
                  <Gem size={24} className="text-white" strokeWidth={2} />
                </div>
              </div>
              <div className="flex flex-col">
                <span 
                  className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-700 bg-clip-text text-transparent"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  PricePanda
                </span>
                <span 
                  className="text-[10px] text-gray-500 -mt-1 tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}
                >
                  Premium Shopping
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex space-x-8">
              {['Home', 'Products', 'About', 'Contact'].map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className={({ isActive }) => `
                      relative py-2 text-base font-medium transition-all duration-200
                      ${isActive 
                        ? 'text-indigo-700' 
                        : 'text-gray-700 hover:text-indigo-600'
                      }
                      after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px]
                      after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500
                      after:transform after:origin-left
                      ${isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}
                      after:transition-transform after:duration-300
                    `}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Right Icons Section */}
            <div className="flex items-center space-x-3">
              {/* User Account Dropdown */}
              <div className="hidden md:block relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 border border-indigo-200"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <div className="relative">
                    <User className="w-5 h-5 text-indigo-700" />
                    {isLoggedIn && (
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-purple-500 rounded-full border border-white animate-pulse" />
                    )}
                  </div>
                  {isLoggedIn && (
                    <span className="text-sm font-medium text-indigo-800 max-w-[100px] truncate">
                      {username}
                    </span>
                  )}
                  <ChevronDown 
                    className={`w-4 h-4 text-indigo-600 transition-transform duration-200 ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-indigo-100 overflow-hidden animate-slideDown">
                    {isLoggedIn && (
                      <div className="px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white font-bold border border-white/30"
                               style={{ fontFamily: "'Syne', sans-serif" }}>
                            {username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                              {username}
                            </p>
                            <p className="text-xs text-indigo-50">john.doe@example.com</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="py-2">
                      {userMenuItems.map((item, index) => {
  const Icon = item.icon;
  const isLogout = item.label === 'Logout';
  return (
    item.isLogout ? (
      <button
        key={index}
        onClick={() => {
          setDropdownOpen(false);
          signOut();
          navigate('/login');
        }}
        className={`flex items-center space-x-3 px-4 py-2.5 text-sm transition-all duration-150 w-full text-left ${
          isLogout 
            ? 'text-rose-600 hover:bg-rose-50 border-t border-gray-100 mt-2'
            : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700'
        }`}
        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
      >
        <Icon className="w-4 h-4" />
        <span>{item.label}</span>
      </button>
    ) : (
      <Link
        key={index}
        to={item.link}
        className={`flex items-center space-x-3 px-4 py-2.5 text-sm transition-all duration-150 ${
          isLogout 
            ? 'text-rose-600 hover:bg-rose-50 border-t border-gray-100 mt-2'
            : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700'
        }`}
        onClick={() => setDropdownOpen(false)}
        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
      >
        <Icon className="w-4 h-4" />
        <span>{item.label}</span>
        {item.label === 'My Wishlist' && wishlistItems.length > 0 && (
          <span className="ml-auto bg-gradient-to-r from-purple-400 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
            {wishlistItems.length}
          </span>
        )}
      </Link>
    )
  );
})}
                    </div>
                  </div>
                )}
              </div>

              {/* Wishlist Icon */}
              <button
                onClick={toggleWishlistSidebar}
                className="relative p-2 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 border border-purple-200 group"
              >
                <Heart 
                  className={`w-5 h-5 transition-all duration-200 ${
                    wishlistItems.length > 0 
                      ? 'text-purple-500 fill-purple-500' 
                      : 'text-purple-600 group-hover:text-purple-700'
                  }`}
                />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-400 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-lg"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {wishlistItems.length}
                  </span>
                )}
              </button>

              {/* Shopping Cart Icon */}
              <button
                onClick={toggleSidebar}
                className="relative p-2 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 border border-indigo-200 group"
              >
                <ShoppingCart 
                  className="w-5 h-5 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-200" 
                />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-lg"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {cartItems.length}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 border border-indigo-200"
                onClick={toggleMenu}
              >
                {menuOpen ? (
                  <X className="w-5 h-5 text-indigo-700" />
                ) : (
                  <Menu className="w-5 h-5 text-indigo-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-indigo-100 animate-slideDown">
            {/* User Info for Mobile */}
            {isLoggedIn && (
              <div className="px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white font-bold border border-white/30"
                       style={{ fontFamily: "'Syne', sans-serif" }}>
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {username}
                    </p>
                    <p className="text-xs text-indigo-50">john.doe@example.com</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Navigation Links */}
            <div className="py-2">
              {['Home', 'Products', 'About', 'Contact'].map((item, index) => (
                <NavLink
                  key={index}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-l-4 border-indigo-500'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}
                >
                  {item}
                </NavLink>
              ))}

              {/* Divider */}
              <div className="border-t border-indigo-100 my-2"></div>

              {/* Mobile Wishlist */}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  toggleWishlistSidebar();
                }}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 flex items-center justify-between"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
              >
                <span className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-purple-600" />
                  <span>Wishlist</span>
                </span>
                {wishlistItems.length > 0 && (
                  <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-full text-xs px-2 py-1">
                    {wishlistItems.length}
                  </span>
                )}
              </button>

              {/* Mobile User Menu */}
{userMenuItems.map((item, index) => {
  const Icon = item.icon;
  const isLogout = item.label === 'Logout';
  
  if (item.isLogout) {
    return (
      <button
        key={index}
        onClick={() => {
          setMenuOpen(false);
          signOut();
          navigate('/login');
        }}
        className={`w-full text-left px-4 py-3 flex items-center space-x-3 ${
          isLogout 
            ? 'text-rose-600 hover:bg-rose-50 border-t border-gray-100 mt-2'
            : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50'
        }`}
        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
      >
        <Icon className="w-5 h-5" />
        <span>{item.label}</span>
      </button>
    );
  }
  
  return (
    <Link
      key={index}
      to={item.link}
      onClick={() => setMenuOpen(false)}
      className={`w-full text-left px-4 py-3 flex items-center space-x-3 ${
        isLogout 
          ? 'text-rose-600 hover:bg-rose-50 border-t border-gray-100 mt-2'
          : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50'
      }`}
      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
    >
      <Icon className="w-5 h-5" />
      <span>{item.label}</span>
    </Link>
  );
})}
            </div>
          </div>
        )}

        {/* Animation Styles */}
        <style jsx>{`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideDown {
            animation: slideDown 0.3s ease-out;
          }
        `}</style>
      </nav>
    </>
  );
};

export default Navbar;