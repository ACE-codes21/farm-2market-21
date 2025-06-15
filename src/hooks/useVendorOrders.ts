
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Order } from '@/types';
import { useUserSession } from './useUserSession';

const fetchVendorOrders = async (vendorId: string | undefined): Promise<Order[]> => {
  if (!vendorId) {
    return [];
  }

  // Step 1: Get product IDs for the current vendor to identify which orders are relevant.
  const { data: productsData, error: productsError } = await supabase
    .from('products')
    .select('id')
    .eq('vendor_id', vendorId);

  if (productsError) {
    console.error('Error fetching vendor product IDs:', productsError);
    throw new Error(productsError.message);
  }
  
  if (!productsData || productsData.length === 0) {
    return []; // Vendor has no products, so no orders.
  }
  const productIds = productsData.map(p => p.id);

  // Step 2: Get unique order IDs that contain any of the vendor's products.
  const { data: orderItemsData, error: orderItemsError } = await supabase
    .from('order_items')
    .select('order_id')
    .in('product_id', productIds);

  if (orderItemsError) {
    console.error('Error fetching order items to identify relevant orders:', orderItemsError);
    throw new Error(orderItemsError.message);
  }

  if (!orderItemsData || orderItemsData.length === 0) {
    return []; // No orders contain this vendor's products.
  }
  const uniqueOrderIds = [...new Set(orderItemsData.map(item => item.order_id))];

  // Step 3: Fetch the full details for these unique orders.
  // This query is kept separate from order_items to avoid the recursive RLS issue.
  const { data: ordersData, error: ordersError } = await supabase
    .from('orders')
    .select('id, created_at, status, total_amount')
    .in('id', uniqueOrderIds)
    .order('created_at', { ascending: false });

  if (ordersError) {
    console.error('Error fetching orders:', ordersError);
    throw new Error(ordersError.message);
  }

  if (!ordersData) return [];

  // Step 4: Fetch all order items for these orders to construct the full order object.
  const { data: allOrderItems, error: allOrderItemsError } = await supabase
    .from('order_items')
    .select(`
      order_id,
      quantity,
      price,
      products (
        name,
        images
      )
    `)
    .in('order_id', uniqueOrderIds);

  if (allOrderItemsError) {
    console.error('Error fetching all order items for the orders:', allOrderItemsError);
    throw new Error(allOrderItemsError.message);
  }

  // Step 5: Stitch the orders and their items together.
  const ordersMap = new Map(ordersData.map(o => [o.id, { ...o, order_items: [] }]));
  
  if (allOrderItems) {
    for (const item of allOrderItems) {
      if (item.order_id && ordersMap.has(item.order_id)) {
        // We need to cast item since the select makes its type complex for TS
        ordersMap.get(item.order_id)!.order_items.push(item as any);
      }
    }
  }

  return Array.from(ordersMap.values());
};

export const useVendorOrders = () => {
  const user = useUserSession();
  return useQuery<Order[]>({
    queryKey: ['vendor-orders', user?.id],
    queryFn: () => fetchVendorOrders(user?.id),
    enabled: !!user,
  });
};
