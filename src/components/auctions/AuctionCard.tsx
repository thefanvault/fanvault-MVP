import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  return (
    <Card className={cn("overflow-hidden hover:shadow-lg transition-shadow cursor-pointer", className)}>
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title}
          className={cn("w-full object-cover", isMobile ? "h-40" : "h-48")}
        />
        <div className={cn("absolute flex gap-1 md:gap-2", isMobile ? "top-2 left-2" : "top-3 left-3")}>
          {isLive && (
            <Badge variant="accent" className={cn(isMobile ? "text-xs px-1.5 py-0.5" : "")}>
              LIVE
            </Badge>
          )}
          {isEndingSoon && (
            <Badge variant="destructive" className={cn(isMobile ? "text-xs px-1.5 py-0.5" : "")}>
              Ending Soon
            </Badge>
          )}
        </div>
        <div className={cn("absolute", isMobile ? "top-2 right-2" : "top-3 right-3")}>
          <div className={cn("flex items-center space-x-1 bg-black/60 text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs md:text-sm")}>
            <Clock className="h-3 w-3" />
            <span>{timeRemaining}</span>
          </div>
        </div>
      </div>
      
      <CardContent className={cn("p-3 md:p-4")}>
        <div className={cn("flex items-center space-x-2 mb-2")}>
          <img 
            src={creatorAvatar} 
            alt={creatorName}
            className={cn("rounded-full", isMobile ? "w-5 h-5" : "w-6 h-6")}
          />
          <span className={cn("text-muted-foreground truncate", isMobile ? "text-xs" : "text-sm")}>{creatorName}</span>
        </div>
        
        <h3 className={cn("font-semibold mb-2 line-clamp-2", isMobile ? "text-base leading-tight" : "text-lg")}>{title}</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <p className={cn("text-muted-foreground", isMobile ? "text-xs" : "text-sm")}>Current bid</p>
            <p className={cn("font-bold text-primary", isMobile ? "text-lg" : "text-xl")}>${currentBid}</p>
          </div>
          <div className={cn("flex items-center space-x-1 text-muted-foreground", isMobile ? "text-xs" : "text-sm")}>
            <Users className={cn(isMobile ? "h-3 w-3" : "h-4 w-4")} />
            <span>{bidCount} bids</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}