import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory, selectSelectedCategory } from '../store/filterSlice'

const Categories = () => {
  const dispatch = useDispatch()
  const selectedCategory = useSelector(selectSelectedCategory)
  
  // Smooth scroll to products section
  const handleCategoryClick = (categoryName) => {
    dispatch(setCategory(categoryName))
    // Scroll to products section
    const productsSection = document.getElementById('products-section')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  
  
  const categories = [
    {
      id: 'all',
      name: 'All Products',
      description: 'Browse our complete collection',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      gradient: "from-teal-500 to-emerald-500",
      bgGradient: "from-teal-50 to-emerald-50",
      itemCount: "20+"
    },
    {
      id: 'electronics',
      name: "Electronics",
      description: "Latest gadgets & tech",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      gradient: "from-teal-500 to-cyan-500",
      bgGradient: "from-teal-50 to-cyan-50",
      itemCount: "6+"
    },
    {
      id: 'jewelery',
      name: "Jewelery",
      description: "Elegant accessories",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      gradient: "from-emerald-500 to-cyan-500",
      bgGradient: "from-emerald-50 to-cyan-50",
      itemCount: "4+"
    },
    {
      id: "men's clothing",
      name: "Men's Clothing",
      description: "Stylish men's fashion",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      gradient: "from-cyan-500 to-emerald-500",
      bgGradient: "from-cyan-50 to-emerald-50",
      itemCount: "4+"
    },
    {
      id: "women's clothing",
      name: "Women's Clothing",
      description: "Trending women's styles",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      gradient: "from-teal-500 to-emerald-500",
      bgGradient: "from-teal-50 to-emerald-50",
      itemCount: "6+"
    }
  ]

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-10 right-1/4 w-64 h-64 bg-gradient-to-br from-teal-200 to-emerald-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-200 to-teal-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-in fade-in duration-700">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Shop by{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of products across different categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer animate-in slide-in-from-bottom ${
                selectedCategory === category.id ? 'ring-4 ring-teal-500 shadow-2xl' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative p-8">
                {/* Icon Container */}
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${category.gradient} text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  {category.icon}
                </div>

                {/* Category Info */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{category.description}</p>
                  
                  {/* Item Count Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-teal-100">
                    <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-700">{category.itemCount} Items</span>
                  </div>
                </div>

                {/* Explore Link */}
                <div className="flex items-center gap-2 text-teal-600 font-semibold group-hover:gap-3 transition-all duration-300">
                  Explore Now
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Decorative Corner Element */}
              <div className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${category.gradient} rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500`}></div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            View All Categories
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Categories
