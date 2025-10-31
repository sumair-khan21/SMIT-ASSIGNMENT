import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Upgrade Your Style 👕",
    description: "Discover the latest fashion trends with up to 50% off!",
    image: "slider1.jpg",
    bg: "from-indigo-500 to-purple-600",
  },
  {
    id: 2,
    title: "Tech for the Future ⚡",
    description: "Get the newest gadgets at unbeatable prices.",
    image: "slider2.jpg",
    bg: "from-gray-800 to-gray-900",
  },
  {
    id: 3,
    title: "Elegant Jewelry 💍",
    description: "Add a touch of sparkle to every moment.",
    image: "slider3.jpg",
    bg: "from-pink-500 to-rose-600",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[92vh] overflow-hidden ">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          className={`absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-gradient-to-r ${slides[current].bg}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Image */}
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />

          {/* Overlay Content */}
          <div className="relative z-10 max-w-2xl px-6">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {slides[current].title}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {slides[current].description}
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-50 transition"
            >
              Shop Now
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
