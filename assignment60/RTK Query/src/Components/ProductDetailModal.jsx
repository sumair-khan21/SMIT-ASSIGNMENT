import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart, openCart } from '../store/cartSlice'

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const dispatch = useDispatch()

  if (!isOpen || !product) return null

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    dispatch(openCart())
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Left Side - Image */}
            <div className="relative">
              <div className="sticky top-0">
                {/* Best Seller Badge */}
                {product.rating?.rate >= 4 && (
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    ⭐ Best Seller
                  </div>
                )}

                {/* Product Image */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 aspect-square flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Image Thumbnails (placeholder - would cycle through images in real app) */}
                <div className="flex gap-2 mt-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-16 h-16 bg-gray-100 rounded-lg border-2 border-gray-200 hover:border-teal-500 transition-colors cursor-pointer flex items-center justify-center"
                    >
                      <img
                        src={product.image}
                        alt={`Thumbnail ${i}`}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Details */}
            <div className="flex flex-col">
              {/* Category */}
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wide">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating?.rate || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 fill-current'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-700">{product.rating?.rate}</span>
                <span className="text-gray-500">({product.rating?.count} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                  <span className="text-gray-500 line-through text-xl">
                    ${(product.price * 1.3).toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                    -23%
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Product Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Product Features */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Premium quality material</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Fast & free shipping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">30-day money-back guarantee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">24/7 customer support</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-auto">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>
                
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold p-4 rounded-xl transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Shipping Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Free Shipping</p>
                    <p className="text-sm text-gray-600">Delivery in 2-3 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetailModal
