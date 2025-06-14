import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Plus } from "lucide-react";
import { useState } from "react";

const Onboarding = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-fanvault-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">★</span>
              </div>
              <span className="font-bold text-xl">FanVault</span>
            </div>
            <Button variant="outline">Sign Out</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-fanvault-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">★</span>
            </div>
            <h1 className="text-2xl font-bold">FANVAULT</h1>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Step {step} of 3</span>
              <span className="text-sm text-muted-foreground">33% Complete</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-fanvault-gradient h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {step === 1 && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Account Basics</CardTitle>
                <CardDescription>Set up your creator profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-muted-foreground mb-6">
                    Let's start by setting up your public profile. This is what fans will see when they visit your page.
                  </p>
                  
                  {/* Profile Photo Upload */}
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-fanvault-pink flex items-center justify-center">
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button 
                      size="sm" 
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-fanvault-gradient"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">Upload a profile photo</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="displayName">Display Name *</Label>
                    <Input 
                      id="displayName" 
                      placeholder="Your name or brand name"
                      className="h-12"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="username">Username *</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                        @
                      </span>
                      <Input 
                        id="username" 
                        placeholder="username"
                        className="h-12 rounded-l-none"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      This will be your unique URL: fanvault.com/@username
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Tell fans a bit about yourself..."
                      className="resize-none"
                      rows={3}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Let your fans know what kind of content to expect</span>
                      <span>0/200</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button variant="outline" className="flex-1">
                    Skip for Now
                  </Button>
                  <Button 
                    className="flex-1 bg-fanvault-gradient"
                    onClick={() => setStep(2)}
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Social Links</CardTitle>
                <CardDescription>Connect your social accounts (optional)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-muted-foreground mb-6">
                    Link your social media accounts so fans can find and follow you everywhere.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input 
                      id="instagram" 
                      placeholder="@yourusername"
                      className="h-12"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input 
                      id="twitter" 
                      placeholder="@yourusername"
                      className="h-12"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tiktok">TikTok</Label>
                    <Input 
                      id="tiktok" 
                      placeholder="@yourusername"
                      className="h-12"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      placeholder="sarahsmith.com"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button 
                    className="flex-1 bg-fanvault-gradient"
                    onClick={() => setStep(3)}
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Payment Setup</CardTitle>
                <CardDescription>Set up payouts and shipping</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-muted-foreground mb-6">
                    Connect your Stripe account to receive payments and set your default shipping address.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Stripe Connect */}
                  <div className="border rounded-lg p-6 text-center">
                    <h3 className="font-semibold mb-2">Connect Stripe Account</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Securely connect your bank account to receive payouts
                    </p>
                    <Button className="bg-fanvault-gradient">
                      Connect with Stripe
                    </Button>
                  </div>

                  {/* Shipping Address */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Default Shipping Address</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" className="h-10" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" className="h-10" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" className="h-10" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" className="h-10" />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input id="state" className="h-10" />
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP</Label>
                        <Input id="zip" className="h-10" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <Button 
                    className="flex-1 bg-fanvault-gradient"
                    onClick={() => window.location.href = '/dashboard'}
                  >
                    Complete Setup
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Onboarding;