import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Shield, CheckCircle, Upload, Camera, FileText, AlertCircle } from "lucide-react";

interface VerificationStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  icon: React.ReactNode;
}

const CreatorVerification = () => {
  const [currentStep, setCurrentStep] = useState<string>('document');
  const [verificationSteps, setVerificationSteps] = useState<VerificationStep[]>([
    {
      id: 'document',
      title: 'Government ID',
      description: 'Upload a clear photo of your government-issued ID',
      status: 'pending',
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: 'selfie',
      title: 'Identity Verification',
      description: 'Take a selfie to verify your identity',
      status: 'pending',
      icon: <Camera className="h-5 w-5" />
    }
  ]);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleStartVerification = () => {
    setIsVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      setVerificationSteps(prev => 
        prev.map(step => ({
          ...step,
          status: step.id === currentStep ? 'in-progress' : step.status
        }))
      );
    }, 500);

    // Simulate completion after 3 seconds
    setTimeout(() => {
      setVerificationSteps(prev => 
        prev.map(step => ({
          ...step,
          status: 'completed'
        }))
      );
      setIsVerifying(false);
    }, 3000);
  };

  const handleNext = () => {
    navigate("/onboarding/application-confirmation");
  };

  const handleBack = () => {
    const fromSettings = new URLSearchParams(window.location.search).get('from') === 'settings';
    navigate(fromSettings ? "/onboarding/creator/social?from=settings" : "/onboarding/creator/social");
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const allStepsCompleted = verificationSteps.every(step => step.status === 'completed');

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
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Step 3 of 3</span>
              <span className="text-sm text-muted-foreground">Identity Verification</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-fanvault-gradient h-2 rounded-full w-full transition-all duration-300" />
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-fanvault-gradient rounded-full">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Verify your identity</h1>
            <p className="text-muted-foreground">
              We need to verify your identity to comply with regulations and keep our platform secure
            </p>
          </div>

          <div className="space-y-6">
            {/* Verification Status */}
            {allStepsCompleted && (
              <Card className="border-green-200 bg-green-50 animate-fade-in">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-800">Verification Complete!</h3>
                      <p className="text-sm text-green-700">Your identity has been successfully verified.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Verification Steps */}
            <div className="space-y-4">
              {verificationSteps.map((step, index) => (
                <Card key={step.id} className="transition-all duration-300 hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-muted rounded-full">
                          {getStepIcon(step.status) || step.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                          <CardDescription>{step.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className={getStepStatusColor(step.status)}>
                        {step.status === 'in-progress' ? 'Processing...' : 
                         step.status === 'completed' ? 'Completed' :
                         step.status === 'failed' ? 'Failed' : 'Pending'}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  {step.status === 'pending' && (
                    <CardContent>
                      <div className="bg-muted/50 rounded-lg p-4 mb-4">
                        <h4 className="font-medium mb-2">What you'll need:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {step.id === 'document' ? (
                            <>
                              <li>• Government-issued photo ID (driver's license, passport, etc.)</li>
                              <li>• Clear, well-lit photo of the document</li>
                              <li>• All text should be clearly readable</li>
                            </>
                          ) : (
                            <>
                              <li>• Well-lit environment</li>
                              <li>• Look directly at the camera</li>
                              <li>• Remove any sunglasses or hats</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {/* Start Verification Button */}
            {!allStepsCompleted && !isVerifying && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <h3 className="font-semibold">Ready to start?</h3>
                    <p className="text-sm text-muted-foreground">
                      The verification process typically takes 1-2 minutes to complete.
                    </p>
                    <Button 
                      onClick={handleStartVerification}
                      className="w-full bg-fanvault-gradient hover:opacity-90"
                      size="lg"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Start Verification
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Processing State */}
            {isVerifying && !allStepsCompleted && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <h3 className="font-semibold">Verifying your identity...</h3>
                    <p className="text-sm text-muted-foreground">
                      Please wait while we process your documents. This may take a few moments.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-medium text-blue-800 mb-1">Your data is secure</h4>
                  <p className="text-blue-700">
                    We use bank-level encryption to protect your personal information. 
                    Your documents are processed securely and deleted after verification.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={handleBack}
                disabled={isVerifying}
              >
                Back
              </Button>
              <Button
                type="button"
                disabled={!allStepsCompleted}
                className="flex-1 bg-fanvault-gradient hover:opacity-90"
                onClick={handleNext}
              >
                {allStepsCompleted ? 'Complete Application' : 'Complete Verification First'}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatorVerification;