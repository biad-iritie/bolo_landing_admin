import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Screenshots } from "@/components/landing/screenshots";
import { Partners } from "@/components/landing/partners";
import { Testimonials } from "@/components/landing/testimonials";
import { Install } from "@/components/landing/install";
import { Footer } from "@/components/landing/footer";
import { InteractiveDemo } from "@/components/landing/interactive-demo";
import { PartnerAccess } from "@/components/landing/partner-access";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Screenshots />
        <InteractiveDemo />
        <Partners />
        <Testimonials />
        <PartnerAccess />
        <Install />
      </main>
      <Footer />
    </div>
  );
}
