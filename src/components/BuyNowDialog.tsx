
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Zap, CreditCard, Smartphone, Wallet, Tag, Check, X, CheckCircle } from 'lucide-react';
import { Product } from '@/types';
import { QuantitySelector } from './QuantitySelector';
import { useToast } from '@/hooks/use-toast';
import { useCheckout } from '@/hooks/useCheckout';

interface BuyNowDialogProps {
  product: Product;
  onPurchase: (quantity: number, couponCode?: string, paymentMethod?: string) => void;
  children: React.ReactNode;
}

export const BuyNowDialog: React.FC<BuyNowDialogProps> = ({ 
  product, 
  onPurchase, 
  children 
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [open, setOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { toast } = useToast();
  const checkoutMutation = useCheckout();

  // Mock coupons for demo
  const availableCoupons = [
    { code: 'FRESH10', discount: 10, description: '10% off on fresh items' },
    { code: 'WELCOME20', discount: 20, description: '20% off for new users' },
    { code: 'BULK5', discount: 5, description: '5% off on bulk orders' }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, color: 'blue' },
    { id: 'upi', name: 'UPI Payment', icon: Smartphone, color: 'green' },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet, color: 'purple' }
  ];

  const subtotal = product.price * selectedQuantity;
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const total = subtotal - discount;

  const handleApplyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      toast({
        title: "Coupon Applied!",
        description: `${coupon.discount}% discount applied`
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Coupon",
        description: "Please enter a valid coupon code"
      });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const handlePurchase = async () => {
    setIsProcessing(true);
    try {
      await checkoutMutation.mutateAsync([{ id: product.id, quantity: selectedQuantity }]);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onPurchase(selectedQuantity, appliedCoupon?.code, selectedPaymentMethod);
      setOrderPlaced(true);
      
      // Reset after showing success
      setTimeout(() => {
        setOpen(false);
        setOrderPlaced(false);
        setSelectedQuantity(1);
        setCouponCode('');
        setAppliedCoupon(null);
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      console.error("Buy Now failed:", error);
      setIsProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-slate-800/95 backdrop-blur-xl border border-slate-600/30 shadow-2xl">
          <div className="text-center p-6 space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Order Placed Successfully!</h3>
              <p className="text-slate-300 mt-2">Your order for {product.name} has been confirmed.</p>
              <p className="text-sm text-slate-400 mt-1">Order total: ₹{total.toFixed(2)}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-slate-800/95 backdrop-blur-xl border border-slate-600/30 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white font-display text-xl flex items-center gap-2">
            <Zap className="h-5 w-5 text-green-400" />
            Quick Checkout
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Product Summary */}
          <div className="flex gap-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-16 h-16 rounded-xl object-cover ring-1 ring-slate-600/30"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-white">{product.name}</h3>
              <p className="text-sm text-slate-300">₹{product.price} each</p>
              <Badge variant="secondary" className="text-xs mt-1 bg-slate-700/50 text-slate-200 border-slate-600/30">
                {product.stock} available
              </Badge>
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-white">Quantity</label>
            <QuantitySelector
              max={product.stock}
              onQuantityChange={setSelectedQuantity}
              initialQuantity={1}
            />
          </div>

          {/* Coupon Section */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-white flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Coupon Code
            </label>
            
            {!appliedCoupon ? (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="bg-slate-700/50 border-slate-600/30 text-white placeholder:text-slate-400"
                />
                <Button 
                  variant="outline"
                  onClick={handleApplyCoupon}
                  disabled={!couponCode.trim()}
                  className="bg-slate-700/50 border-slate-600/30 text-slate-300 hover:bg-slate-600/50 hover:text-white"
                >
                  Apply
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium text-white">{appliedCoupon.code}</span>
                  <span className="text-xs text-green-400">-{appliedCoupon.discount}%</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveCoupon}
                  className="text-slate-400 hover:text-red-400"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Available Coupons */}
            <div className="grid grid-cols-1 gap-2">
              {availableCoupons.slice(0, 2).map((coupon) => (
                <div 
                  key={coupon.code}
                  className="p-2 bg-slate-700/30 rounded-lg border border-slate-600/30 cursor-pointer hover:bg-slate-600/30 transition-colors"
                  onClick={() => setCouponCode(coupon.code)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-green-400">{coupon.code}</span>
                    <span className="text-xs text-slate-400">{coupon.discount}% OFF</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{coupon.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-white">Payment Method</label>
            <div className="grid grid-cols-1 gap-2">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <Button
                    key={method.id}
                    variant="outline"
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`flex items-center gap-3 justify-start p-4 h-auto transition-all ${
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
                      <Check className="h-4 w-4 text-green-400 ml-auto" />
                    )}
                  </Button>
                );
              })}
            </div>
          </div>

          <Separator className="bg-slate-600/30" />

          {/* Order Summary */}
          <div className="space-y-3 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
            <h4 className="font-medium text-white">Order Summary</h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal ({selectedQuantity} items)</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              
              {appliedCoupon && (
                <div className="flex justify-between text-green-400">
                  <span>Discount ({appliedCoupon.code})</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              
              <Separator className="bg-slate-600/30" />
              
              <div className="flex justify-between text-lg font-semibold text-white">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-3">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)} 
            className="bg-slate-700/50 border-slate-600/30 text-slate-300 hover:bg-slate-600/50 hover:text-white"
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button 
            onClick={handlePurchase} 
            disabled={product.stock === 0 || isProcessing}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex-1"
          >
            <Zap className="mr-2 h-4 w-4" />
            {isProcessing ? 'Processing...' : `Complete Purchase ₹${total.toFixed(2)}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
