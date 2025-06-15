-- Create user preferences table for notification settings
CREATE TABLE public.user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  email_outbid_alerts BOOLEAN DEFAULT true,
  email_win_notifications BOOLEAN DEFAULT true,
  email_auction_ending BOOLEAN DEFAULT true,
  email_new_items BOOLEAN DEFAULT false,
  email_marketing BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create creator settings table
CREATE TABLE public.creator_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  storefront_public BOOLEAN DEFAULT true,
  storefront_banner_url TEXT,
  default_return_address TEXT,
  stripe_connect_id TEXT,
  stripe_connect_status TEXT DEFAULT 'pending',
  default_shipping_cost NUMERIC DEFAULT 5.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for user_preferences
CREATE POLICY "Users can view their own preferences" 
ON public.user_preferences 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences" 
ON public.user_preferences 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences" 
ON public.user_preferences 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policies for creator_settings
CREATE POLICY "Users can view their own creator settings" 
ON public.creator_settings 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own creator settings" 
ON public.creator_settings 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own creator settings" 
ON public.creator_settings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Add triggers for updated_at
CREATE TRIGGER update_user_preferences_updated_at
BEFORE UPDATE ON public.user_preferences
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_creator_settings_updated_at
BEFORE UPDATE ON public.creator_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();