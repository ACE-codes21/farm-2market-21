
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUserSession } from './useUserSession';

interface ActiveTimeData {
  timeWindow: string;
  orderCount: number;
}

const fetchActiveTimeAnalysis = async (vendorId: string): Promise<ActiveTimeData> => {
  console.log('Fetching active time analysis for vendor:', vendorId);
  
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const { data, error } = await supabase
    .from('orders')
    .select(`
      created_at,
      order_items!inner(
        quantity,
        products!inner(vendor_id)
      )
    `)
    .eq('order_items.products.vendor_id', vendorId)
    .in('status', ['pending', 'confirmed', 'delivered'])
    .gte('created_at', sevenDaysAgo.toISOString());

  if (error) {
    console.error('Error fetching active time analysis:', error);
    throw error;
  }

  console.log('Active time analysis data:', data);

  if (!data || data.length === 0) {
    console.log('No orders found for active time analysis');
    return { timeWindow: '10 AM - 12 PM', orderCount: 0 };
  }

  // Count orders by 2-hour windows (12 windows for 24 hours)
  const hourlyCount = new Array(12).fill(0);

  data.forEach(order => {
    const date = new Date(order.created_at);
    const hour = date.getHours();
    const windowIndex = Math.floor(hour / 2);
    if (windowIndex < 12) {
      hourlyCount[windowIndex]++;
    }
  });

  console.log('Hourly count distribution:', hourlyCount);

  // Find the window with most activity
  let maxCount = 0;
  let mostActiveWindow = 0;

  hourlyCount.forEach((count, index) => {
    if (count > maxCount) {
      maxCount = count;
      mostActiveWindow = index;
    }
  });

  // Convert window index to time string with proper AM/PM formatting
  const startHour = mostActiveWindow * 2;
  const endHour = (startHour + 2) % 24;
  
  const formatHour = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  };

  const timeWindow = `${formatHour(startHour)} - ${formatHour(endHour)}`;

  const result = {
    timeWindow,
    orderCount: maxCount
  };

  console.log('Active time analysis result:', result);
  return result;
};

export const useActiveTimeAnalysis = () => {
  const user = useUserSession();
  
  return useQuery({
    queryKey: ['active-time-analysis', user?.id],
    queryFn: () => fetchActiveTimeAnalysis(user?.id || ''),
    enabled: !!user?.id,
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
  });
};
