
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Product, CartItem } from '@/types';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevCartItems => {
        const existingItem = prevCartItems.find(item => item.id === product.id);
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
    toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
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
        setCartItems(prev => prev.map(item => 
            item.id === productId 
            ? { ...item, quantity: newQuantity } 
            : item
        ));
    }
  };

  const cartTotalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return { cartItems, addToCart, updateCartQuantity, cartTotalItems };
};
