
-- Fix search_path security issues for all database functions
-- This prevents potential SQL injection attacks by making the search_path immutable

-- Update handle_product_update function
CREATE OR REPLACE FUNCTION public.handle_product_update()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Update create_order_and_decrement_stock function
CREATE OR REPLACE FUNCTION public.create_order_and_decrement_stock(items_to_buy jsonb)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

-- Update is_order_owner function
CREATE OR REPLACE FUNCTION public.is_order_owner(order_id_to_check uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_owner boolean;
BEGIN
  SELECT auth.uid() = o.user_id
  INTO is_owner
  FROM public.orders o
  WHERE o.id = order_id_to_check;
  
  RETURN COALESCE(is_owner, false);
END;
$$;

-- Update get_vendor_orders function
CREATE OR REPLACE FUNCTION public.get_vendor_orders(vendor_id_param uuid)
RETURNS TABLE(id uuid, created_at timestamp with time zone, status text, total_amount numeric, order_items jsonb)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    o.id,
    o.created_at,
    o.status::text,
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
    ) AS order_items
  FROM
    public.orders o
  JOIN
    public.order_items oi ON o.id = oi.order_id
  JOIN
    public.products p ON oi.product_id = p.id
  WHERE
    p.vendor_id = vendor_id_param
  GROUP BY
    o.id
  ORDER BY
    o.created_at DESC;
END;
$$;

-- Update handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'buyer')
  );
  RETURN NEW;
END;
$$;
