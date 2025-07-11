import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Camera, Plus, Check, X, ArrowLeft, Gift } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const profileSchema = z.object({
  displayName: z.string().min(1, "Display name is required"),
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  phoneNumber: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number")
});

type ProfileFormData = z.infer<typeof profileSchema>;

const CreatorProfile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [referralCode, setReferralCode] = useState<string>("");
  const [referralModalOpen, setReferralModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange"
  });

  const username = watch("username");

  // Simulate username availability check
  const checkUsernameAvailability = async (username: string) => {
    if (username.length < 3) {
      setUsernameAvailable(null);
      return;
    }
    
    setCheckingUsername(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simple check - in real app this would be an API call
    const unavailableUsernames = ['admin', 'test', 'user', 'creator'];
    setUsernameAvailable(!unavailableUsernames.includes(username.toLowerCase()));
    setCheckingUsername(false);
  };

  // Debounced username check
  useState(() => {
    const timer = setTimeout(() => {
      if (username) {
        checkUsernameAvailability(username);
      }
    }, 300);
    return () => clearTimeout(timer);
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ProfileFormData) => {
    navigate("/onboarding/creator/social");
  };

  const handleReferralSubmit = () => {
    // Handle referral code submission here
    console.log("Referral code submitted:", referralCode);
    setReferralModalOpen(false);
    // You can add toast notification here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Back Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/signup")}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              <Link to="/">
                <img 
                  src="/lovable-uploads/a4c880dd-a727-40e6-b3eb-1fa7df905859.png" 
                  alt="FanVault Logo" 
                  className="h-8 cursor-pointer"
                />
              </Link>
            </div>
            <Button variant="outline">Sign Out</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Step 1 of 3</span>
              <span className="text-sm text-muted-foreground">Profile</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-fanvault-gradient h-2 rounded-full w-1/3 transition-all duration-300" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Let's set up your Vault!</h1>
            <p className="text-muted-foreground">Create your creator profile so fans can find and connect with you</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Photo Upload */}
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-2 border-fanvault-pink"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-fanvault-pink flex items-center justify-center bg-muted">
                    <Camera className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <label htmlFor="profile-image" className="absolute -bottom-2 -right-2 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-fanvault-gradient flex items-center justify-center">
                    <Plus className="h-4 w-4 text-white" />
                  </div>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-muted-foreground">Upload a profile photo (optional)</p>
            </div>

            {/* Display Name */}
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name *</Label>
              <Input
                id="displayName"
                placeholder="Your name or brand name"
                {...register("displayName")}
                className={`h-12 rounded-lg ${errors.displayName ? 'border-destructive' : ''}`}
              />
              {errors.displayName && (
                <p className="text-sm text-destructive">{errors.displayName.message}</p>
              )}
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <div className="relative">
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-input bg-muted text-muted-foreground">
                    @
                  </span>
                  <Input
                    id="username"
                    placeholder="username"
                    {...register("username")}
                    className={`h-12 rounded-l-none ${errors.username ? 'border-destructive' : ''}`}
                  />
                </div>
                {username && username.length >= 3 && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {checkingUsername ? (
                      <div className="animate-spin h-4 w-4 border-2 border-fanvault-pink border-t-transparent rounded-full" />
                    ) : usernameAvailable === true ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : usernameAvailable === false ? (
                      <X className="h-4 w-4 text-destructive" />
                    ) : null}
                  </div>
                )}
              </div>
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username.message}</p>
              )}
              {usernameAvailable === false && (
                <p className="text-sm text-destructive">Username is already taken</p>
              )}
              {usernameAvailable === true && (
                <p className="text-sm text-green-600">Username is available</p>
              )}
              <p className="text-xs text-muted-foreground">
                This will be your unique URL: fanvaultshop.com/@{username || 'username'}
              </p>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register("phoneNumber")}
                className={`h-12 rounded-lg ${errors.phoneNumber ? 'border-destructive' : ''}`}
              />
              {errors.phoneNumber && (
                <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                We'll use this to contact you about important account updates
              </p>
            </div>

            {/* Referral Code */}
            <div className="text-center py-4">
              <Dialog open={referralModalOpen} onOpenChange={setReferralModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/5"
                  >
                    <Gift className="h-4 w-4 mr-2" />
                    Have a referral code?
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader className="text-center">
                    <div className="mx-auto mb-4">
                      <div className="w-16 h-16 rounded-xl bg-fanvault-gradient flex items-center justify-center">
                        <span className="text-white text-xl font-bold">VIP</span>
                      </div>
                    </div>
                    <DialogTitle className="text-xl font-semibold">
                      Referral Code (optional)
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    <p className="text-center text-muted-foreground">
                      Got a referral code from another creator? Enter your code below.
                    </p>
                    
                    <div className="space-y-2">
                      <Label htmlFor="referralCode" className="text-foreground">
                        Referral Code <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="referralCode"
                        placeholder="Enter a referral code"
                        value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value)}
                        className="h-12 rounded-lg border-primary/20 focus:border-primary"
                      />
                    </div>
                    
                    <Button
                      onClick={handleReferralSubmit}
                      disabled={!referralCode.trim()}
                      className="w-full h-12 bg-fanvault-gradient hover:opacity-90 text-white font-medium"
                    >
                      Submit
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate("/discover")}
              >
                Skip for Now
              </Button>
              <Button
                type="submit"
                disabled={!isValid || (username && username.length >= 3 && usernameAvailable === false)}
                className="flex-1 bg-fanvault-gradient hover:opacity-90"
              >
                Next
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreatorProfile;
