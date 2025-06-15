
-- Add new columns to profiles table for vendor information
ALTER TABLE public.profiles
ADD COLUMN phone text,
ADD COLUMN upi_id text,
ADD COLUMN upi_qr_code text;

-- Enable RLS on profiles and set up policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can view all profiles" ON public.profiles;
CREATE POLICY "Authenticated users can view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);


-- Create products table
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  price numeric NOT NULL,
  rating numeric DEFAULT 0,
  reviews integer DEFAULT 0,
  images text[],
  category text NOT NULL,
  stock integer NOT NULL,
  description text,
  vendor_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  expiry_date timestamptz,
  restock_reminder boolean DEFAULT false,
  barcode text,
  is_fresh_pick boolean DEFAULT false,
  fresh_pick_expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- RLS policies for products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view all products"
ON public.products FOR SELECT
USING (true);

CREATE POLICY "Vendors can create products"
ON public.products FOR INSERT
WITH CHECK (
  auth.uid() = vendor_id AND
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'vendor'
);

CREATE POLICY "Vendors can update their own products"
ON public.products FOR UPDATE
USING (auth.uid() = vendor_id);

CREATE POLICY "Vendors can delete their own products"
ON public.products FOR DELETE
USING (auth.uid() = vendor_id);


-- Function and Trigger to update `updated_at` on product update
CREATE OR REPLACE FUNCTION public.handle_product_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_product_update
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE PROCEDURE public.handle_product_update();
