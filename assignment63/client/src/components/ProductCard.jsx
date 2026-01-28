import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Edit, Trash2 } from 'lucide-react';
import { useDeleteProductMutation } from '../redux/apiSlice';
import { useSelector } from 'react-redux';

const ProductCard = ({ product }) => {
  const { user } = useSelector((state) => state.auth);
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(product._id).unwrap();
        alert('Product deleted successfully');
      } catch (err) {
        alert('Failed to delete: ' + (err.data?.message || err.message));
      }
    }
  };

  return (
    <div className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300 transform hover:-translate-y-2">
      <Link to={`/product/${product._id}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop'} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 flex flex-col space-y-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
          <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-110 transition-all">
            <Heart className="w-5 h-5" fill="currentColor" strokeWidth={0} />
          </button>
          {user && product.user === user._id && (
            <>
              <Link 
                to={`/edit-product/${product._id}`} 
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-400 hover:text-blue-500 hover:scale-110 transition-all"
              >
                <Edit className="w-5 h-5" />
              </Link>
              <button 
                onClick={handleDelete}
                disabled={isLoading}
                className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:scale-110 transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold text-gray-700 uppercase tracking-wider shadow-sm">
            {product.category}
          </span>
        </div>
      </Link>

      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
            ))}
            <span className="text-[10px] text-gray-400 font-medium ml-1">(124 reviews)</span>
          </div>
          <Link to={`/product/${product._id}`}>
            <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed h-10">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-xl font-black text-gray-900">${product.price}</span>
            <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
          </div>
          <button className="flex items-center space-x-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-100 transition-all active:scale-95 group/btn">
            <ShoppingCart className="w-4 h-4 group-hover/btn:animate-bounce" />
            <span className="text-xs font-bold">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
