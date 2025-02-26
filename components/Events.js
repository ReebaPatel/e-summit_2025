import React from "react";

const EventGrid = () => {
  return (
    <div className="w-full relative p-4 overflow-hidden min-h-screen">
      {/* Title Section */}
      <h1 className="relative text-white text-center text-4xl sm:text-5xl md:text-6xl font-poppins font-extrabold mb-6 pl-4 z-20">
        EVENTS
      </h1>

      <div className="relative grid grid-cols-1 sm:grid-cols-6 md:grid-cols-12 gap-4 max-w-7xl mx-auto z-20">
        {/* Leadership and Disruption Series */}
        <div className="col-span-1 sm:col-span-6 row-span-2 relative rounded-lg overflow-hidden h-60 sm:h-80 hover:shadow-lg hover:shadow-white/50 transition-shadow duration-300">
          <img
            src="/leadership.webp"
            alt="Leadership Series"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 className="text-white text-lg sm:text-xl font-semibold">
              Leadership and Disruption Series
            </h2>
          </div>
        </div>

        {/* Keynote Session */}
        <div className="col-span-1 sm:col-span-4 relative rounded-lg overflow-hidden h-40 sm:h-40 hover:shadow-lg hover:shadow-white/50 transition-shadow duration-300">
          <img
            src="/key.webp"
            alt="Keynote Session"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 className="text-white text-base sm:text-lg font-semibold">
              Keynote Session
            </h2>
          </div>
        </div>

        {/* SIJF */}
        <div className="col-span-1 sm:col-span-2 row-span-2 relative rounded-lg overflow-hidden h-60 sm:h-80 hover:shadow-lg hover:shadow-white/50 transition-shadow duration-300">
          <img
            src="/job.webp"
            alt="SIJF"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 className="text-white text-sm sm:text-base font-semibold">
              SIJF - Startup, Internship, and Job Fair
            </h2>
          </div>
        </div>

        {/* Espresso with E-Cell */}
        <div className="col-span-1 sm:col-span-2 relative rounded-lg overflow-hidden h-40 hover:shadow-lg hover:shadow-white/50 transition-shadow duration-300">
          <img
            src="/pod.webp"
            alt="Espresso with E-Cell"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 className="text-white text-sm sm:text-base font-semibold">Espresso</h2>
          </div>
        </div>

        {/* Startup Social */}
        <div className="col-span-1 sm:col-span-2 relative rounded-lg overflow-hidden h-40 hover:shadow-lg hover:shadow-white/50 transition-shadow duration-300">
          <img
            src="/start.webp"
            alt="Startup Social"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 className="text-white text-sm sm:text-base font-semibold">
              Startup Social
            </h2>
          </div>
        </div>

        {/* Creator's Summit */}
        <div className="col-span-1 sm:col-span-4 relative rounded-lg overflow-hidden h-40 hover:shadow-lg hover:shadow-white/50 transition-shadow duration-300">
          <img
            src="/create.webp"
            alt="Creator's Summit"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 className="text-white text-sm sm:text-base font-semibold">
              Creator's Summit
            </h2>
          </div>
        </div>

        {/* Entertainment Night */}
        <div className="col-span-1 sm:col-span-8 relative rounded-lg overflow-hidden h-40 hover:shadow-lg hover:shadow-white/50 transition-shadow duration-300">
          <img
            src="/comedy.webp"
            alt="Entertainment Night"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 className="text-white text-sm sm:text-lg font-semibold">
            Idea validation and Networking arena
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventGrid;
