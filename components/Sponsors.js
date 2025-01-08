import React from "react";
import Image from "next/image";

const Sponsors = () => {
  const sponsors = [
    "/google.svg",
    "/spotify.svg",
    "/amazon.svg",
    "/airbnb.svg",
    "/microsoft.svg",
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-8">
      <h1 className="squada-one-regular text-[96px] leading-[96.49px] text-center bg-gradient-to-b from-[#B2B2B2] to-[#4C4C4C] text-transparent bg-clip-text">
        Sponsors
      </h1>
      <div className="marquee">
        <div className="track items-center gap-36">
          {sponsors.concat(sponsors).map((src, index) => (
            <div key={index} className="item">
              <Image
                src={src}
                alt={`Sponsor ${index + 1}`}
                width={170}
                height={90}
                priority
              />
            </div>
          ))}
        </div>
      </div>
      <Image
        src="/sponsors_wavy_line.png"
        alt="wavy-line"
        width={1314}
        height={134.28}
      />
    </section>
  );
};

export default Sponsors;
