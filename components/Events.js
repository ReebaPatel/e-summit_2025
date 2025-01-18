// "use client";
// import { useEffect, useState, useRef } from "react";
// import EmblaCarousel from "embla-carousel"; // Correct Embla import
// import Autoplay from "embla-carousel-autoplay"; // Correct Autoplay plugin
// import "@/public/css/embla.css";
// import dynamic from "next/dynamic";

// const SmallCarousel = dynamic(() => import("./EmblaCarousel")); // Smaller carousel

// const Events = () => {
//   const SLIDES = [
//     {
//       background: "/events_first.svg",
//       title: "Landscapes",
//       description:
//         "Lorem ipsum dolor sit amet consectetur. Amet sem dictum viverra bibendum vulputate velit tincidunt consectetur. Amet donec fames ipsum pretium pretium fringilla aliquam aliquam. Varius massa donec tempor ut. Faucibus congue commodo volutpat massa. Pharetra sed malesuada purus viverra auctor dolor malesuada etiam.",
//       buttonText: "Register Now",
//       smallerCarouselSlides: ["/event-carousel-1.png", "/event-carousel-2.png"], // Images for the smaller carousel
//     },
//     {
//       background: "/events_second.webp",
//       title: "Adventures",
//       description:
//         "Adventures await! Lorem ipsum dolor sit amet consectetur. Varius massa donec tempor ut. Faucibus congue commodo volutpat massa.",
//       buttonText: "Explore More",
//       smallerCarouselSlides: ["/event-carousel-1.png", "/event-carousel-2.png"],
//     },
//     {
//       background: "/events_first.svg",
//       title: "Nature",
//       description:
//         "Dive into nature's beauty. Lorem ipsum dolor sit amet consectetur. Varius massa donec tempor ut. Faucibus congue commodo volutpat massa.",
//       buttonText: "Join Now",
//       smallerCarouselSlides: ["/event-carousel-1.png", "/event-carousel-2.png"],
//     },
//   ];
//   const emblaRef = useRef(null); // Ref for the outer carousel
//   const [outerApi, setOuterApi] = useState(null); // Embla carousel instance
//   const [currentOuterIndex, setCurrentOuterIndex] = useState(0);

//   const autoplayRef = useRef(
//     Autoplay({ delay: 4000, stopOnInteraction: false })
//   );

//   useEffect(() => {
//     if (emblaRef.current) {
//       // Initialize Embla carousel
//       const api = EmblaCarousel(emblaRef.current, { loop: true }, [
//         autoplayRef.current,
//       ]);
//       setOuterApi(api);

//       // Update current index on slide change
//       const updateCurrentSlide = () => {
//         setCurrentOuterIndex(api.selectedScrollSnap());
//       };
//       api.on("select", updateCurrentSlide);

//       return () => {
//         api.destroy(); // Cleanup on unmount
//       };
//     }
//   }, []);

//   return (
//     <section className="relative min-h-screen bg-black">
//       {/* Outer Carousel */}
//       <div className="embla" ref={emblaRef}>
//         <div className="embla__container">
//           {SLIDES.map((slide, index) => (
//             <div
//               className="embla__slide relative flex items-center justify-evenly"
//               key={index}
//             >
//               {/* Background Image */}
//               <div
//                 className="absolute inset-0 bg-cover bg-center"
//                 style={{ backgroundImage: `url(${slide.background})` }}
//               ></div>
//               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>

//               {/* Text Content */}
//               <div className="w-1/2 z-10 px-24">
//                 <div className="roboto-bold lg:text-[80px]">{slide.title}</div>
//                 <div className="roboto-regular text-base">
//                   {slide.description}
//                 </div>
//                 <button className="bg-[#FF262A] rounded-[10px] py-[17px] px-[34px] roboto-medium text-base mt-8">
//                   {slide.buttonText}
//                 </button>
//               </div>

//               {/* Smaller Inner Carousel */}
//               <div className="w-1/3 z-10">
//                 <SmallCarousel
//                   slides={slide.smallerCarouselSlides.map((src) => ({
//                     src,
//                   }))}
//                   options={{
//                     align: "center",
//                     containScroll: "trimSnaps",
//                     slidesToScroll: 1,
//                   }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Dot Navigation */}
//       <div className="absolute bottom-8 w-full flex justify-center z-20 space-x-2">
//         {SLIDES.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full ${
//               currentOuterIndex === index ? "bg-white" : "bg-gray-400"
//             }`}
//             onClick={() => outerApi?.scrollTo(index)}
//           ></button>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Events;

"use client";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
// import Autoplay from "embla-carousel-autoplay";
// import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import EmblaCarousel from "./EmblaCarousel";
import "@/public/css/embla.css";

const Events = () => {
  const OPTIONS = {
    align: "center",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
    draggable: true,
    // loop: true,
  };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  // const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("slidesInView", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      console.log(current);
    });
  }, [api]);

  return (
    <section
      className="min-h-screen relative bg-cover bg-center flex items-center justify-evenly"
      style={{ backgroundImage: "url('/events_first.svg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
      <div className="w-1/2 z-10 px-24">
        <div className="roboto-bold lg:text-[80px]">Landscapes</div>
        <div className="roboto-regular text-base">
          Lorem ipsum dolor sit amet consectetur. Amet sem dictum viverra
          bibendum vulputate velit tincidunt consectetur. Amet donec fames ipsum
          pretium pretium fringilla aliquam aliquam. Varius massa donec tempor
          ut. Faucibus congue commodo volutpat massa. Pharetra sed malesuada
          purus viverra auctor dolor malesuada etiam.
        </div>
        <button className="bg-[#FF262A] rounded-[10px] py-[17px] px-[34px] roboto-medium text-base mt-8">
          Register Now
        </button>
      </div>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      {/* <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-1/2 max-w-md"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="lg:basis-1/2">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel> */}
    </section>
  );
};

export default Events;
