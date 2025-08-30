import { Home, Search, User, Settings, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";

interface MobileNavProps {
  currentPath?: string;
}

export function MobileNav({ currentPath = "/" }: MobileNavProps) {
  const { userRole, profile, user } = useAuth();
  const location = useLocation();
  const actualPath = location.pathname;
  
  // If user is not logged in, show floating toggle
  if (!user && !userRole) {
    return (
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden z-50">
        <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-full shadow-lg shadow-primary/10">
          <div className="flex items-center p-2 gap-1">
            <Link
              to="/"
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
                actualPath === "/" 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Home className="h-5 w-5" />
            </Link>
            <Link
              to="/discover"
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
                actualPath === "/discover" 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Search className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </nav>
    );
  }
  
  // Logged in user navigation (existing behavior)
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
          const isActive = actualPath === item.href;
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