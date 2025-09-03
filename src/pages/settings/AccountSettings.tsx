import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Layout } from "@/components/layout/Layout";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";

export default function AccountSettings() {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    username: "kayvonmoshiri",
    email: "kayvon@example.com",
    phone: "",
    bio: "Creator and collector of unique items"
  });

  const handleSave = () => {
    toast({
      title: "Account updated",
      description: "Your account information has been saved successfully."
    });
  };

  const handleBack = () => {
    navigate('/settings');
  };

  if (isMobile) {
    return (
      <Layout>
        <div className="min-h-screen bg-background">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center px-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
          </header>

          <div className="p-4 space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Account Information</h2>
              <p className="text-muted-foreground">
                Update your account details and how others see you on the platform
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Your basic account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      value={profile.username} 
                      onChange={e => setProfile({...profile, username: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profile.email} 
                      onChange={e => setProfile({...profile, email: e.target.value})} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="(555) 123-4567" 
                    value={profile.phone} 
                    onChange={e => setProfile({...profile, phone: e.target.value})} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell people about yourself..." 
                    value={profile.bio} 
                    onChange={e => setProfile({...profile, bio: e.target.value})} 
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
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="mr-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-lg font-semibold">Account Settings</h1>
              </div>
            </header>
            
            <div className="flex-1 overflow-auto p-4 md:p-6">
              <div className="w-full max-w-4xl mx-auto space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Account Information</h2>
                  <p className="text-muted-foreground">
                    Update your account details and how others see you on the platform
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Your basic account information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input 
                          id="username" 
                          value={profile.username} 
                          onChange={e => setProfile({...profile, username: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={profile.email} 
                          onChange={e => setProfile({...profile, email: e.target.value})} 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="(555) 123-4567" 
                        value={profile.phone} 
                        onChange={e => setProfile({...profile, phone: e.target.value})} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        placeholder="Tell people about yourself..." 
                        value={profile.bio} 
                        onChange={e => setProfile({...profile, bio: e.target.value})} 
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