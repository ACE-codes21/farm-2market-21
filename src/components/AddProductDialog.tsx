import React, { useState } from 'react';
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
import { X, Upload, Clock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

type FormValues = {
  name: string;
  price: number;
  stock: number;
  category: string;
  images: string;
  isFreshPick: boolean;
};

interface AddProductDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddProduct: (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => void;
}

export const AddProductDialog: React.FC<AddProductDialogProps> = ({ isOpen, onOpenChange, onAddProduct }) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { register, handleSubmit, reset, control, watch, setValue, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: '',
      price: 0,
      stock: 0,
      category: '',
      images: '',
      isFreshPick: false,
    }
  });
  const { toast } = useToast();

  const watchedImages = watch('images');
  const watchedIsFreshPick = watch('isFreshPick');

  React.useEffect(() => {
    if (watchedImages) {
      const urls = watchedImages.split(',').map(url => url.trim()).filter(url => url);
      setImagePreviews(urls);
    } else {
      setImagePreviews([]);
    }
  }, [watchedImages]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const imageUrls = data.images.split(',').map(url => url.trim()).filter(url => url);
    
    // Calculate fresh pick expiry (24 hours from now)
    const freshPickExpiresAt = data.isFreshPick 
      ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      : undefined;
    
    const newProduct = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      images: imageUrls.length > 0 ? imageUrls : ['https://images.unsplash.com/photo-1579621970795-87f54d5921ba?w=400&h=300&fit=crop'],
      freshPickExpiresAt,
    };
    
    onAddProduct(newProduct);
    
    const freshPickMessage = data.isFreshPick ? " Your Fresh Pick listing will be visible for 24 hours!" : "";
    toast({
      title: "✅ Listing Added Successfully!",
      description: `${newProduct.name} has been added to your store and is now live.${freshPickMessage}`,
    });
    
    reset();
    setImagePreviews([]);
    onOpenChange(false);
  };

  const removeImagePreview = (indexToRemove: number) => {
    const currentImages = watchedImages.split(',').map(url => url.trim()).filter(url => url);
    const updatedImages = currentImages.filter((_, index) => index !== indexToRemove);
    setValue('images', updatedImages.join(', '));
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      reset();
      setImagePreviews([]);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Add New Product
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new product to your inventory.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input 
                id="name" 
                {...register('name', { 
                  required: 'Product name is required.',
                  minLength: { value: 2, message: 'Product name must be at least 2 characters.' }
                })} 
                placeholder="e.g. Fresh Tomatoes"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input 
                id="price" 
                type="number" 
                step="0.01"
                {...register('price', { 
                  required: 'Price is required.', 
                  valueAsNumber: true, 
                  min: { value: 0.01, message: 'Price must be greater than 0.' }
                })} 
                placeholder="0.00"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity *</Label>
              <Input 
                id="stock" 
                type="number" 
                {...register('stock', { 
                  required: 'Stock quantity is required.', 
                  valueAsNumber: true, 
                  min: { value: 0, message: 'Stock cannot be negative.' }
                })} 
                placeholder="0"
              />
              {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
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
              <div className="flex items-center space-x-2">
                <Controller
                  name="isFreshPick"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="freshPick"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="freshPick" className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  Fresh Pick (24h auto-expiry)
                </Label>
              </div>
              <p className="text-xs text-gray-500">
                Fresh Pick listings get premium visibility but automatically expire after 24 hours.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="images">Product Images</Label>
              <Input 
                id="images" 
                {...register('images')} 
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              />
              <p className="text-xs text-gray-500">Separate multiple image URLs with commas. Leave empty for default image.</p>
              
              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="mt-3">
                  <Label className="text-sm font-medium">Image Preview:</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {imagePreviews.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-20 object-cover rounded-md border"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1579621970795-87f54d5921ba?w=400&h=300&fit=crop';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImagePreview(index)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => handleDialogClose(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Add Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
