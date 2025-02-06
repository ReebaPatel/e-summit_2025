"use client";

import Carousel from "@/components/ui/carousel";

export default function CarouselDemo() {
  const slideData = [
    { title: "To Be Announced" },
    { title: "To Be Announced" },
    { title: "To Be Announced" },
    { title: "To Be Announced" },
    { title: "To Be Announced" },
    { title: "To Be Announced" },
    { title: "To Be Announced" },
    { title: "To Be Announced" },
  ];

  return (
    <div className="relative overflow-hidden my-48 w-full h-screen py-32">
      <h1 className="absolute top-10 left-1/2 transform -translate-x-1/2 text-white text-5xl font-poppins font-extrabold z-20">
        Past Speakers<span className="text-blue-500">.</span>
      </h1>

      <Carousel slides={slideData} />
    </div>
  );
}