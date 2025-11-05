-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('vendor', 'buyer')),
  full_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  upi_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  rating NUMERIC,
  reviews INTEGER,
  images TEXT[],
  category TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  expiry_date TIMESTAMP WITH TIME ZONE,
  restock_reminder BOOLEAN DEFAULT false,
  barcode TEXT,
  is_fresh_pick BOOLEAN DEFAULT false,
  fresh_pick_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Products policies
CREATE POLICY "Anyone can view products"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Vendors can insert own products"
  ON public.products FOR INSERT
  WITH CHECK (auth.uid() = vendor_id);

CREATE POLICY "Vendors can update own products"
  ON public.products FOR UPDATE
  USING (auth.uid() = vendor_id);

CREATE POLICY "Vendors can delete own products"
  ON public.products FOR DELETE
  USING (auth.uid() = vendor_id);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'delivered', 'cancelled')),
  total_amount NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Orders policies
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  price NUMERIC NOT NULL
);

-- Enable RLS on order_items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Order items policies
CREATE POLICY "Users can view order items for their orders"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert order items for their orders"
  ON public.order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function for checkout and stock decrement
CREATE OR REPLACE FUNCTION public.create_order_and_decrement_stock(
  items_to_buy JSONB
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_order_id UUID;
  item JSONB;
  product_stock INTEGER;
  total NUMERIC := 0;
BEGIN
  -- Validate stock for all items first
  FOR item IN SELECT * FROM jsonb_array_elements(items_to_buy)
  LOOP
    SELECT stock INTO product_stock
    FROM public.products
    WHERE id = (item->>'id')::UUID;
    
    IF product_stock < (item->>'quantity')::INTEGER THEN
      RAISE EXCEPTION 'Not enough stock for product %', item->>'id';
    END IF;
    
    SELECT price * (item->>'quantity')::INTEGER INTO total
    FROM public.products
    WHERE id = (item->>'id')::UUID;
  END LOOP;
  
  -- Create order
  INSERT INTO public.orders (user_id, total_amount, status)
  VALUES (auth.uid(), total, 'pending')
  RETURNING id INTO new_order_id;
  
  -- Insert order items and decrement stock
  FOR item IN SELECT * FROM jsonb_array_elements(items_to_buy)
  LOOP
    INSERT INTO public.order_items (order_id, product_id, quantity, price)
    SELECT new_order_id, (item->>'id')::UUID, (item->>'quantity')::INTEGER, price
    FROM public.products
    WHERE id = (item->>'id')::UUID;
    
    UPDATE public.products
    SET stock = stock - (item->>'quantity')::INTEGER
    WHERE id = (item->>'id')::UUID;
  END LOOP;
  
  RETURN new_order_id;
END;
$$;

-- Create function to get vendor orders
CREATE OR REPLACE FUNCTION public.get_vendor_orders(vendor_id_param UUID)
RETURNS TABLE (
  id UUID,
  created_at TIMESTAMP WITH TIME ZONE,
  status TEXT,
  total_amount NUMERIC,
  order_items JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.id,
    o.created_at,
    o.status,
    o.total_amount,
    jsonb_agg(
      jsonb_build_object(
        'quantity', oi.quantity,
        'price', oi.price,
        'products', jsonb_build_object(
          'name', p.name,
          'images', p.images
        )
      )
    ) as order_items
  FROM public.orders o
  JOIN public.order_items oi ON o.id = oi.order_id
  JOIN public.products p ON oi.product_id = p.id
  WHERE p.vendor_id = vendor_id_param
  GROUP BY o.id, o.created_at, o.status, o.total_amount
  ORDER BY o.created_at DESC;
END;
$$;