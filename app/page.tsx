import Nav from "@/components/Nav";
import SocialProofBar from "@/components/SocialProofBar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Channels from "@/components/Channels";
import WhyBokle from "@/components/WhyBokle";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import PreFormCTA from "@/components/PreFormCTA";
import DiscoveryForm from "@/components/Form";
import Footer from "@/components/Footer";

const TICKER_A = [
  "WhatsApp Automation",
  "AI Voice Agents",
  "Website Chatbots",
  "24/7 Response",
  "Lead Qualification",
  "Zero Setup",
  "Discovery Call",
];

const TICKER_B = [
  "Missed calls = missed revenue",
  "Cold leads die in 5 min",
  "1 in 3 enquiries ignored",
  "Competitors respond first",
  "After-hours leads lost forever",
];

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <SocialProofBar />
      <Hero />
      <Ticker items={TICKER_A} direction="left" duration={32} />
      <Problem />
      <HowItWorks />
      <Channels />
      <Ticker items={TICKER_B} direction="right" duration={36} />
      <WhyBokle />
      <Process />
      <Testimonials />
      <PreFormCTA />
      <DiscoveryForm />
      <Footer />
    </main>
  );
}
