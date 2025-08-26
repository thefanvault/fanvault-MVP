import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Layout } from "@/components/layout/Layout";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";

export default function NotificationSettings() {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    textNotifications: false,
    bidUpdates: true,
    auctionEnding: true,
    newMessages: true,
    marketingEmails: false
  });

  const handleSave = () => {
    toast({
      title: "Notifications updated",
      description: "Your notification preferences have been saved successfully."
    });
  };

  const BackButton = () => (
    <Link 
      to={isMobile ? "/settings" : "/settings"} 
      className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Back to Settings</span>
    </Link>
  );

  if (isMobile) {
    return (
      <Layout>
        <div className="min-h-screen bg-background">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center px-4">
              <BackButton />
            </div>
          </header>

          <div className="p-4 space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Notification Preferences</h2>
              <p className="text-muted-foreground">
                Choose how you want to be notified about auction activity
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Communication Preferences</CardTitle>
                <CardDescription>
                  Control how we communicate with you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your auctions and bids
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.emailNotifications} 
                    onCheckedChange={checked => setNotifications({...notifications, emailNotifications: checked})} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Text Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive SMS updates about your auctions and bids
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.textNotifications} 
                    onCheckedChange={checked => setNotifications({...notifications, textNotifications: checked})} 
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Notifications</CardTitle>
                <CardDescription>
                  Get notified about specific auction events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Bid Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      When someone outbids you or bids on your items
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.bidUpdates} 
                    onCheckedChange={checked => setNotifications({...notifications, bidUpdates: checked})} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auction Ending Soon</Label>
                    <p className="text-sm text-muted-foreground">
                      Reminders when auctions you're watching are ending
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.auctionEnding} 
                    onCheckedChange={checked => setNotifications({...notifications, auctionEnding: checked})} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      When you receive messages from other users
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.newMessages} 
                    onCheckedChange={checked => setNotifications({...notifications, newMessages: checked})} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Promotional emails about new features and events
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.marketingEmails} 
                    onCheckedChange={checked => setNotifications({...notifications, marketingEmails: checked})} 
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave} variant="premium">Save Changes</Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <div className="hidden md:block">
            <AppSidebar />
          </div>
          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-16 border-b flex items-center px-4 bg-background sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <BackButton />
                <h1 className="text-lg font-semibold">Notification Settings</h1>
              </div>
            </header>
            
            <div className="flex-1 overflow-auto p-4 md:p-6">
              <div className="w-full max-w-4xl mx-auto space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Notification Preferences</h2>
                  <p className="text-muted-foreground">
                    Choose how you want to be notified about auction activity
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Communication Preferences</CardTitle>
                    <CardDescription>
                      Control how we communicate with you
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email updates about your auctions and bids
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.emailNotifications} 
                        onCheckedChange={checked => setNotifications({...notifications, emailNotifications: checked})} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Text Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive SMS updates about your auctions and bids
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.textNotifications} 
                        onCheckedChange={checked => setNotifications({...notifications, textNotifications: checked})} 
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Activity Notifications</CardTitle>
                    <CardDescription>
                      Get notified about specific auction events
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Bid Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          When someone outbids you or bids on your items
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.bidUpdates} 
                        onCheckedChange={checked => setNotifications({...notifications, bidUpdates: checked})} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auction Ending Soon</Label>
                        <p className="text-sm text-muted-foreground">
                          Reminders when auctions you're watching are ending
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.auctionEnding} 
                        onCheckedChange={checked => setNotifications({...notifications, auctionEnding: checked})} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Messages</Label>
                        <p className="text-sm text-muted-foreground">
                          When you receive messages from other users
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.newMessages} 
                        onCheckedChange={checked => setNotifications({...notifications, newMessages: checked})} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Promotional emails about new features and events
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.marketingEmails} 
                        onCheckedChange={checked => setNotifications({...notifications, marketingEmails: checked})} 
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button onClick={handleSave} variant="premium">Save Changes</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </Layout>
  );
}