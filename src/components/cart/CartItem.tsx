
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus, X } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
}) => {
  return (
    <div className="flex items-center gap-4 animate-fade-in bg-slate-800/50 p-4 rounded-xl border border-slate-600/30">
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
  );
};
