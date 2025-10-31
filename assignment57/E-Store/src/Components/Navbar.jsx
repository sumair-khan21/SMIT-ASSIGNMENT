import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Search } from 'lucide-react';
import { useCart } from '../Context/CartContext';

const Navbar = ({ onSearch, onFilter }) => {
  const { cartItems, toggleSidebar } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedFilter(value);
    if (onFilter) onFilter(value);
  };

  return (
    <nav className="bg-white shadow-md p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
      {/* Left: Logo */}
      <div className="flex justify-between items-center w-full md:w-auto">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          🛍️ FakeStore
        </Link>
      </div>

      {/* Center: Search + Filter */}
      <div className="flex items-center gap-2 w-full md:w-1/3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full border border-gray-300 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search
            size={18}
            className="absolute left-3 top-2.5 text-gray-400"
          />
        </div>

        {/* Filter Dropdown */}
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>
      </div>

      {/* Right: Nav Links + Cart */}
      <div className="flex items-center gap-6 ">
        <ul className="hidden md:flex space-x-12 text-xl">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-indigo-600 font-semibold'
                  : 'text-gray-600 hover:text-indigo-600'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? 'text-indigo-600 font-semibold'
                  : 'text-gray-600 hover:text-indigo-600'
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? 'text-indigo-600 font-semibold'
                  : 'text-gray-600 hover:text-indigo-600'
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? 'text-indigo-600 font-semibold'
                  : 'text-gray-600 hover:text-indigo-600'
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Cart Icon */}
        <div className="relative cursor-pointer" onClick={toggleSidebar}>
          <ShoppingCart size={28} className="text-indigo-600" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
