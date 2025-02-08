"use client";
import { useState } from "react";

const Speakers = () => {
  const [current, setCurrent] = useState(0);
  const slides = [
    { name: "", designation: "", image: "/dummyImg.svg" },
    { name: "", designation: "", image: "/dummyImg.svg" },
    { name: "", designation: "", image: "/dummyImg.svg" },
    { name: "", designation: "", image: "/dummyImg.svg" },
    { name: "", designation: "", image: "/dummyImg.svg" },
    { name: "", designation: "", image: "/dummyImg.svg" },
    { name: "", designation: "", image: "/dummyImg.svg" },
  ];

  const handlePreviousClick = () =>
    setCurrent((prev) => (prev - 1 < 0 ? slides.length - 1 : prev - 1));
  const handleNextClick = () =>
    setCurrent((prev) => (prev + 1 === slides.length ? 0 : prev + 1));
  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 text-white mx-auto font-poppins text-4xl text-center md:text-7xl mb-4 mt-20 font-bold">
        Speakers
      </h2>

      <div className="relative w-full">
        <div className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]">
          <div className="absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"></div>
          <div
            className="flex flex-row gap-4 mx-12 max-w-[100rem] transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${current * (100 / slides.length)}%)`,
            }}
          >
            {slides.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl"
                style={{
                  opacity: "1",
                  willChange: "transform",
                  transform: "none",
                }}
              >
                <div className="rounded-3xl bg-gray-100 font-DarkerBold dark:bg-neutral-900 h-80 w-56 md:h-96 md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10">
                  <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b to-black/80 via-transparent from-transparent z-30 pointer-events-none"></div>
                  <div className="relative top-48 md:top-64 z-40 py-8 px-4 md:p-8 mt-full">
                    <p className="text-white font-Darkerbold text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] mt-2">
                      {item.name}
                    </p>
                    <p className="text-violet-400 Font-Darker text-lg md:text-xl text-left">
                      {item.designation}
                    </p>
                  </div>
                  <img
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    data-nimg="fill"
                    className="transition duration-300 blur-0 object-cover absolute z-10 inset-0"
                    style={{
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                      inset: "0px",
                      color: "transparent",
                    }}
                    sizes="100vw"
                    src={item.image}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mr-10">
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={handlePreviousClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tabler-icon tabler-icon-arrow-narrow-left h-6 w-6 text-gray-500"
            >
              <path d="M5 12l14 0"></path>
              <path d="M5 12l4 4"></path>
              <path d="M5 12l4 -4"></path>
            </svg>
          </button>
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={handleNextClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tabler-icon tabler-icon-arrow-narrow-right h-6 w-6 text-gray-500"
            >
              <path d="M5 12l14 0"></path>
              <path d="M15 16l4 -4"></path>
              <path d="M15 8l4 4"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Speakers;
