import React, { useState, useEffect } from 'react';
import { useAdminCategories, adminCategoryOperations } from '../../hooks/useAdminCategories';
import { Edit, Trash2, FolderOpen, AlertCircle, Plus, Package } from 'lucide-react';
import AddCategoryModal from './AddCategoryModal';
import EditCategoryModal from './EditCategoryModal';

const CategoriesTable = () => {
  const { categories, loading, error, refetch } = useAdminCategories();
  const [deleteModal, setDeleteModal] = useState({ show: false, category: null });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [productCounts, setProductCounts] = useState({});

  // Fetch product counts for each category
  useEffect(() => {
    const fetchProductCounts = async () => {
      const counts = {};
      for (const category of categories) {
        const result = await adminCategoryOperations.getProductCount(category.id);
        counts[category.id] = result.count || 0;
      }
      setProductCounts(counts);
    };

    if (categories.length > 0) {
      fetchProductCounts();
    }
  }, [categories]);

  // Handle Delete
  const handleDelete = async () => {
    if (!deleteModal.category) return;
    
    setDeleting(true);
    const result = await adminCategoryOperations.delete(deleteModal.category.id);
    
    if (result.success) {
      alert('✅ Category deleted successfully!');
      setDeleteModal({ show: false, category: null });
      refetch();
    } else {
      alert('❌ ' + result.error);
    }
    
    setDeleting(false);
  };

  // Handle Edit
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <p className="text-red-600 font-medium">Error loading categories: {error}</p>
      </div>
    );
  }

  return (
    <>
      {/* Header with Add Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
            Category Management
          </h2>
          <p className="text-gray-600 mt-1">Organize your product categories</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="border-2 border-dashed border-pink-200 rounded-xl p-12 text-center bg-gradient-to-br from-pink-50 to-indigo-50">
          <FolderOpen className="w-16 h-16 text-pink-300 mx-auto mb-4" />
          <p className="text-gray-600 font-medium text-lg">No categories found</p>
          <p className="text-gray-500 mt-2">Click "Add Category" to create your first category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
            >
              {/* Category Header */}
              <div className="bg-gradient-to-r from-pink-500 to-indigo-500 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <FolderOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{category.name}</h3>
                      <p className="text-white/80 text-xs">/{category.slug}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Body */}
              <div className="p-6">
                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">
                  {category.description || 'No description provided'}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm font-semibold text-gray-700">
                      {productCounts[category.id] || 0} Products
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    ID: {category.id}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteModal({ show: true, category })}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                    disabled={productCounts[category.id] > 0}
                    title={productCounts[category.id] > 0 ? 'Cannot delete category with products' : 'Delete category'}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>

                {/* Warning if has products */}
                {productCounts[category.id] > 0 && (
                  <p className="text-xs text-yellow-600 mt-2 text-center">
                    ⚠️ Cannot delete - has products
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Delete Category?
              </h3>
              <p className="text-gray-600">
                Are you sure you want to delete
              </p>
              <p className="font-semibold text-gray-900 mt-2">
                "{deleteModal.category?.name}"
              </p>
              <p className="text-sm text-red-600 mt-3">
                This action cannot be undone!
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteModal({ show: false, category: null })}
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

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={refetch}
      />

      {/* Edit Category Modal */}
      <EditCategoryModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={refetch}
        category={selectedCategory}
      />
    </>
  );
};

export default CategoriesTable;