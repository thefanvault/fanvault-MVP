import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { CreditCard, Lock, Trash2, Plus } from "lucide-react";
import { CardForm } from "@/components/forms/CardForm";

const PaymentAdd = () => {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Mock saved payment methods - in a real app, this would come from your database
  const [savedPaymentMethods, setSavedPaymentMethods] = useState([
    {
      id: "pm_1",
      last_four: "4242",
      brand: "visa",
      exp_month: 12,
      exp_year: 2025,
      cardholder_name: "John Doe",
      is_default: true
    },
    {
      id: "pm_2", 
      last_four: "0005",
      brand: "mastercard",
      exp_month: 8,
      exp_year: 2026,
      cardholder_name: "John Doe",
      is_default: false
    }
  ]);

  const handleDeletePaymentMethod = (paymentMethodId: string) => {
    setSavedPaymentMethods(prev => 
      prev.filter(pm => pm.id !== paymentMethodId)
    );
    toast({
      title: "Payment method removed",
      description: "Your payment method has been successfully removed.",
    });
  };

  const handleToggleDefault = (paymentMethodId: string) => {
    setSavedPaymentMethods(prev => 
      prev.map(pm => ({
        ...pm,
        is_default: pm.id === paymentMethodId
      }))
    );
    
    const selectedMethod = savedPaymentMethods.find(pm => pm.id === paymentMethodId);
    toast({
      title: "Default payment method updated",
      description: `${selectedMethod?.brand} •••• ${selectedMethod?.last_four} is now your default payment method.`,
    });
  };

  const handleAddPaymentSuccess = () => {
    // Mock adding a new payment method
    const newPaymentMethod = {
      id: `pm_${Date.now()}`,
      last_four: "1234",
      brand: "visa",
      exp_month: 10,
      exp_year: 2027,
      cardholder_name: "John Doe",
      is_default: false
    };
    
    setSavedPaymentMethods(prev => [...prev, newPaymentMethod]);
    setShowAddForm(false);
    toast({
      title: "Payment method added",
      description: "Your payment method has been successfully saved.",
    });
  };

  const getBrandColor = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return 'text-blue-600';
      case 'mastercard':
        return 'text-red-600';
      case 'amex':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <SidebarProvider>
        <div className="flex w-full pt-16">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col">
            <header className="h-12 border-b flex items-center px-4">
              <SidebarTrigger />
              <div className="ml-4">
                <h1 className="text-lg font-semibold">Payment Methods</h1>
              </div>
            </header>
            
            <main className="flex-1 flex justify-center">
              <div className="w-full max-w-4xl px-4 pt-4 pb-20 md:pb-6 space-y-6">
                
                {/* Saved Payment Methods Section */}
                {savedPaymentMethods.length > 0 && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-5 w-5" />
                        <CardTitle>Saved Payment Methods</CardTitle>
                      </div>
                      <CardDescription>
                        Manage your saved payment methods
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {savedPaymentMethods.map((paymentMethod) => (
                        <div
                          key={paymentMethod.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <CreditCard className={`h-6 w-6 ${getBrandColor(paymentMethod.brand)}`} />
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium capitalize">
                                  {paymentMethod.brand}
                                </span>
                                <span className="text-muted-foreground">
                                  •••• {paymentMethod.last_four}
                                </span>
                                {paymentMethod.is_default && (
                                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Expires {paymentMethod.exp_month}/{paymentMethod.exp_year}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {paymentMethod.cardholder_name}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Label htmlFor={`default-${paymentMethod.id}`} className="text-sm">
                                Default
                              </Label>
                              <Switch
                                id={`default-${paymentMethod.id}`}
                                checked={paymentMethod.is_default}
                                onCheckedChange={() => handleToggleDefault(paymentMethod.id)}
                              />
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeletePaymentMethod(paymentMethod.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Add Payment Method Section */}
                {!showAddForm ? (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Plus className="h-5 w-5" />
                        <CardTitle>Add New Payment Method</CardTitle>
                      </div>
                      <CardDescription>
                        Add a secure payment method for your purchases
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        onClick={() => setShowAddForm(true)}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Payment Method
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-5 w-5" />
                            <CardTitle>Add Payment Method</CardTitle>
                          </div>
                          <CardDescription>
                            Add a secure payment method for your purchases
                          </CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setShowAddForm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Lock className="h-4 w-4" />
                        <span>Your payment information is encrypted and secure</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardForm 
                        onSuccess={handleAddPaymentSuccess}
                        showTitle={false}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
            </main>

            <MobileNav currentPath="/payment/add" />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default PaymentAdd;
