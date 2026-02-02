// Example: How to Display Images from MongoDB in Different Components

// ============================================
// Example 1: Product Card (Already in your app)
// ============================================
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      {/* Image from MongoDB (Cloudinary URL) */}
      <img 
        src={product.imageUrl}  // ← This URL comes from MongoDB
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
        onError={(e) => {
          // Fallback if image fails to load
          e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
        }}
      />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
};

// ============================================
// Example 2: Product List Page
// ============================================
import { useGetAllProductsQuery } from '../redux/apiSlice';

const ProductList = () => {
  const { data, isLoading, error } = useGetAllProductsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data?.products?.map((product) => (
        <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Dynamic Image Display */}
          <img 
            src={product.imageUrl}  // ← Cloudinary URL from MongoDB
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-2xl font-bold text-indigo-600">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================
// Example 3: Product Detail Page
// ============================================
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../redux/apiSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductQuery(id);

  if (isLoading) return <div>Loading...</div>;

  const product = data?.product;

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Large Product Image */}
        <div>
          <img 
            src={product.imageUrl}  // ← From MongoDB
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-xl"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-4xl font-bold text-indigo-600 mb-4">${product.price}</p>
          <p className="text-sm text-gray-500">Stock: {product.stock} units</p>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Example 4: Image Gallery with Zoom
// ============================================
import { useState } from 'react';

const ProductGallery = ({ product }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div>
      <img 
        src={product.imageUrl}
        alt={product.name}
        className={`cursor-pointer transition-transform ${
          isZoomed ? 'scale-150' : 'scale-100'
        }`}
        onClick={() => setIsZoomed(!isZoomed)}
      />
    </div>
  );
};

// ============================================
// Example 5: Optimized Image with Cloudinary Transformations
// ============================================
const OptimizedProductImage = ({ product, width = 400, height = 300 }) => {
  // Cloudinary URL transformation
  const getOptimizedUrl = (url, w, h) => {
    if (!url || !url.includes('cloudinary.com')) return url;
    
    // Insert transformation parameters into Cloudinary URL
    return url.replace(
      '/upload/',
      `/upload/w_${w},h_${h},c_fill,q_auto,f_auto/`
    );
  };

  return (
    <img 
      src={getOptimizedUrl(product.imageUrl, width, height)}
      alt={product.name}
      className="w-full h-auto"
      loading="lazy"  // Lazy loading for performance
    />
  );
};

// ============================================
// Example 6: Image with Loading State
// ============================================
import { useState } from 'react';

const ProductImageWithLoader = ({ product }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}
      <img 
        src={product.imageUrl}
        alt={product.name}
        className={`w-full h-64 object-cover rounded-lg transition-opacity ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

// ============================================
// Example 7: Multiple Images (if you extend to support multiple)
// ============================================
const ProductImagesCarousel = ({ product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // If you later add multiple images, store as array in MongoDB:
  // imageUrls: ["url1", "url2", "url3"]
  const images = product.imageUrls || [product.imageUrl];

  return (
    <div>
      <img 
        src={images[currentIndex]}
        alt={`${product.name} - Image ${currentIndex + 1}`}
        className="w-full h-96 object-cover rounded-lg"
      />
      
      {/* Thumbnails */}
      <div className="flex gap-2 mt-4">
        {images.map((url, index) => (
          <img 
            key={index}
            src={url}
            alt={`Thumbnail ${index + 1}`}
            className={`w-20 h-20 object-cover rounded cursor-pointer ${
              index === currentIndex ? 'ring-2 ring-indigo-600' : ''
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================
// Example 8: Background Image
// ============================================
const HeroWithProductImage = ({ product }) => {
  return (
    <div 
      className="h-96 bg-cover bg-center rounded-lg"
      style={{ backgroundImage: `url(${product.imageUrl})` }}
    >
      <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">{product.name}</h1>
      </div>
    </div>
  );
};

// ============================================
// Example 9: Fetching and Displaying with Error Handling
// ============================================
const ProductWithErrorHandling = ({ productId }) => {
  const { data, isLoading, error } = useGetProductQuery(productId);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
        <div className="bg-gray-300 h-4 rounded w-3/4 mb-2"></div>
        <div className="bg-gray-300 h-4 rounded w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error loading product: {error.message}
      </div>
    );
  }

  const product = data?.product;

  return (
    <div>
      <img 
        src={product.imageUrl}
        alt={product.name}
        onError={(e) => {
          console.error('Image failed to load:', product.imageUrl);
          e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
        }}
      />
      <h2>{product.name}</h2>
    </div>
  );
};

// ============================================
// Example 10: Using in a Table/List View
// ============================================
const ProductTable = () => {
  const { data } = useGetAllProductsQuery();

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        {data?.products?.map((product) => (
          <tr key={product._id}>
            <td>
              {/* Small thumbnail in table */}
              <img 
                src={product.imageUrl}
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
            </td>
            <td>{product.name}</td>
            <td>${product.price}</td>
            <td>{product.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export {
  ProductCard,
  ProductList,
  ProductDetail,
  ProductGallery,
  OptimizedProductImage,
  ProductImageWithLoader,
  ProductImagesCarousel,
  HeroWithProductImage,
  ProductWithErrorHandling,
  ProductTable
};
