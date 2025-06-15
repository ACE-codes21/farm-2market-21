
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
  onCheckout: () => void;
}

export const CartSheet: React.FC<CartSheetProps> = ({
  cartItems,
  onUpdateQuantity,
  open,
  onOpenChange,
  onCheckout,
}) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg bg-slate-900/95 backdrop-blur-xl border-l border-slate-600/30">
        <SheetHeader className="px-6 border-b border-slate-700/50 pb-4">
          <SheetTitle className="text-white font-display">
            Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
          </SheetTitle>
        </SheetHeader>
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-4 p-6 pr-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 animate-fade-in bg-slate-800/50 p-4 rounded-xl border border-slate-600/30">
                    <img src={item.images[0]} alt={item.name} className="h-16 w-16 rounded-lg object-cover ring-1 ring-slate-600/30" />
                    <div className="flex-1">
                      <h4 className="font-medium truncate text-white">{item.name}</h4>
                      <p className="text-sm text-slate-300">₹{item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7 bg-slate-700/50 border-slate-600/30 text-slate-300 hover:bg-slate-600/50 hover:text-white" 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-white font-medium">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7 bg-slate-700/50 border-slate-600/30 text-slate-300 hover:bg-slate-600/50 hover:text-white" 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-lg font-bold text-white">₹{item.price * item.quantity}</p>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-500/10" 
                        onClick={() => onUpdateQuantity(item.id, 0)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="p-6 pt-4 bg-slate-800/50 border-t border-slate-700/50">
              <div className="flex w-full flex-col gap-4">
                <div className="flex justify-between text-xl font-semibold">
                  <span className="text-slate-300">Subtotal</span>
                  <span className="text-white">₹{total}</span>
                </div>
                <p className="text-xs text-slate-400">Shipping & taxes calculated at checkout.</p>
                <Button 
                  className="w-full mt-2 bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-200" 
                  onClick={onCheckout}
                >
                  Checkout
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center animate-fade-in p-8">
            <div className="bg-slate-800/50 p-8 rounded-full border border-slate-600/30">
              <ShoppingCart className="h-16 w-16 text-slate-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">Your cart is empty</h3>
              <p className="text-slate-400">Add items to your cart to get started.</p>
            </div>
            <SheetClose asChild>
              <Button className="bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white font-medium px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200">
                Continue Shopping
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
