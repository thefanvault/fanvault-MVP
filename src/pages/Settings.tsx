
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { MobileNav } from "@/components/layout/MobileNav";

const Settings = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    username: "kayvonmoshiri",
    email: "kayvon@example.com",
    bio: "Creator and collector of unique items",
    notifications: true,
    publicProfile: true,
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your profile settings have been updated successfully.",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b flex items-center px-4">
            <SidebarTrigger />
            <div className="ml-4">
              <h1 className="text-lg font-semibold">Settings</h1>
            </div>
          </header>
          
          <main className="flex-1 flex justify-center">
            <div className="w-full max-w-4xl px-4 pt-6 pb-20 md:pb-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Profile Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your public profile and account preferences
                  </p>
                </div>
                <Separator />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Update your account details and how others see you on the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={profile.username}
                          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell people about yourself..."
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>
                      Configure your notification and privacy settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email updates about your auctions and bids
                        </p>
                      </div>
                      <Switch
                        checked={profile.notifications}
                        onCheckedChange={(checked) => setProfile({ ...profile, notifications: checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Public Profile</Label>
                        <p className="text-sm text-muted-foreground">
                          Make your profile visible to other users
                        </p>
                      </div>
                      <Switch
                        checked={profile.publicProfile}
                        onCheckedChange={(checked) => setProfile({ ...profile, publicProfile: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              </div>
            </div>
          </main>

          <MobileNav currentPath="/settings" />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
