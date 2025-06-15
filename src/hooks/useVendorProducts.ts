
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';
import { useUserSession } from './useUserSession';
import { useToast } from '@/hooks/use-toast';

export const useVendorProducts = () => {
  const user = useUserSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: products = [], isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ['vendor-products', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('vendor_id', user.id);

      if (error) {
        console.error('Error fetching vendor products:', error);
        throw error;
      }
      return data.map((p: any) => ({ ...p, id: p.id, price: Number(p.price) }));
    },
    enabled: !!user,
  });

  const { mutate: addProduct } = useMutation({
    mutationFn: async (newProduct: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const productData = { ...newProduct };
      if ('vendor' in productData) {
        delete (productData as any).vendor;
      }

      const { data, error } = await supabase
        .from('products')
        .insert([{ ...productData, vendor_id: user.id }])
        .select();

      if (error) {
        console.error('Error adding product:', error);
        toast({
          variant: 'destructive',
          title: 'Error adding product',
          description: error.message,
        });
        throw error;
      }
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor-products', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Product Added",
        description: "Your new product has been added successfully.",
      });
    },
  });

  const { mutate: editProduct } = useMutation({
    mutationFn: async ({ productId, updatedProduct }: { productId: string, updatedProduct: Partial<Product> }) => {
      const { data, error } = await supabase
        .from('products')
        .update(updatedProduct)
        .eq('id', productId)
        .select();
      
      if (error) {
        console.error('Error updating product:', error);
        toast({
          variant: 'destructive',
          title: 'Error updating product',
          description: error.message,
        });
        throw error;
      }
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor-products', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Product Updated",
        description: "Your product has been updated successfully.",
      });
    },
  });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
      
      if (error) {
        console.error('Error deleting product:', error);
        toast({
          variant: 'destructive',
          title: 'Error deleting product',
          description: error.message,
        });
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor-products', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    products,
    isLoadingProducts,
    addProduct,
    editProduct,
    deleteProduct,
  };
};
