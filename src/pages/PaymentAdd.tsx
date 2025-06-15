import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { CardForm } from "@/components/forms/CardForm";
import stripePromise from "@/lib/stripe";

export default function PaymentAdd() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Add Payment Method</h1>
          <p className="text-muted-foreground mt-2">
            Add a secure payment method for purchases
          </p>
        </div>
        
        <Elements stripe={stripePromise}>
          <CardForm onSuccess={handleSuccess} />
        </Elements>
      </div>
    </div>
  );
}