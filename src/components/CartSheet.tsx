
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { CartItem as CartItemType } from '@/types';
import { PaymentMethodSelector } from './cart/PaymentMethodSelector';
import { OrderSummaryCard } from './cart/OrderSummaryCard';
import { CartItem } from './cart/CartItem';
import { OrderSuccess } from './cart/OrderSuccess';
import { EmptyCart } from './cart/EmptyCart';

interface CartSheetProps {
  cartItems: CartItemType[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCheckout: (paymentMethod?: string) => Promise<void>;
}

export const CartSheet: React.FC<CartSheetProps> = ({
  cartItems,
  onUpdateQuantity,
  open,
  onOpenChange,
  onCheckout,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const { toast } = useToast();
  
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleInitiateCheckout = () => {
    if (cartItems.length === 0) return;
    setShowPaymentOptions(true);
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    try {
      await onCheckout(selectedPaymentMethod);
      
      // Simulate checkout processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOrderPlaced(true);
      setShowPaymentOptions(false);
      
      const orderMessage = selectedPaymentMethod === 'cod' 
        ? 'Order placed - Pending payment'
        : 'Order placed successfully!';
      
      toast({
        title: orderMessage,
        description: `Order confirmed with ${totalItems} items`
      });
      
      // Reset after showing success
      setTimeout(() => {
        setOrderPlaced(false);
        onOpenChange(false);
      }, 2000);
    } catch (error) {
      console.error("Checkout from cart failed:", error);
      setShowPaymentOptions(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToCart = () => {
    setShowPaymentOptions(false);
  };

  if (orderPlaced) {
    return (
      <OrderSuccess
        open={open}
        onOpenChange={onOpenChange}
        total={total}
      />
    );
  }

  if (showPaymentOptions) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg bg-slate-900/95 backdrop-blur-xl border-l border-slate-600/30">
          <SheetHeader className="px-6 border-b border-slate-700/50 pb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToCart}
                className="text-slate-400 hover:text-white p-2"
              >
                Back to Cart
              </Button>
              <SheetTitle className="text-white font-display">
                Choose Payment Method
              </SheetTitle>
            </div>
          </SheetHeader>

          <div className="flex-1 p-6 space-y-6">
            <OrderSummaryCard totalItems={totalItems} total={total} />
            <PaymentMethodSelector
              selectedPaymentMethod={selectedPaymentMethod}
              onSelectPaymentMethod={setSelectedPaymentMethod}
            />
          </div>

          <SheetFooter className="p-6 pt-4 bg-slate-800/50 border-t border-slate-700/50">
            <Button 
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-200" 
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 
               selectedPaymentMethod === 'cod' ? 'Place Order' : 
               `Pay ₹${total.toFixed(2)}`}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg bg-slate-900/95 backdrop-blur-xl border-l border-slate-600/30">
        <SheetHeader className="px-6 border-b border-slate-700/50 pb-4">
          <SheetTitle className="text-white font-display">
            Cart ({totalItems} items)
          </SheetTitle>
        </SheetHeader>
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-4 p-6 pr-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                  />
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="p-6 pt-4 bg-slate-800/50 border-t border-slate-700/50">
              <div className="flex w-full flex-col gap-4">
                <div className="flex justify-between text-xl font-semibold">
                  <span className="text-slate-300">Subtotal</span>
                  <span className="text-white">₹{total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-slate-400">Shipping and taxes calculated at checkout</p>
                <Button 
                  className="w-full mt-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-200" 
                  onClick={handleInitiateCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <EmptyCart />
        )}
      </SheetContent>
    </Sheet>
  );
};
