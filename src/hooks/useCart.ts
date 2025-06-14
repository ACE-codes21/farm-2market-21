
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Product, CartItem } from '@/types';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (product: Product, quantity: number = 1) => {
    if (product.stock <= 0) {
      toast({
          variant: "destructive",
          title: "Out of Stock",
          description: `${product.name} is currently out of stock.`,
      });
      return;
    }

    setCartItems(prevCartItems => {
        const existingItem = prevCartItems.find(item => item.id === product.id);
        const currentQuantity = existingItem ? existingItem.quantity : 0;
        
        if (currentQuantity + quantity > product.stock) {
            toast({
                variant: "destructive",
                title: "Not enough stock",
                description: `You can't add more of ${product.name}. Only ${product.stock} available.`,
            });
            return prevCartItems;
        }

        toast({
            title: "Added to Cart",
            description: `${product.name} has been added to your cart.`,
        });

        if (existingItem) {
            return prevCartItems.map(item => 
                item.id === product.id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
        } else {
            return [...prevCartItems, { ...product, quantity }];
        }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast({
      variant: 'destructive',
      title: "Item Removed",
      description: "Item removed from your cart.",
    });
  };

  const updateCartQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
        setCartItems(prev => prev.filter(item => item.id !== productId));
        toast({
            variant: 'destructive',
            title: "Item Removed",
            description: "Item removed from your cart.",
        });
    } else {
        setCartItems(prev => prev.map(item => {
            if (item.id === productId) {
                if (newQuantity > item.stock) {
                    toast({
                        variant: "destructive",
                        title: "Not enough stock",
                        description: `Only ${item.stock} of ${item.name} available.`,
                    });
                    return { ...item, quantity: item.stock };
                }
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    }
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Checkout Successful",
      description: "Your order has been placed.",
    });
  };

  const cartTotalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return { cartItems, addToCart, removeFromCart, updateCartQuantity, cartTotalItems, clearCart };
};
