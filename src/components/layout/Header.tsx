

import { Button } from "@/components/ui/button";
import { Search, Bell, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { RoleToggle } from "@/components/ui/role-toggle";

export function Header() {
  const { user, userRole, signOut } = useAuth();
  const { toast } = useToast();

  const getProfilePath = () => {
    if (!user) return "/signup";
    return userRole === 'creator' ? "/dashboard" : "/settings";
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: "An error occurred while logging out.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Role Toggle */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img 
              src="/lovable-uploads/a4c880dd-a727-40e6-b3eb-1fa7df905859.png" 
              alt="FanVault Logo" 
              className="h-8 cursor-pointer"
            />
          </Link>
          {user && <RoleToggle />}
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
          {user && (
            <>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to={getProfilePath()}>
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            </>
          )}
          {user ? (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="hidden md:inline-flex"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button className="bg-fanvault-gradient" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

