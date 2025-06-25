
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, ArrowLeft, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
  const [errorDialog, setErrorDialog] = useState({ open: false, title: "", message: "" });
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, user, userRole, loading } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      console.log('User logged in, redirecting. User role:', userRole);
      // Redirect creators to dashboard, fans to home
      if (userRole === 'creator') {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [user, userRole, loading, navigate]);

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
  
  const isFormValid = Boolean(email && password && email.length > 0 && password.length > 0);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      console.log('Attempting login for:', data.email);
      const { error } = await signIn(data.email, data.password);
      
      if (error) {
        console.error('Login error:', error);
        
        // Show error popup instead of toast
        let errorTitle = "Login Failed";
        let errorMessage = "Please check your credentials and try again.";
        
        if (error.message?.includes('Invalid login credentials')) {
          errorMessage = "Invalid email or password. Please check your credentials and try again.";
        } else if (error.message?.includes('Email not confirmed')) {
          errorTitle = "Email Not Verified";
          errorMessage = "Please check your email and click the verification link before signing in.";
        } else if (error.message?.includes('Too many requests')) {
          errorTitle = "Too Many Attempts";
          errorMessage = "Too many login attempts. Please wait a few minutes before trying again.";
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        setErrorDialog({
          open: true,
          title: errorTitle,
          message: errorMessage
        });
      } else {
        console.log('Login successful');
        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in.",
        });
        // Navigation will be handled by the useEffect above
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorDialog({
        open: true,
        title: "Login Failed",
        message: "An unexpected error occurred. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

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
                Your information is encrypted and secure
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Dialog */}
      <Dialog open={errorDialog.open} onOpenChange={(open) => setErrorDialog({ ...errorDialog, open })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              {errorDialog.title}
            </DialogTitle>
          </DialogHeader>
          <Alert variant="destructive">
            <AlertDescription>
              {errorDialog.message}
            </AlertDescription>
          </Alert>
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => setErrorDialog({ ...errorDialog, open: false })}
              variant="default"
            >
              Try Again
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
