
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types';

export const useWishlist = (
  addToCart: (product: Product, quantity?: number) => void
) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const { toast } = useToast();

  const handleAddToWishlist = (product: Product) => {
    setWishlistItems(prev => {
      const isWishlisted = prev.some(item => item.id === product.id);
      if (isWishlisted) {
        toast({
          variant: 'destructive',
          title: "Removed from Wishlist",
          description: `${product.name} has been removed from your wishlist.`,
        });
        return prev.filter(item => item.id !== product.id);
      } else {
        toast({
          title: "Added to Wishlist",
          description: `${product.name} has been added to your wishlist.`,
        });
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (product: Product) => {
    setWishlistItems(prev => prev.filter(item => item.id !== product.id));
    toast({
      variant: 'destructive',
      title: "Removed from Wishlist",
      description: `${product.name} has been removed from your wishlist.`,
    });
  };

  const moveToCart = (product: Product) => {
    addToCart(product, 1);
    setWishlistItems(prev => prev.filter(item => item.id !== product.id));
    toast({
      title: "Moved to Cart",
      description: `${product.name} has been moved from your cart.`,
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return { 
    wishlistItems, 
    handleAddToWishlist,
    removeFromWishlist,
    moveToCart, 
    isInWishlist 
  };
};
