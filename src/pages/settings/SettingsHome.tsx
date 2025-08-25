import { useEffect, useState } from "react";
import { ChevronRight, User, Bell, CreditCard, Truck, MessageSquare, Gavel, Settings as SettingsIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useIsMobile } from "@/hooks/use-mobile";

const settingsOptions = [
  {
    icon: User,
    title: "Account",
    description: "Manage your profile and account settings",
    href: "/settings/account"
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Configure email and text notifications",
    href: "/settings/notifications"
  },
  {
    icon: MessageSquare,
    title: "Messages",
    description: "View and manage your conversations",
    href: "/messages"
  },
  {
    icon: Gavel,
    title: "My Bids",
    description: "Track your active and past bids",
    href: "/bids/active"
  },
  {
    icon: Truck,
    title: "Shipping",
    description: "Manage your shipping addresses",
    href: "/address/add"
  },
  {
    icon: CreditCard,
    title: "Payment",
    description: "Manage your payment methods",
    href: "/payment/add"
  },
  {
    icon: SettingsIcon,
    title: "General Settings",
    description: "App preferences and account type",
    href: "/settings/general"
  }
];

export default function SettingsHome() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
    if (window.innerWidth >= 768) {
      navigate("/settings/general", { replace: true });
    }
  }, [navigate]);

  if (!checked) return null;

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center px-4">
            <h1 className="text-lg font-semibold">Settings</h1>
          </div>
        </header>

        <div className="p-4 space-y-2">
          {settingsOptions.map((option) => (
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
        </div>
      </div>
    </Layout>
  );
}