import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Plus, Clock, Copy, Globe, Lock, ExternalLink, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { toast } = useToast();
  const { profile } = useAuth();
  const [isStorefrontPublic, setIsStorefrontPublic] = useState(true);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/settings/home');
  };
  
  const vaultBalance = 247.89;
  const creatorName = "Kayvon Moshiri";
  const handle = profile?.username || "kayvonmoshiri";

  const activeAuctions = [
    {
      id: "1",
      title: "Vintage Band T-Shirt",
      currentBid: 45,
      bidCount: 3,
      timeLeft: "2h 15m",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop"
    },
    {
      id: "2",
      title: "Signed Poster", 
      currentBid: 75,
      bidCount: 8,
      timeLeft: "1d 3h",
      image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=150&h=150&fit=crop"
    }
  ];

  const recentSales = [
    {
      id: "1",
      title: "Limited Edition Vinyl",
      salePrice: 120,
      soldDate: "2 days ago"
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    });
  };

  const publicUrl = `https://fanvault.app/creator/${handle}`;
  const magicLink = `https://fanvault.app/creator/${handle}?token=abc123def456`;

  return (
    <Layout>
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <div className="hidden md:block">
            <AppSidebar />
          </div>
          
          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-14 md:h-16 border-b flex items-center px-3 md:px-4 bg-background sticky top-0 z-10">
              <div className="flex items-center gap-3 w-full">
                {isMobile && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBack}
                    className="flex-shrink-0"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                )}
                <h1 className="text-base md:text-lg font-semibold">Creator Dashboard</h1>
              </div>
            </header>
            
            <div className="flex-1 overflow-auto p-3 md:p-6">
              <div className="w-full max-w-4xl mx-auto space-y-4 md:space-y-6">
                {/* Creator Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 mb-4 md:mb-6 text-center sm:text-left">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612e04f?w=150&h=150&fit=crop&crop=face" 
                    alt="Profile"
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold">Welcome, {creatorName}!</h2>
                    <p className="text-muted-foreground text-sm md:text-base">@{handle}</p>
                    <div className="mt-2">
                      <p className="text-base md:text-lg font-semibold text-primary">
                        Total Sales: ${vaultBalance.toLocaleString()}
                      </p>
                      {vaultBalance <= 0 && (
                        <p className="text-xs md:text-sm text-muted-foreground">
                          You haven't sold anything yet – list an item!
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Primary Actions */}
                <div className="mb-4 md:mb-6 flex flex-col gap-3 md:gap-4">
                  <Button size={isMobile ? "default" : "lg"} className="bg-primary hover:bg-primary/90 text-white font-semibold w-full md:w-auto px-6 md:px-8 py-2.5 md:py-3 rounded-lg shadow-lg" asChild>
                    <a href="/list-new-item">
                      <Plus className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                      List New Item
                    </a>
                  </Button>
                  
                  <Button size={isMobile ? "default" : "lg"} variant="outline" className="font-semibold w-full md:w-auto px-6 md:px-8 py-2.5 md:py-3 rounded-lg" asChild>
                    <a href={`/creator/${handle}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                      My FanVault Page
                    </a>
                  </Button>
                </div>

                {/* Active Auctions */}
                <Card className="mb-4 md:mb-6">
                  <CardHeader className="pb-3 md:pb-6">
                    <CardTitle className="text-lg md:text-xl">Active Auctions</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {activeAuctions.length === 0 ? (
                      <div className="text-center py-6 md:py-8">
                        <p className="text-muted-foreground mb-4 text-sm md:text-base">
                          You have no items listed. Tap List New Item to create your first auction!
                        </p>
                        <Button className="bg-primary hover:bg-primary/90 text-white font-semibold w-full md:w-auto shadow-lg" asChild>
                          <a href="/list-new-item">
                            <Plus className="h-4 w-4 mr-2" />
                            List New Item
                          </a>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3 md:space-y-4">
                        {activeAuctions.map((auction) => (
                          <div key={auction.id} className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                            <img 
                              src={auction.image} 
                              alt={auction.title}
                              className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm md:text-base truncate">{auction.title}</h4>
                              <div className="flex items-center space-x-2 text-xs md:text-sm text-muted-foreground">
                                <Clock className="h-3 w-3 md:h-4 md:w-4" />
                                <span>⏳ {auction.timeLeft} left</span>
                              </div>
                              <p className="text-xs md:text-sm font-medium">
                                {auction.bidCount} bids, highest: ${auction.currentBid}
                              </p>
                            </div>
                            <Badge className="bg-green-100 text-green-800 text-xs flex-shrink-0">Live</Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Sales */}
                <Card className="mb-4 md:mb-6">
                  <CardHeader className="pb-3 md:pb-6">
                    <CardTitle className="text-lg md:text-xl">Recent Sales</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {recentSales.length === 0 ? (
                      <p className="text-muted-foreground text-center py-4 text-sm md:text-base">
                        Sold Items: 0
                      </p>
                    ) : (
                      <div className="space-y-3 md:space-y-4">
                        {recentSales.map((sale) => (
                          <div key={sale.id} className="flex justify-between items-center p-3 md:p-4 border rounded-lg">
                            <div className="min-w-0 flex-1">
                              <h4 className="font-medium text-sm md:text-base truncate">{sale.title}</h4>
                              <p className="text-xs md:text-sm text-muted-foreground">{sale.soldDate}</p>
                            </div>
                            <p className="font-semibold text-green-600 text-sm md:text-base flex-shrink-0">${sale.salePrice}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Storefront Access */}
                <Card>
                  <CardHeader className="pb-3 md:pb-6">
                    <CardTitle className="text-lg md:text-xl">Storefront Access</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 md:space-y-4 pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        {isStorefrontPublic ? <Globe className="h-4 w-4 flex-shrink-0" /> : <Lock className="h-4 w-4 flex-shrink-0" />}
                        <span className="font-medium text-sm md:text-base truncate">
                          Storefront: {isStorefrontPublic ? "Public" : "Private"}
                        </span>
                      </div>
                      <Switch
                        checked={isStorefrontPublic}
                        onCheckedChange={setIsStorefrontPublic}
                        className="flex-shrink-0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs md:text-sm font-medium text-muted-foreground">
                        {isStorefrontPublic ? "Public URL" : "Magic Link"}
                      </label>
                      <div className="flex space-x-2">
                        <Input
                          value={isStorefrontPublic ? publicUrl : magicLink}
                          readOnly
                          className="flex-1 text-xs md:text-sm"
                        />
                        <Button
                          variant="outline"
                          size={isMobile ? "sm" : "icon"}
                          onClick={() => copyToClipboard(isStorefrontPublic ? publicUrl : magicLink)}
                          className="flex-shrink-0"
                        >
                          <Copy className="h-3 w-3 md:h-4 md:w-4" />
                          {isMobile && <span className="ml-1 text-xs">Copy</span>}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {isStorefrontPublic 
                          ? "Your profile is discoverable by anyone" 
                          : "Share this private link with your fans"
                        }
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </Layout>
  );
};

export default Dashboard;
