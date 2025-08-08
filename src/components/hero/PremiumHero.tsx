import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function PremiumHero() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm text-muted-foreground shadow-lg hover:bg-white/15 hover:border-white/30 transition-all duration-300">
          <span className="size-2 rounded-full bg-primary/60 animate-pulse" />
          Member-only auctions
        </div>

        <h1 className="mt-6 font-bold tracking-tight text-4xl md:text-6xl lg:text-7xl leading-[1.05]">
          Exclusive Creator Auctions, Redefined
        </h1>
        <p className="mt-4 md:mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          A quiet place to discover and own what matters. No noise. Just the good stuff.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3 md:gap-4">
          <Button size="lg" variant="premium" onClick={() => navigate(user ? "/discover" : "/signup?type=fan")}>Enter</Button>
          <Button size="lg" variant="glass" onClick={() => navigate("/signup?type=creator")}>Become a Creator</Button>
        </div>
      </div>
    </section>
  );
}
