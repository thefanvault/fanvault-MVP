
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    
    // Mock login - accepts any credentials
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user and profile data
      const mockUser = {
        id: 'mock-user-id',
        email: formData.email || 'demo@fanvault.app',
        user_metadata: {
          full_name: 'Demo User'
        }
      };

      const mockProfile = {
        id: 'mock-profile-id',
        user_id: 'mock-user-id',
        username: 'demo_user',
        display_name: 'Demo User',
        bio: 'This is a demo profile',
        avatar_url: null,
        is_creator: false, // Default to fan, can be toggled
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Store in localStorage to persist login
      localStorage.setItem('fanvault_auth_user', JSON.stringify(mockUser));
      localStorage.setItem('fanvault_auth_profile', JSON.stringify(mockProfile));
      
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in",
      });
      
      // Refresh the page to update auth state
      window.location.href = "/";
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
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
            src="/fanvault-logo.png" 
            alt="FanVault Logo" 
            className="h-12 w-auto mx-auto mb-4"
          />
        </div>

        <Card className="border-0 shadow-none">
          <CardHeader className="text-center pb-6">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground text-lg">
              Enter your details to continue
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-12 text-base bg-muted/30"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-base font-medium">
                    Password
                  </Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-fanvault-pink hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
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
              </div>

              {/* Keep me signed in */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="keepSignedIn"
                  checked={keepSignedIn}
                  onCheckedChange={(checked) => setKeepSignedIn(!!checked)}
                />
                <Label 
                  htmlFor="keepSignedIn" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Keep me signed in
                </Label>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit"
                className="w-full h-12 bg-fanvault-gradient text-lg font-medium"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </Button>
            </form>

            {/* Sign up Link */}
            <div className="text-center">
              <span className="text-muted-foreground">Don't have an account yet? </span>
              <Link to="/signup" className="text-fanvault-pink hover:underline font-medium">
                Sign up
              </Link>
            </div>

            {/* Security Note */}
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Secure login</span>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Your information is encrypted and secure
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
