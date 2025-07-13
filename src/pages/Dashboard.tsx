import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Plus, Clock, Copy, Globe, Lock, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { toast } = useToast();
  const { profile } = useAuth();
  const [isStorefrontPublic, setIsStorefrontPublic] = useState(true);
  
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
          <AppSidebar />
          
          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-16 border-b flex items-center px-4 bg-background sticky top-0 z-10">
              <SidebarTrigger />
              <div className="ml-4">
                <h1 className="text-lg font-semibold">Creator Dashboard</h1>
              </div>
            </header>
            
            <div className="flex-1 overflow-auto p-4 md:p-6">
              <div className="w-full max-w-4xl mx-auto space-y-6">
                {/* Creator Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612e04f?w=150&h=150&fit=crop&crop=face" 
                    alt="Profile"
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">Welcome, {creatorName}!</h2>
                    <p className="text-muted-foreground">@{handle}</p>
                    <div className="mt-2">
                      <p className="text-lg font-semibold text-primary">
                        Total Sales: ${vaultBalance.toLocaleString()}
                      </p>
                      {vaultBalance <= 0 && (
                        <p className="text-sm text-muted-foreground">
                          You haven't sold anything yet – list an item!
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Primary Actions */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-fanvault-gradient text-white font-semibold px-8 py-3 rounded-lg" asChild>
                    <a href="/list-new-item">
                      <Plus className="h-5 w-5 mr-2" />
                      List New Item
                    </a>
                  </Button>
                  
                  <Button size="lg" variant="outline" className="font-semibold px-8 py-3 rounded-lg" asChild>
                    <a href={`/creator/${handle}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-5 w-5 mr-2" />
                      My FanVault Page
                    </a>
                  </Button>
                </div>

                {/* Active Auctions */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Active Auctions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {activeAuctions.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">
                          You have no items listed. Tap List New Item to create your first auction!
                        </p>
                        <Button className="bg-fanvault-gradient" asChild>
                          <a href="/list-new-item">
                            <Plus className="h-4 w-4 mr-2" />
                            List New Item
                          </a>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {activeAuctions.map((auction) => (
                          <div key={auction.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                            <img 
                              src={auction.image} 
                              alt={auction.title}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{auction.title}</h4>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>⏳ {auction.timeLeft} left</span>
                              </div>
                              <p className="text-sm font-medium">
                                {auction.bidCount} bids, highest: ${auction.currentBid}
                              </p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">Live</Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Sales */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recentSales.length === 0 ? (
                      <p className="text-muted-foreground text-center py-4">
                        Sold Items: 0
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {recentSales.map((sale) => (
                          <div key={sale.id} className="flex justify-between items-center p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">{sale.title}</h4>
                              <p className="text-sm text-muted-foreground">{sale.soldDate}</p>
                            </div>
                            <p className="font-semibold text-green-600">${sale.salePrice}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Storefront Access */}
                <Card>
                  <CardHeader>
                    <CardTitle>Storefront Access</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {isStorefrontPublic ? <Globe className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                        <span className="font-medium">
                          Storefront: {isStorefrontPublic ? "Public" : "Private"}
                        </span>
                      </div>
                      <Switch
                        checked={isStorefrontPublic}
                        onCheckedChange={setIsStorefrontPublic}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        {isStorefrontPublic ? "Public URL" : "Magic Link"}
                      </label>
                      <div className="flex space-x-2">
                        <Input
                          value={isStorefrontPublic ? publicUrl : magicLink}
                          readOnly
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(isStorefrontPublic ? publicUrl : magicLink)}
                        >
                          <Copy className="h-4 w-4" />
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
