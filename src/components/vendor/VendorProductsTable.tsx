
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Product } from '@/types';
import { ProductActionsDropdown } from '@/components/ProductActionsDropdown';
import { Switch } from '@/components/ui/switch';
import { FreshForBadge } from './FreshForBadge';
import { format } from 'date-fns';

interface VendorProductsTableProps {
  products: Product[];
  onAddProductClick: () => void;
  onEditProduct: (product: Product) => void;
  onUpdateProduct: (productId: string, updatedProduct: Partial<Product>) => void;
  onDeleteProduct: (productId: string) => void;
}

export const VendorProductsTable: React.FC<VendorProductsTableProps> = ({
  products,
  onAddProductClick,
  onEditProduct,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  const handleToggleRestock = (product: Product, checked: boolean) => {
    onUpdateProduct(product.id, { restockReminder: checked });
  };

  return (
    <Card className="dark-glass-effect border-slate-700 animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-white">Smart Inventory</CardTitle>
        <Button onClick={onAddProductClick} className="bg-green-500 text-white hover:bg-green-600 btn-hover-glow shadow-green-500/30">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
              <tr>
                <th scope="col" className="py-3 px-6">Product Name</th>
                <th scope="col" className="py-3 px-6">Stock</th>
                <th scope="col" className="py-3 px-6">Expiry Date</th>
                <th scope="col" className="py-3 px-6">Fresh For</th>
                <th scope="col" className="py-3 px-6">Restock Reminder</th>
                <th scope="col" className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors duration-300">
                  <td className="py-4 px-6 font-medium text-white whitespace-nowrap">{product.name}</td>
                  <td className="py-4 px-6">{product.stock} units</td>
                  <td className="py-4 px-6">
                    {product.expiryDate ? format(new Date(product.expiryDate), 'dd MMM yyyy') : 'N/A'}
                  </td>
                  <td className="py-4 px-6">
                    <FreshForBadge expiryDate={product.expiryDate} />
                  </td>
                  <td className="py-4 px-6">
                    <Switch
                      checked={!!product.restockReminder}
                      onCheckedChange={(checked) => handleToggleRestock(product, checked)}
                    />
                  </td>
                  <td className="py-4 px-6 text-right">
                    <ProductActionsDropdown
                      product={product}
                      onEdit={onEditProduct}
                      onDelete={onDeleteProduct}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
