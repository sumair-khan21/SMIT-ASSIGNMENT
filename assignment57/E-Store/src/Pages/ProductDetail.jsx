// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import BuyButton from '../Components/BuyButton';
// import CartButton from '../Components/CartButton';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchProductDetail = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
//       setProduct(res.data);
//     } catch (error) {
//       console.error("Error fetching product detail:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) fetchProductDetail();
//   }, [id]);

//   if (loading) {
//     return <div className="p-8 text-center text-xl font-medium">Loading product details...</div>;
//   }

//   if (!product) {
//     return <div className="p-8 text-center text-red-600 font-bold">Product not found or failed to load.</div>;
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <button
//         onClick={() => navigate('/')}
//         className="mb-6 text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
//       >
//         &larr; Back to Products
//       </button>

//       <div className="bg-white shadow-xl rounded-xl p-8 flex flex-col lg:flex-row gap-10">
//         <div className="lg:w-1/3 flex justify-center items-center">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="max-h-96 w-auto object-contain rounded-lg"
//           />
//         </div>

//         <div className="lg:w-2/3">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
//           <p className="text-3xl font-extrabold text-indigo-600 mb-6">${product.price.toFixed(2)}</p>

//           <p className="text-gray-700 leading-relaxed mb-8">{product.description}</p>

//           <div className="p-5 pt-0 flex space-x-3">
//         <BuyButton productId={product.id} />
//         <CartButton product={product} />

//       </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;




















import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  ChevronLeft, 
  Shield, 
  Truck, 
  RefreshCw,
  Check,
  X,
  Package,
  Tag,
  Sparkles
} from 'lucide-react';
import { useCart } from '../Context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  useEffect(() => {
    if (product && product.sizes?.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    if (product && product.colors?.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    };
    addToCart(cartItem);
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-indigo-200 rounded-full animate-pulse"></div>
          <div className="w-20 h-20 border-4 border-transparent border-t-purple-600 rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-red-200">
          <X className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-lg mb-4">
            {error || 'Product not found'}
          </p>
          <button 
            onClick={() => navigate('/products')}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Success Notification */}
      {showAddedToCart && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slideIn">
          <Check className="w-5 h-5" />
          <span>Added to cart!</span>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/" className="text-indigo-600 hover:text-purple-600 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link to="/products" className="text-indigo-600 hover:text-purple-600 transition-colors">
                Products
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600 truncate max-w-xs">{product.title}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image Section */}
            <div className="relative">
              {/* Featured Badge */}
              {product.featured && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Featured</span>
                </div>
              )}

              {/* Stock Badge */}
              {product.stock && product.stock < 20 && (
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-pink-500 to-red-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  Only {product.stock} left!
                </div>
              )}

              {/* Main Image */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 h-[500px] flex items-center justify-center">
                <img
                  src={product.image_url || product.image || 'https://via.placeholder.com/500'}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500';
                  }}
                />
              </div>
            </div>

            {/* Product Info Section */}
            <div className="flex flex-col">
              {/* Category */}
              <div className="flex items-center space-x-2 mb-3">
                <Tag className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-purple-600 font-medium uppercase tracking-wide">
                  {product.category_name || 'Fashion'}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.title}
              </h1>

              {/* Rating */}
              {product.rating_rate && (
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating_rate)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {product.rating_rate} ({product.rating_count || 0} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline space-x-3">
                  <span className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    ${product.price?.toFixed(2) || '0.00'}
                  </span>
                  {product.stock > 0 && (
                    <span className="text-green-600 text-sm font-medium">
                      ✓ In Stock ({product.stock} available)
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description || 'No description available.'}
                </p>
              </div>

              {/* Material */}
              {product.material && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Material</h3>
                  <p className="text-gray-600">{product.material}</p>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          selectedSize === size
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedColor === color
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div
                          className="w-5 h-5 rounded-full border border-gray-300"
                          style={{ 
                            backgroundColor: color.toLowerCase() === 'white' ? '#f8f8f8' : color.toLowerCase() 
                          }}
                        />
                        <span className="text-sm font-medium">{color}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 bg-white border-2 border-indigo-600 text-indigo-600 font-bold rounded-xl hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    isInWishlist 
                      ? 'bg-pink-500 border-pink-500 text-white' 
                      : 'border-gray-300 text-gray-600 hover:border-pink-500 hover:text-pink-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Features */}
              <div className="border-t pt-6 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center">
                  <Truck className="w-8 h-8 text-indigo-600 mb-2" />
                  <span className="text-sm font-medium text-gray-800">Free Shipping</span>
                  <span className="text-xs text-gray-500">On orders over $50</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="w-8 h-8 text-indigo-600 mb-2" />
                  <span className="text-sm font-medium text-gray-800">Secure Payment</span>
                  <span className="text-xs text-gray-500">100% Protected</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <RefreshCw className="w-8 h-8 text-indigo-600 mb-2" />
                  <span className="text-sm font-medium text-gray-800">Easy Returns</span>
                  <span className="text-xs text-gray-500">30 Days Policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center space-x-2 text-indigo-600 hover:text-purple-600 font-medium transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Products</span>
          </button>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateX(100px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;