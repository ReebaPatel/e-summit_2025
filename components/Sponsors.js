"use client"
import Image from "next/image";

const Sponsors = () => {
  // Array of sponsor logos (replace with your actual logo paths)
  const sponsorLogos = [
    "/hipla.png",
    "/chitale.png",
    "/images.jpeg",
    "/cloud9.png"
  ];

  return (
    <div className="relative w-full h-screen">
      {/* Sponsors Title */}
      <h1 className="text-7xl font-extrabold text-white mb-6 font-poppins absolute z-10 top-1/4 left-1/2 transform -translate-x-1/2">
        SPONSORS
      </h1>
      
      {/* Sponsors Logos */}
      <div className="font-Bebas Neue absolute top-1/2 left-1/2 transform -translate-x-1/2 z-10 w-full">
        <div className="rfm-marquee-container py-2 flex flex-col gap-8 my-2 w-full">
          {/* Row 1: Scrolling Left to Right */}
          <div
            className="rfm-marquee flex gap-4 animate-marquee-left"
            style={{ animationDuration: "10s" }}
          >
            {Array(6).fill(sponsorLogos).flat().map((logoPath, index) => (
              <div
                key={index}
                className="rfm-child flex items-center justify-center mx-24"
              >
                <div className="h-32 my-2 w-32 relative">
                  <Image 
                    src={logoPath} 
                    alt={`Sponsor ${index + 1} logo`} 
                    fill 
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Row 2: Scrolling Right to Left */}
          <div
            className="rfm-marquee flex gap-4 animate-marquee-right"
            style={{ animationDuration: "10s" }}
          >
            {Array(6).fill(sponsorLogos).flat().map((logoPath, index) => (
              <div
                key={index}
                className="rfm-child flex items-center justify-center mx-24"
              >
                <div className="h-32 my-2 w-32 relative">
                  <Image 
                    src={logoPath} 
                    alt={`Sponsor ${index + 1} logo`} 
                    fill 
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Inline CSS for animations */}
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-marquee-left {
          animation: marquee-left 10s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Sponsors;