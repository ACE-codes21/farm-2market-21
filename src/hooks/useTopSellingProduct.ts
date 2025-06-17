
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUserSession } from './useUserSession';

interface TopProductData {
  name: string;
  category: string;
  totalQuantity: number;
  icon: string;
}

const getCategoryIcon = (category: string): string => {
  const iconMap: { [key: string]: string } = {
    'vegetables': '🥬',
    'fruits': '🍎',
    'dairy': '🥛',
    'grains': '🌾',
    'spices': '🌶️',
    'meat': '🥩',
    'fish': '🐟',
    'beverages': '🥤',
    'default': '🛒'
  };
  
  return iconMap[category.toLowerCase()] || iconMap['default'];
};

const fetchTopSellingProduct = async (vendorId: string): Promise<TopProductData | null> => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const { data, error } = await supabase
    .from('order_items')
    .select(`
      quantity,
      product_id,
      products!inner(name, category, vendor_id),
      orders!inner(created_at, status)
    `)
    .eq('products.vendor_id', vendorId)
    .eq('orders.status', 'completed')
    .gte('orders.created_at', sevenDaysAgo.toISOString());

  if (error) throw error;

  if (!data || data.length === 0) return null;

  // Aggregate quantities by product
  const productMap = new Map();
  
  data.forEach(item => {
    const productId = item.product_id;
    const productName = item.products.name;
    const productCategory = item.products.category;
    const quantity = item.quantity;

    if (!productMap.has(productId)) {
      productMap.set(productId, {
        name: productName,
        category: productCategory,
        totalQuantity: 0
      });
    }
    
    productMap.get(productId).totalQuantity += quantity;
  });

  // Find the product with highest total quantity
  let topProduct = null;
  let maxQuantity = 0;

  for (const product of productMap.values()) {
    if (product.totalQuantity > maxQuantity) {
      maxQuantity = product.totalQuantity;
      topProduct = product;
    }
  }

  if (!topProduct) return null;

  return {
    ...topProduct,
    icon: getCategoryIcon(topProduct.category)
  };
};

export const useTopSellingProduct = () => {
  const user = useUserSession();
  
  return useQuery({
    queryKey: ['top-selling-product', user?.id],
    queryFn: () => fetchTopSellingProduct(user?.id || ''),
    enabled: !!user,
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
  });
};
