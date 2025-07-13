import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { AuctionCard } from "@/components/auctions/AuctionCard";
import { CreatorCard } from "@/components/creators/CreatorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";

const Discover = () => {
  // Mock data for auctions
  const featuredAuctions = [
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
    }
  ];

  const creators = [
    {
      username: "sarahsmith",
      displayName: "Sarah Smith",
      bio: "Award-winning artist and designer. Creating limited edition collectibles for my amazing fans.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e04f?w=150&h=150&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=200&fit=crop",
      followerCount: 1243,
      itemCount: 15,
      salesCount: 89,
      isVerified: true
    },
    {
      username: "markjohnson", 
      displayName: "Mark Johnson",
      bio: "Music producer and collector. Sharing rare finds and limited editions with my followers.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop",
      followerCount: 856,
      itemCount: 8,
      salesCount: 45,
      isVerified: true
    }
  ];

  const { user } = useAuth();

  // If user is logged in, show with sidebar
  if (user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <SidebarProvider>
          <div className="flex w-full min-h-screen pt-16">
            <AppSidebar />
            
            <div className="flex-1 flex flex-col min-w-0">
              <header className="h-16 border-b flex items-center px-4 bg-background sticky top-0 z-10">
                <div>
                  <h1 className="text-lg font-semibold">Discover</h1>
                </div>
              </header>
              
              <div className="flex-1 overflow-auto p-4 md:p-6">
                <div className="w-full max-w-4xl mx-auto space-y-6">
                  {/* Hero Section */}
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-4">Discover Creators</h2>
                    <p className="text-muted-foreground mb-6">
                      Find creators to follow and get notified of their drops
                    </p>
                    
                    {/* Search */}
                    <div className="relative max-w-md mx-auto">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search creators..." 
                        className="pl-10 h-12 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Featured Creators */}
                  <section className="mb-6">
                    <h3 className="text-xl font-bold mb-4">Featured Creators</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {creators.map((creator) => (
                        <CreatorCard key={creator.username} {...creator} />
                      ))}
                    </div>
                  </section>

                  {/* Live Auctions */}
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">Live Auctions</h3>
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {featuredAuctions.map((auction) => (
                        <AuctionCard key={auction.id} {...auction} />
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </SidebarProvider>
        
        <MobileNav currentPath="/discover" />
      </div>
    );
  }

  // If user is not logged in, show original layout without sidebar
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-6 pb-20 md:pb-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Discover Creators</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Find creators to follow and get notified of their drops
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search creators..." 
              className="pl-10 h-12 rounded-full"
            />
          </div>
        </div>

        {/* Featured Creators */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Creators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.map((creator) => (
              <CreatorCard key={creator.username} {...creator} />
            ))}
          </div>
        </section>

        {/* Live Auctions */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Live Auctions</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAuctions.map((auction) => (
              <AuctionCard key={auction.id} {...auction} />
            ))}
          </div>
        </section>
      </main>

      <MobileNav currentPath="/discover" />
    </div>
  );
};

export default Discover;