import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuctionCard } from "@/components/auctions/AuctionCard";
import { Crown, Settings, MapPin, Calendar, Globe, Instagram, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, profile, userRole } = useAuth();
  const navigate = useNavigate();

  // Mock data for creator items
  const creatorItems = [
    {
      id: "1",
      title: "Signed Photo",
      description: "Exclusive signed photo from recent photoshoot",
      current_bid: 150,
      auction_end: "2024-03-25T18:00:00Z",
      image_url: "/lovable-uploads/a4c880dd-a727-40e6-b3eb-1fa7df905859.png",
      creator: {
        id: "creator1",
        display_name: profile?.display_name || "Creator",
        username: profile?.username || "creator",
        avatar_url: profile?.avatar_url
      }
    },
    {
      id: "2", 
      title: "Custom Video Message",
      description: "Personalized video message just for you",
      current_bid: 75,
      auction_end: "2024-03-26T20:00:00Z",
      image_url: "/lovable-uploads/ba58c063-365a-44cc-861c-15973a23ce27.png",
      creator: {
        id: "creator1",
        display_name: profile?.display_name || "Creator",
        username: profile?.username || "creator", 
        avatar_url: profile?.avatar_url
      }
    }
  ];

  const handleEditProfile = () => {
    // TODO: Show edit profile popup - to be implemented later
    console.log("Edit profile clicked");
  };

  const handleBecomeCreator = () => {
    navigate("/onboarding/creator/profile");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="text-2xl">
                  {profile?.display_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 justify-center">
                  <h1 className="text-2xl font-bold">
                    {profile?.display_name || "User"}
                  </h1>
                  {userRole === 'creator' && (
                    <Badge variant="secondary" className="bg-fanvault-gradient text-white">
                      <Crown className="h-3 w-3 mr-1" />
                      Creator
                    </Badge>
                  )}
                </div>
                
                <p className="text-muted-foreground">
                  @{profile?.username || "username"}
                </p>
                
                {profile?.bio && (
                  <p className="text-center max-w-md mx-auto">
                    {profile.bio}
                  </p>
                )}
              </div>

              <Button onClick={handleEditProfile} variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="items" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="items">
              {userRole === 'creator' ? 'My Items' : 'Discover Items'}
            </TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="space-y-6">
            {userRole === 'creator' ? (
              /* Creator Items */
              <div>
                <h2 className="text-xl font-semibold mb-4">Active Auctions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {creatorItems.map((item) => (
                    <AuctionCard 
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      currentBid={item.current_bid}
                      bidCount={5}
                      timeRemaining="2d 5h"
                      imageUrl={item.image_url}
                      creatorName={item.creator.display_name}
                      creatorAvatar={item.creator.avatar_url || "/placeholder.svg"}
                      isLive={true}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* Fan CTA */
              <Card className="text-center p-8">
                <CardContent className="space-y-4">
                  <Crown className="h-16 w-16 mx-auto text-muted-foreground" />
                  <h3 className="text-xl font-semibold">Ready to Start Selling?</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Join our community of creators and start selling exclusive content, 
                    personalized experiences, and unique items to your fans.
                  </p>
                  <Button 
                    onClick={handleBecomeCreator}
                    className="bg-fanvault-gradient text-white hover:opacity-90"
                    size="lg"
                  >
                    <Crown className="h-4 w-4 mr-2" />
                    Become a Creator
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">About</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile?.bio ? (
                  <p>{profile.bio}</p>
                ) : (
                  <p className="text-muted-foreground italic">
                    No bio added yet. Click "Edit Profile" to add one!
                  </p>
                )}
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date().toLocaleDateString()}</span>
                </div>

                {userRole === 'creator' && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Social Links</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Instagram className="h-4 w-4" />
                        Instagram
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Twitter className="h-4 w-4" />
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Globe className="h-4 w-4" />
                        Website
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}