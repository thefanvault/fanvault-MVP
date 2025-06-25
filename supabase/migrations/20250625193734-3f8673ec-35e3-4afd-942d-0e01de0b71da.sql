
-- Drop existing policies that have performance issues
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles;

-- Create optimized policies that avoid re-evaluating auth.uid() for each row
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

-- Use a more efficient approach for INSERT policy
CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (user_id = (SELECT auth.uid()));

-- Use a more efficient approach for UPDATE policy  
CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (user_id = (SELECT auth.uid()))
WITH CHECK (user_id = (SELECT auth.uid()));

-- Add DELETE policy for completeness
CREATE POLICY "Users can delete their own profile" 
ON public.profiles 
FOR DELETE 
USING (user_id = (SELECT auth.uid()));
