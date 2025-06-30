import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-16 pb-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* FanVault branding */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-fanvault-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-3xl">★</span>
            </div>
            <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
              <p className="text-lg text-muted-foreground mb-2">
                Sorry, we couldn't find the page you're looking for.
              </p>
              <p className="text-muted-foreground">
                The page may have been moved, deleted, or the URL might be incorrect.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-fanvault-gradient">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/discover">
                  <Search className="w-4 h-4 mr-2" />
                  Explore Auctions
                </Link>
              </Button>
            </div>

            {/* Go back option */}
            <div className="pt-4">
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>

          {/* Helpful links */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-semibold mb-4">Popular Pages</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <Link to="/discover" className="text-primary hover:underline">
                Browse Auctions
              </Link>
              <Link to="/signup" className="text-primary hover:underline">
                Create Account
              </Link>
              <Link to="/settings" className="text-primary hover:underline">
                Account Settings
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
