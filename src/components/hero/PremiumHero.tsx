import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function PremiumHero() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/10 bg-card/40 backdrop-blur-sm text-sm text-muted-foreground">
          <span className="size-2 rounded-full bg-primary/60" />
          Subtle, member-only auctions
        </div>

        <h1 className="mt-6 font-bold tracking-tight text-4xl md:text-6xl lg:text-7xl leading-[1.05]">
          Exclusive Creator Auctions, Redefined
        </h1>
        <p className="mt-4 md:mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          A quiet place to discover and own what matters. No noise. Just the good stuff.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3 md:gap-4">
          <Button size="lg" onClick={() => navigate(user ? "/discover" : "/signup?type=fan")}>Enter</Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/signup?type=creator")}>Become a Creator</Button>
        </div>
      </div>
    </section>
  );
}
