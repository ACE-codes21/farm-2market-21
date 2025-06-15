
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Order, Product, CartItem } from '@/types';
import { useUserSession } from './useUserSession';
import { format } from 'date-fns';

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
      ...(item.products as Product),
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
