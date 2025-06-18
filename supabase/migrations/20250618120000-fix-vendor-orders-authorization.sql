
-- Drop the existing function if it exists
DROP FUNCTION IF EXISTS get_vendor_orders(uuid);

-- Create a secure version that verifies the user owns the vendor account
CREATE OR REPLACE FUNCTION get_vendor_orders(vendor_id_param uuid)
RETURNS TABLE (
  id uuid,
  created_at timestamptz,
  status text,
  total_amount numeric,
  order_items jsonb
) 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Security check: ensure the authenticated user is requesting their own vendor orders
  IF auth.uid() != vendor_id_param THEN
    RAISE EXCEPTION 'Access denied: You can only view your own orders';
  END IF;

  -- Additional check: ensure the user is actually a vendor
  IF NOT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role = 'vendor'
  ) THEN
    RAISE EXCEPTION 'Access denied: Vendor role required';
  END IF;

  RETURN QUERY
  SELECT 
    o.id,
    o.created_at,
    o.status,
    o.total_amount,
    COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'id', oi.id,
          'product_id', oi.product_id,
          'quantity', oi.quantity,
          'price', oi.price,
          'product_name', p.name,
          'product_category', p.category
        )
      ) FILTER (WHERE oi.id IS NOT NULL), 
      '[]'::jsonb
    ) as order_items
  FROM orders o
  LEFT JOIN order_items oi ON o.id = oi.order_id
  LEFT JOIN products p ON oi.product_id = p.id
  WHERE p.vendor_id = vendor_id_param
  GROUP BY o.id, o.created_at, o.status, o.total_amount
  ORDER BY o.created_at DESC;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_vendor_orders(uuid) TO authenticated;
