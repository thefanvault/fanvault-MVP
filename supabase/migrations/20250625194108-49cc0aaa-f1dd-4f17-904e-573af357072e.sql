
-- Drop existing policies that have performance issues on shipping_addresses
DROP POLICY IF EXISTS "Users can view their own shipping addresses" ON public.shipping_addresses;
DROP POLICY IF EXISTS "Users can insert their own shipping addresses" ON public.shipping_addresses;
DROP POLICY IF EXISTS "Users can create their own shipping addresses" ON public.shipping_addresses;
DROP POLICY IF EXISTS "Users can update their own shipping addresses" ON public.shipping_addresses;
DROP POLICY IF EXISTS "Users can delete their own shipping addresses" ON public.shipping_addresses;

-- Create optimized policies that avoid re-evaluating auth.uid() for each row
CREATE POLICY "Users can view their own shipping addresses" 
ON public.shipping_addresses 
FOR SELECT 
USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can insert their own shipping addresses" 
ON public.shipping_addresses 
FOR INSERT 
WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can update their own shipping addresses" 
ON public.shipping_addresses 
FOR UPDATE 
USING (user_id = (SELECT auth.uid()))
WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can delete their own shipping addresses" 
ON public.shipping_addresses 
FOR DELETE 
USING (user_id = (SELECT auth.uid()));
