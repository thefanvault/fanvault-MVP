import { Button } from "@/components/ui/button";
import { Search, Bell, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export function Header() {
  const { user, userRole } = useAuth();

  const getProfilePath = () => {
    if (!user) return "/signup";
    return userRole === 'creator' ? "/dashboard" : "/settings";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/a4c880dd-a727-40e6-b3eb-1fa7df905859.png" 
            alt="FanVault Logo" 
            className="h-8"
          />
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </a>
          <a href="/discover" className="text-foreground hover:text-primary transition-colors">
            Discover
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to={getProfilePath()}>
              <User className="h-5 w-5" />
            </Link>
          </Button>
          {!user && (
            <Button className="hidden md:inline-flex bg-fanvault-gradient" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}