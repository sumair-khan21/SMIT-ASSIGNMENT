import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  Sparkles, 
  TrendingUp,
  Clock,
  ShoppingBag 
} from "lucide-react";
import { useNavigate } from "react-router-dom";



const Hero = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const navigate = useNavigate();

  const videoUrl = "https://www.pexels.com/download/video/5699539/";
  // Alternative placeholder URLs you can try:
  // "https://www.pexels.com/download/video/5699539/"

  const toggleMute = () => setIsMuted(!isMuted);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const promotionVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1.5
      }
    }
  };

  return (
    <>
      {/* Font Import */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&family=Righteous&family=Outfit:wght@400;600;800&display=swap');
        `}
      </style>

      <section className="relative w-full h-screen overflow-hidden bg-black">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onLoadedData={() => setIsVideoLoaded(true)}
          >
            <source src={videoUrl} type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
            Your browser does not support the video tag.
          </video>

          {/* Dark Overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          
          {/* Additional artistic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20" />
        </div>

        {/* Main Content Overlay */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center"
        >
          {/* Brand Name with Animation */}
          <motion.div
            variants={itemVariants}
            className="mb-4"
          >
            <span 
              className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm md:text-base font-medium border border-white/20"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.5px' }}
            >
              <ShoppingBag className="inline w-4 h-4 mr-2" />
              <span style={{ fontFamily: "'Righteous', cursive" }}>Welcome to PricePanda</span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
          >
            <span 
              className="block bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent"
              style={{ 
                fontFamily: "'Playfair Display', serif", 
                fontWeight: 900,
                letterSpacing: '-0.02em'
              }}
            >
              Discover Your
            </span>
            <span 
              className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient"
              style={{ 
                fontFamily: "'Bebas Neue', cursive", 
                letterSpacing: '0.04em',
                fontSize: '1.1em'
              }}
            >
              Perfect Style
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-white/80 mb-8 max-w-2xl"
            style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontWeight: 400,
              lineHeight: 1.6,
              letterSpacing: '0.01em'
            }}
          >
            Shop the latest trends with exclusive deals, premium quality, and free shipping on orders over $50
          </motion.p>

          {/* Features/Benefits */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-8"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <div className="flex items-center space-x-2 text-white/70 text-sm md:text-base">
              <Clock className="w-4 h-4" />
              <span style={{ fontWeight: 600, letterSpacing: '0.02em' }}>24/7 Support</span>
            </div>
            <div className="text-white/50">•</div>
            <div className="flex items-center space-x-2 text-white/70 text-sm md:text-base">
              <TrendingUp className="w-4 h-4" />
              <span style={{ fontWeight: 600, letterSpacing: '0.02em' }}>100K+ Products</span>
            </div>
            <div className="text-white/50">•</div>
            <div className="flex items-center space-x-2 text-white/70 text-sm md:text-base">
              <Sparkles className="w-4 h-4" />
              <span style={{ fontWeight: 600, letterSpacing: '0.02em' }}>Premium Brands</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/products')}
            className="group relative px-8 py-4 md:px-12 md:py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg md:text-xl rounded-full shadow-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span style={{ letterSpacing: '0.05em', fontWeight: 700 }}>VIEW COLLECTION</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                →
              </motion.span>
            </span>
            
            {/* Button glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-50 blur-xl group-hover:opacity-70 transition-opacity" />
          </motion.button>
        </motion.div>

        {/* Sound Toggle Button */}
        <motion.button
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
          onClick={toggleMute}
          className="absolute bottom-20 left-4 md:bottom-8 md:left-8 z-20 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </motion.button>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20"
        >
          <button
            onClick={scrollToNext}
            className="flex flex-col items-center text-white/70 hover:text-white transition-colors group"
            aria-label="Scroll to next section"
          >
            <span 
              className="text-xs md:text-sm mb-2 font-medium"
              style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}
            >
              EXPLORE MORE
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="p-2 rounded-full border border-white/30 group-hover:border-white/50 transition-colors"
            >
              <ChevronDown size={24} />
            </motion.div>
          </button>
        </motion.div>

        {/* Loading overlay - shows while video loads */}
        <AnimatePresence>
          {!isVideoLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 z-30 flex items-center justify-center"
            >
              <div className="text-white text-center">
                <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
                <p 
                  className="text-lg"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.05em' }}
                >
                  Loading amazing deals...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add gradient animation keyframes */}
        <style jsx>{`
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
        `}</style>
      </section>
    </>
  );
};

export default Hero;