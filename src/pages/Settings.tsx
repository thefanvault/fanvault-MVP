import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { ProfileEditForm } from "@/components/forms/ProfileEditForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Globe, Lock, Copy, Edit, Trash2, LogOut, Twitter, Instagram, CheckCircle, CreditCard, Plus, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const [isStorefrontPublic, setIsStorefrontPublic] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  // Profile state - fetch from Supabase
  const [creatorProfile, setCreatorProfile] = useState<{
    display_name: string | null;
    username: string | null;
    bio: string | null;
    avatar_url: string | null;
  }>({
    display_name: null,
    username: null,
    bio: null,
    avatar_url: null
  });

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
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);
  const [socialUrl, setSocialUrl] = useState("");
  const [urlError, setUrlError] = useState("");

  // Load user profile from Supabase
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error loading profile:', error);
          toast({
            title: "Error loading profile",
            description: "Could not load your profile data",
            variant: "destructive",
          });
        } else if (profile) {
          setCreatorProfile({
            display_name: profile.display_name,
            username: profile.username,
            bio: profile.bio,
            avatar_url: profile.avatar_url
          });
        } else {
          // No profile exists, create one
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              user_id: user.id,
              display_name: user.email?.split('@')[0] || 'User',
              username: user.email?.split('@')[0]?.toLowerCase() || 'user',
              is_creator: true
            })
            .select()
            .single();

          if (createError) {
            console.error('Error creating profile:', createError);
          } else if (newProfile) {
            setCreatorProfile({
              display_name: newProfile.display_name,
              username: newProfile.username,
              bio: newProfile.bio,
              avatar_url: newProfile.avatar_url
            });
          }
        }
      } catch (error) {
        console.error('Error in loadProfile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [user, toast]);

  // Available platforms to connect
  const availablePlatforms = [
    { id: "instagram", name: "Instagram", icon: Instagram, domain: "instagram.com" },
    { id: "youtube", name: "YouTube", icon: Youtube, domain: "youtube.com" },
    { id: "tiktok", name: "TikTok", icon: Twitter, domain: "tiktok.com" },
    { id: "onlyfans", name: "OnlyFans", icon: Globe, domain: "onlyfans.com" },
    { id: "fansly", name: "Fansly", icon: Globe, domain: "fansly.com" },
  ];

  // Filter out already connected platforms
  const unconnectedPlatforms = availablePlatforms.filter(
    platform => !connectedAccounts.find(account => account.id === platform.id)
  );

  const publicUrl = `https://fanvault.app/creator/${creatorProfile.username || 'user'}`;
  const magicLink = `https://fanvault.app/creator/${creatorProfile.username || 'user'}?token=abc123def456`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    });
  };

  const handleProfileUpdate = (updatedProfile: any) => {
    setCreatorProfile(prev => ({
      ...prev,
      display_name: updatedProfile.display_name,
      bio: updatedProfile.bio,
      avatar_url: updatedProfile.avatar_url
    }));
  };

  const handleRemoveAccount = (accountId: string) => {
    setConnectedAccounts(prev => prev.filter(account => account.id !== accountId));
    toast({
      title: "Account removed",
      description: "Social account has been disconnected",
    });
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "There was a problem logging you out",
        variant: "destructive",
      });
    }
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

  const validateUrl = (url: string, domain: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.includes(domain);
    } catch {
      return false;
    }
  };

  const handleSelectPlatform = (platform: any) => {
    setSelectedPlatform(platform);
    setSocialUrl("");
    setUrlError("");
  };

  const handleUrlChange = (value: string) => {
    setSocialUrl(value);
    setUrlError("");
  };

  const handleConnectAccount = () => {
    if (!selectedPlatform || !socialUrl.trim()) {
      setUrlError("Please enter a valid URL");
      return;
    }

    const platform = availablePlatforms.find(p => p.id === selectedPlatform.id);
    if (!platform) return;

    if (!validateUrl(socialUrl, platform.domain)) {
      setUrlError(`Please enter a valid ${platform.name} URL (must contain ${platform.domain})`);
      return;
    }

    const urlObj = new URL(socialUrl);
    const handle = urlObj.pathname.split('/').filter(Boolean)[0] || 'username';

    const newAccount = {
      id: platform.id,
      platform: platform.name,
      icon: platform.icon,
      handle: `@${handle}`,
      url: socialUrl
    };
    
    setConnectedAccounts(prev => [...prev, newAccount]);
    setShowConnectDialog(false);
    setSelectedPlatform(null);
    setSocialUrl("");
    setUrlError("");
    
    toast({
      title: "Account connected",
      description: `${platform.name} account has been linked to your profile`,
    });
  };

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Please sign in</h2>
            <p className="text-muted-foreground mb-4">You need to be logged in to access settings</p>
            <Button onClick={() => window.location.href = '/login'} className="bg-fanvault-gradient">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-6 pb-20 md:pb-6">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Settings</h1>
              <p className="text-muted-foreground">Loading your profile...</p>
            </div>
          </div>
        </main>
        <MobileNav currentPath="/settings" />
      </div>
    );
  }

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
                  <AvatarImage src={creatorProfile.avatar_url} alt="Profile" />
                  <AvatarFallback>{creatorProfile.display_name?.split(' ').map(n => n[0]).join('') || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{creatorProfile.display_name}</h3>
                  <p className="text-muted-foreground">@{creatorProfile.username}</p>
                  <Badge className="mt-2">Creator</Badge>
                </div>
                <ProfileEditForm 
                  profile={creatorProfile}
                  onProfileUpdate={handleProfileUpdate}
                />
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
                
                {/* Connect Account Button */}
                {unconnectedPlatforms.length > 0 && (
                  <Dialog open={showConnectDialog} onOpenChange={(open) => {
                    setShowConnectDialog(open);
                    if (!open) {
                      setSelectedPlatform(null);
                      setSocialUrl("");
                      setUrlError("");
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full border-dashed">
                        <Plus className="h-4 w-4 mr-2" />
                        Connect Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {selectedPlatform ? `Connect ${selectedPlatform.name}` : "Connect Social Account"}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        {!selectedPlatform ? (
                          // Platform selection
                          <div className="space-y-3">
                            <p className="text-sm text-muted-foreground">Choose a platform to connect:</p>
                            {unconnectedPlatforms.map((platform) => (
                              <Button
                                key={platform.id}
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => handleSelectPlatform(platform)}
                              >
                                <platform.icon className="h-5 w-5 mr-3" />
                                {platform.name}
                              </Button>
                            ))}
                          </div>
                        ) : (
                          // URL input form
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                              <selectedPlatform.icon className="h-5 w-5" />
                              <span className="font-medium">{selectedPlatform.name}</span>
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Profile URL</label>
                              <Input
                                placeholder={`https://${selectedPlatform.domain}/your-username`}
                                value={socialUrl}
                                onChange={(e) => handleUrlChange(e.target.value)}
                                className={urlError ? "border-destructive" : ""}
                              />
                              {urlError && (
                                <p className="text-sm text-destructive">{urlError}</p>
                              )}
                              <p className="text-xs text-muted-foreground">
                                Enter your full {selectedPlatform.name} profile URL
                              </p>
                            </div>
                            
                            <div className="flex space-x-2 pt-2">
                              <Button 
                                variant="outline" 
                                onClick={() => setSelectedPlatform(null)}
                                className="flex-1"
                              >
                                Back
                              </Button>
                              <Button 
                                onClick={handleConnectAccount}
                                className="flex-1 bg-fanvault-gradient"
                                disabled={!socialUrl.trim()}
                              >
                                Connect
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
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