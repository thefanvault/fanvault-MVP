import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().default(false)
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userRole } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange"
  });

  const email = watch("email");
  const password = watch("password");
  
  // Simplified validation - just check if we have values and no errors
  const isFormValid = Boolean(email && password && email.length > 0 && password.length > 0);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      console.log('Attempting login for:', data.email);
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        let errorMessage = "There was an issue logging in. Please try again.";
        
        if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Invalid email or password";
        } else if (error.message.includes("Email not confirmed")) {
          errorMessage = "Please check your email to verify your account";
        }
        
        toast({
          title: "Login Failed",
          description: errorMessage,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      
      // Wait a moment for the AuthContext to update user role
      setTimeout(() => {
        // Get the latest session to check user role
        supabase.auth.getSession().then(async ({ data: { session } }) => {
          if (session?.user) {
            console.log('Session found, checking user profile for:', session.user.id);
            // Check user profile to determine role and redirect
            const { data: profile } = await supabase
              .from('profiles')
              .select('is_creator')
              .eq('user_id', session.user.id)
              .single();
            
            console.log('Profile data:', profile);
            const isCreator = profile?.is_creator;
            
            if (isCreator) {
              console.log('Redirecting to dashboard for creator');
              navigate("/dashboard");
            } else {
              console.log('Redirecting to home for fan');
              navigate("/");
            }
          } else {
            console.log('No session found, redirecting to home');
            navigate("/");
          }
          setIsLoading(false);
        });
      }, 500); // Small delay to ensure AuthContext has updated
      
    } catch (error) {
      toast({
        title: "Login Failed", 
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/");
            }
          }}
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/fd3f8e13-bb94-4e8c-9fcb-8a76cf9277a9.png" 
            alt="FanVault Logo" 
            className="h-12 mx-auto mb-4"
          />
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Enter your details to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com"
                className={`h-12 ${errors.email ? 'border-destructive' : ''}`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="/forgot-password" className="text-sm text-fanvault-pink hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  className={`h-12 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                  {...register("password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" {...register("remember")} />
              <Label htmlFor="remember" className="text-sm">Keep me signed in</Label>
            </div>

            <Button 
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full h-12 bg-fanvault-gradient text-lg"
            >
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
            </form>

            <div className="text-center">
              <span className="text-muted-foreground">Don't have an account yet? </span>
              <Link to="/signup" className="text-fanvault-pink hover:underline">
                Sign up
              </Link>
            </div>

            <div className="text-center pt-4 border-t">
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="mr-2">🔒</span>
                <span>Secure login</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Your information is encrypted and never stored on our servers
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;