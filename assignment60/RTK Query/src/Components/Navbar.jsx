import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCart, selectCartItemCount } from '../store/cartSlice'
import { setSearchQuery, selectSearchQuery } from '../store/filterSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const itemCount = useSelector(selectCartItemCount)
  const searchQuery = useSelector(selectSearchQuery)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value))
    // Scroll to products section when searching
    if (e.target.value) {
      const productsSection = document.getElementById('products-section')
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const clearSearch = () => {
    dispatch(setSearchQuery(''))
  }

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Products', href: '#products' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-500 shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer transform hover:scale-105 transition-transform duration-300">
            <img src="/logo.svg" alt="ShopHub Logo" className="h-12 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/90 hover:text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-sm transform hover:scale-105"
                >
                  {link.name}
                </a>
              ))}
              
              {/* Search Bar */}
              <div className="relative ml-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search products..."
                    className="w-64 pl-10 pr-10 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-300"
                  />
                  <svg 
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              
              {/* CTA Button */}
              <button className="ml-4 bg-white text-teal-600 px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-gray-50">
                Get Started
              </button>
              
              {/* Cart Icon with Badge */}
              <button 
                onClick={() => dispatch(toggleCart())}
                className="relative ml-4 bg-white/10 hover:bg-white/20 p-2.5 rounded-lg transition-all duration-300 backdrop-blur-sm transform hover:scale-105"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-300"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20 animate-in slide-in-from-top">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-300"
              />
              <svg 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Links */}
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:bg-white/20 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center justify-between group"
                >
                  {link.name}
                  <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <button className="w-full bg-white text-teal-600 px-4 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transform active:scale-95 transition-all duration-300">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
