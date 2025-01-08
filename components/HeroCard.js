import React from "react";

const HeroCard = () => {
  return [4, 3, 2, 1].map((item) => (
    <div
      key={item}
      className={`absolute bottom-[10%] right-[10%] md:w-[354px] md:h-[354px] ${
        item == 4
          ? "-rotate-[30deg]"
          : item == 3
          ? "-rotate-[20deg]"
          : item == 2
          ? "-rotate-[10deg]"
          : ""
      }
      `}
    >
      <img src="/heroCardDemoImg.png" alt="card-demo" className="rounded-2xl" />
    </div>
  ));
};

export default HeroCard;
