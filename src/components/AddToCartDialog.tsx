import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { QuantitySelector } from './QuantitySelector';
interface AddToCartDialogProps {
  product: Product;
  onAddToCart: (quantity: number) => void;
  children: React.ReactNode;
}
export const AddToCartDialog: React.FC<AddToCartDialogProps> = ({
  product,
  onAddToCart,
  children
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const handleAddToCart = () => {
    onAddToCart(selectedQuantity);
    setOpen(false);
    setSelectedQuantity(1);
  };
  return <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-slate-800/95 backdrop-blur-xl border border-slate-600/30 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-white font-display">Add to Cart</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <img src={product.images[0]} alt={product.name} className="w-20 h-20 rounded-xl object-cover ring-1 ring-slate-600/30" />
            <div className="flex-1">
              <h3 className="font-medium text-white">{product.name}</h3>
              <p className="text-sm text-slate-300">₹{product.price} each</p>
              <p className="text-sm text-slate-400">{product.stock} available</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-white">Quantity</label>
            <QuantitySelector max={product.stock} onQuantityChange={setSelectedQuantity} initialQuantity={1} />
          </div>

          <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/30">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Subtotal</span>
              <span className="font-medium text-white">₹{(product.price * selectedQuantity).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-3">
          <Button variant="outline" onClick={() => setOpen(false)} className="bg-slate-700/50 border-slate-600/30 text-slate-300 hover:bg-slate-600/50 hover:text-white">
            Cancel
          </Button>
          <Button onClick={handleAddToCart} disabled={product.stock === 0} className="bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 bg-green-500 hover:bg-green-400">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>;
};