
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Order } from '@/types';
import { useUserSession } from './useUserSession';

const fetchVendorOrders = async (vendorId: string | undefined): Promise<Order[]> => {
  if (!vendorId) {
    return [];
  }

  console.log('Fetching vendor orders for vendor ID:', vendorId);

  // Use the new database function for efficient and secure order fetching
  const { data, error } = await supabase.rpc('get_vendor_orders', {
    vendor_id_param: vendorId
  });

  if (error) {
    console.error('Error fetching vendor orders:', error);
    throw new Error(error.message);
  }

  console.log('Vendor orders fetched successfully:', data);

  // Transform the data to match the expected Order type
  const orders: Order[] = (data || []).map((order: any) => ({
    id: order.id,
    created_at: order.created_at,
    status: order.status,
    total_amount: order.total_amount,
    order_items: order.order_items || []
  }));

  return orders;
};

export const useVendorOrders = () => {
  const user = useUserSession();
  return useQuery<Order[]>({
    queryKey: ['vendor-orders', user?.id],
    queryFn: () => fetchVendorOrders(user?.id),
    enabled: !!user,
  });
};
