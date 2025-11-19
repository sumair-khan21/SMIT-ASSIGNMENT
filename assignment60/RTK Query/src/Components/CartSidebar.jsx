import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCartItems,
  selectCartItemCount,
  selectCartTotal,
  selectIsCartOpen,
  closeCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} from '../store/cartSlice'

const CartSidebar = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const itemCount = useSelector(selectCartItemCount)
  const total = useSelector(selectCartTotal)
  const isOpen = useSelector(selectIsCartOpen)

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in"
        onClick={() => dispatch(closeCart())}
      ></div>

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <button 
              onClick={() => dispatch(closeCart())}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-white/90 text-sm">{itemCount} {itemCount === 1 ? 'item' : 'items'} in cart</p>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
              <p className="text-gray-500">Add some products to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="bg-gray-50 rounded-xl p-4 flex gap-4 animate-in slide-in-from-right">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-white rounded-lg flex-shrink-0 p-2">
                    <img 
                      src={item.product.image} 
                      alt={item.product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                      {item.product.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">{item.product.category}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.product.id))}
                        className="w-7 h-7 bg-white rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      
                      <span className="w-8 text-center font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => dispatch(increaseQuantity(item.product.id))}
                        className="w-7 h-7 bg-white rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => dispatch(removeFromCart(item.product.id))}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <p className="text-lg font-bold text-teal-600">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Clear Cart Button */}
              {cartItems.length > 0 && (
                <button
                  onClick={() => dispatch(clearCart())}
                  className="w-full text-sm text-red-600 hover:text-red-700 font-medium py-2"
                >
                  Clear Cart
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer - Total & Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
            </div>
            
            <button className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
              <span>Proceed to Checkout</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-3">
              Shipping & taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default CartSidebar
