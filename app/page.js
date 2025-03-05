import About from "../components/About";
import Sponsors from "../components/Sponsors";
import HeroComponent from "../components/HeroComponent";
// import EventGrid from "../components/Events";
import AnimatedPinDemo from "../components/Animatedpin";
// import CarouselDemo from "../components/CarouselDemo";
import Speakers from "../components/Speakers";
import Footer from "../components/Footer";
import { eventDetails } from "@/lib/eventData";

export default function Home() {
  return (
    <main>
      <HeroComponent />
      <Sponsors />
      <About />

      <div className="relative w-full py-12">
        <div className="flex flex-col items-center justify-start h-full text-center text-white">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6">
            Why E-Cell FCRIT
          </h1>
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

      {/* <EventGrid /> */}
      <div className="relative py-12">
        <h1 className="text-center text-white text-4xl md:text-6xl font-bold">
          Competitions
        </h1>
        <div className="flex flex-wrap items-center justify-center">
          {Object.values(eventDetails).map((event) => (
            <AnimatedPinDemo
              key={event.id}
              title="Read more"
              href={`/events/${event.id}`}
              img={event.img}
            />
          ))}
        </div>
      </div>
      {/* <CarouselDemo /> */}
      <Speakers />
      <Footer />
    </main>
  );
}
