"use client";
import React from "react";
import { Instagram, Linkedin } from "lucide-react";
import { useInView } from "react-intersection-observer";

const Footer = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <footer
      ref={ref}
      className={`
        bg-gradient-to-br from-orange-400/60 via-red-600/65 to-red-900/70
        background-animate backdrop-blur-sm text-white p-10 
        transition-all duration-1000 ease-in-out
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      style={{
        backgroundSize: "200% 200%",
        animation: "gradient 15s ease infinite",
      }}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/e-cell-logo.png"
              alt="E-Cell Logo"
              className="w-24 h-24"
            />
            <img src="/iic.svg" alt="IIC Logo" className="w-24 h-24" />
          </div>
          <p className="text-sm leading-relaxed">
            E-Cell FCRIT aims to induce an entrepreneurial mindset into the
            students and air an innovative streak in them. We are here to water
            the 'Ideas' in the bud and help them bloom into impactful endeavors
            through networking student enterprises from campus to incubators,
            seeding funds and angel investors to transform the newly proposed
            ideas into successful start-ups.
          </p>
          <button className="mt-4 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition duration-300">
            Email Us
          </button>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="text-lg font-semibold mb-4">QUICK LINKS</h6>
          <div className="space-y-2">
            <a
              href="https://ecell.uapp.in"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-md text-white-200 hover:text-orange-400 transition duration-300"
            >
              Visit E-Cell Website →
            </a>
          </div>
          <div className="space-y-2">
            <a
              href="https://spark-a-thon.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-md text-white-200 hover:text-orange-400 transition duration-300"
            >
              SPARKATHON Website →
            </a>
          </div>
        </div>

        {/* Reach Out */}
        <div>
          <h6 className="text-lg font-semibold mb-4">REACH OUT</h6>
          <div className="space-y-2">
            <p className="text-sm">
              Father Agnel Technical Education Complex, near Noor Masjid, Juhu
              Nagar, Sector 9A, Vashi, Navi Mumbai, Maharashtra 400703
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              {[
                {
                  Icon: Instagram,
                  href: "https://www.instagram.com/ecellfcrit/",
                  color: "hover:text-orange-300",
                },
                {
                  Icon: Linkedin,
                  href: "https://www.linkedin.com/company/fcrit-entrepreneurship-cell/",
                  color: "hover:text-orange-200",
                },
              ].map(({ Icon, href, color }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-300 ${color}`}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 pt-4 border-t border-orange-400/30">
        <p>© 2025. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
