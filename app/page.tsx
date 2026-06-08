import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Industries from "@/components/Industries";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import DiscoveryForm from "@/components/Form";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Problem />
      <Industries />
      <Testimonials />
      <HowItWorks />
      <DiscoveryForm />
      <Footer />
    </main>
  );
}
