import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required")
});

type AddressFormData = z.infer<typeof addressSchema>;

const CreatorPayout = () => {
  const [stripeConnected, setStripeConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    mode: "onChange"
  });

  const handleStripeConnect = async () => {
    setIsConnecting(true);
    // Simulate Stripe Connect flow
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStripeConnected(true);
    setIsConnecting(false);
  };

  const onSubmit = (data: AddressFormData) => {
    if (!stripeConnected) {
      alert("Please connect your Stripe account first");
      return;
    }
    // Save address and complete onboarding
    navigate("/dashboard");
  };

  const handleBack = () => {
    navigate("/onboarding/creator/social");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/a4c880dd-a727-40e6-b3eb-1fa7df905859.png" 
                alt="FanVault Logo" 
                className="h-8"
              />
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
              <span className="text-sm text-muted-foreground">Step 3 of 3</span>
              <span className="text-sm text-muted-foreground">Payouts</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-fanvault-gradient h-2 rounded-full w-full transition-all duration-300" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Set Up Payouts</h1>
            <p className="text-muted-foreground">
              Connect your bank account and set your shipping address to start earning
            </p>
          </div>

          <div className="space-y-6">
            {/* Stripe Connect Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>💳</span>
                  <span>Connect Stripe Account</span>
                </CardTitle>
                <CardDescription>
                  We use Stripe for secure payouts. Connect your bank account to receive payments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {stripeConnected ? (
                  <div className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-800 font-medium">Stripe account connected successfully!</span>
                  </div>
                ) : (
                  <Button
                    onClick={handleStripeConnect}
                    disabled={isConnecting}
                    className="w-full bg-[#635BFF] hover:bg-[#5A54E5] text-white"
                  >
                    {isConnecting ? "Connecting..." : "Connect with Stripe"}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Shipping Address Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>📦</span>
                    <span>Shipping Address</span>
                  </CardTitle>
                  <CardDescription>
                    Where should we ship or return items? This will be your default address.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        {...register("firstName")}
                        className={`h-10 ${errors.firstName ? 'border-destructive' : ''}`}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        {...register("lastName")}
                        className={`h-10 ${errors.lastName ? 'border-destructive' : ''}`}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      placeholder="Street address"
                      {...register("address")}
                      className={`h-10 ${errors.address ? 'border-destructive' : ''}`}
                    />
                    {errors.address && (
                      <p className="text-sm text-destructive">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        {...register("city")}
                        className={`h-10 ${errors.city ? 'border-destructive' : ''}`}
                      />
                      {errors.city && (
                        <p className="text-sm text-destructive">{errors.city.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        {...register("state")}
                        className={`h-10 ${errors.state ? 'border-destructive' : ''}`}
                      />
                      {errors.state && (
                        <p className="text-sm text-destructive">{errors.state.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        {...register("zipCode")}
                        className={`h-10 ${errors.zipCode ? 'border-destructive' : ''}`}
                      />
                      {errors.zipCode && (
                        <p className="text-sm text-destructive">{errors.zipCode.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      placeholder="United States"
                      {...register("country")}
                      className={`h-10 ${errors.country ? 'border-destructive' : ''}`}
                    />
                    {errors.country && (
                      <p className="text-sm text-destructive">{errors.country.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Success Message */}
              {stripeConnected && (
                <div className="text-center p-6 bg-gradient-to-r from-fanvault-pink/10 to-fanvault-purple/10 rounded-lg border border-fanvault-pink/20">
                  <h3 className="text-lg font-semibold mb-2">🎉 You're almost ready!</h3>
                  <p className="text-muted-foreground">
                    Complete your shipping address to finish setting up your creator account.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={!isValid || !stripeConnected}
                  className="flex-1 bg-fanvault-gradient hover:opacity-90"
                >
                  Complete Setup
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatorPayout;