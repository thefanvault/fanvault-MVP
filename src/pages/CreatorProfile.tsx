import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { AuctionCard } from "@/components/auctions/AuctionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Instagram, Twitter } from "lucide-react";

const CreatorProfile = () => {
  const creator = {
    username: "sarahsmith",
    displayName: "Sarah Smith",
    bio: "Fashion & Lifestyle Creator ✨ Sharing my favorite pieces with you!",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e04f?w=150&h=150&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=300&fit=crop",
    followerCount: 1243,
    itemCount: 15,
    salesCount: 89,
    isVerified: true
  };

  const liveAuctions = [
    {
      id: "1",
      title: "Vintage Band T-Shirt",
      currentBid: 45,
      bidCount: 12,
      timeRemaining: "2h 15m",
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
      creatorName: "Sarah Smith",
      creatorAvatar: creator.avatar,
      isLive: true
    },
    {
      id: "2", 
      title: "Signed Poster",
      currentBid: 75,
      bidCount: 8,
      timeRemaining: "45m",
      imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop",
      creatorName: "Sarah Smith",
      creatorAvatar: creator.avatar,
      isEndingSoon: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-20 md:pb-6">
        {/* Cover & Profile Section */}
        <div className="relative">
          <div className="h-48 md:h-64 bg-fanvault-gradient">
            <img 
              src={creator.coverImage} 
              alt={`${creator.displayName}'s cover`}
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          
          <div className="container mx-auto px-4">
            <div className="relative -mt-16 md:-mt-20">
              <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
                <div className="relative mb-4 md:mb-0">
                  <img 
                    src={creator.avatar} 
                    alt={creator.displayName}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background"
                  />
                  {creator.isVerified && (
                    <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-2">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h1 className="text-2xl md:text-3xl font-bold">{creator.displayName}</h1>
                        {creator.isVerified && <Badge variant="secondary">Verified</Badge>}
                      </div>
                      <p className="text-muted-foreground mb-2">@{creator.username}</p>
                      <p className="text-sm md:text-base mb-4">{creator.bio}</p>
                      
                      <div className="flex space-x-6 text-sm mb-4">
                        <div>
                          <span className="font-semibold">{creator.followerCount.toLocaleString()}</span>
                          <span className="text-muted-foreground ml-1">followers</span>
                        </div>
                        <div>
                          <span className="font-semibold">{creator.itemCount}</span>
                          <span className="text-muted-foreground ml-1">items</span>
                        </div>
                        <div>
                          <span className="font-semibold">{creator.salesCount}</span>
                          <span className="text-muted-foreground ml-1">sales</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button className="bg-fanvault-gradient">
                        Follow
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Connect:</p>
                <div className="flex space-x-4">
                  <a href="#" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground">
                    <Instagram className="h-4 w-4" />
                    <span>@sarahsmith</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground">
                    <Twitter className="h-4 w-4" />
                    <span>@sarahsmith</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Drop Banner */}
        <div className="bg-fanvault-gradient text-white py-8 my-8">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Badge className="bg-fanvault-red animate-pulse">LIVE DROP</Badge>
              <h2 className="text-2xl font-bold">Spring Mega Drop</h2>
            </div>
            <p className="mb-4">4 exclusive items available now!</p>
            <div className="flex justify-center space-x-8 text-sm">
              <div>
                <div className="text-2xl font-bold">00</div>
                <div>Days</div>
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div>Hours</div>
              </div>
              <div>
                <div className="text-2xl font-bold">29</div>
                <div>Minutes</div>
              </div>
              <div>
                <div className="text-2xl font-bold">52</div>
                <div>Seconds</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="available">Available</TabsTrigger>
              <TabsTrigger value="sold">Sold</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="mb-4 text-sm text-muted-foreground">
                💡 Pro Tip: Buying multiple items together saves on shipping!
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveAuctions.map((auction) => (
                  <AuctionCard key={auction.id} {...auction} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="available" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveAuctions.map((auction) => (
                  <AuctionCard key={auction.id} {...auction} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="sold" className="mt-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">No sold items to show yet.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <MobileNav currentPath="/creator" />
    </div>
  );
};

export default CreatorProfile;