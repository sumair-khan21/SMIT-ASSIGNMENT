import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import MainLayout from '../components/MainLayout';
import { useGetProductsQuery } from '../redux/apiSlice';
import { Filter, ChevronDown, PackageSearch } from 'lucide-react';

const Home = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  return (
    <MainLayout>
      <Hero />
      
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Our Collection</h2>
              <div className="h-1 w-20 bg-indigo-600 rounded-full" />
              <p className="text-gray-500 font-medium pt-2">Showing only the high-quality handpicked items for you.</p>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all active:scale-95">
                <Filter className="w-4 h-4 text-indigo-600" />
                <span>Filters</span>
              </button>
              <div className="relative group">
                <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
                  <span>Newest Arrival</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl border border-gray-100 overflow-hidden h-[450px] animate-pulse">
                  <div className="bg-gray-100 aspect-square w-full" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                    <div className="h-6 bg-gray-100 rounded w-3/4" />
                    <div className="h-16 bg-gray-100 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-red-50 text-center">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                <PackageSearch className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                We couldn't fetch the products right now. Please check your connection or try again later.
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100"
              >
                Try Again
              </button>
            </div>
          ) : data?.products?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-gray-100 text-center">
              <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-6">
                <PackageSearch className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Our shelves are empty at the moment. Check back soon for exciting new items!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {data?.products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust section */}
      <section className="py-20 bg-indigo-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white">Quality Verified</h4>
              <p className="text-indigo-100/70">Every item is manually checked by our experts for top-tier quality.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white">Secure Payments</h4>
              <p className="text-indigo-100/70">Shopping is safe with us. We use encrypted payment gateways for your security.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white">Fast Delivery</h4>
              <p className="text-indigo-100/70">Experience lightning-fast global shipping on all your orders.</p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
