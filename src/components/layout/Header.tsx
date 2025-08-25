

import { Button } from "@/components/ui/button";
import { Search, Bell, User, LogOut, Plus } from "lucide-react";
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
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link to="/" className="flex-shrink-0">
            <img 
              src="/lovable-uploads/cedf3fed-66b4-4eeb-b6ed-d39036f2d2d8.png" 
              alt="FanVault Logo" 
              className="h-6 md:h-8 w-auto cursor-pointer"
            />
          </Link>
          <div className="scale-75 md:scale-100 origin-left">
            <RoleToggle />
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/discover" className="text-foreground hover:text-primary transition-colors">
            Discover
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          {user && (
            <>
              {userRole === 'creator' && (
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-3 py-2 rounded-lg shadow-lg hidden md:inline-flex" asChild>
                  <Link to="/list-new-item">
                    <Plus className="h-4 w-4 mr-1" />
                    Sell
                  </Link>
                </Button>
              )}
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

