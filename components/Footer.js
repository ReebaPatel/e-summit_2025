"use client";
import React from "react";
import { Instagram, Twitter, Linkedin } from "lucide-react";
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
        bg-gradient-to-br from-gray-500/80 via-gray-700/90 to-gray-900/95 
        text-white p-10 transition-all duration-1000 ease-in-out
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/e-cell-logo.svg"
              alt="E-Cell Logo"
              className="w-16 h-16"
            />
          </div>
          <p className="text-sm leading-relaxed">
            E-Cell FCRIT aims to induce an entrepreneurial mindset into the
            students and air an innovative streak in them. We are here to water
            the 'Ideas' in the bud and help them bloom into impactful endeavors
            through networking student enterprises from campus to incubators,
            seeding funds and angel investors to transform the newly proposed
            ideas into successful start-ups.
          </p>
          <button className="mt-4 bg-white text-gray-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition">
            Email Us
          </button>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="text-lg font-semibold mb-4">QUICK LINKS</h6>
          <div className="space-y-2">{/* Add quick links if needed */}</div>
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
                  color: "hover:text-pink-400",
                },

                {
                  Icon: Linkedin,
                  href: "https://www.linkedin.com/company/fcrit-entrepreneurship-cell/",
                  color: "hover:text-blue-600",
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
      <div className="text-center mt-8 pt-4 border-t border-purple-700">
        <p>© 2025. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
