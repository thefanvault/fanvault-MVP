import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Globe, Lock, Copy, Edit, Trash2, LogOut, Twitter, Instagram, CheckCircle, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [isStorefrontPublic, setIsStorefrontPublic] = useState(true);
  
  // Mock data - in real app, this would come from user context/API
  const creatorProfile = {
    name: "Kayvon Moshiri",
    handle: "kayvonmoshiri",
    bio: "Creator of amazing content and collector of vintage items. Building my vault one piece at a time.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e04f?w=150&h=150&fit=crop&crop=face"
  };

  const [connectedAccounts, setConnectedAccounts] = useState([
    {
      id: "twitter",
      platform: "Twitter",
      icon: Twitter,
      handle: "@kayvonmoshiri",
      url: "https://twitter.com/kayvonmoshiri"
    },
    {
      id: "instagram", 
      platform: "Instagram",
      icon: Instagram,
      handle: "@kayvon.moshiri",
      url: "https://instagram.com/kayvon.moshiri"
    }
  ]);

  const [isStripeConnected] = useState(true);

  const publicUrl = `https://fanvault.app/creator/${creatorProfile.handle}`;
  const magicLink = `https://fanvault.app/creator/${creatorProfile.handle}?token=abc123def456`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    });
  };

  const handleRemoveAccount = (accountId: string) => {
    setConnectedAccounts(prev => prev.filter(account => account.id !== accountId));
    toast({
      title: "Account removed",
      description: "Social account has been disconnected",
    });
  };

  const handleLogout = () => {
    // Implement logout logic here
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const handleStorefrontToggle = (checked: boolean) => {
    setIsStorefrontPublic(checked);
    toast({
      title: checked ? "Vault is now public" : "Vault is now private",
      description: checked 
        ? "Your storefront is discoverable by anyone" 
        : "Only fans with the link can view your storefront",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-6 pb-20 md:pb-6">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>

          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={creatorProfile.avatar} alt="Profile" />
                  <AvatarFallback>{creatorProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{creatorProfile.name}</h3>
                  <p className="text-muted-foreground">@{creatorProfile.handle}</p>
                  <Badge className="mt-2">Creator</Badge>
                </div>
                <Button variant="outline" className="self-start">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              
              {creatorProfile.bio && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Bio</label>
                  <p className="mt-1 text-sm">{creatorProfile.bio}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Storefront Visibility */}
          <Card>
            <CardHeader>
              <CardTitle>Storefront Visibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {isStorefrontPublic ? <Globe className="h-5 w-5 text-primary" /> : <Lock className="h-5 w-5 text-muted-foreground" />}
                  <div>
                    <p className="font-medium">
                      My Vault is {isStorefrontPublic ? "Public" : "Private"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isStorefrontPublic 
                        ? "Your storefront is discoverable by anyone" 
                        : "When private, only fans with the link can view your storefront"
                      }
                    </p>
                  </div>
                </div>
                <Switch
                  checked={isStorefrontPublic}
                  onCheckedChange={handleStorefrontToggle}
                  aria-label={`Make storefront ${isStorefrontPublic ? 'private' : 'public'}`}
                />
              </div>
              
              <div className="space-y-4">
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
                      aria-label="Copy link to clipboard"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Connected Accounts */}
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Social Accounts */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Social Media</h4>
                {connectedAccounts.length === 0 ? (
                  <p className="text-muted-foreground text-sm py-4">No social accounts connected</p>
                ) : (
                  connectedAccounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <account.icon className="h-5 w-5" />
                        <div>
                          <p className="font-medium">{account.platform}</p>
                          <p className="text-sm text-muted-foreground">{account.handle}</p>
                        </div>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove connection?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will disconnect your {account.platform} account ({account.handle}) from your FanVault profile.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleRemoveAccount(account.id)}>
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))
                )}
              </div>

              {/* Stripe Account */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Payment Processing</h4>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Stripe</p>
                      <div className="flex items-center space-x-2">
                        {isStripeConnected ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <p className="text-sm text-green-600">Payments set up</p>
                          </>
                        ) : (
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {isStripeConnected ? (
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  ) : (
                    <Button size="sm" className="bg-fanvault-gradient">
                      Connect Stripe
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logout */}
          <Card>
            <CardContent className="pt-6">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Log out of FanVault?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You'll need to sign in again to access your creator dashboard.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>
                      Log Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </main>

      <MobileNav currentPath="/settings" />
    </div>
  );
};

export default Settings;