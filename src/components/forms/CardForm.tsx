
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface CardFormProps {
  onSuccess?: () => void;
  showTitle?: boolean;
}

export function CardForm({ onSuccess, showTitle = true }: CardFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Mock payment method saved:', cardData);

      toast({
        title: "Card saved successfully",
        description: "Your payment method has been saved securely.",
      });

      onSuccess?.();
    } catch (error) {
      console.error("Error saving payment method:", error);
      toast({
        title: "Error",
        description: "Failed to save payment method. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      {showTitle && (
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Cardholder Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={cardData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                maxLength={19}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={cardData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  maxLength={5}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  maxLength={4}
                  required
                />
              </div>
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full"
          >
            {isLoading ? "Saving..." : "Save Payment Method"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
