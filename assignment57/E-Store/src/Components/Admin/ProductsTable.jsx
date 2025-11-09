import React, { useState } from 'react';
import { useProducts, productOperations } from '../../hooks/useProducts';
import { Edit, Trash2, Image, DollarSign, Package, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductsTable = ({ onEdit, onRefresh, searchTerm = '' }) => {
  const { products, loading, error, refetch } = useProducts();
  const [deleteModal, setDeleteModal] = useState({ show: false, product: null });
  const [deleting, setDeleting] = useState(false);
  
  // ✨ Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const filteredProducts = products.filter(product => {
    const search = searchTerm.toLowerCase();
    return (
      product.title?.toLowerCase().includes(search) ||
      product.description?.toLowerCase().includes(search) ||
      product.category_name?.toLowerCase().includes(search) ||
      product.id?.toString().includes(search)
    );
  });

  // ✨ UPDATE: Use filteredProducts for pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // ✨ Pagination Handlers
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!deleteModal.product) return;
    
    setDeleting(true);
    const result = await productOperations.delete(deleteModal.product.id);
    
    if (result.success) {
      // alert('✅ Product deleted successfully!');
      setDeleteModal({ show: false, product: null });
      
      // ✨ Reset to page 1 if current page is now empty
      const newTotal = products.length - 1;
      const newTotalPages = Math.ceil(newTotal / ITEMS_PER_PAGE);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
      
      refetch();
      if (onRefresh) onRefresh();
    } else {
      alert('❌ Failed to delete product: ' + result.error);
    }
    
    setDeleting(false);
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <p className="text-red-600 font-medium">Error loading products: {error}</p>
      </div>
    );
  }

  // Empty State
  if (products.length === 0) {
    return (
      <div className="border-2 border-dashed border-indigo-200 rounded-xl p-12 text-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <Package className="w-16 h-16 text-indigo-300 mx-auto mb-4" />
        <p className="text-gray-600 font-medium text-lg">No products found</p>
        <p className="text-gray-500 mt-2">Click "Add Product" to create your first product</p>
      </div>
    );
  }

  return (
    <>
      {/* Products Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body - Using currentProducts instead of products */}
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProducts.map((product) => (
              <tr key={product.id} className="hover:bg-indigo-50/50 transition-colors">
                {/* Product Info */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="h-12 w-12 rounded-lg object-cover border-2 border-indigo-100"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                        <Image className="w-6 h-6 text-indigo-400" />
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-gray-900 max-w-xs truncate">
                        {product.title}
                      </div>
                      <div className="text-xs text-gray-500">ID: {product.id}</div>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                    {product.category_name || 'Uncategorized'}
                  </span>
                </td>

                {/* Price */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm font-bold text-green-600">
                    <DollarSign className="w-4 h-4" />
                    {product.price}
                  </div>
                </td>

                {/* Stock */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.stock > 10 
                      ? 'bg-green-100 text-green-800'
                      : product.stock > 0
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock} units
                  </span>
                </td>

                {/* Rating */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ⭐ {product.rating_rate || 'N/A'}
                    <span className="text-gray-500 ml-1">
                      ({product.rating_count || 0})
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit && onEdit(product)}
                      className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                      title="Edit Product"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteModal({ show: true, product })}
                      className="p-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✨ Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          {/* Page Info */}
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold text-indigo-600">{startIndex + 1}</span> to{' '}
            <span className="font-semibold text-indigo-600">{Math.min(endIndex, products.length)}</span> of{' '}
            <span className="font-semibold text-indigo-600">{products.length}</span> products
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className={`
                flex items-center space-x-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200
                ${currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg transform hover:scale-105'
                }
              `}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-1">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={`
                      w-10 h-10 rounded-lg font-semibold transition-all duration-200
                      ${currentPage === pageNumber
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-110'
                        : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 border border-gray-300'
                      }
                    `}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className={`
                flex items-center space-x-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200
                ${currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg transform hover:scale-105'
                }
              `}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Delete Product?
              </h3>
              <p className="text-gray-600">
                Are you sure you want to delete
              </p>
              <p className="font-semibold text-gray-900 mt-2">
                "{deleteModal.product?.title}"
              </p>
              <p className="text-sm text-red-600 mt-3">
                This action cannot be undone!
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteModal({ show: false, product: null })}
                disabled={deleting}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsTable;