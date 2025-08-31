

import { Button } from "@/components/ui/button";
import { Search, Bell, User, LogOut, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";


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
      <div className="container relative flex h-16 items-center px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex-shrink-0">
            <img 
              src="/lovable-uploads/cedf3fed-66b4-4eeb-b6ed-d39036f2d2d8.png" 
              alt="FanVault Logo" 
              className="h-6 md:h-8 w-auto cursor-pointer"
            />
          </Link>
        </div>

        {/* Navigation - Desktop - Absolutely Centered */}
        <nav className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/discover" className="text-foreground hover:text-primary transition-colors">
            Discover
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-auto">
          {/* Show search icon on mobile only when logged in */}
          {user && (
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
          )}
          
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
            <>
              {/* Desktop buttons */}
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
                <Button className="bg-fanvault-gradient" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
              
              {/* Mobile buttons */}
              <div className="flex md:hidden items-center space-x-1">
                <Button variant="outline" size="sm" className="text-xs px-2" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
                <Button size="sm" className="bg-fanvault-gradient text-xs px-2" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

