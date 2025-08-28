import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Instagram, Youtube } from "lucide-react";

const ApplicationConfirmation = () => {
  const navigate = useNavigate();

  const handleConnectInstagram = () => {
    // Handle Instagram connection via Facebook
    console.log("Connecting Instagram via Facebook...");
  };

  const handleConnectYoutube = () => {
    // Handle YouTube connection
    console.log("Connecting YouTube...");
  };

  const handleConnectTikTok = () => {
    // Handle TikTok connection
    console.log("Connecting TikTok...");
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/cedf3fed-66b4-4eeb-b6ed-d39036f2d2d8.png" 
                alt="FanVault Logo" 
                className="h-8"
              />
            </div>
            <Button variant="outline">Sign Out</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto text-center">
          {/* Success Icons */}
          <div className="flex items-center justify-center mb-8">
            <div className="p-2 bg-green-100 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-4xl font-bold text-foreground mb-6">
            Thank you for your application.
          </h1>

          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            We will review it and get back to you within a week. Until then, 
            increase your chances of being accepted by connecting one social account.
          </p>

          {/* Social Connection Buttons */}
          <div className="space-y-4">
            {/* Instagram Connect */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Connect your Instagram via Facebook</p>
              <Button
                onClick={handleConnectInstagram}
                variant="premium"
                size="lg"
                className="w-full h-12 text-base font-medium"
              >
                <Instagram className="h-5 w-5 mr-2" />
                CONNECT
              </Button>
            </div>


            {/* Skip Option */}
            <button
              onClick={handleSkip}
              className="text-muted-foreground hover:text-foreground underline mt-8 text-sm"
            >
              I'll do this later
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationConfirmation;