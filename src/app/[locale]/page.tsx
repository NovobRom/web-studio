import { Suspense } from "react";
import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";

// Lazy load below-the-fold sections to improve initial page load speed
const Process = dynamic(() => import("@/components/sections/Process").then(mod => mod.Process));
const PortfolioMiniCta = dynamic(() => import("@/components/sections/PortfolioMiniCta").then(mod => mod.PortfolioMiniCta));
const Pricing = dynamic(() => import("@/components/sections/Pricing").then(mod => mod.Pricing));
const Faq = dynamic(() => import("@/components/sections/Faq").then(mod => mod.Faq));
const Cta = dynamic(() => import("@/components/sections/Cta").then(mod => mod.Cta));

// Section skeleton — prevents layout shift during lazy load
function SectionSkeleton() {
  return <div className="py-24 px-5 md:px-10" aria-hidden="true" />;
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Suspense fallback={<SectionSkeleton />}>
          <Process />
        </Suspense>
        <Portfolio />
        <Suspense fallback={<SectionSkeleton />}>
          <PortfolioMiniCta />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Pricing />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Faq />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Cta />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
