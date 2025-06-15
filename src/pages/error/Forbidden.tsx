import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Home, LogIn, ArrowLeft, Shield } from "lucide-react";

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-16 pb-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* FanVault branding */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-fanvault-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="text-white h-10 w-10" />
            </div>
            <h1 className="text-6xl font-bold text-foreground mb-4">403</h1>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">Access Forbidden</h2>
              <p className="text-lg text-muted-foreground mb-2">
                You don't have permission to access this page.
              </p>
              <p className="text-muted-foreground">
                This could be because you need to log in, or you don't have the required permissions.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-fanvault-gradient">
                <Link to="/login">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
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

          {/* Help text */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-semibold mb-4">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you believe you should have access to this page, please contact our support team.
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <Link to="/legal/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>
              <Link to="/legal/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Forbidden;