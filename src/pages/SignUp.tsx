import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Zap } from "lucide-react";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-fanvault-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">★</span>
          </div>
          <h1 className="text-2xl font-bold">FANVAULT</h1>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Join FanVault</h2>
          <p className="text-muted-foreground">Choose your experience</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Fan Signup */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-fanvault-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-fanvault-pink" />
              </div>
              <CardTitle className="text-2xl">Sign Up as a Fan</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Buy items from your favorite creators and build your collection. 
                Fans can only buy. To sell, switch to a Creator account.
              </p>
              <Button className="w-full bg-fanvault-gradient" size="lg">
                Sign Up as Fan
              </Button>
            </CardContent>
          </Card>

          {/* Creator Signup */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-fanvault-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-fanvault-red" />
              </div>
              <CardTitle className="text-2xl">Sign Up as a Creator</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Sell your collectibles and merch to your fans. 
                Creators can both buy and sell on FanVault.
              </p>
              <Button className="w-full bg-fanvault-gradient" size="lg">
                Sign Up as Creator
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <span className="text-muted-foreground">Already have an account? </span>
          <a href="/login" className="text-fanvault-pink hover:underline">
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;