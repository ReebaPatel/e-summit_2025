import Image from "next/image";

const Footer = () => {
  const links = [
    {
      heading: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Careers", href: "#careers" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { name: "Newsletter", href: "#newsletter" },
        { name: "E-book", href: "#ebook" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { name: "Press", href: "#press" },
        { name: "Privacy", href: "#privacy" },
        { name: "Contact", href: "#contact" },
      ],
    },
  ];

  return (
    <footer className="text-[#B0B0B0]">
      <div className="flex flex-wrap items-center justify-between mx-20">
        <div className="space-y-[38px] w-1/3">
          <div className="inter-800 text-[25.11px] leading-[30.38px]">
            E-Summit&apos;25
          </div>
          <div className="inter-400 text-[20px] leading-[28.87px]">
            Unraveling the mysteries of my life, where we break down the
            incredible journeys of designing and coding.
          </div>
        </div>
        <div className="flex w-2/3 justify-evenly">
          {links.map((link) => (
            <div key={link.heading} className="space-y-[19.24px]">
              <div className="inter-600 text-[20px] leading-[24.06px]">
                {link.heading}
              </div>
              <div className="space-y-[14.43px]">
                {link.links.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="inter-400 text-[19.24px] leading-[28.87px]"
                  >
                    <div>{item.name}</div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-20 mt-20 bg-opacity-20 bg-[#E5F0FF05] rounded-[32px] flex gap-[14px] items-center justify-center py-[32px]">
        <Image
          src="/footer_leaf.svg"
          alt="footer-leaf"
          width={23.75}
          height={27.05}
        />
        <div className="inter-600 text-[19.24px] leading-[28.87px]">
          Website created by ECell&apos;FCRIT
        </div>
      </div>
    </footer>
  );
};

export default Footer;
