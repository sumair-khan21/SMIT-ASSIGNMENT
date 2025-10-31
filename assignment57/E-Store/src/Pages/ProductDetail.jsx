import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BuyButton from '../Components/BuyButton';
import CartButton from '../Components/CartButton';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProductDetail = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching product detail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProductDetail();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-xl font-medium">Loading product details...</div>;
  }

  if (!product) {
    return <div className="p-8 text-center text-red-600 font-bold">Product not found or failed to load.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
      >
        &larr; Back to Products
      </button>

      <div className="bg-white shadow-xl rounded-xl p-8 flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/3 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 w-auto object-contain rounded-lg"
          />
        </div>

        <div className="lg:w-2/3">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
          <p className="text-3xl font-extrabold text-indigo-600 mb-6">${product.price.toFixed(2)}</p>

          <p className="text-gray-700 leading-relaxed mb-8">{product.description}</p>

          <div className="p-5 pt-0 flex space-x-3">
        <BuyButton productId={product.id} />
        <CartButton product={product} />

      </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
