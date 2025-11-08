import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../Context/CartContext';
import { 
  Heart,
  ShoppingCart,
  Trash2,
  ArrowLeft,
  Loader,
  AlertCircle,
  ShoppingBag,
  Check,
  X,
  Sparkles,
  TrendingUp
} from 'lucide-react';

const Wishlist = () => {
  const { wishlist, loading, error, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [message, setMessage] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  // Handle remove from wishlist
  const handleRemove = async (productId) => {
    setRemovingId(productId);
    const result = await removeFromWishlist(productId);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Removed from wishlist' });
    } else {
      setMessage({ type: 'error', text: result.error });
    }
    
    setRemovingId(null);
    setTimeout(() => setMessage(''), 3000);
  };

  // Handle move to cart
  const handleMoveToCart = async (item) => {
    // Add to cart
    addToCart({
      id: item.product_id,
      title: item.product_title,
      price: parseFloat(item.product_price),
      image_url: item.product_image,
      category_name: item.product_category
    });
    
    // Remove from wishlist
    await handleRemove(item.product_id);
    setMessage({ type: 'success', text: 'Moved to cart!' });
  };

  // Handle clear all
  const handleClearAll = async () => {
    const result = await clearWishlist();
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Wishlist cleared' });
      setShowClearConfirm(false);
    } else {
      setMessage({ type: 'error', text: result.error });
    }
    
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Wishlist</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                My Wishlist
              </h1>
              <p className="text-gray-600">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            {wishlist.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="mt-4 md:mt-0 flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all border border-red-200"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl flex items-start space-x-3 ${
            message.type === 'success' ? 'bg-green-50 border-2 border-green-200' :
            'bg-red-50 border-2 border-red-200'
          }`}>
            {message.type === 'success' ? (
              <Check className="w-5 h-5 text-green-600 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            )}
            <span className={`text-sm ${
              message.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>{message.text}</span>
          </div>
        )}

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-indigo-100">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Your Wishlist is Empty</h2>
              <p className="text-gray-600 mb-6">
                Save your favorite items here to buy them later!
              </p>
              <button
                onClick={() => navigate('/products')}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Explore Products</span>
              </button>
            </div>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo-100 hover:shadow-xl transition-all group"
              >
                {/* Product Image */}
                <div className="relative h-64 bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden">
                  <img
                    src={item.product_image}
                    alt={item.product_title}
                    className="w-full h-full object-contain p-4 transform group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300';
                    }}
                  />
                  
                  {/* Remove Button - Top Right */}
                  <button
                    onClick={() => handleRemove(item.product_id)}
                    disabled={removingId === item.product_id}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-red-50 transition-all group/remove"
                  >
                    {removingId === item.product_id ? (
                      <Loader className="w-5 h-5 text-gray-400 animate-spin" />
                    ) : (
                      <X className="w-5 h-5 text-gray-600 group-hover/remove:text-red-600 transition-colors" />
                    )}
                  </button>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Product Details */}
                <div className="p-5">
                  {/* Category Badge */}
                  {item.product_category && (
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 text-xs font-semibold rounded-full mb-3 border border-indigo-200">
                      {item.product_category}
                    </span>
                  )}

                  {/* Product Title */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {item.product_title}
                  </h3>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      ${parseFloat(item.product_price).toFixed(2)}
                    </span>
                  </div>

                  {/* Added Date */}
                  <p className="text-xs text-gray-500 mb-4">
                    Added {new Date(item.created_at).toLocaleDateString()}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      onClick={() => navigate(`/product/${item.product_id}`)}
                      className="px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions Footer - Only show when items exist */}
        {wishlist.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-indigo-100">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Add All to Cart */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center md:justify-start space-x-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <span>Quick Action</span>
                </h3>
                <p className="text-gray-600 mb-4">Add all items to your cart at once</p>
                <button
                  onClick={() => {
                    wishlist.forEach(item => handleMoveToCart(item));
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Add All to Cart
                </button>
              </div>

              {/* Continue Shopping */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center md:justify-start space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span>Discover More</span>
                </h3>
                <p className="text-gray-600 mb-4">Explore trending products</p>
                <button
                  onClick={() => navigate('/products')}
                  className="px-6 py-3 bg-white border-2 border-indigo-600 text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Clear All Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Clear Wishlist?</h3>
                <p className="text-gray-600">
                  Are you sure you want to remove all {wishlist.length} items from your wishlist?
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;