
import React from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { CheckCircle } from 'lucide-react';

interface OrderSuccessProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
}

export const OrderSuccess: React.FC<OrderSuccessProps> = ({
  open,
  onOpenChange,
  total,
}) => {
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
              <p className="text-slate-300 mt-2">Your order has been successfully placed.</p>
              <p className="text-sm text-slate-400 mt-1">Total paid: ₹{total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
