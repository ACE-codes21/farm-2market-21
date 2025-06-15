
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Order } from '@/types';

const fetchVendorOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      created_at,
      status,
      total_amount,
      order_items:order_items (
        quantity,
        price,
        products (
          name,
          images
        )
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching vendor orders:', error);
    throw new Error(error.message);
  }

  // RLS on both `orders` and `order_items` tables will filter the data for the logged-in vendor.
  // This ensures vendors only see orders containing their products.
  return data as unknown as Order[];
};

export const useVendorOrders = () => {
  return useQuery<Order[]>({
    queryKey: ['vendor-orders'],
    queryFn: fetchVendorOrders,
  });
};
