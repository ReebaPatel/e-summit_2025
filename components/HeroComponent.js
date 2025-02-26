"use client";
import React, { useState, useEffect } from 'react';

const HeroComponent = () => {
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate opacity based on scroll position
      const opacity = Math.max(0, 1 - (window.scrollY / (window.innerHeight * 0.3)));
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden px-4 sm:px-8">
      {/* Top Centered Header with refined spacing */}
      <div className="absolute top-8 sm:top-12 left-0 right-0 flex flex-col items-center gap-6 sm:gap-8">
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 transition-all duration-300 hover:scale-105">
          <img
            src="/e-cell-logo.svg"
            alt="E-Cell Logo"
            className="w-20 h-20 sm:w-28 sm:h-28 object-contain transition-transform duration-300 hover:rotate-12"
          />
          <span className="text-white text-3xl sm:text-5xl font-bold tracking-wide drop-shadow-lg">
            ECELL FCRIT
          </span>
          <img
            src="/iic.svg"
            alt="IIC Logo"
            className="w-20 h-20 sm:w-28 sm:h-28 object-contain transition-transform duration-300 hover:rotate-12"
          />
        </div>
        
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <span className="text-white/80 text-lg sm:text-2xl italic font-light tracking-widest transform hover:scale-105 transition-transform duration-300 drop-shadow-md">
            Presents
          </span>
          <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        </div>
      </div>

      {/* Main Content with enhanced spacing */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        {/* Increased margin below the E-Summit Image */}
        <div className="mt-12 sm:mt-32 transform hover:scale-105 transition-transform duration-500">
          <img
            src="/esummit.png"
            alt="E-Summit Hero"
            className="max-w-full max-h-full object-contain drop-shadow-lg"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>

        {/* Added extra spacing between image and text */}
        <div className="mt-6 sm:mt-12 flex flex-col items-center gap-1 sm:gap-2">
          <span className="text-white/80 text-lg sm:text-2xl italic font-light tracking-widest transform hover:scale-105 transition-transform duration-300 drop-shadow-md">
            MUMBAI UNIVERSITY'S BIGGEST ENTREPRENEURSHIP SUMMIT
          </span>
          <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        </div>
        
        {/* Elegant Date Display */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center gap-1 sm:gap-2">
          <div className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-red-600 to-yellow-400 text-transparent bg-clip-text tracking-wider drop-shadow-xl">
            11-12th March
          </div>
          <div className="text-xl sm:text-2xl font-light text-white/90 tracking-[0.1em] sm:tracking-[0.2em] mt-1 drop-shadow-lg">
            2025
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
