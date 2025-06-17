
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUserSession } from './useUserSession';

interface ActiveTimeData {
  timeWindow: string;
  orderCount: number;
}

const fetchActiveTimeAnalysis = async (vendorId: string): Promise<ActiveTimeData> => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const { data, error } = await supabase
    .from('orders')
    .select(`
      created_at,
      order_items!inner(product_id, products!inner(vendor_id))
    `)
    .eq('order_items.products.vendor_id', vendorId)
    .eq('status', 'completed')
    .gte('created_at', sevenDaysAgo.toISOString());

  if (error) throw error;

  if (!data || data.length === 0) {
    return { timeWindow: '10 AM - 12 PM', orderCount: 0 };
  }

  // Count orders by 2-hour windows
  const hourlyCount = new Array(12).fill(0); // 12 windows of 2 hours each

  data.forEach(order => {
    const date = new Date(order.created_at);
    const hour = date.getHours();
    const windowIndex = Math.floor(hour / 2);
    if (windowIndex < 12) {
      hourlyCount[windowIndex]++;
    }
  });

  // Find the window with most activity
  let maxCount = 0;
  let mostActiveWindow = 0;

  hourlyCount.forEach((count, index) => {
    if (count > maxCount) {
      maxCount = count;
      mostActiveWindow = index;
    }
  });

  // Convert window index to time string
  const startHour = mostActiveWindow * 2;
  const endHour = startHour + 2;
  
  const formatHour = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  };

  const timeWindow = `${formatHour(startHour)} - ${formatHour(endHour)}`;

  return {
    timeWindow,
    orderCount: maxCount
  };
};

export const useActiveTimeAnalysis = () => {
  const user = useUserSession();
  
  return useQuery({
    queryKey: ['active-time-analysis', user?.id],
    queryFn: () => fetchActiveTimeAnalysis(user?.id || ''),
    enabled: !!user,
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
  });
};
