
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  max: number;
  onQuantityChange: (quantity: number) => void;
  initialQuantity?: number;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  max,
  onQuantityChange,
  initialQuantity = 1
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleQuantityChange = (newQuantity: number) => {
    const clampedQuantity = Math.max(1, Math.min(newQuantity, max));
    setQuantity(clampedQuantity);
    onQuantityChange(clampedQuantity);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => handleQuantityChange(quantity - 1)}
        disabled={quantity <= 1}
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <Input
        type="number"
        value={quantity}
        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
        className="w-16 text-center"
        min={1}
        max={max}
      />
      
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => handleQuantityChange(quantity + 1)}
        disabled={quantity >= max}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};
