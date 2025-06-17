
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
  // Get daily data for the last 7 days
  const { data: dailyOrders, error: dailyError } = await supabase
    .from('orders')
    .select(`
      created_at,
      total_amount,
      order_items!inner(quantity, product_id, products!inner(vendor_id))
    `)
    .eq('order_items.products.vendor_id', vendorId)
    .eq('status', 'completed')
    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

  if (dailyError) throw dailyError;

  // Get weekly data for the last 4 weeks
  const { data: weeklyOrders, error: weeklyError } = await supabase
    .from('orders')
    .select(`
      created_at,
      total_amount,
      order_items!inner(quantity, product_id, products!inner(vendor_id))
    `)
    .eq('order_items.products.vendor_id', vendorId)
    .eq('status', 'completed')
    .gte('created_at', new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString());

  if (weeklyError) throw weeklyError;

  // Get monthly data for the last 6 months
  const { data: monthlyOrders, error: monthlyError } = await supabase
    .from('orders')
    .select(`
      created_at,
      total_amount,
      order_items!inner(quantity, product_id, products!inner(vendor_id))
    `)
    .eq('order_items.products.vendor_id', vendorId)
    .eq('status', 'completed')
    .gte('created_at', new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString());

  if (monthlyError) throw monthlyError;

  // Process daily data
  const dailyData = processDailyData(dailyOrders || []);
  const weeklyData = processWeeklyData(weeklyOrders || []);
  const monthlyData = processMonthlyData(monthlyOrders || []);

  // Calculate percentage change (today vs yesterday)
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
  
  const todayRevenue = dailyData.find(d => d.name === 'Today')?.revenue || 0;
  const yesterdayRevenue = dailyData.find(d => d.name === 'Yesterday')?.revenue || 0;
  
  const percentageChange = yesterdayRevenue > 0 ? 
    ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100 : 0;

  return {
    daily: dailyData,
    weekly: weeklyData,
    monthly: monthlyData,
    percentageChange
  };
};

const processDailyData = (orders: any[]) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dailyMap = new Map();

  orders.forEach(order => {
    const date = new Date(order.created_at);
    const dayName = days[date.getDay() === 0 ? 6 : date.getDay() - 1];
    
    if (!dailyMap.has(dayName)) {
      dailyMap.set(dayName, { revenue: 0, items: 0 });
    }
    
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
    const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
    const weekKey = `Week ${Math.ceil((weekStart.getDate()) / 7)}`;
    
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
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const monthlyMap = new Map();

  orders.forEach(order => {
    const date = new Date(order.created_at);
    const monthName = months[date.getMonth()];
    
    if (!monthlyMap.has(monthName)) {
      monthlyMap.set(monthName, { revenue: 0, items: 0 });
    }
    
    const current = monthlyMap.get(monthName);
    current.revenue += Number(order.total_amount);
    current.items += order.order_items.reduce((sum: number, item: any) => sum + item.quantity, 0);
  });

  return months.map(month => ({
    name: month,
    revenue: monthlyMap.get(month)?.revenue || 0,
    items: monthlyMap.get(month)?.items || 0
  }));
};

export const useVendorAnalytics = () => {
  const user = useUserSession();
  
  return useQuery({
    queryKey: ['vendor-analytics', user?.id],
    queryFn: () => fetchVendorAnalytics(user?.id || ''),
    enabled: !!user,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};
