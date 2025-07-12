import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { AuctionCard } from "@/components/auctions/AuctionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Check, Instagram, Twitter, Facebook, Youtube, Globe, Camera, Edit } from "lucide-react";
import creatorPhoto from "@/assets/creator-profile-photo.jpg";

const CreatorProfile = () => {
  const { username } = useParams();
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [editingBanner, setEditingBanner] = useState(false);
  const [editingAvatar, setEditingAvatar] = useState(false);
  const [bannerUrl, setBannerUrl] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  // Check if this is the current user's profile
  const isOwnProfile = user && profile && profile.username === username;

  const creator = {
    username: username || "sarahsmith",
    displayName: "Sarah Smith",
    bio: "Fashion & Lifestyle Creator ✨ Sharing my favorite pieces with you!",
    avatar: creatorPhoto,
    banner: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=300&fit=crop",
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

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to your storage service
      const url = URL.createObjectURL(file);
      setBannerUrl(url);
      toast({
        title: "Banner updated",
        description: "Your banner has been updated successfully.",
      });
      setEditingBanner(false);
    }
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to your storage service
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully.",
      });
      setEditingAvatar(false);
    }
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
            {/* Banner Section */}
            <div className="relative">
              <div className="h-32 sm:h-48 md:h-64 bg-gradient-to-r from-primary/20 to-secondary/20 overflow-hidden">
                <img 
                  src={bannerUrl || creator.banner} 
                  alt="Profile banner"
                  className="w-full h-full object-cover"
                />
              </div>
              {isOwnProfile && (
                <Dialog open={editingBanner} onOpenChange={setEditingBanner}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-background/80 backdrop-blur-sm text-xs sm:text-sm"
                    >
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Edit Banner
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Banner</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="banner-upload">Upload Banner Image</Label>
                        <Input 
                          id="banner-upload"
                          type="file" 
                          accept="image/*"
                          onChange={handleBannerUpload}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {/* Profile Header */}
            <div className="container mx-auto px-4 pt-4 sm:pt-8">
              <div className="flex flex-col items-center text-center mb-6 sm:mb-8 -mt-12 sm:-mt-16 relative z-10">
                <div className="relative mb-3 sm:mb-4">
                  <img 
                    src={avatarUrl || creator.avatar} 
                    alt={creator.displayName}
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-4 border-background bg-background"
                  />
                  {creator.isVerified && (
                    <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-2">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  {isOwnProfile && (
                    <Dialog open={editingAvatar} onOpenChange={setEditingAvatar}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-background border-2 border-background"
                        >
                          <Camera className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Profile Picture</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="avatar-upload">Upload Profile Picture</Label>
                            <Input 
                              id="avatar-upload"
                              type="file" 
                              accept="image/*"
                              onChange={handleAvatarUpload}
                              className="mt-2"
                            />
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{creator.displayName}</h1>
                  {creator.isVerified && <Badge variant="secondary" className="text-xs">Verified</Badge>}
                </div>
                
                <p className="text-muted-foreground mb-2 text-sm sm:text-base">@{creator.username}</p>
                <p className="text-xs sm:text-sm md:text-base mb-3 sm:mb-4 max-w-md px-2">{creator.bio}</p>
                
                <div className="flex space-x-4 sm:space-x-6 text-xs sm:text-sm mb-3 sm:mb-4">
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
                <div className="flex space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  {creator.socialLinks.instagram && (
                    <a 
                      href={creator.socialLinks.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1.5 sm:p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  )}
                  {creator.socialLinks.twitter && (
                    <a 
                      href={creator.socialLinks.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1.5 sm:p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  )}
                  {creator.socialLinks.youtube && (
                    <a 
                      href={creator.socialLinks.youtube} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1.5 sm:p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  )}
                  {creator.socialLinks.website && (
                    <a 
                      href={creator.socialLinks.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1.5 sm:p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                  <Button className="bg-fanvault-gradient text-sm sm:text-base px-6 sm:px-8">
                    Follow
                  </Button>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="text-sm sm:text-base px-4 sm:px-6"
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
                      className="text-sm sm:text-base px-4 sm:px-6"
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
                
                <p className="text-xs text-muted-foreground mt-2">Joined {creator.joinedDate}</p>
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
      </main>

      <MobileNav currentPath="/creator" />
    </div>
  );
};

export default CreatorProfile;