
import React, { useState } from 'react';
import RoleSelectionModal from '@/components/RoleSelectionModal';
import VendorDashboard from '@/components/VendorDashboard';
import BuyerDashboard from '@/components/BuyerDashboard';
import { products as initialProducts } from '@/data/market';
import { Product, CartItem } from '@/types';

type UserRole = 'vendor' | 'buyer' | null;

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleRoleSelect = (role: 'vendor' | 'buyer') => {
    setUserRole(role);
  };

  const handleRoleChange = () => {
    setUserRole(null);
  };

  const handleAddProduct = (newProductData: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
    setProducts(prevProducts => {
      const newProduct: Product = {
        ...newProductData,
        id: prevProducts.length > 0 ? Math.max(...prevProducts.map(p => p.id)) + 1 : 1,
        rating: 0,
        reviews: 0,
      };
      return [...prevProducts, newProduct];
    });
  };

  const handlePurchase = (purchasedItems: CartItem[]) => {
    setProducts(prevProducts => {
      const newProducts = [...prevProducts];
      purchasedItems.forEach(item => {
        const productIndex = newProducts.findIndex(p => p.id === item.id);
        if (productIndex !== -1) {
          newProducts[productIndex].stock -= item.quantity;
        }
      });
      return newProducts;
    });
  };

  if (userRole === 'vendor') {
    return <VendorDashboard 
      onRoleChange={handleRoleChange} 
      products={products}
      onAddProduct={handleAddProduct}
    />;
  }

  if (userRole === 'buyer') {
    return <BuyerDashboard 
      onRoleChange={handleRoleChange} 
      products={products} 
      onPurchase={handlePurchase}
    />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex items-center justify-center">
      <RoleSelectionModal 
        isOpen={userRole === null} 
        onRoleSelect={handleRoleSelect} 
      />
      
      {/* Background content */}
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
          Street Vendor MarketPlace
        </h1>
        <p className="text-xl text-gray-600 mb-8 animate-fade-in">
          Empowering local street vendors and connecting communities through fresh, affordable products
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg animate-fade-in">
            <h3 className="text-2xl font-semibold text-orange-600 mb-4">For Street Vendors</h3>
            <p className="text-gray-600">
              Digitize your business, manage inventory, track sales, and reach more customers in your community.
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg animate-fade-in">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">For Local Buyers</h3>
            <p className="text-gray-600">
              Discover fresh produce, homemade snacks, and authentic local products from trusted street vendors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
