import React from 'react';
import { Link } from 'react-router-dom';
import BuyButton from './BuyButton';
import CartButton from './CartButton';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-[1.02] border border-gray-100">
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-48 flex justify-center items-center p-4">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 truncate mb-2" title={product.title}>
            {product.title}
          </h3>
          <p className="text-2xl font-bold text-indigo-600 mb-4">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>

      <div className="p-5 pt-0 flex space-x-3">
        <BuyButton product={product} />
        <CartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
