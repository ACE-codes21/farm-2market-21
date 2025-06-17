
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
  console.log('Fetching today\'s earnings for vendor:', vendorId);
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

  console.log('Date ranges:', {
    today: today.toISOString(),
    tomorrow: tomorrow.toISOString(),
    yesterday: yesterday.toISOString()
  });

  // Get today's earnings
  const { data: todaysOrders, error: todaysError } = await supabase
    .from('orders')
    .select(`
      total_amount,
      order_items!inner(
        quantity,
        products!inner(vendor_id)
      )
    `)
    .eq('order_items.products.vendor_id', vendorId)
    .eq('status', 'delivered')
    .gte('created_at', today.toISOString())
    .lt('created_at', tomorrow.toISOString());

  if (todaysError) {
    console.error('Error fetching today\'s orders:', todaysError);
    throw todaysError;
  }

  console.log('Today\'s orders:', todaysOrders);

  // Get yesterday's earnings
  const { data: yesterdaysOrders, error: yesterdaysError } = await supabase
    .from('orders')
    .select(`
      total_amount,
      order_items!inner(
        quantity,
        products!inner(vendor_id)
      )
    `)
    .eq('order_items.products.vendor_id', vendorId)
    .eq('status', 'delivered')
    .gte('created_at', yesterday.toISOString())
    .lt('created_at', today.toISOString());

  if (yesterdaysError) {
    console.error('Error fetching yesterday\'s orders:', yesterdaysError);
    throw yesterdaysError;
  }

  console.log('Yesterday\'s orders:', yesterdaysOrders);

  const todaysEarnings = (todaysOrders || []).reduce((sum, order) => sum + Number(order.total_amount), 0);
  const yesterdaysEarnings = (yesterdaysOrders || []).reduce((sum, order) => sum + Number(order.total_amount), 0);

  console.log('Calculated earnings:', { todaysEarnings, yesterdaysEarnings });

  const percentageChange = yesterdaysEarnings > 0 ? 
    ((todaysEarnings - yesterdaysEarnings) / yesterdaysEarnings) * 100 : 0;

  const result = {
    todaysEarnings,
    yesterdaysEarnings,
    percentageChange,
    changeType: percentageChange >= 0 ? 'increase' : 'decrease' as 'increase' | 'decrease'
  };

  console.log('Final earnings result:', result);
  return result;
};

export const useTodaysEarnings = () => {
  const user = useUserSession();
  
  return useQuery({
    queryKey: ['todays-earnings', user?.id],
    queryFn: () => fetchTodaysEarnings(user?.id || ''),
    enabled: !!user?.id,
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes for real-time updates
  });
};
