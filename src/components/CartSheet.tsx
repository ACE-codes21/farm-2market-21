
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { CartItem } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CartSheetProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CartSheet: React.FC<CartSheetProps> = ({
  cartItems,
  onUpdateQuantity,
  open,
  onOpenChange,
}) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</SheetTitle>
        </SheetHeader>
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-4 p-6 pr-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 animate-fade-in">
                    <img src={item.images[0]} alt={item.name} className="h-16 w-16 rounded-md object-cover" />
                    <div className="flex-1">
                      <h4 className="font-medium truncate">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">₹{item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-lg font-bold">₹{item.price * item.quantity}</p>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => onUpdateQuantity(item.id, 0)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="p-6 pt-2 bg-background border-t">
              <div className="flex w-full flex-col gap-2">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <p className="text-xs text-muted-foreground">Shipping & taxes calculated at checkout.</p>
                <Button className="w-full mt-2">Checkout</Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center animate-fade-in">
            <ShoppingCart className="h-24 w-24 text-gray-300" />
            <h3 className="text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground">Add items to your cart to get started.</p>
             <SheetClose asChild>
                <Button>Continue Shopping</Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
