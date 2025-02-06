import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "E-Summit 2025 | FCRIT, Vashi",
  description:
    "This website is created for E-Summit 2025 organized by FCRIT, Vashi by the team of E-cell.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        style={{ opacity: 0.4 }}
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative">{children}

      </div>
        
      </body>
    </html>
  );
}
