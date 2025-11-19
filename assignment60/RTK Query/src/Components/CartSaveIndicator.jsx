import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../store/cartSlice'

const CartSaveIndicator = () => {
  const [showSaved, setShowSaved] = useState(false)
  const cartItems = useSelector(selectCartItems)

  useEffect(() => {
    if (cartItems.length > 0) {
      setShowSaved(true)
      const timer = setTimeout(() => setShowSaved(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [cartItems])

  if (!showSaved) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom fade-in duration-300">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="font-semibold">Cart saved!</span>
      </div>
    </div>
  )
}

export default CartSaveIndicator
