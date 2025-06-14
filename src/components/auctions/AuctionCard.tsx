import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuctionCardProps {
  id: string;
  title: string;
  currentBid: number;
  bidCount: number;
  timeRemaining: string;
  imageUrl: string;
  creatorName: string;
  creatorAvatar: string;
  isLive?: boolean;
  isEndingSoon?: boolean;
  className?: string;
}

export function AuctionCard({
  id,
  title,
  currentBid,
  bidCount,
  timeRemaining,
  imageUrl,
  creatorName,
  creatorAvatar,
  isLive = false,
  isEndingSoon = false,
  className
}: AuctionCardProps) {
  return (
    <Card className={cn("overflow-hidden hover:shadow-lg transition-shadow cursor-pointer", className)}>
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {isLive && (
            <Badge className="bg-fanvault-red text-white">
              LIVE
            </Badge>
          )}
          {isEndingSoon && (
            <Badge variant="destructive">
              Ending Soon
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <div className="flex items-center space-x-1 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
            <Clock className="h-3 w-3" />
            <span>{timeRemaining}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <img 
            src={creatorAvatar} 
            alt={creatorName}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-muted-foreground">{creatorName}</span>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Current bid</p>
            <p className="text-xl font-bold text-fanvault-pink">${currentBid}</p>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{bidCount} bids</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}