import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Layout } from "@/components/layout/Layout";
import { useParams, Link } from "react-router-dom";
import { Package, Truck, CheckCircle, Printer, ArrowLeft, DollarSign } from "lucide-react";

const OrderDetails = () => {
  const { orderId } = useParams();
  
  // Mock order data - in a real app this would be fetched based on orderId
  const order = {
    id: orderId || "ORD-001",
    title: "Vintage Band T-Shirt",
    status: "processing",
    date: "2024-01-15",
    total: 45.00,
    platformFee: 4.50,
    paymentProcessingFee: 1.80,
    netRevenue: 38.70,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop",
    buyer: {
      name: "John Smith",
      email: "john.smith@email.com"
    },
    shippingAddress: {
      name: "John Smith",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States"
    },
    orderDate: "January 15, 2024",
    trackingNumber: null
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Package className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handlePrintShippingLabel = () => {
    console.log(`Printing shipping label for order ${order.id}`);
    // TODO: Implement actual shipping label printing
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
              <div className="flex items-center gap-4">
                <Link to="/orders" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Orders
                </Link>
                <h1 className="text-lg font-semibold">Order {order.id}</h1>
              </div>
            </header>
            
            <div className="flex-1 overflow-auto p-4 md:p-6">
              <div className="w-full max-w-4xl mx-auto space-y-6">
                
                {/* Order Status */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Order Status</CardTitle>
                      <Badge className={getStatusColor(order.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={order.image} 
                        alt={order.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-lg">{order.title}</h4>
                        <p className="text-sm text-muted-foreground">Order placed on {order.orderDate}</p>
                      </div>
                      {order.status === 'processing' && (
                        <Button onClick={handlePrintShippingLabel} className="flex items-center gap-2">
                          <Printer className="h-4 w-4" />
                          Print Shipping Label
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Revenue Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Revenue Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Sale Price</span>
                        <span className="font-medium">${order.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Platform Fee (10%)</span>
                        <span>-${order.platformFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Payment Processing Fee</span>
                        <span>-${order.paymentProcessingFee.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Your Earnings</span>
                        <span className="text-green-600">${order.netRevenue.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Ship to:</h4>
                        <div className="text-sm space-y-1">
                          <p className="font-medium">{order.shippingAddress.name}</p>
                          <p>{order.shippingAddress.street}</p>
                          <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                          <p>{order.shippingAddress.country}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-medium mb-2">Buyer Contact:</h4>
                        <div className="text-sm space-y-1">
                          <p>{order.buyer.name}</p>
                          <p className="text-muted-foreground">{order.buyer.email}</p>
                        </div>
                      </div>

                      {order.trackingNumber && (
                        <>
                          <Separator />
                          <div>
                            <h4 className="font-medium mb-2">Tracking Number:</h4>
                            <p className="text-sm font-mono bg-muted p-2 rounded">{order.trackingNumber}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </Layout>
  );
};

export default OrderDetails;