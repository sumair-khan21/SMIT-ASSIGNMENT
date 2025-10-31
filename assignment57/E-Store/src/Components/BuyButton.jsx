import React from 'react';

const BuyButton = ({ productId }) => {
  const handleBuy = () => {
    alert(`Product ${productId} purchased successfully! 🛒`);
  };

  return (
    <button
      onClick={handleBuy}
      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex-1"
    >
      Buy Now
    </button>
  );
};

export default BuyButton;
