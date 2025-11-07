// import React from 'react'
// import Hero from '../Components/Hero'
// import ProductList from '../Components/ProductList'

// const Home = () => {
//   return (
//     <div>
//         <Hero />
//       {/* <h1>home</h1> */}
//       <ProductList />
//     </div>
//   )
// }

// export default Home











import React, { useState, useEffect } from 'react';
import Hero from '../Components/Hero';
import ProductList from '../Components/ProductList';
import { 
  TrendingUp, 
  Shield, 
  Truck, 
  HeartHandshake, 
  Star,
  ChevronRight,
  Sparkles,
  Lock,
  CreditCard,
  RefreshCw,
  Package,
  Clock,
  Percent,
  Gift,
  X,
  Bell,
  ShieldCheck,
  Award,
  Zap,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  const [email, setEmail] = useState('');
  const [showDiscountCode, setShowDiscountCode] = useState(false);

  // Countdown Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 }; // Reset
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Show popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $50',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% Protected',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: HeartHandshake,
      title: '24/7 Support',
      description: 'Dedicated support',
      gradient: 'from-pink-500 to-indigo-500'
    },
    {
      icon: TrendingUp,
      title: 'Best Prices',
      description: 'Price match guarantee',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const testimonials = [
    {
      name: 'Alice Johnson',
      rating: 5,
      comment: 'Amazing quality and super fast delivery! Will definitely shop again.',
      date: '2 days ago',
      verified: true
    },
    {
      name: 'Robert Smith',
      rating: 5,
      comment: 'Best online shopping experience. Great prices and excellent customer service!',
      date: '1 week ago',
      verified: true
    },
    {
      name: 'Maria Garcia',
      rating: 5,
      comment: 'Love the variety of products and the quality is outstanding!',
      date: '2 weeks ago',
      verified: true
    }
  ];

  const securityBadges = [
    { name: 'SSL Secured', icon: Lock },
    { name: 'Verified Merchant', icon: ShieldCheck },
    { name: 'PCI Compliant', icon: Award },
    { name: 'Data Protected', icon: Shield }
  ];

  const paymentMethods = [
    'Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay', 'Amex'
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setShowDiscountCode(true);
      setTimeout(() => setShowDiscountCode(false), 10000);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Announcement Bar */}
      {showAnnouncement && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 relative">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1 justify-center">
              <Bell className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-medium">
                 LIMITED TIME: Use code <span className="font-bold">PANDA20</span> for 20% OFF on all orders!
              </span>
            </div>
            <button
              onClick={() => setShowAnnouncement(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <Hero />

      {/* Limited Time Offer Section */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-4 md:mb-0">
              <h3 className="text-2xl font-bold mb-2 flex items-center space-x-2">
                <Zap className="w-6 h-6" />
                <span>Flash Sale - Today Only!</span>
              </h3>
              <p className="text-indigo-100">Save up to 50% on selected items</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                  <span className="text-3xl font-bold text-white">{timeLeft.hours.toString().padStart(2, '0')}</span>
                </div>
                <span className="text-xs text-indigo-100">Hours</span>
              </div>
              <span className="text-white text-2xl">:</span>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                  <span className="text-3xl font-bold text-white">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                </div>
                <span className="text-xs text-indigo-100">Minutes</span>
              </div>
              <span className="text-white text-2xl">:</span>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                  <span className="text-3xl font-bold text-white">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                </div>
                <span className="text-xs text-indigo-100">Seconds</span>
              </div>
            </div>
            <Link
              to="/products"
              className="mt-4 md:mt-0 px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Shop Now →
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Building - Shipping & Returns */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <Truck className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
              <h4 className="font-bold text-gray-800 mb-2">Free Shipping</h4>
              <p className="text-sm text-gray-600">On all orders over $50</p>
              <p className="text-xs text-indigo-600 mt-2">No code needed</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <RefreshCw className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h4 className="font-bold text-gray-800 mb-2">Easy Returns</h4>
              <p className="text-sm text-gray-600">30-day return policy</p>
              <p className="text-xs text-purple-600 mt-2">No questions asked</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <Package className="w-12 h-12 text-pink-600 mx-auto mb-3" />
              <h4 className="font-bold text-gray-800 mb-2">Fast Delivery</h4>
              <p className="text-sm text-gray-600">2-5 business days</p>
              <p className="text-xs text-pink-600 mt-2">Track your order</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <Shield className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
              <h4 className="font-bold text-gray-800 mb-2">Money Back</h4>
              <p className="text-sm text-gray-600">100% Guarantee</p>
              <p className="text-xs text-indigo-600 mt-2">Shop with confidence</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      {/* <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose PricePanda?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best online shopping experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-indigo-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Featured Products Section */}
      <div className="py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          {/* <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full mb-4 shadow-md">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-600">Featured Collection</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Trending Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of the season's hottest items
            </p>
          </div> */}

          {/* Product List Component */}
          <ProductList />

          {/* View All Button */}
          {/* <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              <span>View All Products</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div> */}
        </div>
      </div>

      {/* Customer Testimonials with Trust Indicators */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            <div className="flex items-center justify-center space-x-2 mt-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600 font-medium">4.9 out of 5</span>
              <span className="text-gray-500">(2,394 reviews)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-indigo-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  {testimonial.verified && (
                    <span className="flex items-center space-x-1 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800">{testimonial.name}</span>
                  <span className="text-sm text-gray-500">{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Badges & Payment Methods */}
      <div className="py-12 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Security Badges */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-indigo-600" />
                  <span>Shop with Confidence</span>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {securityBadges.map((badge, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                      <badge.icon className="w-8 h-8 text-indigo-600" />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{badge.name}</p>
                        <p className="text-xs text-gray-600">Guaranteed</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                  <span>Accepted Payment Methods</span>
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 flex items-center justify-center border border-indigo-200">
                      <span className="text-sm font-medium text-gray-700">{method}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4 flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-green-600" />
                  <span>All transactions are encrypted and secure</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Newsletter Section with Discount Code */}
      {/* <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full mb-6">
            <Gift className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-semibold">Exclusive Offer</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get 15% Off Your First Order!
          </h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and receive an exclusive discount code instantly. 
            Plus, stay updated with our latest collections and special offers.
          </p>
          
          {showDiscountCode ? (
            <div className="bg-white/20 backdrop-blur rounded-xl p-6 max-w-md mx-auto">
              <div className="text-white mb-2">🎉 Your discount code:</div>
              <div className="bg-white rounded-lg px-6 py-3 text-2xl font-bold text-indigo-600">
                WELCOME15
              </div>
              <p className="text-indigo-100 text-sm mt-3">Valid for the next 24 hours</p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-6 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button 
                type="submit"
                className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Get 15% Off</span>
                <Percent className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div> */}

      {/* Pop-up Offer */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-slideUp">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Wait! Don't Miss Out!
              </h3>
              <p className="text-gray-600 mb-6">
                Get <span className="font-bold text-indigo-600">10% OFF</span> your first purchase!
              </p>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">Use code at checkout:</p>
                <p className="text-2xl font-bold text-indigo-600">SAVE10</p>
              </div>
              <Link
                to="/products"
                onClick={() => setShowPopup(false)}
                className="block w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
              >
                Start Shopping
              </Link>
              <button
                onClick={() => setShowPopup(false)}
                className="mt-3 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                No thanks, I'll pay full price
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(50px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;