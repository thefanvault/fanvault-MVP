import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

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
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-32 bg-gradient-to-r from-fanvault-pink to-fanvault-red">
        <img 
          src={coverImage} 
          alt={`${displayName}'s cover`}
          className="w-full h-full object-cover opacity-80"
        />
      </div>
      
      <CardContent className="relative p-6 pt-12">
        <div className="absolute -top-8 left-6">
          <div className="relative">
            <img 
              src={avatar} 
              alt={displayName}
              className="w-16 h-16 rounded-full border-4 border-background"
            />
            {isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-bold text-lg">{displayName}</h3>
            {isVerified && <Badge variant="secondary">Verified</Badge>}
          </div>
          <p className="text-sm text-muted-foreground">@{username}</p>
          <p className="text-sm mt-2 line-clamp-2">{bio}</p>
        </div>
        
        <div className="flex justify-between text-sm text-muted-foreground mb-4">
          <div>
            <span className="font-semibold text-foreground">{followerCount.toLocaleString()}</span>
            <span className="ml-1">followers</span>
          </div>
          <div>
            <span className="font-semibold text-foreground">{itemCount}</span>
            <span className="ml-1">items</span>
          </div>
          <div>
            <span className="font-semibold text-foreground">{salesCount}</span>
            <span className="ml-1">sales</span>
          </div>
        </div>
        
        <Button className="w-full bg-fanvault-gradient hover:opacity-90">
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
}