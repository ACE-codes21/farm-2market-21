
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Plus, Minus, X, CheckCircle, CreditCard, Smartphone, Wallet } from 'lucide-react';
import { CartItem } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const { toast } = useToast();
  
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, color: 'blue' },
    { id: 'upi', name: 'UPI Payment', icon: Smartphone, color: 'green' },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet, color: 'purple' }
  ];

  const handleInitiateCheckout = () => {
    if (cartItems.length === 0) return;
    setShowPaymentOptions(true);
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate checkout processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onCheckout();
    setOrderPlaced(true);
    setIsProcessing(false);
    setShowPaymentOptions(false);
    
    toast({
      title: "Order Placed Successfully!",
      description: `Your order of ${cartItems.length} items has been confirmed.`
    });
    
    // Reset after showing success
    setTimeout(() => {
      setOrderPlaced(false);
      onOpenChange(false);
    }, 2000);
  };

  const handleBackToCart = () => {
    setShowPaymentOptions(false);
  };

  if (orderPlaced) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg bg-slate-900/95 backdrop-blur-xl border-l border-slate-600/30">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-400" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">Order Placed!</h3>
                <p className="text-slate-300 mt-2">Your cart items have been ordered successfully.</p>
                <p className="text-sm text-slate-400 mt-1">Total: ₹{total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
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
                ← Back
              </Button>
              <SheetTitle className="text-white font-display">
                Choose Payment Method
              </SheetTitle>
            </div>
          </SheetHeader>

          <div className="flex-1 p-6 space-y-6">
            {/* Order Summary */}
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600/30">
              <h4 className="font-medium text-white mb-3">Order Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Delivery</span>
                  <span className="text-green-400">Free</span>
                </div>
                <Separator className="bg-slate-600/30" />
                <div className="flex justify-between text-lg font-semibold text-white">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
              <h4 className="font-medium text-white">Select Payment Method</h4>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <Button
                      key={method.id}
                      variant="outline"
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`w-full flex items-center gap-3 justify-start p-4 h-auto transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'bg-green-500/20 border-green-500/50 text-white'
                          : 'bg-slate-700/30 border-slate-600/30 text-slate-300 hover:bg-slate-600/30'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${
                        method.color === 'blue' ? 'text-blue-400' :
                        method.color === 'green' ? 'text-green-400' :
                        'text-purple-400'
                      }`} />
                      <span className="font-medium">{method.name}</span>
                      {selectedPaymentMethod === method.id && (
                        <CheckCircle className="h-4 w-4 text-green-400 ml-auto" />
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          <SheetFooter className="p-6 pt-4 bg-slate-800/50 border-t border-slate-700/50">
            <Button 
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-200" 
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
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
                      <p className="text-lg font-bold text-white">₹{(item.price * item.quantity).toFixed(2)}</p>
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
                  <span className="text-white">₹{total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-slate-400">Shipping & taxes calculated at checkout.</p>
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
          <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center animate-fade-in p-8">
            <div className="bg-slate-800/50 p-8 rounded-full border border-slate-600/30">
              <ShoppingCart className="h-16 w-16 text-slate-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">Your cart is empty</h3>
              <p className="text-slate-400">Add items to your cart to get started.</p>
            </div>
            <SheetClose asChild>
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200">
                Continue Shopping
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
