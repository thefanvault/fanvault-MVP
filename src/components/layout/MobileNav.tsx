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
  if (!user) {
    return (
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden z-50">
        <div className="bg-background/20 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
          <div className="flex items-center p-3 gap-2">
            <Link
              to="/"
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 backdrop-blur-sm",
                actualPath === "/" 
                  ? "bg-primary/90 text-primary-foreground shadow-lg shadow-primary/40 scale-110" 
                  : "text-foreground/80 hover:text-foreground hover:bg-white/10 hover:scale-105"
              )}
            >
              <Home className="h-5 w-5" />
            </Link>
            <Link
              to="/discover"
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 backdrop-blur-sm",
                actualPath === "/discover" 
                  ? "bg-primary/90 text-primary-foreground shadow-lg shadow-primary/40 scale-110" 
                  : "text-foreground/80 hover:text-foreground hover:bg-white/10 hover:scale-105"
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
    <nav className="fixed bottom-6 left-4 right-4 md:hidden z-50">
      <div className="bg-background/20 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
        <div className="flex items-center justify-around px-3 py-2">
          {navItems.map((item) => {
            const isActive = actualPath === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className="flex flex-col items-center justify-center space-y-0.5 px-1.5 py-1.5 transition-all duration-300 text-foreground/80 focus:outline-none"
              >
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                  isActive 
                    ? "bg-primary/90 text-primary-foreground shadow-lg shadow-primary/40 scale-110" 
                    : "hover:bg-white/10 hover:scale-105"
                )}>
                  <item.icon className="h-5 w-5" />
                </div>
                <span className={cn(
                  "text-xs font-medium transition-colors duration-300",
                  isActive ? "text-primary" : "hover:text-foreground"
                )}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}