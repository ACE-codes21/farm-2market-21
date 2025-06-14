
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
  onRoleChange: () => void;
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => void;
  onEditProduct: (productId: number, updatedProduct: Partial<Product>) => void;
  onDeleteProduct: (productId: number) => void;
}

const VendorDashboard: React.FC<VendorDashboardProps> = ({ 
  onRoleChange, 
  products, 
  orders,
  onAddProduct,
  onEditProduct,
  onDeleteProduct
}) => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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
    <div className="min-h-screen bg-secondary">
      <VendorDashboardHeader onRoleChange={onRoleChange} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <VendorStatsGrid stats={stats} />
        
        <VendorProductsTable 
          products={products}
          onAddProductClick={() => setIsAddProductOpen(true)}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
        />

        <VendorRecentOrders orders={orders} />
      </main>

      <AddProductDialog 
        isOpen={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
        onAddProduct={onAddProduct}
      />

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
