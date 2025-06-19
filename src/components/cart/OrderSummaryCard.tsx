
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';

interface OrderSummaryCardProps {
  totalItems: number;
  total: number;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  totalItems,
  total,
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600/30">
      <h4 className="font-medium text-white mb-3">{t('cart.orderSummary')}</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-300">
          <span>{totalItems} {t('cart.items')}</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>{t('cart.delivery')}</span>
          <span className="text-green-400">{t('cart.free')}</span>
        </div>
        <Separator className="bg-slate-600/30" />
        <div className="flex justify-between text-lg font-semibold text-white">
          <span>{t('common.total')}</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
