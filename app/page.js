import About from "../components/About";
import Sponsors from "../components/Sponsors";
import HeroComponent from "../components/HeroComponent";
import WhyECellDTU from "../components/whyecell";
import EventGrid from "../components/events";
import { AnimatedPinDemo } from "../components/Animatedpin";
import CarouselDemo from "../components/CarouselDemo";
import Footer from "../components/footer";

export default function Home() {
  return (
    <main>
      <HeroComponent />
      <Sponsors />
      <About />
      <WhyECellDTU />
      <EventGrid />
      <AnimatedPinDemo />
      <CarouselDemo />
      <Footer />
    </main>
  );
}
