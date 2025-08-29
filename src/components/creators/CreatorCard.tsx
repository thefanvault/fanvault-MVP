import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface CreatorCardProps {
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  coverImage: string;
  followerCount: number;
  itemCount: number;
  salesCount: number;
  isVerified?: boolean;
}

export function CreatorCard({
  username,
  displayName,
  bio,
  avatar,
  coverImage,
  followerCount,
  itemCount,
  salesCount,
  isVerified = false
}: CreatorCardProps) {
  const isMobile = useIsMobile();
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className={cn("relative bg-gradient-to-r from-primary/80 to-accent/80", isMobile ? "h-24" : "h-32")}>
        <img 
          src={coverImage} 
          alt={`${displayName}'s cover`}
          className="w-full h-full object-cover opacity-80"
        />
      </div>
      
      <CardContent className={cn("relative pt-10 md:pt-12", isMobile ? "p-4" : "p-6")}>
        <div className={cn("absolute left-4 md:left-6", isMobile ? "-top-5" : "-top-8")}>
          <div className="relative">
            <img 
              src={avatar} 
              alt={displayName}
              className={cn("rounded-full border-4 border-background", isMobile ? "w-12 h-12" : "w-16 h-16")}
            />
            {isVerified && (
              <div className={cn("absolute bg-primary rounded-full p-0.5 md:p-1", isMobile ? "-bottom-0.5 -right-0.5" : "-bottom-1 -right-1")}>
                <Check className={cn("text-primary-foreground", isMobile ? "h-2.5 w-2.5" : "h-3 w-3")} />
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-3 md:mb-4">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className={cn("font-bold", isMobile ? "text-base" : "text-lg")}>{displayName}</h3>
            {isVerified && <Badge variant="secondary" className={cn(isMobile ? "text-xs px-1.5 py-0.5" : "")}>Verified</Badge>}
          </div>
          <p className={cn("text-muted-foreground", isMobile ? "text-xs" : "text-sm")}>@{username}</p>
          <p className={cn("mt-2 line-clamp-2", isMobile ? "text-xs" : "text-sm")}>{bio}</p>
        </div>
        
        <div className={cn("flex justify-between text-muted-foreground mb-3 md:mb-4", isMobile ? "text-xs" : "text-sm")}>
          <div className="text-center">
            <div className="font-semibold text-foreground">{followerCount.toLocaleString()}</div>
            <div className={cn(isMobile ? "text-[10px]" : "")}>followers</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-foreground">{itemCount}</div>
            <div className={cn(isMobile ? "text-[10px]" : "")}>items</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-foreground">{salesCount}</div>
            <div className={cn(isMobile ? "text-[10px]" : "")}>sales</div>
          </div>
        </div>
        
        <Button variant="premium" className={cn("w-full", isMobile ? "text-sm py-2" : "")} size={isMobile ? "sm" : "default"}>
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
}