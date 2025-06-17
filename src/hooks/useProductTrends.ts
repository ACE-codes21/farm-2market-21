
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUserSession } from './useUserSession';

interface ProductTrendData {
  id: string;
  name: string;
  trend: 'Trending' | 'Steady' | 'Low Demand';
  icon: string;
  salesData: { day: string; sales: number }[];
  image: string;
}

const getTrendStatus = (salesData: { day: string; sales: number }[]): 'Trending' | 'Steady' | 'Low Demand' => {
  const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
  const avgSales = totalSales / salesData.length;
  const recentSales = salesData.slice(-3).reduce((sum, day) => sum + day.sales, 0) / 3;

  if (recentSales > avgSales * 1.2) return 'Trending';
  if (recentSales < avgSales * 0.6) return 'Low Demand';
  return 'Steady';
};

const getTrendIcon = (trend: 'Trending' | 'Steady' | 'Low Demand'): string => {
  switch (trend) {
    case 'Trending': return '🔥';
    case 'Steady': return '📈';
    case 'Low Demand': return '⚠️';
  }
};

const fetchProductTrends = async (vendorId: string): Promise<ProductTrendData[]> => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  // Get vendor's products with sales data
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, name, images')
    .eq('vendor_id', vendorId)
    .limit(10);

  if (productsError) throw productsError;

  if (!products || products.length === 0) return [];

  const productTrends: ProductTrendData[] = [];

  for (const product of products) {
    // Get sales data for this product over the last 7 days - include pending, confirmed, and delivered
    const { data: orderItems, error: orderItemsError } = await supabase
      .from('order_items')
      .select(`
        quantity,
        orders!inner(created_at, status)
      `)
      .eq('product_id', product.id)
      .in('orders.status', ['pending', 'confirmed', 'delivered'])
      .gte('orders.created_at', sevenDaysAgo.toISOString());

    if (orderItemsError) continue;

    // Process daily sales data
    const dailySales = new Map();
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    
    // Initialize all days with 0
    days.forEach((day, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      dailySales.set(day, 0);
    });

    (orderItems || []).forEach(item => {
      const orderDate = new Date(item.orders.created_at);
      const dayIndex = Math.floor((Date.now() - orderDate.getTime()) / (24 * 60 * 60 * 1000));
      if (dayIndex >= 0 && dayIndex < 7) {
        const dayKey = days[6 - dayIndex];
        dailySales.set(dayKey, (dailySales.get(dayKey) || 0) + item.quantity);
      }
    });

    const salesData = days.map(day => ({
      day,
      sales: dailySales.get(day) || 0
    }));

    const trend = getTrendStatus(salesData);

    productTrends.push({
      id: product.id,
      name: product.name,
      trend,
      icon: getTrendIcon(trend),
      salesData,
      image: product.images?.[0] || '/placeholder.svg'
    });
  }

  return productTrends;
};

export const useProductTrends = () => {
  const user = useUserSession();
  
  return useQuery({
    queryKey: ['product-trends', user?.id],
    queryFn: () => fetchProductTrends(user?.id || ''),
    enabled: !!user,
    refetchInterval: 15 * 60 * 1000, // Refetch every 15 minutes
  });
};
