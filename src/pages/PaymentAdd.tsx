
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { CreditCard, Lock } from "lucide-react";

const PaymentAdd = () => {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
    billingAddress: {
      addressLine1: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Payment method added",
      description: "Your payment method has been securely saved.",
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear + i);
  const months = [
    { value: "01", label: "01 - January" },
    { value: "02", label: "02 - February" },
    { value: "03", label: "03 - March" },
    { value: "04", label: "04 - April" },
    { value: "05", label: "05 - May" },
    { value: "06", label: "06 - June" },
    { value: "07", label: "07 - July" },
    { value: "08", label: "08 - August" },
    { value: "09", label: "09 - September" },
    { value: "10", label: "10 - October" },
    { value: "11", label: "11 - November" },
    { value: "12", label: "12 - December" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b flex items-center px-4">
            <SidebarTrigger />
            <div className="ml-4">
              <h1 className="text-lg font-semibold">Payment Method</h1>
            </div>
          </header>
          
          <main className="flex-1 flex justify-center">
            <div className="w-full max-w-4xl px-4 pt-6 pb-20 md:pb-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <CardTitle>Add Payment Method</CardTitle>
                  </div>
                  <CardDescription>
                    Add a secure payment method for your purchases
                  </CardDescription>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>Your payment information is encrypted and secure</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Card Information</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentMethod.cardNumber}
                          onChange={(e) => setPaymentMethod({ ...paymentMethod, cardNumber: e.target.value })}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryMonth">Expiry Month</Label>
                          <Select value={paymentMethod.expiryMonth} onValueChange={(value) => setPaymentMethod({ ...paymentMethod, expiryMonth: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                              {months.map((month) => (
                                <SelectItem key={month.value} value={month.value}>
                                  {month.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="expiryYear">Expiry Year</Label>
                          <Select value={paymentMethod.expiryYear} onValueChange={(value) => setPaymentMethod({ ...paymentMethod, expiryYear: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                              {years.map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            maxLength={4}
                            value={paymentMethod.cvv}
                            onChange={(e) => setPaymentMethod({ ...paymentMethod, cvv: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardholderName">Cardholder Name</Label>
                        <Input
                          id="cardholderName"
                          placeholder="John Doe"
                          value={paymentMethod.cardholderName}
                          onChange={(e) => setPaymentMethod({ ...paymentMethod, cardholderName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Billing Address</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="billingAddress">Address Line 1</Label>
                        <Input
                          id="billingAddress"
                          value={paymentMethod.billingAddress.addressLine1}
                          onChange={(e) => setPaymentMethod({ 
                            ...paymentMethod, 
                            billingAddress: { ...paymentMethod.billingAddress, addressLine1: e.target.value }
                          })}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="billingCity">City</Label>
                          <Input
                            id="billingCity"
                            value={paymentMethod.billingAddress.city}
                            onChange={(e) => setPaymentMethod({ 
                              ...paymentMethod, 
                              billingAddress: { ...paymentMethod.billingAddress, city: e.target.value }
                            })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billingState">State</Label>
                          <Input
                            id="billingState"
                            value={paymentMethod.billingAddress.state}
                            onChange={(e) => setPaymentMethod({ 
                              ...paymentMethod, 
                              billingAddress: { ...paymentMethod.billingAddress, state: e.target.value }
                            })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="billingZip">ZIP Code</Label>
                        <Input
                          id="billingZip"
                          value={paymentMethod.billingAddress.zipCode}
                          onChange={(e) => setPaymentMethod({ 
                            ...paymentMethod, 
                            billingAddress: { ...paymentMethod.billingAddress, zipCode: e.target.value }
                          })}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                      <Button type="submit">
                        Save Payment Method
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </main>

          <MobileNav currentPath="/payment/add" />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PaymentAdd;
