"use client";

const Speakers = () => {
  const slides = [
    { name: "Mr. Arjun Deshpande", designation: "", image: "/arjun.jpg" },
    { name: "Mrs. Soma Maitra", designation: "", image: "/soma.jpg" },
    { name: "Mr. Sandeep Kaul", designation: "", image: "/sandeep.jpg" },
    { name: "Mr. Uday Wankawala", designation: "", image: "/uday.jpg" },
  ];

  return (
    <div className="w-full py-20 px-4">
      <h2 className="max-w-7xl mx-auto text-white font-poppins text-4xl text-center md:text-7xl mb-12 font-bold">
        Speakers
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-5xl mx-auto">
        {slides.map((item, index) => (
          <div
            key={index}
            className="aspect-square rounded-lg overflow-hidden relative group"
          >
            <img
              alt={item.name}
              loading="lazy"
              className="w-full h-full object-cover absolute inset-0"
              src={item.image}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-75"></div>
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
              <p className="text-sm sm:text-lg md:text-2xl font-semibold line-clamp-1">
                {item.name}
              </p>
              {item.designation && (
                <p className="text-xs sm:text-sm md:text-lg text-gray-300 line-clamp-1">
                  {item.designation}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Speakers;
