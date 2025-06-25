
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const signUpSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Must be at least 8 characters"),
  isCreator: z.boolean().default(false)
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, user, loading } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange"
  });

  const isCreator = watch("isCreator");

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    
    try {
      const { error } = await signUp(data.email, data.password, {
        display_name: data.name || data.email.split('@')[0],
        is_creator: data.isCreator
      });
      
      if (error) {
        console.error('Sign up error:', error);
        
        // Handle specific error messages
        if (error.message?.includes('already registered')) {
          toast({
            title: "Account Exists",
            description: "An account with this email already exists. Please sign in instead.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Sign Up Failed",
            description: error.message || "Failed to create account",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account.",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Sign Up Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
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
            src="/lovable-uploads/a4c880dd-a727-40e6-b3eb-1fa7df905859.png" 
            alt="FanVault Logo" 
            className="h-12 mx-auto mb-4"
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
          <p className="text-muted-foreground">Unlock a new revenue stream – join FanVault!</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Name (optional)</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              {...register("name")}
              className="rounded-lg"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className={`rounded-lg ${errors.email ? 'border-destructive' : ''}`}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className={`rounded-lg pr-10 ${errors.password ? 'border-destructive' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
            <p className="text-sm text-muted-foreground">Must be at least 8 characters</p>
          </div>

          {/* Creator Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label htmlFor="creator-toggle" className="text-sm font-medium">
                Are you a creator?
              </Label>
              <p className="text-xs text-muted-foreground">
                Creators can both buy and sell on FanVault
              </p>
            </div>
            <Switch
              id="creator-toggle"
              checked={isCreator}
              onCheckedChange={(checked) => setValue("isCreator", checked)}
            />
          </div>

          {/* Terms */}
          <div className="text-center text-sm text-muted-foreground">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-fanvault-pink hover:underline">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-fanvault-pink hover:underline">Privacy Policy</a>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full bg-fanvault-gradient hover:opacity-90 rounded-lg h-12 text-base font-semibold"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="text-fanvault-pink hover:underline font-medium">
              Log in
            </Link>
          </div>

          {/* Privacy Note */}
          <p className="text-xs text-muted-foreground text-center">
            We'll never share your info. Your privacy is our priority.
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
