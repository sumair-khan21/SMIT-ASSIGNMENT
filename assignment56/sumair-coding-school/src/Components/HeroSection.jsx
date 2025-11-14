// HeroSection.jsx
import React, { useState, useEffect } from "react";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section 
        className="min-h-screen flex flex-col justify-center items-center text-white px-6 pt-20 bg-gradient-to-b from-[#0a1a1a] to-[#144B3F]"
        style={{
          transform: scrollY > 0 ? `translateY(-${Math.min(scrollY * 0.5, 200)}px)` : 'translateY(0)',
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Main Heading */}
         <h1 className="text-[3.5rem] md:text-[5rem] lg:text-[6rem] font-light leading-[1.1] text-center max-w-[100rem] tracking-tight w-full px-12">
          We only{" "}
          <span className="text-[#3ef0c9] font-normal">teach</span>
          <br />
          what we are really
          <br />
          really <em className="italic font-light">good</em> at.
        </h1>

        {/* Sub text - positioned to right */}
        <div className="w-full max-w-6xl flex justify-end mt-8">
          <p className="text-gray-400 max-w-sm text-left text-base md:text-lg leading-relaxed">
            Get ready to <span className="text-[#3ef0c9]">accelerate your career</span> with customized courses and leave your mark in the tech industry
          </p>
        </div>

        {/* Animated Button */}
        <button 
          className="mt-5 bg-[#3ef0c9] hover:bg-[#2ed4af] text-black px-10 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 animate-subtle-move cursor-pointer"
        >
          Check Courses-Make an Impact
        </button>

        {/* Stats */}
        {/* <div className="flex flex-wrap justify-center gap-24 mt-32 text-gray-300">
          <div className="text-center">
            <h2 className="text-5xl font-light text-white mb-2">25k+</h2>
            <p className="text-base tracking-wide">Students taught</p>
          </div>
          <div className="text-center">
            <h2 className="text-5xl font-light text-white mb-2">20+</h2>
            <p className="text-base tracking-wide">Instructors</p>
          </div>
          <div className="text-center">
            <h2 className="text-5xl font-light text-white mb-2">588K+</h2>
            <p className="text-base tracking-wide">Youtube Subs.</p>
          </div>
        </div> */}
      </section>

      <style>{`
        @keyframes subtle-move {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(8px);
          }
        }
        
        .animate-subtle-move {
          animation: subtle-move 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default HeroSection;