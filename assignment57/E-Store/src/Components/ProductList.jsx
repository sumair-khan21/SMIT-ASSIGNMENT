// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ProductCard from './ProductCard';

// function ProductList() {
//   const [allProducts, setAllProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedPrice, setSelectedPrice] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 6;

//   const fetchData = async () => {
//     try {
//       const res = await axios.get("https://fakestoreapi.com/products?limit=18");
//       setAllProducts(res.data);
//       setFilteredProducts(res.data);
//     } catch (err) {
//       console.log("Error fetching data:", err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const result = allProducts.filter((item) => {
//       const matchesSearch =
//         searchTerm === "" ||
//         item.title.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesCategory =
//         selectedCategory === "" || item.category === selectedCategory;

//       const matchesPrice =
//         selectedPrice === "" || item.price === Number(selectedPrice);

//       return matchesSearch && matchesCategory && matchesPrice;
//     });

//     setFilteredProducts(result);
//     setCurrentPage(1);
//   }, [searchTerm, selectedCategory, selectedPrice, allProducts]);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//   return (
//     <div className="container mx-auto p-4 min-h-screen flex flex-col">
//       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Products 🛍️</h2>

//       <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6">
//         <input
//           type="text"
//           placeholder="Search products..."
//           className="border rounded-lg px-4 py-2 w-64"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <select
//           className="border rounded-lg px-4 py-2"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           <option value="">All Categories</option>
//           <option value="men's clothing">Men's Clothing</option>
//           <option value="women's clothing">Women's Clothing</option>
//           <option value="jewelery">Jewelery</option>
//           <option value="electronics">Electronics</option>
//         </select>

//         <select
//           className="border rounded-lg px-4 py-2"
//           value={selectedPrice}
//           onChange={(e) => setSelectedPrice(e.target.value)}
//         >
//           <option value="">All Prices</option>
//           <option value="10">10</option>
//           <option value="20">20</option>
//           <option value="30">30</option>
//           <option value="40">40</option>
//           <option value="50">50</option>
//         </select>
//       </div>

//       <div className="flex-grow">
//         {currentProducts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {currentProducts.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         ) : (
//           <div className="flex justify-center items-center h-[400px]">
//             <p className="text-center text-gray-600 text-lg">No products found 😢</p>
//           </div>
//         )}
//       </div>

//       {filteredProducts.length > productsPerPage && (
//         <div className="flex justify-center mt-6 space-x-4">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span className="px-4 py-2 text-gray-700 font-medium">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductList;

// =================================================================================================================================


import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useProducts, useCategories } from '../hooks/useProducts';
import { ShoppingBag, Filter, Search, Sparkles } from 'lucide-react';

function ProductList() {
  const { products, loading, error } = useProducts();
  const { categories } = useCategories();
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchTerm) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter (case-insensitive comparison)
if (selectedCategory) {
  result = result.filter((item) => 
    item.category_name?.toLowerCase() === selectedCategory.toLowerCase() ||
    item.category_name === selectedCategory
  );
}

    // Price range filter
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      result = result.filter((item) => {
        if (max) {
          return item.price >= min && item.price <= max;
        } else {
          return item.price >= min;
        }
      });
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCategory, priceRange, products]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-red-200">
          <p className="text-red-600 text-lg">Error loading products: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <div className="container mx-auto p-4">
        {/* Header Section */}
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Premium Collection
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our exclusive range of clothing from PricePanda's curated collection
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-indigo-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-indigo-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5" />
              <select
                className="pl-10 pr-8 py-3 border-2 border-indigo-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all appearance-none bg-white cursor-pointer"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="relative">
              <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5" />
              <select
                className="pl-10 pr-8 py-3 border-2 border-indigo-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all appearance-none bg-white cursor-pointer"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="">All Prices</option>
                <option value="0-25">Under $25</option>
                <option value="25-50">$25 - $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-9999">Above $100</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProducts.length} products
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory && ` in ${selectedCategory}`}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-indigo-200 rounded-full animate-pulse"></div>
              <div className="w-20 h-20 border-4 border-transparent border-t-purple-600 rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center h-[400px] bg-white rounded-2xl shadow-xl border border-indigo-100">
                <ShoppingBag className="w-16 h-16 text-indigo-300 mb-4" />
                <p className="text-gray-600 text-lg">No products found</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > productsPerPage && (
              <div className="flex justify-center items-center mt-12 space-x-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-3 bg-white border-2 border-indigo-200 text-indigo-600 rounded-xl hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
                >
                  Previous
                </button>
                
                <div className="flex items-center space-x-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                        currentPage === index + 1
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-110'
                          : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 bg-white border-2 border-indigo-200 text-indigo-600 rounded-xl hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList;