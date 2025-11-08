// import React from 'react';
// import { Link } from 'react-router-dom';
// import BuyButton from './BuyButton';
// import CartButton from './CartButton';

// const ProductCard = ({ product }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-[1.02] border border-gray-100">
//       <Link to={`/product/${product.id}`} className="block">
//         <div className="h-48 flex justify-center items-center p-4">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="max-h-full max-w-full object-contain"
//           />
//         </div>

//         <div className="p-5">
//           <h3 className="text-lg font-semibold text-gray-900 truncate mb-2" title={product.title}>
//             {product.title}
//           </h3>
//           <p className="text-2xl font-bold text-indigo-600 mb-4">
//             ${product.price.toFixed(2)}
//           </p>
//         </div>
//       </Link>

//       <div className="p-5 pt-0 flex space-x-3">
//         <BuyButton product={product} />
//         <CartButton product={product} />
//       </div>
//     </div>
//   );
// };

// export default ProductCard;









import React from 'react';
import { Link } from 'react-router-dom';
import BuyButton from './BuyButton';
import CartButton from './CartButton';
import { Star, Tag, TrendingUp,Heart, Loader  } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { useState } from 'react';



const ProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [wishlistLoading, setWishlistLoading] = useState(false);
  
  const inWishlist = isInWishlist(product.id);
  
  // Handle wishlist toggle
  const handleWishlistToggle = async (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    
    setWishlistLoading(true);
    
    if (inWishlist) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product);
    }
    
    setWishlistLoading(false);
  };

  // Ensure image_url exists
  const imageUrl = product.image_url || product.image || 'https://via.placeholder.com/300';
  
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-indigo-100 hover:border-purple-300">
      {/* Featured Badge */}
{product.featured && (
  <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center space-x-1">
    <TrendingUp className="w-3 h-3" />
    <span>Featured</span>
  </div>
)}

{/* ADD THIS - Wishlist Button */}
<button
  onClick={handleWishlistToggle}
  disabled={wishlistLoading}
  className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-lg transition-all duration-300 ${
    inWishlist 
      ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white scale-110' 
      : 'bg-white/90 backdrop-blur text-gray-600 hover:bg-pink-50 hover:text-pink-600'
  }`}
>
  {wishlistLoading ? (
    <Loader className="w-5 h-5 animate-spin" />
  ) : (
    <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
  )}
</button>

      {/* Stock Badge */}
      {product.stock && product.stock < 20 && (
        <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          Only {product.stock} left!
        </div>
      )}

      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative h-64 bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-contain p-4 transform group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300';
            }}
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Category Tag */}
          <div className="flex items-center space-x-2 mb-2">
            <Tag className="w-3 h-3 text-purple-500" />
            <span className="text-xs text-purple-600 font-medium uppercase tracking-wide">
              {product.category_name || 'Fashion'}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors" 
              title={product.title}>
            {product.title}
          </h3>

          {/* Rating */}
          {product.rating_rate && (
            <div className="flex items-center space-x-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating_rate)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating_rate} ({product.rating_count || 0})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ${product.price?.toFixed(2) || '0.00'}
              </span>
            </div>
            
            {/* Sizes Available */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="text-xs text-gray-500">
                {product.sizes.length} sizes
              </div>
            )}
          </div>

          {/* Colors Available */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xs text-gray-500">Colors:</span>
              <div className="flex space-x-1">
                {product.colors.slice(0, 4).map((color, idx) => (
                  <div
                    key={idx}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ 
                      backgroundColor: color.toLowerCase() === 'white' ? '#f8f8f8' : color.toLowerCase() 
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="p-5 pt-0 flex space-x-3">
        <div className="flex-1">
          <BuyButton product={product} />
        </div>
        <div className="flex-1">
          <CartButton product={product} />
        </div>
      </div>

      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default ProductCard;