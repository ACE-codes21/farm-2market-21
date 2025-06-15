
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Zap, CreditCard, Smartphone, Wallet } from 'lucide-react';
import { Product } from '@/types';
import { QuantitySelector } from './QuantitySelector';
import { useToast } from '@/hooks/use-toast';
import { useCheckout } from '@/hooks/useCheckout';
import { useTranslation } from 'react-i18next';
import { ProductSummary } from './buy-now/ProductSummary';
import { CouponSection } from './buy-now/CouponSection';
import { PaymentMethods } from './buy-now/PaymentMethods';
import { OrderSummary } from './buy-now/OrderSummary';
import { OrderSuccess } from './buy-now/OrderSuccess';

interface BuyNowDialogProps {
  product: Product;
  children: React.ReactNode;
}

type Coupon = { 
  code: string; 
  discount: number; 
  description: string; 
};

export const BuyNowDialog: React.FC<BuyNowDialogProps> = ({ product, children }) => {
  const { t } = useTranslation();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [open, setOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { toast } = useToast();
  const checkoutMutation = useCheckout();

  const availableCoupons: Coupon[] = [
    { code: 'FRESH10', discount: 10, description: t('buy_now_dialog.coupons.fresh10_desc') },
    { code: 'WELCOME20', discount: 20, description: t('buy_now_dialog.coupons.welcome20_desc') },
    { code: 'BULK5', discount: 5, description: t('buy_now_dialog.coupons.bulk5_desc') }
  ];

  const paymentMethods = [
    { id: 'card', name: t('buy_now_dialog.payment_methods.card'), icon: CreditCard, color: 'blue' },
    { id: 'upi', name: t('buy_now_dialog.payment_methods.upi'), icon: Smartphone, color: 'green' },
    { id: 'wallet', name: t('buy_now_dialog.payment_methods.wallet'), icon: Wallet, color: 'purple' }
  ];

  const subtotal = product.price * selectedQuantity;
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const total = subtotal - discount;

  const handleApplyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      toast({
        title: t('buy_now_dialog.coupon_applied'),
        description: t('buy_now_dialog.discount_applied', { discount: coupon.discount })
      });
    } else {
      toast({
        variant: "destructive",
        title: t('buy_now_dialog.invalid_coupon'),
        description: t('buy_now_dialog.invalid_coupon_desc')
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
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOrderPlaced(true);
      
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
        <DialogTrigger asChild>{children}</DialogTrigger>
        <OrderSuccess productName={product.name} total={total} />
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-slate-800/95 backdrop-blur-xl border border-slate-600/30 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white font-display text-xl flex items-center gap-2">
            <Zap className="h-5 w-5 text-green-400" />
            {t('buy_now_dialog.quick_checkout')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <ProductSummary product={product} />

          <div className="space-y-3">
            <label className="text-sm font-medium text-white">{t('buy_now_dialog.quantity')}</label>
            <QuantitySelector
              max={product.stock}
              onQuantityChange={setSelectedQuantity}
              initialQuantity={1}
            />
          </div>

          <CouponSection 
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            appliedCoupon={appliedCoupon}
            handleApplyCoupon={handleApplyCoupon}
            handleRemoveCoupon={handleRemoveCoupon}
            availableCoupons={availableCoupons}
          />

          <PaymentMethods 
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            paymentMethods={paymentMethods}
          />

          <Separator className="bg-slate-600/30" />

          <OrderSummary
            selectedQuantity={selectedQuantity}
            subtotal={subtotal}
            appliedCoupon={appliedCoupon}
            discount={discount}
            total={total}
          />
        </div>

        <DialogFooter className="gap-3">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)} 
            className="bg-slate-700/50 border-slate-600/30 text-slate-300 hover:bg-slate-600/50 hover:text-white"
            disabled={isProcessing}
          >
            {t('buy_now_dialog.cancel')}
          </Button>
          <Button 
            onClick={handlePurchase} 
            disabled={product.stock === 0 || isProcessing}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex-1"
          >
            <Zap className="mr-2 h-4 w-4" />
            {isProcessing ? t('buy_now_dialog.processing') : t('buy_now_dialog.complete_purchase', { total: total.toFixed(2) })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
