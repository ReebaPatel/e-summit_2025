"use client";

import React, { useState, useEffect } from 'react';

const HeroComponent = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const eventDate = new Date('2025-03-11T00:00:00');
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      
      
      {/* Top Logos */}
<div 
  className="absolute top-4 left-4 w-24 h-24"
  style={{ 
    top: '10rem',      // Easily adjustable top position
    left: '20rem',     // Easily adjustable left position
    width: '6rem',    // Easily adjustable width
    height: '6rem'    // Easily adjustable height
  }}
>
  <img
    src="/e-cell-logo.svg"
    alt="E-Cell Logo"
    className="w-full h-full object-contain"
  />
</div>
<div 
  className="absolute top-4 right-4 w-24 h-24"
  style={{ 
    top: '10rem',      // Easily adjustable top position
    right: '20rem',    // Easily adjustable right position
    width: '6rem',    // Easily adjustable width
    height: '6rem'    // Easily adjustable height
  }}
>
  <img
    src="/iic.svg"
    alt="IIC Logo"
    className="w-full h-full object-contain"
  />
</div>
      
      {/* Content on top of the video */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        {/* Image */}
        <img
          src="/esummit.png"
          alt="E-Summit Hero"
          className="max-w-full max-h-full object-contain"
          style={{ width: '65%', height: 'auto' }}
        />
        
        {/* Countdown Component */}
        <div className="mt-8 flex space-x-4">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div 
              key={unit} 
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 w-24 text-center shadow-lg transition-all hover:scale-105"
            >
              <div className="text-4xl font-bold text-white">{value}</div>
              <div className="text-sm text-white/70 uppercase tracking-wider">{unit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;