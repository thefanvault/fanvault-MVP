import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { AuctionCard } from "@/components/auctions/AuctionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Gavel } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
const Index = () => {
  const navigate = useNavigate();
  const {
    user,
    userRole,
    loading
  } = useAuth();
  const isMobile = useIsMobile();

  // Mock data for live auctions
  const liveAuctions = [{
    id: "1",
    title: "Vintage Band T-Shirt",
    currentBid: 45,
    bidCount: 12,
    timeRemaining: "2h 15m",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
    creatorName: "Sarah Smith",
    creatorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612e04f?w=150&h=150&fit=crop&crop=face",
    isLive: true
  }, {
    id: "2",
    title: "Signed Poster",
    currentBid: 75,
    bidCount: 8,
    timeRemaining: "45m",
    imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop",
    creatorName: "Mark Johnson",
    creatorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    isEndingSoon: true
  }, {
    id: "3",
    title: "Limited Edition Vinyl",
    currentBid: 120,
    bidCount: 25,
    timeRemaining: "1d 4h",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    creatorName: "Sarah Smith",
    creatorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612e04f?w=150&h=150&fit=crop&crop=face"
  }, {
    id: "4",
    title: "Exclusive Merch Bundle",
    currentBid: 89,
    bidCount: 15,
    timeRemaining: "3h 22m",
    imageUrl: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&h=300&fit=crop",
    creatorName: "Alex Rivera",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    isLive: true
  }];
  const endingSoonAuctions = liveAuctions.filter(auction => auction.isEndingSoon);
  const newAuctions = liveAuctions.slice(2);
  return <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-20 md:pb-6">
        {/* Hero Section */}
        <section className="bg-fanvault-gradient text-white py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            {userRole === 'creator' ?
          // Creator Hero
          <>
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 px-2">
                  Monetize Your Fan Base with Exclusive Auctions
                </h1>
                <p className="text-base md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-90 max-w-3xl mx-auto px-2">
                  Turn your personal items, limited merch, and exclusive content into profitable auctions for your biggest fans.
                </p>
                <div className={`flex flex-col gap-3 md:gap-4 justify-center px-4 ${!isMobile ? "sm:flex-row" : ""}`}>
                  {user ? <Button size={isMobile ? "default" : "lg"} variant="secondary" className={`${isMobile ? "text-base px-6 w-full" : "text-lg px-8"}`} onClick={() => navigate("/list-new-item")}>
                    List Your First Item
                  </Button> : <Button size={isMobile ? "default" : "lg"} variant="secondary" className={`${isMobile ? "text-base px-6 w-full" : "text-lg px-8"}`} onClick={() => navigate("/signup?type=creator")}>
                    Start Selling
                  </Button>}
                  <Button size={isMobile ? "default" : "lg"} variant="outline" className={`${isMobile ? "text-base px-6 w-full" : "text-lg px-8"} border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-fanvault-pink transition-all duration-300 font-semibold`} onClick={() => navigate("/dashboard")}>
                    View Dashboard
                  </Button>
                </div>
              </> :
          // Fan Hero (default)
          <>
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 px-2">
                  Bid on Exclusive Items from Your Favorite Creators
                </h1>
                <p className="text-base md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-90 max-w-3xl mx-auto px-2">
                  Discover unique collectibles, limited edition merch, and personal items directly from creators you love.
                </p>
                <div className={`flex flex-col gap-3 md:gap-4 justify-center px-4 ${!isMobile ? "sm:flex-row" : ""}`}>
                  <Button size={isMobile ? "default" : "lg"} variant="secondary" className={`${isMobile ? "text-base px-6 w-full" : "text-lg px-8"}`} onClick={() => navigate(user ? "/discover" : "/signup?type=fan")}>
                    {user ? "Discover Items" : "Start Bidding"}
                  </Button>
                  <Button size={isMobile ? "default" : "lg"} variant="outline" className={`${isMobile ? "text-base px-6 w-full" : "text-lg px-8"} border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-fanvault-pink transition-all duration-300 font-semibold`} onClick={() => navigate("/signup?type=creator")}>
                    Become a Creator
                  </Button>
                </div>
              </>}
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Stats Section */}
          <section className="py-8 md:py-12 border-b">
            <div className="grid grid-cols-3 md:gap-8 gap-4">
              <div className="text-center">
                <div className={`bg-fanvault-gradient rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 ${isMobile ? "w-12 h-12" : "w-16 h-16"}`}>
                  <TrendingUp className={`text-white ${isMobile ? "h-6 w-6" : "h-8 w-8"}`} />
                </div>
                <h3 className={`font-bold mb-1 md:mb-2 ${isMobile ? "text-lg" : "text-2xl"}`}>$2.4M+</h3>
                <p className={`text-muted-foreground ${isMobile ? "text-xs" : "text-base"}`}>Total Sales</p>
              </div>
              <div className="text-center">
                <div className={`bg-fanvault-gradient rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 ${isMobile ? "w-12 h-12" : "w-16 h-16"}`}>
                  <Gavel className={`text-white ${isMobile ? "h-6 w-6" : "h-8 w-8"}`} />
                </div>
                <h3 className={`font-bold mb-1 md:mb-2 ${isMobile ? "text-lg" : "text-2xl"}`}>20K+</h3>
                <p className={`text-muted-foreground ${isMobile ? "text-xs" : "text-base"}`}>Active Bidders</p>
              </div>
              <div className="text-center">
                <div className={`bg-fanvault-gradient rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 ${isMobile ? "w-12 h-12" : "w-16 h-16"}`}>
                  <Clock className={`text-white ${isMobile ? "h-6 w-6" : "h-8 w-8"}`} />
                </div>
                <h3 className={`font-bold mb-1 md:mb-2 ${isMobile ? "text-lg" : "text-2xl"}`}>24/7</h3>
                <p className={`text-muted-foreground ${isMobile ? "text-xs" : "text-base"}`}>Live Auctions</p>
              </div>
            </div>
          </section>

          {/* Ending Soon Section */}
          {endingSoonAuctions.length > 0 && <section className="py-8 md:py-12">
              <div className="flex items-center justify-between mb-4 md:mb-8">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <Badge variant="destructive" className={`animate-pulse ${isMobile ? "text-xs px-2 py-1" : ""}`}>
                    🔥 Ending Soon
                  </Badge>
                  <h2 className={`font-bold ${isMobile ? "text-xl" : "text-3xl"}`}>Don't Miss Out</h2>
                </div>
                {!isMobile && <Button variant="outline">
                    View All
                  </Button>}
              </div>
              <div className={`grid gap-4 md:gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
                {endingSoonAuctions.map(auction => <AuctionCard key={auction.id} {...auction} />)}
              </div>
              {isMobile && <div className="text-center mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Ending Soon
                  </Button>
                </div>}
            </section>}

          {/* Live Auctions */}
          <section className="py-8 md:py-12">
            <div className="flex items-center justify-between mb-4 md:mb-8">
              <div className="flex items-center space-x-2 md:space-x-3">
                <Badge className={`bg-fanvault-red animate-pulse ${isMobile ? "text-xs px-2 py-1" : ""}`}>
                  🔴 LIVE
                </Badge>
                <h2 className={`font-bold ${isMobile ? "text-xl" : "text-3xl"}`}>Live Auctions</h2>
              </div>
              {!isMobile && <Button variant="outline">
                  View All
                </Button>}
            </div>
            <div className={`grid gap-4 md:gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"}`}>
              {liveAuctions.slice(0, isMobile ? 3 : liveAuctions.length).map(auction => <AuctionCard key={auction.id} {...auction} />)}
            </div>
            {isMobile && <div className="text-center mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  View All Live Auctions
                </Button>
              </div>}
          </section>

          {/* New Items */}
          <section className="py-8 md:py-12">
            <div className="flex items-center justify-between mb-4 md:mb-8">
              <div className="flex items-center space-x-2 md:space-x-3">
                <Badge variant="secondary" className={`${isMobile ? "text-xs px-2 py-1" : ""}`}>
                  ✨ New
                </Badge>
                <h2 className={`font-bold ${isMobile ? "text-xl" : "text-3xl"}`}>Fresh Drops</h2>
              </div>
              {!isMobile && <Button variant="outline">
                  View All
                </Button>}
            </div>
            <div className={`grid gap-4 md:gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
              {newAuctions.slice(0, isMobile ? 2 : newAuctions.length).map(auction => <AuctionCard key={auction.id} {...auction} />)}
            </div>
            {isMobile && <div className="text-center mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  View All New Items
                </Button>
              </div>}
          </section>
        </div>
      </main>

      <Footer />
      <MobileNav currentPath="/" />
    </div>;
};
export default Index;