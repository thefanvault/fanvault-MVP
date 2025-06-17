import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: data.name,
            is_creator: data.isCreator
          }
        }
      });

      if (error) {
        let errorMessage = "An unexpected error occurred";
        
        if (error.message.includes("already registered")) {
          errorMessage = "An account with this email already exists";
        } else if (error.message.includes("Password should be")) {
          errorMessage = "Password should be at least 6 characters";
        }
        
        toast({
          title: "Sign Up Failed",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Account Created!",
        description: "You can now start using FanVault.",
      });

      // Navigate to discover page for all users
      navigate("/discover");
    } catch (error) {
      toast({
        title: "Sign Up Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
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