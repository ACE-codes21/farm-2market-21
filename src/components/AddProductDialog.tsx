
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { DatePicker } from '@/components/ui/DatePicker';

interface AddProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProduct: (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => void;
}

export const AddProductDialog: React.FC<AddProductDialogProps> = ({ isOpen, onOpenChange, onAddProduct }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    images: [''],
    barcode: '',
  });
  const [expiryDate, setExpiryDate] = useState<Date | undefined>();

  const categories = [
    'Vegetables', 'Fruits', 'Dairy', 'Snacks', 'Spices', 
    'Sweeteners', 'Beverages', 'Grains', 'Herbs'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newProduct: Omit<Product, 'id' | 'rating' | 'reviews'> = {
        name: formData.name,
        price: parseFloat(formData.price),
        images: formData.images.filter(img => img.trim() !== ''),
        category: formData.category,
        stock: parseInt(formData.stock),
        description: formData.description,
        expiryDate: expiryDate?.toISOString(),
        barcode: formData.barcode,
        restockReminder: false,
        vendor: {
          name: "Your Vendor Name",
          phone: "+91-9876543210",
          upiId: "vendor@paytm",
          upiQrCode: "https://images.unsplash.com/photo-1617647905505-96c37d50bb99?w=300&h=300&fit=crop"
        }
      };

      onAddProduct(newProduct);
      
      toast({
        title: "Item listed successfully! 🎉",
        description: `${formData.name} has been added to your inventory.`,
        duration: 5000,
      });

      // Reset form and close dialog
      setFormData({ name: '', price: '', category: '', stock: '', description: '', images: [''], barcode: '' });
      setExpiryDate(undefined);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error adding item",
        description: "There was a problem adding your item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto dark-glass-effect border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-slate-300">Product Name</Label>
            <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-400 focus:ring-green-500" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="text-slate-300">Price (₹)</Label>
              <Input id="price" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-400 focus:ring-green-500" />
            </div>
            <div>
              <Label htmlFor="stock" className="text-slate-300">Stock Quantity</Label>
              <Input id="stock" type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} required className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-400 focus:ring-green-500" />
            </div>
          </div>

          <div>
            <Label htmlFor="category" className="text-slate-300">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="w-full bg-slate-900/50 border-slate-700 text-white focus:ring-green-500">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="cursor-pointer data-[highlighted]:bg-slate-700">{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate" className="text-slate-300">Expiry Date</Label>
              <DatePicker date={expiryDate} setDate={setExpiryDate} />
            </div>
            <div>
              <Label htmlFor="barcode" className="text-slate-300">Barcode (Optional)</Label>
              <Input id="barcode" value={formData.barcode} onChange={(e) => setFormData({ ...formData, barcode: e.target.value })} className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-400 focus:ring-green-500" />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-slate-300">Description</Label>
            <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe your product..." rows={3} className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-400 focus:ring-green-500" />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 btn-hover-glow" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
