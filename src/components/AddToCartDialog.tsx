
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Cart</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground">₹{product.price} each</p>
              <p className="text-sm text-muted-foreground">{product.stock} available</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Quantity</label>
            <QuantitySelector
              max={product.stock}
              onQuantityChange={setSelectedQuantity}
              initialQuantity={1}
            />
          </div>

          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span className="font-medium">₹{(product.price * selectedQuantity).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddToCart} disabled={product.stock === 0}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
