// import React from 'react';

// const BuyButton = ({ productId }) => {
//   const handleBuy = () => {
//     alert(`Product ${productId} purchased successfully! 🛒`);
//   };

//   return (
//     <button
//       onClick={handleBuy}
//       className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex-1"
//     >
//       Buy Now
//     </button>
//   );
// };

// export default BuyButton;







import React, { useState } from 'react';
import { ShoppingBag, Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BuyButton = ({ product }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleBuy = () => {
    setIsProcessing(true);
    
    // Simulate purchase process
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Show success message
      setTimeout(() => {
        setShowSuccess(false);
        // Navigate to checkout or order confirmation
        // navigate('/checkout');
      }, 2000);
      
      console.log(`Purchasing: ${product.title} for $${product.price}`);
    }, 1000);
  };

  return (
    <button
      onClick={handleBuy}
      disabled={isProcessing || showSuccess}
      className={`
        relative overflow-hidden font-bold py-3 px-6 rounded-xl
        transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl
        flex items-center justify-center space-x-2 flex-1
        ${showSuccess 
          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
        }
        disabled:opacity-70 disabled:cursor-not-allowed
        active:scale-[0.98]
      `}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -top-1 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
      
      {/* Button content */}
      <span className="relative flex items-center space-x-2">
        {isProcessing ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Processing...</span>
          </>
        ) : showSuccess ? (
          <>
            <Check className="w-5 h-5" />
            <span>Success!</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Buy Now</span>
          </>
        )}
      </span>

      {/* Pulse effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
    </button>
  );
};

export default BuyButton;