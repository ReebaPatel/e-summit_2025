import React from 'react';

const EventGrid = () => {
  return (
    <div className="w-full relative  p-4 overflow-hidden h-screen">
      
      
      

      {/* Title Section */}
      <h1 className="relative text-white text-center text-6xl font-poppins font-extrabold mb-6 pl-4 z-20">EVENTS<span className="text-blue-500">.</span></h1>

      <div className="relative grid grid-cols-12 gap-4 max-w-6xl mx-auto z-20">
        {/* Leadership and Disruption Series - Spans 6 columns */}
        <div className="col-span-6 row-span-2 relative rounded-lg overflow-hidden h-80 hover:shadow-lg hover:shadow-white/50 transition-shadow duration-300">
          <img 
            src="/leadership.webp" 
            alt="Leadership Series" 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 className="text-white text-xl font-semibold">Leadership and Disruption Series</h2>
          </div>
        </div>

        {/* Keynote Session - Spans 4 columns */}
        <div className="col-span-4 relative rounded-lg overflow-hidden h-40 hover:shadow-lg hover:shadow-white/50 transition-shadow duration-300">
          <img 
            src="/key.webp" 
            alt="Keynote Session" 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 className="text-white text-lg font-semibold">Keynote Session</h2>
          </div>
        </div>

        {/* SIJF - Vertical rectangle */}
        <div className="col-span-2 row-span-2 relative rounded-lg overflow-hidden h-80 hover:shadow-lg hover:shadow-white/50 transition-shadow duration-300">
          <img 
            src="/job.webp" 
            alt="SIJF" 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 className="text-white text-base font-semibold">SIJF - Startup, Internship, and Job Fair</h2>
          </div>
        </div>

        {/* Espresso with E-Cell */}
        <div className="col-span-2 relative rounded-lg overflow-hidden h-40 hover:shadow-lg hover:shadow-white/50 transition-shadow duration-300">
          <img 
            src="/pod.webp" 
            alt="Espresso with E-Cell" 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 className="text-white text-base font-semibold">Espresso</h2>
          </div>
        </div>

        {/* Startup Social */}
        <div className="col-span-2 relative rounded-lg overflow-hidden h-40 hover:shadow-lg hover:shadow-white/50 transition-shadow duration-300">
          <img 
            src="/start.webp" 
            alt="Startup Social" 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 className="text-white text-base font-semibold">Startup Social</h2>
          </div>
        </div>

        {/* Creator's Summit */}
        <div className="col-span-4 relative rounded-lg overflow-hidden h-40 hover:shadow-lg hover:shadow-white/50 transition-shadow duration-300">
          <img 
            src="/create.webp" 
            alt="Creator's Summit" 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 className="text-white text-base font-semibold">Creator's Summit</h2>
          </div>
        </div>

        {/* Comedy Dose */}
        <div className="col-span-4 relative rounded-lg overflow-hidden h-40 hover:shadow-lg hover:shadow-white/50 transition-shadow duration-300">
          <img 
            src="/comedy.webp" 
            alt="Comedy Dose" 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 className="text-white text-base font-semibold">Comedy Dose</h2>
          </div>
        </div>

        {/* Bollywood Blaze */}
        <div className="col-span-4 relative rounded-lg overflow-hidden h-40 hover:shadow-lg hover:shadow-white/50 transition-shadow duration-300">
          <img 
            src="/bolly.webp" 
            alt="Bollywood Blaze" 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 className="text-white text-base font-semibold">Bollywood Blaze</h2>
          </div>
        </div>
      </div>
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20 z-10" /> 
    </div>
  );
};
export default EventGrid;