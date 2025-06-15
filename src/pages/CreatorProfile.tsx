import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { AuctionCard } from "@/components/auctions/AuctionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Instagram, Twitter, Facebook, Youtube, Globe } from "lucide-react";

const CreatorProfile = () => {
  const creator = {
    username: "sarahsmith",
    displayName: "Sarah Smith",
    bio: "Fashion & Lifestyle Creator ✨ Sharing my favorite pieces with you!",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e04f?w=150&h=150&fit=crop&crop=face",
    followerCount: 1243,
    itemCount: 15,
    salesCount: 89,
    isVerified: true,
    isPrivate: false,
    socialLinks: {
      instagram: "https://instagram.com/sarahsmith",
      twitter: "https://twitter.com/sarahsmith",
      youtube: "https://youtube.com/@sarahsmithofficial",
      website: "https://sarahsmith.com"
    },
    joinedDate: "January 2022"
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
        {creator.isPrivate ? (
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold mb-4">This profile is private</h1>
            <p className="text-muted-foreground">You need a magic link to view this creator's content.</p>
          </div>
        ) : (
          <>
            {/* Profile Header */}
            <div className="container mx-auto px-4 pt-8">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="relative mb-4">
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
                
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold">{creator.displayName}</h1>
                  {creator.isVerified && <Badge variant="secondary">Verified</Badge>}
                </div>
                
                <p className="text-muted-foreground mb-3">@{creator.username}</p>
                <p className="text-sm md:text-base mb-4 max-w-md">{creator.bio}</p>
                
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
                
                {/* Social Links */}
                <div className="flex space-x-3 mb-4">
                  {creator.socialLinks.instagram && (
                    <a 
                      href={creator.socialLinks.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {creator.socialLinks.twitter && (
                    <a 
                      href={creator.socialLinks.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {creator.socialLinks.youtube && (
                    <a 
                      href={creator.socialLinks.youtube} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Youtube className="h-5 w-5" />
                    </a>
                  )}
                  {creator.socialLinks.website && (
                    <a 
                      href={creator.socialLinks.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Globe className="h-5 w-5" />
                    </a>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button className="bg-fanvault-gradient">
                    Follow
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground mt-2">Joined {creator.joinedDate}</p>
              </div>
            </div>

            {/* Available Items Section */}
            <div className="container mx-auto px-4">
              <h2 className="text-xl font-bold mb-6">Available Items</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveAuctions.map((auction) => (
                  <AuctionCard key={auction.id} {...auction} />
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      <MobileNav currentPath="/creator" />
    </div>
  );
};

export default CreatorProfile;