
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Order } from '@/types';
import { useSecureAuth } from './useSecureAuth';

const fetchVendorOrders = async (vendorId: string | undefined): Promise<Order[]> => {
  if (!vendorId) {
    return [];
  }

  console.log('Fetching vendor orders for vendor ID:', vendorId);

  try {
    // Use the secure database function with proper authorization
    const { data, error } = await supabase.rpc('get_vendor_orders', {
      vendor_id_param: vendorId
    });

    if (error) {
      console.error('Error fetching vendor orders:', error);
      // Don't expose detailed error messages to frontend
      throw new Error('Failed to fetch orders');
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
  } catch (error) {
    console.error('Failed to fetch vendor orders:', error);
    throw new Error('Failed to fetch orders');
  }
};

export const useVendorOrders = () => {
  const { user, role } = useSecureAuth();
  
  return useQuery<Order[]>({
    queryKey: ['vendor-orders', user?.id],
    queryFn: () => fetchVendorOrders(user?.id),
    enabled: !!user && role === 'vendor',
  });
};
