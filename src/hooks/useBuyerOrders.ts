
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Order, Product, CartItem } from '@/types';
import { useUserSession } from './useUserSession';
import { format } from 'date-fns';

const mapProductData = (p: any): Product => {
  if (!p) return {} as Product;
  return {
    id: p.id,
    name: p.name,
    price: Number(p.price),
    rating: p.rating,
    reviews: p.reviews,
    images: p.images,
    category: p.category,
    stock: p.stock,
    description: p.description,
    vendor_id: p.vendor_id,
    expiryDate: p.expiry_date,
    restockReminder: p.restock_reminder,
    barcode: p.barcode,
    isFreshPick: p.is_fresh_pick,
    freshPickExpiresAt: p.fresh_pick_expires_at,
  };
};

const fetchBuyerOrders = async (userId: string | undefined): Promise<Order[]> => {
  if (!userId) return [];

  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      created_at,
      status,
      total_amount,
      order_items (
        quantity,
        price,
        products ( * )
      )
    `)
    // RLS filters for the logged-in user, no need for .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching buyer orders:', error);
    throw new Error(error.message);
  }

  // Transform data to include properties expected by the OrdersPage component
  const formattedOrders: Order[] = data.map((order: any) => ({
    ...order,
    date: order.created_at ? format(new Date(order.created_at), 'dd MMM yyyy, p') : 'Date not available',
    total: order.total_amount,
    items: order.order_items.map((item: any) => ({
      ...mapProductData(item.products),
      quantity: item.quantity,
      price: item.price,
    } as CartItem)),
  }));

  return formattedOrders;
};

export const useBuyerOrders = () => {
  const user = useUserSession();
  return useQuery<Order[]>({
    queryKey: ['buyer-orders', user?.id],
    queryFn: () => fetchBuyerOrders(user?.id),
    enabled: !!user,
  });
};
