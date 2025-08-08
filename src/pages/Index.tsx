import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import PremiumHero from "@/components/hero/PremiumHero";
import { AnimatedAura } from "@/components/background/AnimatedAura";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="FanVault — Exclusive Creator Auctions"
        description="A quiet, premium marketplace for creator auctions. Discover and own what matters."
        canonical={window.location.origin + "/"}
      />

      <Header />

      <main className="relative pb-20 md:pb-6">
        <AnimatedAura />
        <PremiumHero />
      </main>

      <Footer />
      <MobileNav currentPath="/" />
    </div>
  );
};

export default Index;
