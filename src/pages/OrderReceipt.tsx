import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Package, ShieldCheck, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const fetchOrderData = async (orderId: string) => {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select(`
      *,
      items (
        id,
        title,
        images,
        creator_id
      ),
      shipping_addresses (
        full_name,
        street_address,
        apartment,
        city,
        state,
        zip_code
      )
    `)
    .eq('id', orderId)
    .single();

  if (orderError) throw orderError;

  // Fetch creator profile
  const { data: creatorProfile, error: profileError } = await supabase
    .from('profiles')
    .select('display_name, username')
    .eq('id', order.items.creator_id)
    .single();

  if (profileError) throw profileError;

  return {
    order,
    creatorProfile
  };
};

const OrderReceipt = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrderData(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto max-w-2xl px-4 pt-6 pb-20 md:pb-10">
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </main>
        <MobileNav />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto max-w-2xl px-4 pt-6 pb-20 md:pb-10">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-xl font-semibold mb-2">Order Not Found</h1>
              <p className="text-muted-foreground">The order you're looking for doesn't exist or you don't have permission to view it.</p>
            </CardContent>
          </Card>
        </main>
        <MobileNav />
      </div>
    );
  }

  const { order, creatorProfile } = data;
  const item = order.items;
  const address = order.shipping_addresses;

  // Calculate tax (estimated at 7%)
  const tax = order.final_bid_amount * 0.07;
  const total = order.final_bid_amount + order.shipping_cost + tax;

  // Get creator display name
  const creatorDisplayName = creatorProfile?.display_name || 'Unknown Creator';
  const creatorUsername = creatorProfile?.username || '';

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'shipped':
        return <Badge>Shipped</Badge>;
      case 'delivered':
        return <Badge variant="secondary">Delivered</Badge>;
      case 'processing':
      default:
        return <Badge variant="outline">Processing</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-2xl px-4 pt-6 pb-20 md:pb-10">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="text-center">
                <h1 className="text-2xl font-bold">You've won the auction!</h1>
                <p className="text-muted-foreground">Thank you for your order. Here are the details.</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Item Summary */}
              <div className="flex items-start space-x-4">
                <img 
                  src={item.images?.[0] || "/placeholder.svg"} 
                  alt={item.title} 
                  className="h-24 w-24 rounded-lg object-cover" 
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    From {creatorUsername ? (
                      <Link 
                        to={`/creator/${creatorUsername}`} 
                        className="text-primary hover:underline"
                      >
                        {creatorDisplayName}
                      </Link>
                    ) : creatorDisplayName}
                  </p>
                  <p className="text-lg font-bold mt-2">${order.final_bid_amount.toFixed(2)}</p>
                </div>
              </div>

              <Separator />

              {/* Pricing Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Winning Bid</span>
                  <span>${order.final_bid_amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${order.shipping_cost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (est.)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Shipping Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Shipping To</h3>
                <div className="text-muted-foreground text-sm">
                  <p>{address.full_name}</p>
                  <p>{address.street_address}{address.apartment ? `, ${address.apartment}` : ''}</p>
                  <p>{address.city}, {address.state} {address.zip_code}</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-1">Status</h3>
                {order.status === 'shipped' && order.tracking_number ? (
                  <div className="flex items-center justify-between">
                    <div>
                      {getStatusBadge(order.status)}
                      <p className="text-sm text-muted-foreground mt-1">
                        via {order.carrier || 'Unknown Carrier'}
                      </p>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <a 
                        href={`https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${order.tracking_number}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Track Package
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                ) : (
                  <div>
                    {getStatusBadge(order.status)}
                    <p className="text-sm text-muted-foreground mt-1">
                      {order.status === 'processing' 
                        ? 'Shipping soon – your creator has been notified!' 
                        : 'Order is being processed'
                      }
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Customer Service */}
          <Card className="bg-muted/50">
            <CardContent className="p-4 text-center text-sm">
              <p className="text-muted-foreground">
                Questions about your order? <Link to="/help" className="text-primary hover:underline">Contact Support</Link>
              </p>
              <div className="flex items-center justify-center gap-2 mt-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-green-600"/>
                <span>Your purchase is protected by FanVault Buyer Protection.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <MobileNav />
    </div>
  );
};

export default OrderReceipt;