
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Separator } from '@/components/ui/separator';

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
  const { t } = useTranslation();

  return (
    <div className="space-y-3 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
      <h4 className="font-medium text-white">{t('buy_now_dialog.order_summary')}</h4>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-300">
          <span>{t('buy_now_dialog.subtotal_items', { count: selectedQuantity })}</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        
        {appliedCoupon && (
          <div className="flex justify-between text-green-400">
            <span>{t('buy_now_dialog.discount_code', { code: appliedCoupon.code })}</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>
        )}
        
        <Separator className="bg-slate-600/30" />
        
        <div className="flex justify-between text-lg font-semibold text-white">
          <span>{t('buy_now_dialog.total')}</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
