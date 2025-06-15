-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id UUID NOT NULL REFERENCES public.items(id),
  winner_id UUID NOT NULL, 
  final_bid_amount numeric NOT NULL,
  shipping_cost numeric NOT NULL DEFAULT 0,
  total_amount numeric NOT NULL,
  shipping_address_id UUID NOT NULL REFERENCES public.shipping_addresses(id),
  status text NOT NULL DEFAULT 'processing'::text, 
  carrier text,
  tracking_number text,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add comment for winner_id
COMMENT ON COLUMN public.orders.winner_id IS 'This references auth.users.id, but not with a formal FK constraint to avoid direct dependencies on the auth schema.';
COMMENT ON COLUMN public.orders.status IS 'e.g., processing, shipped, delivered';

-- Create trigger for updated_at
CREATE TRIGGER handle_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE PROCEDURE public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow users to view their own orders" 
ON public.orders 
FOR SELECT 
USING (auth.uid() = winner_id);

CREATE POLICY "Allow authenticated users to create orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (auth.uid() = winner_id);