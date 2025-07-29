import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";
import { Clock, Users, Heart, Share, Shield, ExternalLink } from "lucide-react";
import { BidConfirmationModal } from "@/components/modals/BidConfirmationModal";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ItemDetail = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  
  const item = {
    id: "1",
    title: "Socks 01",
    condition: "Gently Used",
    signed: true,
    currentBid: 1050,
    bidCount: 12,
    timeRemaining: "2h 15m",
    minimumIncrement: 5,
    images: [
      "/lovable-uploads/701d7249-034f-4a4e-ae2c-0db49f77794c.png"
    ],
    sourceContentUrl: "https://www.youtube.com/watch?v=example",
    creator: {
      name: "Brittney Rae",
      username: "sarahsmith",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e04f?w=150&h=150&fit=crop&crop=face",
      isVerified: true
    },
    description: "These socks, worn and weathered, are on a journey of self-discovery. Once merely vessels for feet, they now seek meaning beyond the mundane, stretching out in search of purpose and clarity. Their fabric, threadbare in places, seems to echo the struggles of the soul—worn down by the weight of the world, yet still holding together, still carrying on. With every step, they shed their old identity, no longer defined by their utilitarian role, but by the deeper truth they are slowly uncovering. The soft cotton feels different now, not just against the skin but within the spirit, as if the very fibers are aligning with the rhythm of the universe. Each scuff, each stain, each imperfection is embraced as part of their journey, a necessary step in their spiritual evolution. They are finding their way—learning that even the simplest of things can transcend their earthly form, that purpose can be found in the most unexpected places, and that perhaps, true comfort comes not from being perfect, but from being fully, authentically worn.",
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
    { amount: 1050, bidder: "fan123", time: "2 minutes ago" },
    { amount: 1045, bidder: "collector_x", time: "15 minutes ago" },
    { amount: 1040, bidder: "vintage_lover", time: "1 hour ago" }
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

  // Effect to sync carousel with selected image index
  useEffect(() => {
    if (!api) return;
    
    api.on("select", () => {
      setSelectedImageIndex(api.selectedScrollSnap());
    });
  }, [api]);

  // Function to handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    api?.scrollTo(index);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-6 pb-20 md:pb-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery with Carousel */}
          <div className="space-y-4">
            {/* Main Carousel */}
            <Carousel className="w-full" setApi={setApi}>
              <CarouselContent>
                {item.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <img 
                      src={image} 
                      alt={`${item.title} ${index + 1}`}
                      className="aspect-square object-cover rounded-lg w-full"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            
            {/* Thumbnail Navigation */}
            <div className="flex gap-2 justify-center">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative overflow-hidden rounded-md border-2 transition-all ${
                    selectedImageIndex === index 
                      ? 'border-fanvault-pink shadow-md' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${item.title} thumbnail ${index + 1}`}
                    className="w-16 h-16 object-cover"
                  />
                </button>
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
                <a 
                  href={item.sourceContentUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                >
                  <ExternalLink className="h-3 w-3" />
                  View Source Content
                </a>
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
                  onClick={() => {
                    if (!user) {
                      navigate('/login');
                      return;
                    }
                    setIsBidModalOpen(true);
                  }}
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
