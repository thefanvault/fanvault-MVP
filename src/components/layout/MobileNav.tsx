import { Home, Search, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface MobileNavProps {
  currentPath?: string;
}

export function MobileNav({ currentPath = "/" }: MobileNavProps) {
  const { userRole, profile } = useAuth();
  
  // Base nav items for all users
  const baseNavItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Discover", href: "/discover" },
  ];
  
  // Add profile item only for creators
  const navItems = userRole === 'creator' 
    ? [
        ...baseNavItems,
        { icon: User, label: "Profile", href: `/creator/${profile?.username || ''}` },
        { icon: Settings, label: "Settings", href: "/settings" },
      ]
    : [
        ...baseNavItems,
        { icon: Settings, label: "Settings", href: "/settings" },
      ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t md:hidden z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-colors",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}