import HeroCard from "./HeroCard";

const Hero = () => {
  return (
    <section className="min-h-screen relative">
      <h1 className="text-center shadow-[0px_4px_4px_0px_#00000040] bg-gradient-to-b from-[#F24181] to-[#000000] text-transparent bg-clip-text leading-none">
        <span className="md:text-[250px] marck-script-regular">E</span>
        <span className="squada-one-regular md:text-[200px]">
          -SUMMIT&apos;25
        </span>
      </h1>
      <div className="absolute bottom-[40%] left-[10%] md:left-[15%]">
        <h2 className="roboto-medium tracking-[-8%] md:text-[80px] uppercase md:leading-[80px]">
          We Build <br />
          Entrepreneurs
        </h2>
        <p className="roboto-light md:text-[32px] md:leading-[30px]">
          Quality you won't find elsewhere.
        </p>
        <button className="border-[3px] border-white rounded-[180px] roboto-semibold text-[20px] leading-[24px] px-8 py-4 mt-8 ml-8 hover:bg-white hover:text-black">
          Get Started
        </button>
      </div>
      <HeroCard />
    </section>
  );
};

export default Hero;
