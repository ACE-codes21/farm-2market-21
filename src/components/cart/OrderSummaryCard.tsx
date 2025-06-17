
import React from 'react';
import { Separator } from '@/components/ui/separator';

interface OrderSummaryCardProps {
  totalItems: number;
  total: number;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  totalItems,
  total,
}) => {
  return (
    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600/30">
      <h4 className="font-medium text-white mb-3">Order Summary</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-300">
          <span>{totalItems} items</span>
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
  );
};
