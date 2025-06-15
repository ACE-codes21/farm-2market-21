import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Product, Order, VendorStats } from '@/types';
import { AddProductDialog } from './AddProductDialog';
import { EditProductDialog } from './EditProductDialog';
import { VendorDashboardHeader } from './vendor/VendorDashboardHeader';
import { VendorStatsGrid } from './vendor/VendorStatsGrid';
import { VendorProductsTable } from './vendor/VendorProductsTable';
import { VendorRecentOrders } from './vendor/VendorRecentOrders';

interface VendorDashboardProps {
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => void;
  onEditProduct: (productId: number, updatedProduct: Partial<Product>) => void;
  onDeleteProduct: (productId: number) => void;
}

const VendorDashboard: React.FC<VendorDashboardProps> = ({ 
  products, 
  orders,
  onAddProduct,
  onEditProduct,
  onDeleteProduct
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const { toast } = useToast();

  const stats: VendorStats = {
    totalSales: orders.reduce((sum, order) => sum + order.total, 0),
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0)
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditProductOpen(true);
  };

  const handleDeleteProduct = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      onDeleteProduct(productId);
      toast({
        variant: "destructive",
        title: "Product Deleted",
        description: `${product.name} has been removed from your inventory.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <VendorDashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold font-display text-foreground mb-2">Dashboard Overview</h2>
          <p className="text-muted-foreground">Manage your products and track your business performance</p>
        </div>
        
        <VendorStatsGrid stats={stats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VendorProductsTable 
              products={products}
              onAddProductClick={() => {}}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          </div>
          <div className="lg:col-span-1">
            <VendorRecentOrders orders={orders} />
          </div>
        </div>
      </main>

      <AddProductDialog onAddProduct={onAddProduct} />

      <EditProductDialog
        isOpen={isEditProductOpen}
        onOpenChange={setIsEditProductOpen}
        product={selectedProduct}
        onEditProduct={onEditProduct}
      />
    </div>
  );
};

export default VendorDashboard;
