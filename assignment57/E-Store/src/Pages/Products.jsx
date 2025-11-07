// import React from 'react';
// import ProductList from '../Components/ProductList';

// function Products() {
//   return <ProductList />;
// }

// export default Products;















import React from 'react';
import ProductList from '../Components/ProductList';
import { motion } from 'framer-motion';
import { ShoppingBag, Sparkles, TrendingUp, Award } from 'lucide-react';

function Products() {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const statCards = [
    {
      icon: ShoppingBag,
      value: '10+',
      label: 'Premium Products',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: TrendingUp,
      value: '90%',
      label: 'Customer Satisfaction',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Award,
      value: '100%',
      label: 'Quality Guaranteed',
      gradient: 'from-pink-500 to-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold">Exclusive Collection</span>
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Discover Premium Fashion
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 mb-8">
              Curated collection of high-quality clothing for the modern lifestyle
            </p>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto"
            >
              {statCards.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                >
                  <div className={`w-10 h-10 bg-gradient-to-r ${stat.gradient} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-xs text-indigo-100">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-12 md:h-20"
            preserveAspectRatio="none"
          >
            <path
              fill="url(#gradient)"
              d="M0,64 C120,90 240,90 360,64 C480,38 600,38 720,64 C840,90 960,90 1080,64 C1200,38 1320,38 1440,64 L1440,120 L0,120 Z"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'rgb(129, 140, 248)' }} />
                <stop offset="100%" style={{ stopColor: 'rgb(196, 181, 253)' }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {/* Product List Section */}
      <div className="relative">
        <ProductList />
      </div>

      {/* Optional: Add floating decorative elements */}
      <div className="fixed bottom-10 right-10 pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-3xl opacity-30"
        />
      </div>
    </div>
  );
}

export default Products;