import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUserSession } from './useUserSession';

interface AnalyticsData {
  daily: { name: string; revenue: number; items: number }[];
  weekly: { name: string; revenue: number; items: number }[];
  monthly: { name: string; revenue: number; items: number }[];
  percentageChange: number;
}

const fetchVendorAnalytics = async (vendorId: string): Promise<AnalyticsData> => {
  console.log('Fetching vendor analytics for vendor:', vendorId);
  
  // Get all orders for the vendor in the last 6 months - include pending, confirmed, and delivered
  const { data: allOrders, error } = await supabase
    .from('orders')
    .select(`
      created_at,
      total_amount,
      order_items!inner(
        quantity,
        products!inner(vendor_id)
      )
    `)
    .eq('order_items.products.vendor_id', vendorId)
    .in('status', ['pending', 'confirmed', 'delivered'])
    .gte('created_at', new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString())
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching vendor analytics:', error);
    throw error;
  }

  console.log('All orders for analytics:', allOrders);

  // Process the data
  const dailyData = processDailyData(allOrders || []);
  const weeklyData = processWeeklyData(allOrders || []);
  const monthlyData = processMonthlyData(allOrders || []);

  // Calculate percentage change (today vs yesterday from daily data)
  const todayRevenue = dailyData.find(d => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    return d.name === today;
  })?.revenue || 0;
  
  const yesterdayRevenue = dailyData.find(d => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' });
    return d.name === yesterday;
  })?.revenue || 0;
  
  const percentageChange = yesterdayRevenue > 0 ? 
    ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100 : 0;

  const result = {
    daily: dailyData,
    weekly: weeklyData,
    monthly: monthlyData,
    percentageChange
  };

  console.log('Final analytics result:', result);
  return result;
};

const processDailyData = (orders: any[]) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dailyMap = new Map();

  // Initialize all days with 0
  days.forEach(day => {
    dailyMap.set(day, { revenue: 0, items: 0 });
  });

  orders.forEach(order => {
    const date = new Date(order.created_at);
    const dayName = days[date.getDay()];
    
    const current = dailyMap.get(dayName);
    current.revenue += Number(order.total_amount);
    current.items += order.order_items.reduce((sum: number, item: any) => sum + item.quantity, 0);
  });

  return days.map(day => ({
    name: day,
    revenue: dailyMap.get(day)?.revenue || 0,
    items: dailyMap.get(day)?.items || 0
  }));
};

const processWeeklyData = (orders: any[]) => {
  const weeklyMap = new Map();

  orders.forEach(order => {
    const date = new Date(order.created_at);
    const weekNumber = Math.ceil(date.getDate() / 7);
    const weekKey = `Week ${weekNumber}`;
    
    if (!weeklyMap.has(weekKey)) {
      weeklyMap.set(weekKey, { revenue: 0, items: 0 });
    }
    
    const current = weeklyMap.get(weekKey);
    current.revenue += Number(order.total_amount);
    current.items += order.order_items.reduce((sum: number, item: any) => sum + item.quantity, 0);
  });

  return Array.from(weeklyMap.entries()).map(([week, data]) => ({
    name: week,
    revenue: data.revenue,
    items: data.items
  }));
};

const processMonthlyData = (orders: any[]) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyMap = new Map();

  // Initialize recent months with 0
  for (let i = 0; i < 6; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthName = months[date.getMonth()];
    monthlyMap.set(monthName, { revenue: 0, items: 0 });
  }

  orders.forEach(order => {
    const date = new Date(order.created_at);
    const monthName = months[date.getMonth()];
    
    if (monthlyMap.has(monthName)) {
      const current = monthlyMap.get(monthName);
      current.revenue += Number(order.total_amount);
      current.items += order.order_items.reduce((sum: number, item: any) => sum + item.quantity, 0);
    }
  });

  return Array.from(monthlyMap.entries()).map(([month, data]) => ({
    name: month,
    revenue: data.revenue,
    items: data.items
  }));
};

export const useVendorAnalytics = () => {
  const user = useUserSession();
  
  return useQuery({
    queryKey: ['vendor-analytics', user?.id],
    queryFn: () => fetchVendorAnalytics(user?.id || ''),
    enabled: !!user?.id,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};
