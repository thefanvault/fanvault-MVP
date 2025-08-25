import { Home, Search, User, Settings, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface MobileNavProps {
  currentPath?: string;
}

export function MobileNav({ currentPath = "/" }: MobileNavProps) {
  const { userRole, profile } = useAuth();
  
  // Simplified navigation items for mobile
  const navItems = userRole === 'creator' 
    ? [
        { icon: Home, label: "Home", href: "/" },
        { icon: Search, label: "Discover", href: "/discover" },
        { icon: Plus, label: "Sell", href: "/list-new-item" },
        { icon: User, label: "Profile", href: `/creator/${profile?.username || ''}` },
        { icon: Settings, label: "Menu", href: "/settings/home" },
      ]
    : [
        { icon: Home, label: "Home", href: "/" },
        { icon: Search, label: "Discover", href: "/discover" },
        { icon: Settings, label: "Menu", href: "/settings/home" },
      ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t md:hidden z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-colors",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}