import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Layout } from "@/components/layout/Layout";
import { RoleToggle } from "@/components/ui/role-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

export default function GeneralSettings() {
  const { toast } = useToast();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  const [settings, setSettings] = useState({
    publicProfile: true,
    showOnlineStatus: false,
    allowMessages: true
  });

  const handleSave = () => {
    toast({
      title: "Settings updated",
      description: "Your general preferences have been saved successfully."
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

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center px-4">
            {isMobile && <BackButton />}
            {!isMobile && <h1 className="text-lg font-semibold">General Settings</h1>}
          </div>
        </header>

        <div className="p-4 space-y-6">
          {!isMobile && <BackButton />}
          
          <div>
            <h2 className="text-2xl font-bold">General Settings</h2>
            <p className="text-muted-foreground">
              Manage your account type and privacy preferences
            </p>
          </div>

          {user && (
            <Card>
              <CardHeader>
                <CardTitle>Account Type</CardTitle>
                <CardDescription>
                  Switch between Fan and Creator modes to access different features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RoleToggle />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control your visibility and interaction preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public Profile</Label>
                  <p className="text-sm text-muted-foreground">
                    Make your profile visible to other users
                  </p>
                </div>
                <Switch 
                  checked={settings.publicProfile} 
                  onCheckedChange={checked => setSettings({...settings, publicProfile: checked})} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Online Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Let others see when you're online
                  </p>
                </div>
                <Switch 
                  checked={settings.showOnlineStatus} 
                  onCheckedChange={checked => setSettings({...settings, showOnlineStatus: checked})} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow other users to send you messages
                  </p>
                </div>
                <Switch 
                  checked={settings.allowMessages} 
                  onCheckedChange={checked => setSettings({...settings, allowMessages: checked})} 
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