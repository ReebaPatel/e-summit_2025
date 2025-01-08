import React from "react";

const Hero = () => {
  return (
    <section className="h-screen relative">
      <h1 className="text-center shadow-[0px_4px_4px_0px_#00000040] bg-gradient-to-b from-[#F24181] to-[#000000] text-transparent bg-clip-text leading-none">
        <span className="md:text-[250px] marck-script-regular">E-</span>
        <span className="squada-one-regular md:text-[200px]">
          SUMMIT&apos;25
        </span>
      </h1>
      <div className="absolute bottom-1/3 right-1/3">
        <h2 className="roboto-medium tracking-[-8%] md:text-[100px] uppercase md:leading-[90px]">
          We Build <br />
          Entrepreneurs
        </h2>
        <p className="roboto-light md:text-[38px] md:leading-[31.16px]">
          Quality you won't find elsewhere.
        </p>
        <button className="border-[3px] border-white rounded-[180px] roboto-semibold text-[24px] leading-[28.13px] px-8 py-4 mt-8 ml-8 hover:bg-white hover:text-black">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
