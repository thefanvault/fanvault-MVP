import { ArrowLeft, Home, MessageCircle, Bell, Heart, Truck, CreditCard, User, Crown, Package } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";

export default function MobileNavigation() {
  const navigate = useNavigate();
  const { userRole, profile } = useAuth();

  const navigationItems = [
    { title: "Home", url: "/discover", icon: Home },
    { title: "Messages", url: "/messages", icon: MessageCircle },
    { title: "Alerts", url: "/notifications", icon: Bell },
    ...(userRole === 'creator' ? [
      { title: "Dashboard", url: "/dashboard", icon: Home },
      { title: "Orders", url: "/orders", icon: Package },
    ] : []),
    { title: "My Bids", url: "/bids/active", icon: Heart },
    { title: "Shipping", url: "/address/add", icon: Truck },
    { title: "Payment", url: "/payment/add", icon: CreditCard },
    ...(userRole === 'creator' ? [
      { title: "Profile", url: `/creator/${profile?.username || 'username'}`, icon: User },
    ] : []),
    ...(userRole === 'fan' ? [
      { title: "Become a Creator", url: "/onboarding/creator/profile", icon: Crown },
    ] : []),
  ];

  return (
    <Layout>
      <div className="container mx-auto p-4 space-y-4 max-w-md">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        {/* Navigation Options */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold mb-6">Navigation</h1>
          
          {navigationItems.map((item) => (
            <Link key={item.title} to={item.url}>
              <Card className="hover:bg-accent/50 transition-colors border border-white/10 bg-white/5 backdrop-blur-sm">
                <CardContent className="flex items-center space-x-4 p-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}