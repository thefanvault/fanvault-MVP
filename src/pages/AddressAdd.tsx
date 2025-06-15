import { useNavigate } from "react-router-dom";
import { ShippingAddressForm } from "@/components/forms/ShippingAddressForm";

export default function AddressAdd() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Add Shipping Address</h1>
          <p className="text-muted-foreground mt-2">
            Add your shipping address to complete purchases
          </p>
        </div>
        
        <ShippingAddressForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}