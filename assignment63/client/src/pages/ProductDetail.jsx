import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import { useGetProductQuery } from '../redux/apiSlice';
import { ShoppingCart, Heart, Share2, Star, ShieldCheck, Truck, RotateCcw, ArrowLeft, Loader2, PackageSearch } from 'lucide-react';
import { useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetProductQuery(id);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      <p className="text-gray-500 font-bold animate-pulse">Fetching product details...</p>
    </div>
  );

  if (error || !data?.product) return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20 text-center">
        <PackageSearch className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <h2 className="text-3xl font-black text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">The product you're looking for might have been removed or doesn't exist.</p>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all"
        >
          Return to Shop
        </button>
      </div>
    </MainLayout>
  );

  const { product } = data;

  return (
    <MainLayout>
      <div className="bg-gray-50/50 py-12">
        <div className="container mx-auto px-4">
           <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors mb-10 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-widest text-xs">Go Back</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Image Gallery */}
            <div className="sticky top-24 space-y-6">
              <div className="aspect-square bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-2xl shadow-indigo-100/50 group">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                 {[...Array(4)].map((_, i) => (
                   <div key={i} className={`aspect-square rounded-2xl border-2 overflow-hidden cursor-pointer hover:border-indigo-600 transition-all ${i === 0 ? 'border-indigo-600' : 'border-white bg-white'}`}>
                      <img src={product.imageUrl} className="w-full h-full object-cover opacity-80" />
                   </div>
                 ))}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-5 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-black rounded-full uppercase tracking-widest">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-3">
                    <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-indigo-600 transition-colors shadow-sm">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                  {product.name}
                </h1>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-yellow-400 fill-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-gray-400 font-bold text-sm">4.9 (124 reviews)</span>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                  <span className="text-green-600 font-black text-sm uppercase tracking-wider">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                </div>
              </div>

              <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 space-y-6">
                <div className="flex items-baseline space-x-2">
                  <span className="text-5xl font-black text-gray-900">${product.price}</span>
                  <span className="text-gray-400 line-through font-bold text-lg">${(product.price * 1.2).toFixed(2)}</span>
                </div>
                
                <p className="text-gray-500 leading-relaxed font-medium">
                  {product.description}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                   <div className="flex items-center bg-gray-50 rounded-2xl p-1.5 w-full sm:w-auto">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 flex items-center justify-center font-black text-xl hover:bg-white rounded-xl transition-all"
                      >-</button>
                      <span className="w-12 text-center font-black text-lg">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 flex items-center justify-center font-black text-xl hover:bg-white rounded-xl transition-all"
                      >+</button>
                   </div>
                   <button className="w-full py-5 bg-gray-900 text-white font-black rounded-[1.25rem] hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-100 transition-all flex items-center justify-center space-x-3 active:scale-[0.98]">
                      <ShoppingCart className="w-6 h-6" />
                      <span>Add to Cart</span>
                   </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                   { icon: Truck, title: 'Free Delivery', desc: 'On orders over $99' },
                   { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy' },
                   { icon: ShieldCheck, title: 'Genuine Items', desc: '100% Quality certified' }
                 ].map((feat, i) => (
                   <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-gray-50">
                      <feat.icon className="w-8 h-8 text-indigo-600 mb-3" />
                      <h5 className="font-bold text-gray-900 text-sm mb-1">{feat.title}</h5>
                      <p className="text-xs text-gray-400 font-medium">{feat.desc}</p>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
