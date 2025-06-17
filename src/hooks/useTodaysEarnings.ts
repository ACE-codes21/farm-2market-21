
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUserSession } from './useUserSession';

interface EarningsData {
  todaysEarnings: number;
  yesterdaysEarnings: number;
  percentageChange: number;
  changeType: 'increase' | 'decrease';
}

const fetchTodaysEarnings = async (vendorId: string): Promise<EarningsData> => {
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  
  today.setHours(23, 59, 59, 999);
  yesterday.setHours(23, 59, 59, 999);

  // Get today's earnings
  const { data: todaysOrders, error: todaysError } = await supabase
    .from('orders')
    .select(`
      total_amount,
      order_items!inner(product_id, products!inner(vendor_id))
    `)
    .eq('order_items.products.vendor_id', vendorId)
    .eq('status', 'completed')
    .gte('created_at', new Date(today.getTime() - 24 * 60 * 60 * 1000).toISOString())
    .lt('created_at', today.toISOString());

  if (todaysError) throw todaysError;

  // Get yesterday's earnings
  const { data: yesterdaysOrders, error: yesterdaysError } = await supabase
    .from('orders')
    .select(`
      total_amount,
      order_items!inner(product_id, products!inner(vendor_id))
    `)
    .eq('order_items.products.vendor_id', vendorId)
    .eq('status', 'completed')
    .gte('created_at', new Date(yesterday.getTime() - 24 * 60 * 60 * 1000).toISOString())
    .lt('created_at', yesterday.toISOString());

  if (yesterdaysError) throw yesterdaysError;

  const todaysEarnings = (todaysOrders || []).reduce((sum, order) => sum + Number(order.total_amount), 0);
  const yesterdaysEarnings = (yesterdaysOrders || []).reduce((sum, order) => sum + Number(order.total_amount), 0);

  const percentageChange = yesterdaysEarnings > 0 ? 
    ((todaysEarnings - yesterdaysEarnings) / yesterdaysEarnings) * 100 : 0;

  return {
    todaysEarnings,
    yesterdaysEarnings,
    percentageChange,
    changeType: percentageChange >= 0 ? 'increase' : 'decrease'
  };
};

export const useTodaysEarnings = () => {
  const user = useUserSession();
  
  return useQuery({
    queryKey: ['todays-earnings', user?.id],
    queryFn: () => fetchTodaysEarnings(user?.id || ''),
    enabled: !!user,
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes for real-time updates
  });
};
