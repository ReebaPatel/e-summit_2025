import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <>
      <nav className="md:flex items-center justify-between px-4 hidden">
        <ul className="flex items-center space-x-8">
          <Image
            src="/e-cell-logo.svg"
            alt="Ecell Logo"
            width={100}
            height={100}
          />
          {["Home", "Info", "Reviews", "Contact"].map((item) => (
            <li
              key={item}
              className="roboto-medium text-[24px] leading-[24.12px]"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-8">
          <Image src="/Whatsapp.png" alt="whatsapp" width={25} height={25} />
          <Image src="/Linkedin.png" alt="linkedin" width={25} height={25} />
          <Image src="/Instagram.png" alt="instagram" width={25} height={25} />
          <Image src="/iic.svg" alt="iic-logo" width={159} height={68} />
        </div>
      </nav>

      {/* Mobile View */}
      <nav className="flex flex-col md:hidden items-center justify-center px-4 gap-2">
        <div className="flex justify-between items-center w-full">
          <Image
            src="/e-cell-logo.svg"
            alt="Ecell Logo"
            width={80}
            height={80}
          />
          <Image src="/iic.svg" alt="iic-logo" width={120} height={50} />
        </div>
        <ul className="flex items-center space-x-6">
          {["Home", "Info", "Reviews", "Contact"].map((item) => (
            <li key={item} className="roboto-medium">
              {item}
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-6">
          <Image src="/Whatsapp.png" alt="whatsapp" width={20} height={20} />
          <Image src="/Linkedin.png" alt="linkedin" width={20} height={20} />
          <Image src="/Instagram.png" alt="instagram" width={20} height={20} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
