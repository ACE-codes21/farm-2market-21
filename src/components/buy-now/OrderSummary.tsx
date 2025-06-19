
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';

interface OrderSummaryProps {
  selectedQuantity: number;
  subtotal: number;
  appliedCoupon: { code: string; discount: number } | null;
  discount: number;
  total: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedQuantity,
  subtotal,
  appliedCoupon,
  discount,
  total,
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-3 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
      <h4 className="font-medium text-white">{t('buyNow.orderSummary')}</h4>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-300">
          <span>{t('buyNow.subtotal')} ({selectedQuantity} {selectedQuantity > 1 ? t('buyNow.items') : t('buyNow.item')})</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        
        {appliedCoupon && (
          <div className="flex justify-between text-green-400">
            <span>{t('coupon.discount')} ({appliedCoupon.code})</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>
        )}
        
        <Separator className="bg-slate-600/30" />
        
        <div className="flex justify-between text-lg font-semibold text-white">
          <span>{t('buyNow.total')}</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
