import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  // Set default account type based on URL parameter
  useEffect(() => {
    const accountType = searchParams.get('type');
    if (accountType === 'creator') {
      setIsCreator(true);
    } else if (accountType === 'fan') {
      setIsCreator(false);
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      if (isCreator) {
        // For creator accounts, redirect to onboarding instead of creating account
        // Store the form data temporarily for use in onboarding
        sessionStorage.setItem('pendingCreatorSignup', JSON.stringify({
          ...formData,
          isCreator: true
        }));
        
        toast({
          title: "Let's set up your creator profile!",
          description: "Complete your profile to create your creator account",
        });
        
        navigate("/onboarding/creator/profile");
      } else {
        // For fan accounts, create account immediately
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast({
          title: "Account created successfully!",
          description: "Welcome to FanVault",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Error creating account",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/")}
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/a4c880dd-a727-40e6-b3eb-1fa7df905859.png" 
            alt="FanVault Logo" 
            className="h-12 mx-auto mb-4"
          />
        </div>

        <Card className="border-0 shadow-none">
          <CardHeader className="text-center pb-6">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-muted-foreground text-lg">
              Unlock a new revenue stream – join FanVault!
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium">
                  Name (optional)
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="h-12 text-base"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-12 text-base"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-medium">
                  Password *
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-12 text-base pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Must be at least 8 characters
                </p>
              </div>

              {/* Account Type Toggle */}
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {isCreator ? "🏷️" : "👤"}
                    </span>
                    <div>
                      <h3 className="font-medium">
                        {isCreator ? "Creator Account" : "Fan Account"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {isCreator 
                          ? "You can sell items and manage auctions" 
                          : "You can bid on items and follow creators"
                        }
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={isCreator}
                    onCheckedChange={setIsCreator}
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="text-center text-sm text-muted-foreground">
                By creating an account, you agree to our{" "}
                <Link to="/legal/terms" className="text-fanvault-pink hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/legal/privacy" className="text-fanvault-pink hover:underline">
                  Privacy Policy
                </Link>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit"
                className="w-full h-12 bg-fanvault-gradient text-lg font-medium"
                disabled={loading}
              >
                {loading ? "Processing..." : 
                 isCreator ? "Continue to Profile Setup" : "Create Fan Account"}
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/login" className="text-fanvault-pink hover:underline font-medium">
                Log in
              </Link>
            </div>

            {/* Privacy Note */}
            <p className="text-center text-sm text-muted-foreground">
              We'll never share your info. Your privacy is our priority.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
