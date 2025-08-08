import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Layout } from "@/components/layout/Layout";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AccountSettings() {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
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

  const BackButton = () => (
    <Link 
      to={isMobile ? "/settings" : "/settings/general"} 
      className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Back to Settings</span>
    </Link>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center px-4">
            {isMobile && <BackButton />}
            {!isMobile && <h1 className="text-lg font-semibold">Account Settings</h1>}
          </div>
        </header>

        <div className="p-4 space-y-6">
          {!isMobile && <BackButton />}
          
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