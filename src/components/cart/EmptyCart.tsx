
import React from 'react';
import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { ShoppingCart } from 'lucide-react';

export const EmptyCart: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center animate-fade-in p-8">
      <div className="bg-slate-800/50 p-8 rounded-full border border-slate-600/30">
        <ShoppingCart className="h-16 w-16 text-slate-500" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">Your cart is empty</h3>
        <p className="text-slate-400">Add items to get started.</p>
      </div>
      <SheetClose asChild>
        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200">
          Continue Shopping
        </Button>
      </SheetClose>
    </div>
  );
};
