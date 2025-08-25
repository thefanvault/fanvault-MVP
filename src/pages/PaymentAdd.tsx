import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Layout } from "@/components/layout/Layout";
import { CreditCard, Lock, Trash2, Plus, Building2, DollarSign } from "lucide-react";
import { CardForm } from "@/components/forms/CardForm";
import { useAuth } from "@/contexts/AuthContext";

const PaymentAdd = () => {
  const { toast } = useToast();
  const { userRole } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddPayoutForm, setShowAddPayoutForm] = useState(false);
  
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

  // Mock saved payout methods - for creators only
  const [savedPayoutMethods, setSavedPayoutMethods] = useState([
    {
      id: "payout_1",
      bank_name: "Chase Bank",
      account_type: "checking",
      last_four: "5678",
      routing_number: "•••• 9876",
      account_holder: "John Doe",
      is_default: true
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

  const handleDeletePayoutMethod = (payoutMethodId: string) => {
    setSavedPayoutMethods(prev => 
      prev.filter(pm => pm.id !== payoutMethodId)
    );
    toast({
      title: "Payout method removed",
      description: "Your payout method has been successfully removed.",
    });
  };

  const handleToggleDefaultPayout = (payoutMethodId: string) => {
    setSavedPayoutMethods(prev => 
      prev.map(pm => ({
        ...pm,
        is_default: pm.id === payoutMethodId
      }))
    );
    
    const selectedMethod = savedPayoutMethods.find(pm => pm.id === payoutMethodId);
    toast({
      title: "Default payout method updated",
      description: `${selectedMethod?.bank_name} •••• ${selectedMethod?.last_four} is now your default payout method.`,
    });
  };

  const handleAddPayoutSuccess = () => {
    // Mock adding a new payout method
    const newPayoutMethod = {
      id: `payout_${Date.now()}`,
      bank_name: "Bank of America",
      account_type: "savings",
      last_four: "9999",
      routing_number: "•••• 1234",
      account_holder: "John Doe",
      is_default: false
    };
    
    setSavedPayoutMethods(prev => [...prev, newPayoutMethod]);
    setShowAddPayoutForm(false);
    toast({
      title: "Payout method added",
      description: "Your payout method has been successfully saved.",
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
    <Layout>
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <div className="hidden md:block">
            <AppSidebar />
          </div>
          
          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-16 border-b flex items-center px-4 bg-background sticky top-0 z-10">
              <div>
                <h1 className="text-lg font-semibold">Payment & Payout</h1>
              </div>
            </header>
            
            <div className="flex-1 overflow-auto p-4 md:p-6">
              <div className="w-full max-w-4xl mx-auto px-4 pt-6 pb-20 md:pb-6 space-y-6">
                
                {/* Creator-only Payout Methods Section - Top Priority */}
                {userRole === 'creator' && (
                  <>
                    {/* Saved Payout Methods Section */}
                    {savedPayoutMethods.length > 0 && (
                      <Card>
                        <CardHeader>
                          <div className="flex items-center space-x-2">
                            <Building2 className="h-5 w-5" />
                            <CardTitle>Payout Methods</CardTitle>
                          </div>
                          <CardDescription>
                            Manage your bank accounts for receiving payments from sales
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {savedPayoutMethods.map((payoutMethod) => (
                            <div
                              key={payoutMethod.id}
                              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-4"
                            >
                              <div className="flex items-center space-x-4 min-w-0">
                                <Building2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                                <div className="min-w-0">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="font-medium">
                                      {payoutMethod.bank_name}
                                    </span>
                                    <span className="text-muted-foreground">
                                      •••• {payoutMethod.last_four}
                                    </span>
                                    {payoutMethod.is_default && (
                                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                        Default
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground capitalize">
                                    {payoutMethod.account_type} • {payoutMethod.routing_number}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {payoutMethod.account_holder}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                                <div className="flex items-center space-x-2">
                                  <Label htmlFor={`default-payout-${payoutMethod.id}`} className="text-sm">
                                    Default
                                  </Label>
                                  <Switch
                                    id={`default-payout-${payoutMethod.id}`}
                                    checked={payoutMethod.is_default}
                                    onCheckedChange={() => handleToggleDefaultPayout(payoutMethod.id)}
                                  />
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeletePayoutMethod(payoutMethod.id)}
                                  className="text-red-600 hover:text-red-700 w-full sm:w-auto"
                                >
                                  <Trash2 className="h-4 w-4 mr-2 sm:mr-0" />
                                  <span className="sm:hidden">Remove</span>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}

                    {/* Add Payout Method Section */}
                    {!showAddPayoutForm ? (
                      <Card>
                        <CardHeader>
                          <div className="flex items-center space-x-2">
                            <Plus className="h-5 w-5" />
                            <CardTitle>Add Bank Account</CardTitle>
                          </div>
                          <CardDescription>
                            Link your bank account to receive payouts from sales
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button 
                            onClick={() => setShowAddPayoutForm(true)}
                            className="w-full bg-green-600 hover:bg-green-700"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Bank Account
                          </Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                              <div className="flex items-center space-x-2">
                                <Building2 className="h-5 w-5" />
                                <CardTitle>Add Bank Account</CardTitle>
                              </div>
                              <CardDescription>
                                Link your bank account for secure payouts
                              </CardDescription>
                            </div>
                            <Button
                              variant="outline"
                              onClick={() => setShowAddPayoutForm(false)}
                              className="w-full sm:w-auto"
                            >
                              Cancel
                            </Button>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Lock className="h-4 w-4" />
                            <span>Your banking information is encrypted and secure</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="bank-name">Bank Name</Label>
                                <Input
                                  id="bank-name"
                                  placeholder="Chase Bank"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="account-holder">Account Holder Name</Label>
                                <Input
                                  id="account-holder"
                                  placeholder="John Doe"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="routing-number">Routing Number</Label>
                                <Input
                                  id="routing-number"
                                  placeholder="123456789"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="account-number">Account Number</Label>
                                <Input
                                  id="account-number"
                                  placeholder="1234567890"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="account-type">Account Type</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select account type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="checking">Checking</SelectItem>
                                  <SelectItem value="savings">Savings</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Switch id="make-default-payout" />
                              <Label htmlFor="make-default-payout">Make this my default payout method</Label>
                            </div>

                            <Button 
                              onClick={handleAddPayoutSuccess}
                              className="w-full bg-green-600 hover:bg-green-700"
                              type="button"
                            >
                              <DollarSign className="h-4 w-4 mr-2" />
                              Add Bank Account
                            </Button>
                          </form>
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}

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
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-4"
                        >
                          <div className="flex items-center space-x-4 min-w-0">
                            <CreditCard className={`h-6 w-6 ${getBrandColor(paymentMethod.brand)} flex-shrink-0`} />
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
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
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
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
                              className="text-red-600 hover:text-red-700 w-full sm:w-auto"
                            >
                              <Trash2 className="h-4 w-4 mr-2 sm:mr-0" />
                              <span className="sm:hidden">Remove</span>
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
                        <CardTitle>Add Payment Method</CardTitle>
                      </div>
                      <CardDescription>
                        Add a new credit or debit card for making purchases
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button onClick={() => setShowAddForm(true)} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Payment Method
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-5 w-5" />
                            <CardTitle>Add Payment Method</CardTitle>
                          </div>
                          <CardDescription>
                            Enter your card details below
                          </CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setShowAddForm(false)}
                          className="w-full sm:w-auto"
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
                      <CardForm onSuccess={handleAddPaymentSuccess} />
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </Layout>
  );
};

export default PaymentAdd;