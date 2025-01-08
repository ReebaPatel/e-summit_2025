import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Sponsors from "@/components/Sponsors";

export default function Home() {
  return (
    <main className="bg-[url('/bg-image.svg')] bg-fixed bg-cover bg-center">
      <Navbar />
      <div className="space-y-24">
        <Hero />
        <About />
        <Events />
        <Sponsors />
        <Footer />
      </div>
    </main>
  );
}
