
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VendorDashboard from '@/components/VendorDashboard';
import BuyerDashboard from '@/components/BuyerDashboard';
import { products as initialProducts } from '@/data/market';
import { Product, CartItem, Order } from '@/types';

type UserRole = 'vendor' | 'buyer';

interface UserSession {
  email: string;
  role: UserRole;
  isAuthenticated: boolean;
}

const Dashboard = () => {
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user session
    const sessionData = localStorage.getItem('userSession');
    if (sessionData) {
      const session = JSON.parse(sessionData) as UserSession;
      if (session.isAuthenticated) {
        setUserSession(session);
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    setUserSession(null);
    navigate('/');
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

  const handleEditProduct = (productId: number, updatedProduct: Partial<Product>) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, ...updatedProduct }
          : product
      )
    );
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(prevProducts => 
      prevProducts.filter(product => product.id !== productId)
    );
  };

  const handlePurchase = (purchasedItems: CartItem[]) => {
    // Update stock
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

    // Create new order
    const newOrder: Order = {
      id: orders.length + 1,
      items: purchasedItems,
      total: purchasedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toLocaleDateString(),
      status: 'confirmed'
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);
  };

  if (!userSession) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (userSession.role === 'vendor') {
    return (
      <VendorDashboard 
        onRoleChange={handleLogout}
        products={products}
        orders={orders}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    );
  }

  if (userSession.role === 'buyer') {
    return (
      <BuyerDashboard 
        onRoleChange={handleLogout}
        products={products} 
        onPurchase={handlePurchase}
      />
    );
  }

  return null;
};

export default Dashboard;
