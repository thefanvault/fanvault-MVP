import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "hsl(var(--foreground))",
      "::placeholder": {
        color: "hsl(var(--muted-foreground))",
      },
    },
    invalid: {
      color: "hsl(var(--destructive))",
    },
  },
  hidePostalCode: true,
};

interface CardFormProps {
  onSuccess?: () => void;
  showTitle?: boolean;
}

export function CardForm({ onSuccess, showTitle = true }: CardFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      // Create payment method
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (stripeError) {
        throw stripeError;
      }

      // Save payment method to backend
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase.functions.invoke("create-payment-method", {
        body: { payment_method_id: paymentMethod.id },
      });

      if (error) {
        throw error;
      }

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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      {showTitle && (
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 border border-input rounded-md bg-background">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
          
          <Button 
            type="submit" 
            disabled={!stripe || isLoading} 
            className="w-full"
          >
            {isLoading ? "Saving..." : "Save Payment Method"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}