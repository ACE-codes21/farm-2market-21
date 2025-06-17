
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { DialogContent } from '@/components/ui/dialog';

interface OrderSuccessProps {
  productName: string;
  total: number;
}

export const OrderSuccess: React.FC<OrderSuccessProps> = ({ productName, total }) => {
  return (
    <DialogContent className="sm:max-w-md bg-slate-800/95 backdrop-blur-xl border border-slate-600/30 shadow-2xl">
      <div className="text-center p-6 space-y-4">
        <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Order Placed Successfully!</h3>
          <p className="text-slate-300 mt-2">Your order for {productName} has been confirmed</p>
          <p className="text-sm text-slate-400 mt-1">Total: ₹{total.toFixed(2)}</p>
        </div>
      </div>
    </DialogContent>
  );
};
