import { useEffect, useState } from "react";
import { ChevronRight, User, Bell, CreditCard, Truck, MessageSquare, Gavel, Settings as SettingsIcon, Home, Package, Crown, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";

export default function SettingsHome() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { userRole, profile, signOut } = useAuth();
  const { toast } = useToast();
  const [checked, setChecked] = useState(false);

  // Build dynamic options based on user role
  const menuOptions = [
    ...(userRole === 'creator' ? [
      { icon: Home, title: "Dashboard", description: "Creator dashboard", href: "/dashboard" },
    ] : []),
    { icon: User, title: "Account", description: "Manage your profile and account settings", href: "/settings/account" },
    { icon: SettingsIcon, title: "General Settings", description: "App preferences and account type", href: "/settings/general" },
    { icon: MessageSquare, title: "Messages", description: "View and manage your conversations", href: "/messages" },
    { icon: Bell, title: "Alerts", description: "View your notifications", href: "/notifications" },
    ...(userRole === 'creator' ? [
      { icon: Package, title: "Orders", description: "Manage your orders", href: "/orders" },
    ] : []),
    { icon: Gavel, title: "My Bids", description: "Track your active and past bids", href: "/bids/active" },
    { icon: Truck, title: "Shipping", description: "Manage your shipping addresses", href: "/address/add" },
    { icon: CreditCard, title: "Payment", description: "Manage your payment methods", href: "/payment/add" },
    ...(userRole === 'creator' ? [
      { icon: User, title: "Profile", description: "View your creator profile", href: `/creator/${profile?.username || 'username'}` },
    ] : []),
    { icon: Bell, title: "Notification Settings", description: "Configure email and text notifications", href: "/settings/notifications" },
    ...(userRole === 'fan' ? [
      { icon: Crown, title: "Become a Creator", description: "Start your creator journey", href: "/onboarding/creator/profile?from=settings" },
    ] : []),
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "An error occurred while signing out.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    setChecked(true);
  }, []);

  if (!checked) return null;

  return (
    <Layout>
      {!isMobile ? (
        <SidebarProvider>
          <div className="flex w-full min-h-screen">
            <div className="hidden md:block">
              <AppSidebar />
            </div>
            
            <div className="flex-1 flex flex-col min-w-0">
              <header className="h-16 border-b flex items-center px-4 bg-background sticky top-0 z-10">
                <div>
                  <h1 className="text-lg font-semibold">Menu</h1>
                </div>
              </header>
              
              <div className="flex-1 overflow-auto p-4 md:p-6">
                <div className="w-full max-w-4xl mx-auto space-y-2">
                  {menuOptions.map((option) => (
                    <Link
                      key={option.href}
                      to={option.href}
                      className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 hover:border-white/30 transition-all duration-200 shadow-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                          <option.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{option.title}</h3>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                  ))}
                  
                  {/* Sign Out Button */}
                  <div className="pt-4 mt-6 border-t border-white/10">
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      className="w-full flex items-center justify-center space-x-3 p-4 text-destructive border-destructive/50 hover:bg-destructive/10 hover:border-destructive transition-all duration-200"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium">Sign Out</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarProvider>
      ) : (
        <div className="min-h-screen bg-background">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center px-4">
              <h1 className="text-lg font-semibold">Menu</h1>
            </div>
          </header>

          <div className="p-4 space-y-2">
            {menuOptions.map((option) => (
              <Link
                key={option.href}
                to={option.href}
                className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 hover:border-white/30 transition-all duration-200 shadow-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <option.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            ))}
            
            {/* Sign Out Button */}
            <div className="pt-4 mt-6 border-t border-white/10">
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="w-full flex items-center justify-center space-x-3 p-4 text-destructive border-destructive/50 hover:bg-destructive/10 hover:border-destructive transition-all duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}