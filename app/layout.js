import { Geist as GeistSans, Geist_Mono as GeistMono } from "next/font/google";
import "./globals.css";

const geistSans = GeistSans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = GeistMono({
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
        {/* Create a container for the video with a light/dark mode aware background */}
        <div className="fixed top-0 left-0 w-full h-full -z-10">
          <div className="absolute inset-0 bg-white/0 dark:bg-black/40" />
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
            playsInline
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative overflow-hidden">{children}</div>
      </body>
    </html>
  );
}
