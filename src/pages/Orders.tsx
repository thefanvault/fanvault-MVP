import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Package, Truck, CheckCircle, Printer } from "lucide-react";
import { Link } from "react-router-dom";

const Orders = () => {
  const { userRole } = useAuth();
  
  const orders = [
    {
      id: "ORD-001",
      title: "Vintage Band T-Shirt",
      status: "shipped",
      date: "2024-01-15",
      total: 45.00,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop"
    },
    {
      id: "ORD-002", 
      title: "Signed Poster",
      status: "processing",
      date: "2024-01-18",
      total: 75.00,
      image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=150&h=150&fit=crop"
    },
    {
      id: "ORD-003",
      title: "Limited Edition Vinyl",
      status: "delivered",
      date: "2024-01-10",
      total: 120.00,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop"
    }
  ];

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

  const handlePrintShippingLabel = (orderId: string) => {
    // TODO: Implement printing shipping label functionality
    console.log(`Printing shipping label for order ${orderId}`);
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
                <h1 className="text-lg font-semibold">Orders</h1>
              </div>
            </header>
            
            <div className="flex-1 overflow-auto p-4 md:p-6">
              <div className="w-full max-w-4xl mx-auto space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Your Orders</h2>
                  <p className="text-muted-foreground">Track and manage your orders</p>
                </div>

                {orders.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Package className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                      <p className="text-muted-foreground text-center">
                        When you win auctions or make purchases, they'll appear here
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">Order {order.id}</CardTitle>
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
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{order.title}</h4>
                              <p className="text-sm text-muted-foreground">Ordered on {order.date}</p>
                              <p className="text-lg font-semibold">${order.total.toFixed(2)}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/order-details/${order.id}`}>View Details</Link>
                              </Button>
                              {userRole === 'creator' && order.status === 'processing' && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handlePrintShippingLabel(order.id)}
                                >
                                  <Printer className="h-4 w-4 mr-1" />
                                  Print Label
                                </Button>
                              )}
                              {order.status === "delivered" && (
                                <Button variant="outline" size="sm">
                                  Leave Review
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </Layout>
  );
};

export default Orders;
