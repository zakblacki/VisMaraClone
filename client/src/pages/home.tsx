import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { QuickCTAs } from "@/components/home/quick-ctas";
import { ServicesSection } from "@/components/home/services-section";
import { ProductsSection } from "@/components/home/products-section";
import { ElevatorSystemsSection } from "@/components/home/elevator-systems-section";
import { TechnologySection } from "@/components/home/technology-section";
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section";
import { CTASection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroCarousel />
        <QuickCTAs />
        <ServicesSection />
        <ProductsSection />
        <ElevatorSystemsSection />
        <TechnologySection />
        <WhyChooseUsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
