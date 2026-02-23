import dynamic from "next/dynamic";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";

// Lazy load below-the-fold sections to improve initial page load speed
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(mod => mod.Testimonials));
const Process = dynamic(() => import("@/components/sections/Process").then(mod => mod.Process));
const Pricing = dynamic(() => import("@/components/sections/Pricing").then(mod => mod.Pricing));
const Faq = dynamic(() => import("@/components/sections/Faq").then(mod => mod.Faq));
const Cta = dynamic(() => import("@/components/sections/Cta").then(mod => mod.Cta));

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <Portfolio />
        <Services />
        <Testimonials />
        <Process />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
