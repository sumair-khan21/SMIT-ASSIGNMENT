import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
    setIsSidebarOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isSidebarOpen, toggleSidebar }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
