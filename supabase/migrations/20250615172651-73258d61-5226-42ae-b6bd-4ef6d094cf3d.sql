
-- Step 1: Create an enum for order status
CREATE TYPE public.order_status AS ENUM ('pending', 'confirmed', 'delivered', 'cancelled');

-- Step 2: Create the orders table to store high-level order information
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    total_amount NUMERIC(10, 2) NOT NULL,
    status public.order_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Step 3: Create the order_items table to store the specific products in each order
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id),
    quantity INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL -- Price at the time of purchase
);

-- Step 4: Add Row Level Security (RLS) policies for the orders table
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders"
ON public.orders FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Vendors can view orders containing their products"
ON public.orders FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.order_items oi
    JOIN public.products p ON oi.product_id = p.id
    WHERE oi.order_id = public.orders.id AND p.vendor_id = auth.uid()
  )
);

-- Step 5: Add RLS policies for the order_items table
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view items in their own orders"
ON public.order_items FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.orders o
    WHERE o.id = order_id AND o.user_id = auth.uid()
  )
);

CREATE POLICY "Vendors can view order items for their products"
ON public.order_items FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.products p
    WHERE p.id = product_id AND p.vendor_id = auth.uid()
  )
);

-- Step 6: Drop the old stock decrement function
DROP FUNCTION IF EXISTS public.decrement_product_stock(jsonb);

-- Step 7: Create a new, more robust function to handle the entire checkout process atomically
CREATE OR REPLACE FUNCTION public.create_order_and_decrement_stock(items_to_buy jsonb)
RETURNS uuid AS $$
DECLARE
    item RECORD;
    product_info RECORD;
    total_price NUMERIC := 0;
    new_order_id UUID;
BEGIN
    -- 1. Check stock for all items and calculate total price
    FOR item IN SELECT * FROM jsonb_to_recordset(items_to_buy) AS x(id uuid, quantity int) LOOP
        SELECT stock, price INTO product_info FROM products WHERE id = item.id FOR UPDATE;
        
        IF product_info IS NULL THEN
            RAISE EXCEPTION 'Product with ID % not found', item.id;
        END IF;

        IF product_info.stock < item.quantity THEN
            RAISE EXCEPTION 'Not enough stock for product ID %', item.id;
        END IF;

        total_price := total_price + (product_info.price * item.quantity);
    END LOOP;

    -- 2. Create the order record
    INSERT INTO public.orders (user_id, total_amount, status)
    VALUES (auth.uid(), total_price, 'confirmed')
    RETURNING id INTO new_order_id;

    -- 3. Create order items and decrement product stock
    FOR item IN SELECT * FROM jsonb_to_recordset(items_to_buy) AS x(id uuid, quantity int) LOOP
        -- Get the price at time of purchase
        SELECT price INTO product_info FROM products WHERE id = item.id;

        INSERT INTO public.order_items (order_id, product_id, quantity, price)
        VALUES (new_order_id, item.id, item.quantity, product_info.price);

        UPDATE products
        SET stock = stock - item.quantity
        WHERE id = item.id;
    END LOOP;
    
    RETURN new_order_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
