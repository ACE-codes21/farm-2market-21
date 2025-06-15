
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface AddProductDialogProps {
  onAddProduct: (product: Omit<Product, 'id'>) => void;
}

export const AddProductDialog: React.FC<AddProductDialogProps> = ({ onAddProduct }) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    images: [''],
  });

  const categories = [
    'Vegetables', 'Fruits', 'Dairy', 'Snacks', 'Spices', 
    'Sweeteners', 'Beverages', 'Grains', 'Herbs'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newProduct: Omit<Product, 'id'> = {
        name: formData.name,
        price: parseFloat(formData.price),
        rating: 4.5, // Default rating for new products
        reviews: 0,
        images: formData.images.filter(img => img.trim() !== ''),
        category: formData.category,
        stock: parseInt(formData.stock),
        description: formData.description,
        vendor: {
          name: "Your Vendor Name", // This would come from user profile
          phone: "+91-9876543210",
          upiId: "vendor@paytm",
          upiQrCode: "https://images.unsplash.com/photo-1617647905505-96c37d50bb99?w=300&h=300&fit=crop"
        }
      };

      onAddProduct(newProduct);
      
      // Show success toast
      toast({
        title: "Item listed successfully! 🎉",
        description: `${formData.name} has been added to your inventory.`,
        duration: 5000,
      });

      // Reset form and close dialog
      setFormData({
        name: '',
        price: '',
        category: '',
        stock: '',
        description: '',
        images: [''],
      });
      setOpen(false);
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

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your product..."
              rows={3}
            />
          </div>

          <div>
            <Label>Product Images (URLs)</Label>
            {formData.images.map((image, index) => (
              <Input
                key={index}
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder="Enter image URL"
                className="mt-2"
              />
            ))}
            <Button type="button" onClick={addImageField} variant="outline" className="mt-2">
              Add Another Image
            </Button>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
