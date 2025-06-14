
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { Product } from '@/types';
import { ProductActionsDropdown } from '@/components/ProductActionsDropdown';

interface VendorProductsTableProps {
  products: Product[];
  onAddProductClick: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
}

export const VendorProductsTable: React.FC<VendorProductsTableProps> = ({
  products,
  onAddProductClick,
  onEditProduct,
  onDeleteProduct,
}) => {
  return (
    <Card className="mb-8 bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Your Products</CardTitle>
        <Button onClick={onAddProductClick} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Product</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Price</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Stock</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="py-4 px-4 font-medium text-card-foreground">{product.name}</td>
                  <td className="py-4 px-4 text-muted-foreground">₹{product.price}</td>
                  <td className="py-4 px-4 text-muted-foreground">{product.stock}</td>
                  <td className="py-4 px-4">
                    <Badge 
                      variant={product.stock > 0 ? 'default' : 'destructive'}
                      className={
                        product.stock > 10 ? 'bg-green-100 text-green-800 border-green-200' :
                        product.stock > 0 ? 'bg-orange-100 text-orange-800 border-orange-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      }
                    >
                      {product.stock > 10 ? 'In Stock' : (product.stock > 0 ? 'Low Stock' : 'Out of Stock')}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
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
