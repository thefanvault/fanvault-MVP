import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Users, Heart, Share, Shield } from "lucide-react";
import { BidConfirmationModal } from "@/components/modals/BidConfirmationModal";

const ItemDetail = () => {
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  
  const item = {
    id: "1",
    title: "Vintage Band T-Shirt",
    condition: "Gently Used",
    signed: true,
    currentBid: 45,
    bidCount: 12,
    timeRemaining: "2h 15m",
    minimumIncrement: 5,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=600&fit=crop"
    ],
    mediaPreview: "https://player.vimeo.com/video/placeholder",
    creator: {
      name: "Sarah Smith",
      username: "sarahsmith",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e04f?w=150&h=150&fit=crop&crop=face",
      isVerified: true
    },
    description: "This vintage band t-shirt was featured in my latest content! It's been gently worn and has that perfect vintage feel. Ships from California.",
    shipping: "Standard shipping included"
  };

  // Mock payment methods
  const paymentMethods = [
    {
      id: "pm_1",
      last_four: "4242",
      brand: "visa",
      is_default: true
    },
    {
      id: "pm_2", 
      last_four: "0005",
      brand: "mastercard",
      is_default: false
    }
  ];

  const bids = [
    { amount: 45, bidder: "fan123", time: "2 minutes ago" },
    { amount: 40, bidder: "collector_x", time: "15 minutes ago" },
    { amount: 35, bidder: "vintage_lover", time: "1 hour ago" }
  ];

  const handleConfirmBid = async (bidAmount: number, paymentMethodId: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock validation - 10% chance of failure for demo
    if (Math.random() < 0.1) {
      throw new Error("Bid amount too low. Another bid was placed before yours.");
    }
    
    // In a real app, this would call your bidding API
    console.log(`Placing bid: $${bidAmount} with payment method: ${paymentMethodId}`);
    return true;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-6 pb-20 md:pb-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Media Section */}
          <div className="space-y-4">
            {/* Video Preview */}
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-fanvault-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">▶</span>
                </div>
                <p className="text-sm text-muted-foreground">📸 High-quality photos help your items sell faster</p>
                <p className="text-xs text-muted-foreground mt-2">Preview from content where this item was featured</p>
              </div>
            </div>
            
            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-2">
              {item.images.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${item.title} ${index + 1}`}
                  className="aspect-square object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                />
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            {/* Creator Info */}
            <div className="flex items-center space-x-3">
              <img 
                src={item.creator.avatar} 
                alt={item.creator.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{item.creator.name}</h3>
                  {item.creator.isVerified && (
                    <Badge variant="secondary">Verified</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">@{item.creator.username}</p>
              </div>
            </div>

            {/* Item Info */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{item.condition}</Badge>
                {item.signed && <Badge className="bg-fanvault-pink">Signed ✍️</Badge>}
              </div>
              <p className="text-muted-foreground">{item.description}</p>
            </div>

            {/* Bidding Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current highest bid</p>
                    <p className="text-3xl font-bold text-fanvault-pink">${item.currentBid}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-1">
                      <Users className="h-4 w-4" />
                      <span>{item.bidCount} bids</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{item.timeRemaining} left</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full h-12 bg-fanvault-gradient text-lg mb-4"
                  onClick={() => setIsBidModalOpen(true)}
                >
                  Place Bid
                </Button>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    Watch
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Bids */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Recent Bids</h3>
                <div className="space-y-3">
                  {bids.map((bid, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">${bid.amount}</p>
                        <p className="text-sm text-muted-foreground">{bid.bidder}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{bid.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping & Safety */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="h-4 w-4 text-green-600" />
                <span>{item.shipping}</span>
              </div>
              <Separator />
              <div className="text-xs text-muted-foreground space-y-1">
                <p>✅ Buyer protection included</p>
                <p>📦 Item ships within 3 business days of payment</p>
                <p>🔒 Secure payments powered by Stripe</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bid Confirmation Modal */}
        <BidConfirmationModal
          isOpen={isBidModalOpen}
          onClose={() => setIsBidModalOpen(false)}
          currentHighestBid={item.currentBid}
          minimumIncrement={item.minimumIncrement}
          itemTitle={item.title}
          paymentMethods={paymentMethods}
          onConfirmBid={handleConfirmBid}
        />
      </main>

      <MobileNav />
    </div>
  );
};

export default ItemDetail;