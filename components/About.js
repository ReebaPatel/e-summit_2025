import React from "react";

export default function AboutUs() {
  return (
    <div className="relative w-full my-48 overflow-hidden">
      {/* Content */}
      <div className="flex flex-col items-center justify-start h-full text-center px-4 pt-16">
        <h1 className="text-7xl font-extrabold text-white mb-6 font-poppins">
          About Us
        </h1>
        <p className="text-white text-lg leading-relaxed max-w-3xl font-poppins pt-16">
          E-Cell FCRIT presents its annual flagship event E-SUMMIT'25. One of
          the biggest Entrepreneurship summits in India, E-Summit will bring to
          you a series of enthralling events, from panel discussions with
          distinguished dignitaries to exciting competitions like B-plan, Case
          study, and Hackathon, along with a spectacular band night and comedy
          night. The level of grandeur will be unparalleled.
        </p>
      </div>
    </div>
  );
}
