import About from "../components/About";
import Sponsors from "../components/Sponsors";
import HeroComponent from "../components/HeroComponent";
import EventGrid from "../components/Events";
import { AnimatedPinDemo } from "../components/Animatedpin";
// import CarouselDemo from "../components/CarouselDemo";
import Speakers from "../components/Speakers";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <HeroComponent />
      <Sponsors />
      <About />

      <div className="relative w-full h-screen overflow-hidden">
        <div className="flex flex-col items-center justify-start h-full text-center text-white px-4 pt-20">
          <h1 className="text-7xl font-extrabold mb-6">Why E-Cell FCRIT</h1>
          <p className="text-lg max-w-3xl leading-relaxed">
            E-Cell FCRIT has championed an entrepreneurial ethos, guiding
            students with the expertise of venture capitalists and industry
            leaders. Our mission is to nurture 'CREATORS' transcending
            traditional education by promoting values of productivity,
            innovation, and independent thinking. E-Cell FCRIT inspires 'CHANGE'
            by instilling out-of-the-box ideas and equipping individuals to be
            architects of transformation. We are dedicated to shaping engineers
            who actively contribute to a future defined by innovation and
            impact.
          </p>
        </div>
      </div>

      <EventGrid />
      <AnimatedPinDemo />
      {/* <CarouselDemo /> */}
      <Speakers />
      <Footer />
    </main>
  );
}
