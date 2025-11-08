// import React from 'react';
// import { X } from 'lucide-react';
// import { useCart } from '../Context/CartContext';

// const Sidebar = () => {
//   const { cartItems, isSidebarOpen, toggleSidebar, removeFromCart } = useCart();

//   return (
//     <div
//       className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
//         isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
//       }`}
//     >
//       <div className="flex justify-between items-center p-4 border-b">
//         <h2 className="text-xl font-bold text-indigo-600">Your Cart</h2>
//         <button onClick={toggleSidebar}>
//           <X size={24} />
//         </button>
//       </div>

//       {cartItems.length === 0 ? (
//         <p className="p-4 text-gray-500">Your cart is empty.</p>
//       ) : (
//         <div className="p-4 space-y-4 overflow-y-auto max-h-[85%]">
//           {cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center justify-between border-b pb-2"
//             >
//               <div className="flex items-center space-x-3">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-12 h-12 object-contain"
//                 />
//                 <div>
//                   <p className="font-medium text-sm">{item.title}</p>
//                   <p className="text-indigo-600 font-bold text-sm">
//                     ${item.price.toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="text-red-500 text-sm"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;























import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  Sparkles
} from 'lucide-react';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { cartItems, isSidebarOpen, toggleSidebar, removeFromCart, updateQuantity } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  useEffect(() => {
    if (isSidebarOpen) {
      setIsAnimating(true);
    }
  }, [isSidebarOpen]);

  const handleCheckout = () => {
    navigate('/checkout');
    toggleSidebar();
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      // If updateQuantity doesn't exist in context, we can simulate it
      const updatedItem = cartItems.find(item => item.id === itemId);
      if (updatedItem) {
        removeFromCart(itemId);
        const newItem = { ...updatedItem, quantity: newQuantity };
        // You might need to add this back to cart with new quantity
        // For now, we'll just use the existing structure
      }
    }
  };

  return (
    <div>
      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 right-0 w-96 h-full bg-white shadow-2xl
          transform transition-all duration-500 z-50
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 backdrop-blur rounded-lg">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Your Cart</h2>
                <p className="text-indigo-100 text-sm">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors group"
            >
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          {subtotal < 50 && (
            <div className="mt-4 bg-white/10 backdrop-blur rounded-lg p-3">
              <div className="flex items-center justify-between text-white text-sm mb-2">
                <span className="flex items-center space-x-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Add ${(50 - subtotal).toFixed(2)} for FREE shipping!</span>
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-pink-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (subtotal / 50) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50%] px-6">
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl">
              <ShoppingBag className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 text-center mb-6">
              Start shopping to add items to your cart!
            </p>
            <button
              onClick={() => {
                toggleSidebar();
                navigate('/products');
              }}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Browse Products</span>
            </button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 max-h-[calc(100vh-380px)]">
              <div className="space-y-4">
                {cartItems.map((item) => (
  <div
    key={item.id}
    className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
  >
    <div className="flex items-start space-x-4">
      {/* Product Image */}
      <div className="relative">
        <img
          src={item.image_url || item.image}
          alt={item.title}
          className="w-20 h-20 object-contain rounded-lg bg-white p-2 shadow-sm"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/80';
          }}
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800 line-clamp-2 mb-1">
          {item.title}
        </h4>
        
        {/* Price and Quantity */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
            </span>
            <span className="text-xs text-gray-500 ml-1">
              (${(item.price || 0).toFixed(2)} each)
            </span>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
              className="p-1 hover:bg-white rounded-lg transition-colors"
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <span className="w-8 text-center font-semibold">
              {item.quantity || 1}
            </span>
            <button
              onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
              className="p-1 hover:bg-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeFromCart(item.id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
          >
            <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  </div>
))}
              </div>
            </div>

            {/* Footer with Totals and Checkout */}
            <div className="border-t border-gray-200 p-6 bg-gradient-to-t from-indigo-50 to-white">
              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gradient-to-r from-indigo-300 to-purple-300" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Total
                  </span>
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2 group"
              >
                <span>Checkout</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Continue Shopping */}
              <button
                onClick={() => {
                  toggleSidebar();
                  navigate('/products');
                }}
                className="w-full mt-3 py-3 px-6 bg-white border-2 border-indigo-300 text-indigo-600 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateX(50px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;