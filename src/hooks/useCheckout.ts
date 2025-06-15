
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useCheckout = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const checkoutMutation = useMutation({
    mutationFn: async (items: { id: string; quantity: number }[]) => {
      const { error } = await supabase.rpc('decrement_product_stock', {
        items_to_buy: items,
      });

      if (error) {
        console.error('Error during checkout:', error);
        
        let description = 'Could not process your order. Please try again.';
        if (error.message.includes('Not enough stock')) {
          description = 'An item in your order is out of stock or has insufficient quantity.';
        } else if (error.message) {
            description = error.message;
        }

        toast({
          variant: 'destructive',
          title: 'Checkout Error',
          description: description,
        });
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['vendor-products'] });
    },
  });

  return checkoutMutation;
};
