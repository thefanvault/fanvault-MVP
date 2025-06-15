import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, TrendingDown, Trophy, X, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface BidItem {
  id: string;
  itemId: string;
  title: string;
  imageUrl: string;
  currentBid: number;
  yourBid: number;
  timeRemaining?: string;
  endTime?: string;
  status: 'leading' | 'outbid' | 'won' | 'lost';
  orderId?: string;
  creatorName: string;
}

const BidDashboard = () => {
  // Mock data - in real app, this would come from Supabase
  const activeBids: BidItem[] = [
    {
      id: "1",
      itemId: "item_1",
      title: "Vintage Band T-Shirt",
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
      currentBid: 50,
      yourBid: 50,
      timeRemaining: "2h 15m",
      status: 'leading',
      creatorName: "Sarah Smith"
    },
    {
      id: "2", 
      itemId: "item_2",
      title: "Signed Poster",
      imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop",
      currentBid: 85,
      yourBid: 75,
      timeRemaining: "45m",
      status: 'outbid',
      creatorName: "Mike Johnson"
    },
    {
      id: "3",
      itemId: "item_3", 
      title: "Limited Edition Hoodie",
      imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop",
      currentBid: 120,
      yourBid: 120,
      timeRemaining: "1d 3h",
      status: 'leading',
      creatorName: "Alex Chen"
    }
  ];

  const wonBids: BidItem[] = [
    {
      id: "4",
      itemId: "item_4",
      title: "Collector's Pin Set",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop", 
      currentBid: 65,
      yourBid: 65,
      endTime: "2 days ago",
      status: 'won',
      orderId: "order_123",
      creatorName: "Emma Davis"
    },
    {
      id: "5",
      itemId: "item_5",
      title: "Autographed Photo",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      currentBid: 90,
      yourBid: 90,
      endTime: "1 week ago", 
      status: 'won',
      orderId: "order_456",
      creatorName: "David Wilson"
    }
  ];

  const lostBids: BidItem[] = [
    {
      id: "6",
      itemId: "item_6",
      title: "Concert Ticket Stub",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      currentBid: 45,
      yourBid: 40,
      endTime: "3 days ago",
      status: 'lost',
      creatorName: "Lisa Park"
    },
    {
      id: "7",
      itemId: "item_7",
      title: "Custom Artwork",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      currentBid: 200,
      yourBid: 180,
      endTime: "5 days ago",
      status: 'lost', 
      creatorName: "Tom Rodriguez"
    }
  ];

  const getStatusBadge = (status: BidItem['status']) => {
    switch (status) {
      case 'leading':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <TrendingUp className="w-3 h-3 mr-1" />
            You're Leading
          </Badge>
        );
      case 'outbid':
        return (
          <Badge variant="destructive">
            <TrendingDown className="w-3 h-3 mr-1" />
            Outbid
          </Badge>
        );
      case 'won':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <Trophy className="w-3 h-3 mr-1" />
            Ended – Won
          </Badge>
        );
      case 'lost':
        return (
          <Badge variant="outline" className="text-muted-foreground">
            <X className="w-3 h-3 mr-1" />
            Ended – Lost
          </Badge>
        );
    }
  };

  const getStatusColor = (status: BidItem['status']) => {
    switch (status) {
      case 'leading':
      case 'won':
        return 'border-l-green-500';
      case 'outbid':
        return 'border-l-red-500';
      case 'lost':
        return 'border-l-gray-300';
      default:
        return '';
    }
  };

  const BidCard = ({ bid }: { bid: BidItem }) => (
    <Card className={`hover:shadow-md transition-shadow border-l-4 ${getStatusColor(bid.status)}`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          {/* Item Image */}
          <Link to={`/item/${bid.itemId}`}>
            <img 
              src={bid.imageUrl} 
              alt={bid.title}
              className="w-20 h-20 object-cover rounded-lg hover:opacity-80 transition-opacity"
            />
          </Link>
          
          {/* Item Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <Link 
                  to={`/item/${bid.itemId}`}
                  className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2"
                >
                  {bid.title}
                </Link>
                <p className="text-sm text-muted-foreground">by {bid.creatorName}</p>
              </div>
              <div className="ml-2">
                {getStatusBadge(bid.status)}
              </div>
            </div>
            
            {/* Bid Info */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Your bid: </span>
                  <span className="font-semibold">${bid.yourBid}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Current: </span>
                  <span className="font-semibold">${bid.currentBid}</span>
                </div>
              </div>
              
              {/* Time/Actions */}
              <div className="flex items-center space-x-2">
                {bid.timeRemaining && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{bid.timeRemaining}</span>
                  </div>
                )}
                
                {bid.endTime && (
                  <span className="text-sm text-muted-foreground">{bid.endTime}</span>
                )}
                
                {bid.status === 'won' && bid.orderId && (
                  <Button asChild size="sm" variant="outline">
                    <Link to={`/orders/${bid.orderId}`}>
                      View Receipt
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                )}
                
                {bid.status === 'outbid' && (
                  <Button asChild size="sm" className="bg-fanvault-gradient">
                    <Link to={`/item/${bid.itemId}`}>
                      Bid Again
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const EmptyState = ({ type }: { type: 'active' | 'won' | 'lost' }) => {
    const messages = {
      active: {
        title: "No Active Bids",
        description: "You haven't placed any bids on current auctions.",
        action: "Explore Auctions"
      },
      won: {
        title: "No Won Auctions",
        description: "You haven't won any auctions yet.",
        action: "Start Bidding"
      },
      lost: {
        title: "No Lost Auctions", 
        description: "You haven't lost any auctions yet.",
        action: "View Auctions"
      }
    };

    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <Trophy className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{messages[type].title}</h3>
        <p className="text-muted-foreground mb-6">{messages[type].description}</p>
        <Button asChild className="bg-fanvault-gradient">
          <Link to="/discover">{messages[type].action}</Link>
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-6 pb-20 md:pb-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Bids</h1>
          <p className="text-muted-foreground mt-2">
            Track all your auction activity in one place
          </p>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active" className="relative">
              Active
              {activeBids.length > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {activeBids.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="won">
              Won
              {wonBids.length > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {wonBids.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="lost">
              Lost
              {lostBids.length > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {lostBids.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <div className="space-y-4">
              {activeBids.length > 0 ? (
                activeBids.map((bid) => (
                  <BidCard key={bid.id} bid={bid} />
                ))
              ) : (
                <EmptyState type="active" />
              )}
            </div>
          </TabsContent>

          <TabsContent value="won" className="mt-6">
            <div className="space-y-4">
              {wonBids.length > 0 ? (
                wonBids.map((bid) => (
                  <BidCard key={bid.id} bid={bid} />
                ))
              ) : (
                <EmptyState type="won" />
              )}
            </div>
          </TabsContent>

          <TabsContent value="lost" className="mt-6">
            <div className="space-y-4">
              {lostBids.length > 0 ? (
                lostBids.map((bid) => (
                  <BidCard key={bid.id} bid={bid} />
                ))
              ) : (
                <EmptyState type="lost" />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <MobileNav />
    </div>
  );
};

export default BidDashboard;