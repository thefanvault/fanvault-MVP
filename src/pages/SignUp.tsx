
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, ArrowLeft, CheckCircle, Mail, Clock } from "lucide-react";
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
  const [emailSent, setEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userMetadata, setUserMetadata] = useState<any>({});
  const [resendCooldown, setResendCooldown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, user, loading } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  // Countdown timer for resend functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (emailSent && resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [emailSent, resendCooldown]);

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

  const performSignUp = async (email: string, password: string, metadata: any) => {
    console.log('Signing up with data:', {
      email: email,
      isCreator: metadata.isCreator,
      name: metadata.display_name
    });

    const { error } = await signUp(email, password, metadata);
    
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
      return false;
    } else {
      console.log('Sign up successful - email verification required');
      toast({
        title: "Account Created!",
        description: "Please check your email to verify your account before signing in.",
      });
      return true;
    }
  };

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    
    try {
      const metadata = {
        display_name: data.name || data.email.split('@')[0],
        isCreator: data.isCreator
      };

      const success = await performSignUp(data.email, data.password, metadata);
      
      if (success) {
        setUserEmail(data.email);
        setUserPassword(data.password);
        setUserMetadata(metadata);
        setEmailSent(true);
        setResendCooldown(60);
        setCanResend(false);
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

  const handleResendVerification = async () => {
    if (!canResend || isResending) return;
    
    setIsResending(true);
    
    try {
      const success = await performSignUp(userEmail, userPassword, userMetadata);
      
      if (success) {
        setResendCooldown(60);
        setCanResend(false);
        toast({
          title: "Email Resent!",
          description: "We've sent another verification email to your inbox.",
        });
      }
    } catch (error) {
      console.error('Resend error:', error);
      toast({
        title: "Resend Failed",
        description: "Failed to resend verification email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  // Show email verification screen after successful signup
  if (emailSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/a4c880dd-a727-40e6-b3eb-1fa7df905859.png" 
              alt="FanVault Logo" 
              className="h-12 mx-auto mb-4"
            />
          </div>

          {/* Success Icon */}
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
            <p className="text-muted-foreground">
              We've sent a verification link to <strong>{userEmail}</strong>
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-muted/50 border rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-fanvault-pink mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-medium mb-1">Next Steps:</h3>
                <ol className="text-sm text-muted-foreground space-y-1">
                  <li>1. Check your email inbox (and spam folder)</li>
                  <li>2. Click the verification link in the email</li>
                  <li>3. Return here and sign in to your account</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Resend Verification */}
          <div className="mb-6">
            {!canResend ? (
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Resend available in {resendCooldown}s</span>
              </div>
            ) : (
              <Button
                onClick={handleResendVerification}
                disabled={isResending}
                variant="outline"
                className="w-full"
              >
                {isResending ? "Resending..." : "Resend Verification Email"}
              </Button>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-fanvault-gradient" 
              asChild
            >
              <Link to="/login">
                Go to Sign In
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={() => {
                setEmailSent(false);
                setUserEmail("");
                setUserPassword("");
                setUserMetadata({});
                setResendCooldown(60);
                setCanResend(false);
              }}
              className="w-full"
            >
              Back to Sign Up
            </Button>
          </div>

          {/* Help Text */}
          <p className="text-xs text-muted-foreground mt-6">
            Didn't receive the email? Check your spam folder or use the resend option above.
          </p>
        </div>
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
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
            <div className="space-y-1">
              <Label htmlFor="creator-toggle" className="text-sm font-medium">
                {isCreator ? "🎨 Creator Account" : "👤 Fan Account"}
              </Label>
              <p className="text-xs text-muted-foreground">
                {isCreator 
                  ? "You can sell items and manage auctions" 
                  : "You can bid on items and follow creators"}
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
            {isLoading ? "Creating Account..." : `Create ${isCreator ? "Creator" : "Fan"} Account`}
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
