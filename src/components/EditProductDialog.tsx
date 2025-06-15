
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/data/market';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { DatePicker } from '@/components/ui/DatePicker';
import { ImageUploader } from './ImageUploader';
import { supabase } from '@/integrations/supabase/client';
import { useUserSession } from '@/hooks/useUserSession';

interface EditProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onEditProduct: (updatedProduct: Partial<Product>) => void;
}

export const EditProductDialog: React.FC<EditProductDialogProps> = ({
  isOpen,
  onOpenChange,
  product,
  onEditProduct,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    barcode: '',
  });
  const [expiryDate, setExpiryDate] = useState<Date | undefined>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useUserSession();
  const { toast } = useToast();

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        stock: product.stock.toString(),
        category: product.category,
        barcode: product.barcode || '',
      });
      setExpiryDate(product.expiryDate ? new Date(product.expiryDate) : undefined);
      setImageFile(null);
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product || !formData.name || !formData.price || !formData.stock || !formData.category) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrls = product?.images || [];
      if (imageFile) {
        if (!user) {
          toast({ title: "Authentication Error", description: "You must be logged in to update an image.", variant: "destructive" });
          setIsSubmitting(false);
          return;
        }

        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, imageFile);
          
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
          
        if (urlData.publicUrl) {
          imageUrls = [urlData.publicUrl];
        } else {
          throw new Error("Could not get public URL for the image.");
        }
      }

      onEditProduct({
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category,
        images: imageUrls,
        expiryDate: expiryDate?.toISOString(),
        barcode: formData.barcode,
      });

      toast({
        title: "Product Updated",
        description: "Product has been successfully updated.",
      });

      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error updating product",
        description: error.message || "There was a problem updating your product.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = "bg-slate-900/50 border-slate-700";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md dark-glass-effect border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUploader 
            onFileSelect={setImageFile} 
            reset={!isOpen}
            initialPreviewUrl={product?.images?.[0]} 
          />
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className={inputStyles} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div >
              <Label htmlFor="price">Price (₹) *</Label>
              <Input id="price" type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required className={inputStyles} />
            </div>
            <div>
              <Label htmlFor="stock">Stock Quantity *</Label>
              <Input id="stock" type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} required className={inputStyles} />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className={inputStyles}><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                {categories.filter(cat => cat.value !== 'all').map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <DatePicker date={expiryDate} setDate={setExpiryDate} />
            </div>
            <div>
              <Label htmlFor="barcode">Barcode (Optional)</Label>
              <Input id="barcode" value={formData.barcode} onChange={(e) => setFormData({ ...formData, barcode: e.target.value })} className={inputStyles} />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="btn-hover-glow" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
