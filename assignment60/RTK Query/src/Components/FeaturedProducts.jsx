import React, { useState } from 'react'
import { useGetProductQuery } from '../services/products'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, openCart } from '../store/cartSlice'
import { selectSelectedCategory, selectSearchQuery, setSearchQuery } from '../store/filterSlice'
import ProductDetailModal from './ProductDetailModal'
import ProductSkeleton from './ProductSkeleton'

const FeaturedProducts = () => {
  const dispatch = useDispatch()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const selectedCategory = useSelector(selectSelectedCategory)
  const searchQuery = useSelector(selectSearchQuery)
  const { data: products, isLoading, error } = useGetProductQuery()

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             {/* Header Skeleton */}
             <div className="h-12 bg-gray-200 rounded-lg w-1/3 mx-auto mb-4 animate-pulse"></div>
             <div className="h-6 bg-gray-200 rounded-lg w-1/2 mx-auto animate-pulse"></div>
          </div>
          
          {/* Product Skeletons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <svg className="w-20 h-20 mx-auto text-red-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-600 text-lg font-medium">Error loading products</p>
          </div>
        </div>
      </section>
    )
  }

  // Filter products by category
  let filteredProducts = selectedCategory === 'all' 
    ? products 
    : products?.filter(product => product.category === selectedCategory) || []
  
  // Filter by search query
  if (searchQuery) {
    filteredProducts = filteredProducts?.filter(product => 
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || []
  }
  
  // Display first 8 products
  const featuredProducts = filteredProducts?.slice(0, 8) || []

  return (
    <section id="products-section" className="py-20 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-200 to-emerald-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-in fade-in duration-700">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-teal-100 mb-6">
            <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">Featured Collection</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {selectedCategory === 'all' ? 'Trending' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {searchQuery ? (
              <>
                Found <span className="font-bold text-teal-600">{filteredProducts?.length || 0}</span> results for "{searchQuery}"
              </>
            ) : (
              'Discover our handpicked selection of top-rated products'
            )}
          </p>
        </div>

        {/* No Results State */}
        {featuredProducts.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery 
                ? `No products match "${searchQuery}". Try a different search term.`
                : 'No products available in this category.'}
            </p>
            {searchQuery && (
              <button
                onClick={() => dispatch(setSearchQuery(''))}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-300"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-teal-300 shadow-sm hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
              {/* Image Container */}
              <div className="relative bg-gray-50 aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 bg-white p-2.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-teal-50">
                  <svg className="w-5 h-5 text-gray-600 hover:text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Quick View - On Hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button 
                    onClick={() => {
                      setSelectedProduct(product)
                      setIsModalOpen(true)
                    }}
                    className="bg-white text-teal-600 px-6 py-2.5 rounded-lg font-semibold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-teal-600 hover:text-white"
                  >
                    Quick View
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                {/* Category */}
                <p className="text-xs font-medium text-teal-600 uppercase tracking-wide mb-2">
                  {product.category}
                </p>

                {/* Title */}
                <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 h-12 leading-6">
                  {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating?.rate || 0)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-200 fill-current'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.rating?.count || 0})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </div>
                  {product.rating?.rate >= 4 && (
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      Best Seller
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={() => {
                    dispatch(addToCart(product))
                    dispatch(openCart())
                  }}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            View All {filteredProducts?.length || 0} Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
          </>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}

export default FeaturedProducts
