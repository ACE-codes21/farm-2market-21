import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Product, Order, VendorStats } from '@/types';
import { AddProductDialog } from './AddProductDialog';
import { EditProductDialog } from './EditProductDialog';
import { VendorDashboardHeader } from './vendor/VendorDashboardHeader';
import { VendorStatsGrid } from './vendor/VendorStatsGrid';
import { VendorProductsTable } from './vendor/VendorProductsTable';
import { VendorRecentOrders } from './vendor/VendorRecentOrders';
import { DemandForecastPanel } from './vendor/DemandForecastPanel';

interface VendorDashboardProps {
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => void;
  onEditProduct: (productId: string, updatedProduct: Partial<Product>) => void;
  onDeleteProduct: (productId: string) => void;
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
  const [isAddProductDialogOpen, setAddProductDialogOpen] = useState(false);
  const { toast } = useToast();

  const stats: VendorStats = {
    totalSales: orders.reduce((sum, order) => sum + order.total, 0),
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0)
  };

  const handleEditProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsEditProductOpen(true);
  };

  const handleUpdateProduct = (productId: string, updatedProduct: Partial<Product>) => {
    onEditProduct(productId, updatedProduct);
  };
  
  const handleDeleteProduct = (productId: string) => {
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
    <div className="min-h-screen bg-slate-900 text-gray-200">
      <VendorDashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold font-display gradient-text mb-2">Dashboard Overview</h2>
          <p className="text-slate-400">Manage your products and track your business performance</p>
        </div>
        
        <VendorStatsGrid stats={stats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <VendorProductsTable 
              products={products}
              onAddProductClick={() => setAddProductDialogOpen(true)}
              onEditProduct={handleEditProductClick}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
            <VendorRecentOrders orders={orders} />
          </div>
          <div className="lg:col-span-1">
            <DemandForecastPanel />
          </div>
        </div>
      </main>

      <AddProductDialog 
        isOpen={isAddProductDialogOpen}
        onOpenChange={setAddProductDialogOpen}
        onAddProduct={onAddProduct} 
      />

      {selectedProduct && <EditProductDialog
        isOpen={isEditProductOpen}
        onOpenChange={setIsEditProductOpen}
        product={selectedProduct}
        onEditProduct={(updatedProduct) => onEditProduct(selectedProduct.id, updatedProduct)}
      />}
    </div>
  );
};

export default VendorDashboard;
