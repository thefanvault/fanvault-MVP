import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/")}
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
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>This is a placeholder page</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              Login functionality has been removed. This is now a placeholder page.
            </p>
            <Button 
              onClick={() => navigate("/")}
              className="w-full h-12 bg-fanvault-gradient text-lg"
            >
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
