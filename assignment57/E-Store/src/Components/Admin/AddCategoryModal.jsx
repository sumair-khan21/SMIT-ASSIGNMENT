import React, { useState } from 'react';
import { adminCategoryOperations } from '../../hooks/useAdminCategories';
import { X, FolderPlus, Tag } from 'lucide-react';

const AddCategoryModal = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate Form
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setLoading(true);
    
    const result = await adminCategoryOperations.create({
      name: formData.name.trim(),
      description: formData.description.trim() || null
    });
    
    if (result.success) {
      alert('✅ Category added successfully!');
      onSuccess && onSuccess();
      handleClose();
    } else {
      alert('❌ Failed to add category: ' + result.error);
    }
    
    setLoading(false);
  };

  // Handle Close
  const handleClose = () => {
    setFormData({
      name: '',
      description: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-pink-600 to-indigo-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <FolderPlus className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Add New Category</h2>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category Name * <Tag className="w-4 h-4 inline" />
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Electronics, Accessories"
              maxLength="50"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Slug will be auto-generated from name
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Brief description of this category"
              maxLength="200"
            />
            <p className="text-gray-500 text-xs mt-1">
              {formData.description.length}/200 characters
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;