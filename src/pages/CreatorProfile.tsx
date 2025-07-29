import { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AuctionCard } from "@/components/auctions/AuctionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileEditModal } from "@/components/modals/ProfileEditModal";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Check, Instagram, Twitter, Youtube, Globe, Edit } from "lucide-react";
import creatorPhoto from "@/assets/creator-profile-photo.jpg";

const CreatorProfile = () => {
  const { username } = useParams();
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [profileEditOpen, setProfileEditOpen] = useState(false);
  const [creatorData, setCreatorData] = useState({
    username: username || "sarahsmith",
    displayName: "Brittney Rae",
    bio: "Buy my socks",
    avatar: "/lovable-uploads/b60845bb-488a-47cf-aa4c-116e90b03271.png",
    banner: "/lovable-uploads/ddb3db45-74f7-4722-a60e-a1af59620964.png",
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
  });

  // Check if this is the current user's profile
  const isOwnProfile = user && profile && profile.username === username;

  const handleProfileSave = (profileData: any) => {
    // In a real app, you'd save this to your backend
    setCreatorData(prev => ({
      ...prev,
      displayName: profileData.displayName,
      bio: profileData.bio,
      // Handle file uploads here
      ...(profileData.profileImage && { avatar: URL.createObjectURL(profileData.profileImage) }),
      ...(profileData.bannerImage && { banner: URL.createObjectURL(profileData.bannerImage) })
    }));
  };

  const liveAuctions = [
    {
      id: "1",
      title: "Socks 01",
      currentBid: 1050,
      bidCount: 12,
      timeRemaining: "2h 15m",
      imageUrl: "/lovable-uploads/701d7249-034f-4a4e-ae2c-0db49f77794c.png",
      creatorName: "Brittney Rae",
      creatorAvatar: creatorData.avatar,
      isLive: true
    },
    {
      id: "2", 
      title: "Socks 02",
      currentBid: 2200,
      bidCount: 8,
      timeRemaining: "45m",
      imageUrl: "/lovable-uploads/f3a25c3c-33cb-4f9c-acf9-6b3385c0c1bb.png",
      creatorName: "Brittney Rae",
      creatorAvatar: creatorData.avatar,
      isEndingSoon: true
    }
  ];

  return (
    <Layout>
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <AppSidebar />
          
          <div className="flex-1">
            {creatorData.isPrivate ? (
              <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">This profile is private</h1>
                <p className="text-muted-foreground">You need a magic link to view this creator's content.</p>
              </div>
            ) : (
              <>
                {/* Banner Section */}
                <div className="relative">
                  <div className="h-32 sm:h-48 md:h-64 bg-gradient-to-r from-primary/20 to-secondary/20 overflow-hidden">
                    <img 
                      src={creatorData.banner} 
                      alt="Profile banner"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isOwnProfile && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-background/80 backdrop-blur-sm text-xs sm:text-sm"
                      onClick={() => setProfileEditOpen(true)}
                    >
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>

                {/* Profile Header */}
                <div className="container mx-auto px-4 pt-4 sm:pt-8">
                  <div className="flex flex-col items-center text-center mb-6 sm:mb-8 -mt-12 sm:-mt-16 relative z-10">
                    <div className="relative mb-3 sm:mb-4">
                      <img 
                        src={creatorData.avatar} 
                        alt={creatorData.displayName}
                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-4 border-background bg-background object-cover object-center"
                      />
                      {creatorData.isVerified && (
                        <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-2">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{creatorData.displayName}</h1>
                      {creatorData.isVerified && <Badge variant="secondary" className="text-xs">Verified</Badge>}
                    </div>
                    
                    <p className="text-muted-foreground mb-2 text-sm sm:text-base">@{creatorData.username}</p>
                    <p className="text-xs sm:text-sm md:text-base mb-3 sm:mb-4 max-w-md px-2">{creatorData.bio}</p>
                    
                    <div className="flex space-x-4 sm:space-x-6 text-xs sm:text-sm mb-3 sm:mb-4">
                      <div>
                        <span className="font-semibold">{creatorData.followerCount.toLocaleString()}</span>
                        <span className="text-muted-foreground ml-1">followers</span>
                      </div>
                      <div>
                        <span className="font-semibold">{creatorData.itemCount}</span>
                        <span className="text-muted-foreground ml-1">items</span>
                      </div>
                      <div>
                        <span className="font-semibold">{creatorData.salesCount}</span>
                        <span className="text-muted-foreground ml-1">sales</span>
                      </div>
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                      {creatorData.socialLinks.instagram && (
                        <a 
                          href={creatorData.socialLinks.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-1.5 sm:p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                        >
                          <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                        </a>
                      )}
                      {creatorData.socialLinks.twitter && (
                        <a 
                          href={creatorData.socialLinks.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-1.5 sm:p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                        >
                          <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                        </a>
                      )}
                      {creatorData.socialLinks.youtube && (
                        <a 
                          href={creatorData.socialLinks.youtube} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-1.5 sm:p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                        >
                          <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
                        </a>
                      )}
                      {creatorData.socialLinks.website && (
                        <a 
                          href={creatorData.socialLinks.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-1.5 sm:p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                        >
                          <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
                        </a>
                      )}
                    </div>
                    
                    {!isOwnProfile && (
                      <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 w-full sm:w-auto sm:justify-center">
                        <Button className="bg-fanvault-gradient text-sm sm:text-base px-6 sm:px-8 w-full sm:w-auto">
                          Follow
                        </Button>
                        <div className="flex space-x-2 w-full sm:w-auto">
                          <Button 
                            variant="outline" 
                            className="text-sm sm:text-base px-4 sm:px-6 flex-1 sm:flex-none"
                            disabled={!user || !profile}
                            onClick={() => {
                              if (!user || !profile) {
                                toast({
                                  title: "Purchase required",
                                  description: "You need to purchase an item from this creator to send messages.",
                                  variant: "destructive"
                                });
                              }
                            }}
                          >
                            Message
                          </Button>
                          <Button 
                            variant="outline" 
                            className="text-sm sm:text-base px-4 sm:px-6 flex-1 sm:flex-none"
                            onClick={() => {
                              toast({
                                title: "Coming soon",
                                description: "Tip functionality will be available soon!",
                              });
                            }}
                          >
                            Tip Me
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground mt-2">Joined {creatorData.joinedDate}</p>
                  </div>
                </div>

                {/* Items Section with Tabs */}
                <div className="container mx-auto px-4">
                  <Tabs defaultValue="shop" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6 h-auto p-1">
                      <TabsTrigger value="shop" className="text-xs sm:text-sm py-2">Shop</TabsTrigger>
                      <TabsTrigger value="sold" className="text-xs sm:text-sm py-2">Sold</TabsTrigger>
                      <TabsTrigger value="wishlist" disabled className="text-xs sm:text-sm py-2">Wishlist (coming soon)</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="shop">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {liveAuctions.map((auction) => (
                          <AuctionCard key={auction.id} {...auction} />
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="sold">
                      <div className="text-center py-8 sm:py-12">
                        <p className="text-muted-foreground text-sm sm:text-base">No sold items yet</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="wishlist">
                      <div className="text-center py-8 sm:py-12">
                        <p className="text-muted-foreground text-sm sm:text-base">Wishlist feature coming soon!</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            )}

            {/* Profile Edit Modal */}
            <ProfileEditModal 
              open={profileEditOpen}
              onOpenChange={setProfileEditOpen}
              profile={{
                displayName: creatorData.displayName,
                bio: creatorData.bio,
                avatar: creatorData.avatar,
                banner: creatorData.banner
              }}
              onSave={handleProfileSave}
            />
          </div>
        </div>
      </SidebarProvider>
    </Layout>
  );
};

export default CreatorProfile;