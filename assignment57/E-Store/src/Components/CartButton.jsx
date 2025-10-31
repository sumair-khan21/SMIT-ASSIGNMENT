import React from 'react';
import { useCart } from '../Context/CartContext';

const CartButton = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-bold py-2 px-4 rounded-full transition duration-300 flex-1"
    >
      Add to Cart
    </button>
  );
};

export default CartButton;
