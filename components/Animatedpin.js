"use client";
import React from "react";
import { PinContainer } from "/components/ui/3d-pin";

export function AnimatedPinDemo() {
  // Card data array
  const cards = [
    {
      title: "Aceternity UI",
      description: "Customizable Tailwind CSS Components.",
      image: "/images/card4.jpg",
    },
    {
      title: "Next.js Guide",
      description: "Learn Next.js with ease.",
      image: "/images/card4.jpg",
    },
    {
      title: "Framer Motion",
      description: "Animate like a pro!",
      image: "/images/card4.jpg",
    },
    {
      title: "UI/UX Design",
      description: "Enhance your user experience.",
      image: "/images/card4.jpg",
    },
    {
      title: "React Best Practices",
      description: "Write clean and efficient React code.",
      image: "/images/card5.jpg",
    },
    {
      title: "Web Animations",
      description: "Make your website come alive!",
      image: "/images/card6.jpg",
    },
  ];

  return (
    <div className="relative w-full my-48 min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32">
      {/* Title */}
      <h1 className="absolute top-10 left-1/2 transform -translate-x-1/2 text-white text-6xl font-poppins font-extrabold">
        Competitions<span className="text-blue-500">.</span>
      </h1>

      {/* Card Container */}
      <div className="grid grid-cols-3 gap-x-8 gap-y-14 p-10">
        {cards.map((card, index) => (
          <div key={index} className="cursor-pointer">
            <PinContainer title={card.title} href="#">
              <div className="flex flex-col p-2 tracking-tight text-slate-100/50 w-[20rem] h-[20rem]">
                {index >= 0 ? (
                  <div className="flex justify-center items-center w-full h-full text-xl font-poppins text-center text-gray-500">
                    To Be Announced
                  </div>
                ) : (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
}
