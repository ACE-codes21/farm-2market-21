import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Plus,
  MoreHorizontal 
} from 'lucide-react';

interface VendorDashboardProps {
  onRoleChange: () => void;
}

const VendorDashboard: React.FC<VendorDashboardProps> = ({ onRoleChange }) => {
  const products = [
    { id: 1, name: 'Fresh Bananas (1kg)', price: 2, stock: 25, status: 'active' },
    { id: 2, name: 'Tomatoes (1kg)', price: 3, stock: 18, status: 'active' },
    { id: 3, name: 'Onions (1kg)', price: 1, stock: 5, status: 'low-stock' },
    { id: 4, name: 'Street Samosas (6 pcs)', price: 4, stock: 12, status: 'active' },
    { id: 5, name: 'Fresh Orange Juice', price: 2, stock: 8, status: 'active' },
    { id: 6, name: 'Homemade Pickles', price: 5, stock: 3, status: 'low-stock' },
    { id: 7, name: 'Green Chilies (250g)', price: 1, stock: 15, status: 'active' },
    { id: 8, name: 'Fresh Coriander (bunch)', price: 1, stock: 20, status: 'active' },
    { id: 9, name: 'Ginger (500g)', price: 3, stock: 10, status: 'active' },
    { id: 10, name: 'Coconut Water (fresh)', price: 2, stock: 6, status: 'low-stock' },
    { id: 11, name: 'Roasted Peanuts (200g)', price: 2, stock: 18, status: 'active' },
    { id: 12, name: 'Street-style Pani Puri', price: 3, stock: 25, status: 'active' },
  ];

  const stats = [
    { title: 'Total Sales', value: '$347', icon: DollarSign, change: '+12%' },
    { title: 'Products', value: '23', icon: Package, change: '+3' },
    { title: 'Orders', value: '47', icon: ShoppingCart, change: '+8%' },
    { title: 'Revenue', value: '$235', icon: TrendingUp, change: '+15%' },
  ];

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
          {stats.map((stat, index) => (
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
            <Button className="bg-blue-600 hover:bg-blue-700">
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
                      <td className="py-4 px-4">${product.price}</td>
                      <td className="py-4 px-4">{product.stock}</td>
                      <td className="py-4 px-4">
                        <Badge 
                          variant={product.status === 'active' ? 'default' : 'destructive'}
                          className={product.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {product.status === 'active' ? 'Active' : 'Low Stock'}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorDashboard;
