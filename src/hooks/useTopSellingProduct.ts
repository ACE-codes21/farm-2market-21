
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
  console.log('Fetching top selling product for vendor:', vendorId);
  
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const { data, error } = await supabase
    .from('order_items')
    .select(`
      quantity,
      products!inner(
        id,
        name, 
        category,
        vendor_id
      ),
      orders!inner(
        created_at, 
        status
      )
    `)
    .eq('products.vendor_id', vendorId)
    .eq('orders.status', 'delivered')
    .gte('orders.created_at', sevenDaysAgo.toISOString());

  if (error) {
    console.error('Error fetching top selling product:', error);
    throw error;
  }

  console.log('Order items data:', data);

  if (!data || data.length === 0) {
    console.log('No order items found');
    return null;
  }

  // Aggregate quantities by product
  const productMap = new Map();
  
  data.forEach(item => {
    const productId = item.products.id;
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

  console.log('Product aggregation:', Array.from(productMap.entries()));

  // Find the product with highest total quantity
  let topProduct = null;
  let maxQuantity = 0;

  for (const product of productMap.values()) {
    if (product.totalQuantity > maxQuantity) {
      maxQuantity = product.totalQuantity;
      topProduct = product;
    }
  }

  if (!topProduct) {
    console.log('No top product found');
    return null;
  }

  const result = {
    ...topProduct,
    icon: getCategoryIcon(topProduct.category)
  };

  console.log('Top selling product result:', result);
  return result;
};

export const useTopSellingProduct = () => {
  const user = useUserSession();
  
  return useQuery({
    queryKey: ['top-selling-product', user?.id],
    queryFn: () => fetchTopSellingProduct(user?.id || ''),
    enabled: !!user?.id,
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
  });
};
