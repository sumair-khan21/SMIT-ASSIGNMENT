import React from 'react';
import { X } from 'lucide-react';
import { useCart } from '../Context/CartContext';

const Sidebar = () => {
  const { cartItems, isSidebarOpen, toggleSidebar, removeFromCart } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold text-indigo-600">Your Cart</h2>
        <button onClick={toggleSidebar}>
          <X size={24} />
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="p-4 text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="p-4 space-y-4 overflow-y-auto max-h-[85%]">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-indigo-600 font-bold text-sm">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
