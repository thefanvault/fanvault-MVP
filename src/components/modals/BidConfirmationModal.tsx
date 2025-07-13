
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Loader2, CreditCard, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface PaymentMethod {
  id: string;
  last_four: string;
  brand: string;
  is_default: boolean;
}

interface BidConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentHighestBid: number;
  minimumIncrement: number;
  itemTitle: string;
  paymentMethods?: PaymentMethod[];
  onConfirmBid: (bidAmount: number, paymentMethodId: string) => Promise<boolean>;
}

export function BidConfirmationModal({
  isOpen,
  onClose,
  currentHighestBid,
  minimumIncrement,
  itemTitle,
  paymentMethods = [],
  onConfirmBid
}: BidConfirmationModalProps) {
  const { toast } = useToast();
  const minimumBid = currentHighestBid + minimumIncrement;
  
  // Mock payment methods if none provided
  const mockPaymentMethods = paymentMethods.length > 0 ? paymentMethods : [
    { id: "1", last_four: "4242", brand: "visa", is_default: true },
    { id: "2", last_four: "1234", brand: "mastercard", is_default: false }
  ];
  
  const [bidAmount, setBidAmount] = useState(minimumBid);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    mockPaymentMethods.find(pm => pm.is_default)?.id || mockPaymentMethods[0]?.id || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setBidAmount(minimumBid);
      setValidationError("");
      setSelectedPaymentMethod(
        mockPaymentMethods.find(pm => pm.is_default)?.id || mockPaymentMethods[0]?.id || ""
      );
    }
  }, [isOpen, minimumBid]);

  const validateBid = (amount: number) => {
    if (amount < minimumBid) {
      setValidationError(`Minimum bid is $${minimumBid.toFixed(2)}`);
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleBidChange = (value: string) => {
    const amount = parseFloat(value) || 0;
    setBidAmount(amount);
    if (value) {
      validateBid(amount);
    }
  };

  const handleConfirmBid = async () => {
    if (!validateBid(bidAmount)) {
      return;
    }

    if (!selectedPaymentMethod && mockPaymentMethods.length > 0) {
      setValidationError("Please select a payment method");
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await onConfirmBid(bidAmount, selectedPaymentMethod);
      if (success) {
        toast({
          title: "Bid placed successfully!",
          description: `Your bid of $${bidAmount.toFixed(2)} has been placed.`,
        });
        onClose();
      }
    } catch (error) {
      setValidationError(error instanceof Error ? error.message : "Failed to place bid");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  const getBrandIcon = (brand: string) => {
    return <CreditCard className="h-4 w-4" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Place Your Bid</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Bidding on</p>
            <p className="font-semibold">{itemTitle}</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current Highest Bid:</span>
              <span className="font-semibold">${currentHighestBid.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Minimum Bid:</span>
              <span className="font-semibold text-primary">${minimumBid.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="bid-amount">Your Bid ($)</Label>
            <Input
              id="bid-amount"
              type="number"
              step="0.01"
              min={minimumBid}
              value={bidAmount}
              onChange={(e) => handleBidChange(e.target.value)}
              disabled={isSubmitting}
              className={validationError ? "border-destructive" : ""}
            />
            
            {/* Recommended Bids */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Recommended Bids</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBidChange(minimumBid.toString())}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  ${minimumBid.toFixed(0)}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBidChange((minimumBid + 100).toString())}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  ${(minimumBid + 100).toFixed(0)}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBidChange((minimumBid + 200).toString())}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  ${(minimumBid + 200).toFixed(0)}
                </Button>
              </div>
            </div>
            
            {validationError && (
              <p className="text-sm text-destructive">{validationError}</p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Payment Method</Label>
              <Button variant="outline" size="sm" asChild>
                <Link to="/payment/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Link>
              </Button>
            </div>
            {mockPaymentMethods.length > 0 ? (
              <RadioGroup
                value={selectedPaymentMethod}
                onValueChange={setSelectedPaymentMethod}
                disabled={isSubmitting}
              >
                {mockPaymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label 
                      htmlFor={method.id}
                      className="flex items-center space-x-2 cursor-pointer flex-1"
                    >
                      {getBrandIcon(method.brand)}
                      <span className="capitalize">{method.brand}</span>
                      <span>•••• {method.last_four}</span>
                      {method.is_default && (
                        <span className="text-xs bg-muted px-2 py-1 rounded">Default</span>
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-3">No payment methods found</p>
                <Button variant="outline" asChild>
                  <Link to="/payment/add">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Link>
                </Button>
              </div>
            )}
          </div>

          <div className="flex space-x-3 pt-2">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmBid}
              disabled={isSubmitting || !!validationError}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Placing Bid...
                </>
              ) : (
                "Place Bid"
              )}
            </Button>
          </div>
          
          <div className="text-center pt-2">
            <Button variant="link" size="sm" asChild>
              <Link to="/faq/bidding" className="text-sm underline">
                HOW BIDDING WORKS
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
