import { useState } from "react";
import { ArrowLeft, Copy, Check, UserPlus, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout/Layout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";

const ReferralPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { profile } = useAuth();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Generate unique referral URL (in real app, this would come from backend)
  const referralCode = profile?.username ? `${profile.username}-${Date.now().toString().slice(-6)}` : "user-123456";
  const referralUrl = `https://fanvault.app/signup?ref=${referralCode}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Referral URL copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please copy the URL manually",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    navigate("/settings/home");
  };

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Refer a Creator</h1>
          <p className="text-muted-foreground">
            Invite other creators and both of you get waived fees!
          </p>
        </div>
      </div>

      {/* Benefits Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gift className="h-5 w-5 text-primary" />
            <span>Referral Benefits</span>
          </CardTitle>
          <CardDescription>
            Here's what you and your referrals get when they join FanVault
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-background/50 rounded-lg border">
              <h3 className="font-semibold text-primary mb-2">For You</h3>
              <p className="text-sm text-muted-foreground">
                Get 1 month of waived FanVault fees for each successful creator referral
              </p>
            </div>
            <div className="p-4 bg-background/50 rounded-lg border">
              <h3 className="font-semibold text-primary mb-2">For Them</h3>
              <p className="text-sm text-muted-foreground">
                New creators get their first month of fees waived when they join through your link
              </p>
            </div>
          </div>
          <div className="p-4 bg-background/30 rounded-lg border border-dashed">
            <p className="text-sm text-muted-foreground">
              <strong>Bonus:</strong> Benefits stack! Refer multiple creators and extend your fee-free period.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Referral URL Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
            <span>Your Referral Link</span>
          </CardTitle>
          <CardDescription>
            Share this unique link with potential creators
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="referral-url">Referral URL</Label>
            <div className="flex space-x-2">
              <Input
                id="referral-url"
                value={referralUrl}
                readOnly
                className="flex-1 font-mono text-sm"
              />
              <Button
                onClick={handleCopyUrl}
                variant="outline"
                size="icon"
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">How to share:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Share on social media platforms</li>
              <li>• Send directly to creator friends</li>
              <li>• Include in your content or bio</li>
              <li>• Add to your email signature</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Stats Card (placeholder for future implementation) */}
      <Card>
        <CardHeader>
          <CardTitle>Referral Stats</CardTitle>
          <CardDescription>
            Track your referral performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-primary">0</p>
              <p className="text-sm text-muted-foreground">Total Referrals</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-primary">0</p>
              <p className="text-sm text-muted-foreground">Active Creators</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-primary">0</p>
              <p className="text-sm text-muted-foreground">Months Earned</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-primary">$0</p>
              <p className="text-sm text-muted-foreground">Fees Saved</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (!isMobile) {
    return (
      <Layout>
        <SidebarProvider>
          <div className="flex w-full min-h-screen">
            <div className="hidden md:block">
              <AppSidebar />
            </div>
            
            <div className="flex-1 flex flex-col min-w-0">
              <header className="h-16 border-b flex items-center px-4 bg-background sticky top-0 z-10">
                <div>
                  <h1 className="text-lg font-semibold">Referrals</h1>
                </div>
              </header>
              
              <div className="flex-1 overflow-auto p-4 md:p-6">
                <div className="w-full max-w-4xl mx-auto">
                  {content}
                </div>
              </div>
            </div>
          </div>
        </SidebarProvider>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="p-4">
          {content}
        </div>
      </div>
    </Layout>
  );
};

export default ReferralPage;