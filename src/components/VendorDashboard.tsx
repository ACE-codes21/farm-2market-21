import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Plus
} from 'lucide-react';
import { Product, Order, VendorStats } from '@/types';
import { AddProductDialog } from './AddProductDialog';
import { EditProductDialog } from './EditProductDialog';
import { ProductActionsDropdown } from './ProductActionsDropdown';
import { useToast } from '@/hooks/use-toast';

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

  // Calculate stats from actual data
  const stats: VendorStats = {
    totalSales: orders.reduce((sum, order) => sum + order.total, 0),
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0)
  };

  const statsDisplay = [
    { title: 'Total Sales', value: `₹${stats.totalSales.toLocaleString()}`, icon: DollarSign, change: '+12%' },
    { title: 'Products', value: stats.totalProducts.toString(), icon: Package, change: '+3' },
    { title: 'Orders', value: stats.totalOrders.toString(), icon: ShoppingCart, change: '+8%' },
    { title: 'Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: TrendingUp, change: '+15%' },
  ];

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
      {/* Header */}
      <header className="bg-background shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold font-display text-foreground">Vendor Dashboard</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={onRoleChange}
              className="font-semibold"
            >
              Switch Role
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsDisplay.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200 bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-card-foreground">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Products Section */}
        <Card className="mb-8 bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold">Your Products</CardTitle>
            <Button onClick={() => setIsAddProductOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
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
                    <tr key={product.id} className="border-b border-border hover:bg-secondary">
                      <td className="py-4 px-4 font-medium text-card-foreground">{product.name}</td>
                      <td className="py-4 px-4 text-muted-foreground">₹{product.price}</td>
                      <td className="py-4 px-4 text-muted-foreground">{product.stock}</td>
                      <td className="py-4 px-4">
                        <Badge 
                          variant={product.stock > 0 ? (product.stock > 10 ? 'default' : 'destructive') : 'destructive'}
                          className={product.stock > 10 ? 'bg-green-100 text-green-800' : (product.stock > 0 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800')}
                        >
                          {product.stock > 10 ? 'Active' : (product.stock > 0 ? 'Low Stock' : 'Out of Stock')}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <ProductActionsDropdown
                          product={product}
                          onEdit={handleEditProduct}
                          onDelete={handleDeleteProduct}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders Section */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.slice(-5).reverse().map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary">
                    <div>
                      <p className="font-medium text-card-foreground">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-primary">₹{order.total}</p>
                      <Badge variant="default" className="bg-green-100 text-green-800 font-semibold">
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No orders yet</p>
            )}
          </CardContent>
        </Card>
      </div>

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
