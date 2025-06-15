import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { AuctionCard } from "@/components/auctions/AuctionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Zap } from "lucide-react";

const Index = () => {
  // Mock data for live auctions
  const liveAuctions = [
    {
      id: "1",
      title: "Vintage Band T-Shirt",
      currentBid: 45,
      bidCount: 12,
      timeRemaining: "2h 15m",
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
      creatorName: "Sarah Smith",
      creatorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612e04f?w=150&h=150&fit=crop&crop=face",
      isLive: true
    },
    {
      id: "2", 
      title: "Signed Poster",
      currentBid: 75,
      bidCount: 8,
      timeRemaining: "45m",
      imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop",
      creatorName: "Mark Johnson",
      creatorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      isEndingSoon: true
    },
    {
      id: "3",
      title: "Limited Edition Vinyl",
      currentBid: 120,
      bidCount: 25,
      timeRemaining: "1d 4h",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      creatorName: "Sarah Smith", 
      creatorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612e04f?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "4",
      title: "Exclusive Merch Bundle",
      currentBid: 89,
      bidCount: 15,
      timeRemaining: "3h 22m",
      imageUrl: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&h=300&fit=crop",
      creatorName: "Alex Rivera",
      creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isLive: true
    }
  ];

  const endingSoonAuctions = liveAuctions.filter(auction => auction.isEndingSoon);
  const newAuctions = liveAuctions.slice(2);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-20 md:pb-6">
        {/* Hero Section */}
        <section className="bg-fanvault-gradient text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bid on Exclusive Items from Your Favorite Creators
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Discover unique collectibles, limited edition merch, and personal items directly from creators you love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Bidding
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-white bg-gradient-to-br from-fanvault-pink to-fanvault-red text-white hover:opacity-90">
                Become a Creator
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Stats Section */}
          <section className="py-12 border-b">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-fanvault-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">$2.4M+</h3>
                <p className="text-muted-foreground">Total Sales</p>
              </div>
              <div className="text-center">
                <div className="bg-fanvault-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">50K+</h3>
                <p className="text-muted-foreground">Active Bidders</p>
              </div>
              <div className="text-center">
                <div className="bg-fanvault-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">24/7</h3>
                <p className="text-muted-foreground">Live Auctions</p>
              </div>
            </div>
          </section>

          {/* Ending Soon Section */}
          {endingSoonAuctions.length > 0 && (
            <section className="py-12">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <Badge variant="destructive" className="animate-pulse">
                    🔥 Ending Soon
                  </Badge>
                  <h2 className="text-3xl font-bold">Don't Miss Out</h2>
                </div>
                <Button variant="outline">
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {endingSoonAuctions.map((auction) => (
                  <AuctionCard key={auction.id} {...auction} />
                ))}
              </div>
            </section>
          )}

          {/* Live Auctions */}
          <section className="py-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <Badge className="bg-fanvault-red animate-pulse">
                  🔴 LIVE
                </Badge>
                <h2 className="text-3xl font-bold">Live Auctions</h2>
              </div>
              <Button variant="outline">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {liveAuctions.map((auction) => (
                <AuctionCard key={auction.id} {...auction} />
              ))}
            </div>
          </section>

          {/* New Items */}
          <section className="py-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <Badge variant="secondary">
                  ✨ New
                </Badge>
                <h2 className="text-3xl font-bold">Fresh Drops</h2>
              </div>
              <Button variant="outline">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newAuctions.map((auction) => (
                <AuctionCard key={auction.id} {...auction} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <MobileNav currentPath="/" />
    </div>
  );
};

export default Index;
