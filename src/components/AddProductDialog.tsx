
import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product } from '@/types';
import { categories } from '@/data/market';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

type FormValues = {
  name: string;
  price: number;
  stock: number;
  category: string;
  images: string;
};

interface AddProductDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddProduct: (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => void;
}

export const AddProductDialog: React.FC<AddProductDialogProps> = ({ isOpen, onOpenChange, onAddProduct }) => {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: '',
      price: 0,
      stock: 0,
      category: '',
      images: '',
    }
  });
  const { toast } = useToast();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newProduct = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      images: data.images.split(',').map(url => url.trim()).filter(url => url),
    };
    if (newProduct.images.length === 0) {
      newProduct.images.push('https://images.unsplash.com/photo-1579621970795-87f54d5921ba?w=400&h=300&fit=crop');
    }
    onAddProduct(newProduct);
    toast({
      title: "Product Added",
      description: `${newProduct.name} has been added to your store.`,
    });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        reset();
      }
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new product to your inventory.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register('name', { required: 'Product name is required.' })} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input id="price" type="number" {...register('price', { required: 'Price is required.', valueAsNumber: true, min: { value: 1, message: 'Price must be positive.' } })} />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" type="number" {...register('stock', { required: 'Stock is required.', valueAsNumber: true, min: { value: 0, message: 'Stock cannot be negative.' } })} />
              {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={control}
                rules={{ required: 'Category is required.' }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(c => c.value !== 'all').map(category => (
                        <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="images">Images</Label>
              <Input id="images" {...register('images')} placeholder="Comma-separated URLs" />
              <p className="text-xs text-gray-500">Separate multiple image URLs with a comma.</p>
            </div>

          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Add Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
