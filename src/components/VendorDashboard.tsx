
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Street Vendor Dashboard</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={onRoleChange}
              className="hover:bg-gray-50"
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
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Products Section */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold">Your Products</CardTitle>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddProductOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Stock</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium">{product.name}</td>
                      <td className="py-4 px-4">₹{product.price}</td>
                      <td className="py-4 px-4">{product.stock}</td>
                      <td className="py-4 px-4">
                        <Badge 
                          variant={product.stock > 10 ? 'default' : 'destructive'}
                          className={product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
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
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.slice(-5).reverse().map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                      <p className="text-sm text-gray-600">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">₹{order.total}</p>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No orders yet</p>
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
