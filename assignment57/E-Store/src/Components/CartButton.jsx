// import React from 'react';
// import { useCart } from '../Context/CartContext';

// const CartButton = ({ product }) => {
//   const { addToCart } = useCart();

//   return (
//     <button
//       onClick={() => addToCart(product)}
//       className="bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-bold py-2 px-4 rounded-full transition duration-300 flex-1"
//     >
//       Add to Cart
//     </button>
//   );
// };

// export default CartButton;









import React, { useState } from 'react';
import { useCart } from '../Context/CartContext';
import { ShoppingCart, Check, Plus } from 'lucide-react';

const CartButton = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Check if product is already in cart
  const isInCart = cartItems.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (isInCart) return;
    
    setIsAdding(true);
    
    // Simulate adding to cart with animation
    setTimeout(() => {
      addToCart(product);
      setIsAdding(false);
      setShowSuccess(true);
      
      // Reset success state after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    }, 500);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding || isInCart}
      className={`
        relative overflow-hidden font-bold py-3 px-6 rounded-xl
        transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl
        flex items-center justify-center space-x-2 flex-1
        ${isInCart || showSuccess
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 text-green-600'
          : 'bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent'
        }
        disabled:opacity-70 disabled:cursor-not-allowed
        active:scale-[0.98]
        group
      `}
    >
      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-xl overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </span>

      {/* Button content */}
      <span className="relative flex items-center space-x-2">
        {isAdding ? (
          <>
            <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
            <span>Adding...</span>
          </>
        ) : isInCart || showSuccess ? (
          <>
            <Check className="w-5 h-5" />
            <span>{isInCart ? 'In Cart' : 'Added!'}</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>Add to Cart</span>
            <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" />
          </>
        )}
      </span>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 -top-1 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </button>
  );
};

export default CartButton;