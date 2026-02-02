import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import { useAddProductMutation, useGetProductQuery, useUpdateProductMutation, useUploadImageMutation } from '../redux/apiSlice';
import { Package, Tag, DollarSign, Image as ImageIcon, Layers, Boxes, Save, ArrowLeft, Loader2, Sparkles, Upload, X } from 'lucide-react';

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    category: '',
    stock: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const { data: productData, isLoading: isFetching } = useGetProductQuery(id, { skip: !isEdit });
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  useEffect(() => {
    if (productData?.product) {
      const { name, price, description, imageUrl, category, stock } = productData.product;
      setFormData({ name, price, description, imageUrl, category, stock });
      setImagePreview(imageUrl); // Set preview to existing image
    }
  }, [productData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to Cloudinary via backend
  const handleImageUpload = async () => {
    if (!imageFile) {
      alert('Please select an image first');
      return;
    }

    const formDataToUpload = new FormData();
    formDataToUpload.append('image', imageFile);

    try {
      const result = await uploadImage(formDataToUpload).unwrap();
      
      // Set the imageUrl in formData
      setFormData({ ...formData, imageUrl: result.imageUrl });
      alert('Image uploaded successfully!');
    } catch (error) {
      alert('Error uploading image: ' + (error.data?.message || error.message));
      console.error('Upload error:', error);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData({ ...formData, imageUrl: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateProduct({ id, ...formData }).unwrap();
        alert('Product updated successfully!');
      } else {
        await addProduct(formData).unwrap();
        alert('Product added successfully!');
      }
      navigate('/');
    } catch (err) {
      alert('Error: ' + (err.data?.message || err.message));
    }
  };

  if (isFetching) return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      <p className="text-gray-500 font-bold animate-pulse">Loading product details...</p>
    </div>
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50/50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold">Back</span>
          </button>

          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
              {/* Sidebar Info */}
              <div className="lg:col-span-2 bg-indigo-600 p-12 text-white space-y-8">
                <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-black mb-4 leading-tight">
                    {isEdit ? 'Refine Your Listing' : 'List Your Premium Product'}
                  </h1>
                  <p className="text-indigo-100 font-medium leading-relaxed">
                    Make sure to provide clear descriptions and high-quality image URLs to attract more buyers.
                  </p>
                </div>
                
                <div className="space-y-6 pt-8">
                   <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">✓</div>
                      <p className="font-bold">Lightning fast listing</p>
                   </div>
                   <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">✓</div>
                      <p className="font-bold">Secure data handling</p>
                   </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="lg:col-span-3 p-12 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-black text-gray-700 ml-1">Product Name</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                        <Package className="w-5 h-5" />
                      </div>
                      <input
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Premium Wireless Headphones"
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 transition-all outline-none text-gray-900 font-bold"
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-700 ml-1">Price ($)</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <input
                        name="price"
                        type="number"
                        required
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="299.99"
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 transition-all outline-none text-gray-900 font-bold"
                      />
                    </div>
                  </div>

                  {/* Stock */}
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-700 ml-1">Stock Quantity</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                        <Boxes className="w-5 h-5" />
                      </div>
                      <input
                        name="stock"
                        type="number"
                        required
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder="50"
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 transition-all outline-none text-gray-900 font-bold"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-700 ml-1">Category</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                        <Tag className="w-5 h-5" />
                      </div>
                      <input
                        name="category"
                        type="text"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Electronics"
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 transition-all outline-none text-gray-900 font-bold"
                      />
                    </div>
                  </div>

                  {/* Image Upload Section */}
                  <div className="md:col-span-2 space-y-4">
                    <label className="text-sm font-black text-gray-700 ml-1">Product Image</label>
                    
                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="relative w-full h-64 bg-gray-100 rounded-2xl overflow-hidden group">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-4 right-4 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                        {formData.imageUrl && (
                          <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            ✓ Uploaded to Cloudinary
                          </div>
                        )}
                      </div>
                    )}

                    {/* Upload Controls */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* File Input */}
                      <label className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl hover:border-indigo-600 hover:bg-indigo-50 transition-all group">
                          <Upload className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
                          <span className="font-bold text-gray-600 group-hover:text-indigo-600">
                            {imageFile ? imageFile.name : 'Choose Image'}
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>

                      {/* Upload Button */}
                      {imageFile && !formData.imageUrl && (
                        <button
                          type="button"
                          onClick={handleImageUpload}
                          disabled={isUploading}
                          className="px-6 py-3.5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                        >
                          {isUploading ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Uploading...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-5 h-5" />
                              <span>Upload</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Manual URL Input (Optional) */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 ml-1">Or paste image URL directly</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <input
                          name="imageUrl"
                          type="url"
                          value={formData.imageUrl}
                          onChange={handleChange}
                          placeholder="https://..."
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 transition-all outline-none text-gray-900 font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-black text-gray-700 ml-1">Description</label>
                    <div className="relative group">
                      <div className="absolute top-4 left-4 pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                        <Layers className="w-5 h-5" />
                      </div>
                      <textarea
                        name="description"
                        required
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter a detailed description of your product..."
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 transition-all outline-none text-gray-900 font-bold resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center space-x-4">
                  <button
                    type="submit"
                    disabled={isAdding || isUpdating}
                    className="flex-1 py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center space-x-3"
                  >
                    {isAdding || isUpdating ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>{isEdit ? 'Update Changes' : 'Publish Product'}</span>
                      </>
                    )}
                  </button>
                  {isEdit && (
                    <button 
                      type="button"
                      onClick={() => navigate('/')}
                      className="px-8 py-4 bg-white border-2 border-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddProduct;
