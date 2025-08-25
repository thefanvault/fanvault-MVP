import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  
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

  const handleBack = () => {
    navigate('/settings/home');
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-3">
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="flex-shrink-0"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div>
              <h2 className="text-2xl font-bold">General Settings</h2>
              <p className="text-muted-foreground">
                Manage your account type and privacy preferences
              </p>
            </div>
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