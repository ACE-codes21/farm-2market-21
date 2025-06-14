
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VendorDashboard from '@/components/VendorDashboard';
import BuyerDashboard from '@/components/BuyerDashboard';
import { useAppContext } from '@/contexts/AppContext';

type UserRole = 'vendor' | 'buyer';

interface UserSession {
  email: string;
  role: UserRole;
  isAuthenticated: boolean;
}

const Dashboard = () => {
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const { products, orders, addProduct, editProduct, deleteProduct, addOrder } = useAppContext();
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
        onAddProduct={addProduct}
        onEditProduct={editProduct}
        onDeleteProduct={deleteProduct}
      />
    );
  }

  if (userSession.role === 'buyer') {
    return (
      <BuyerDashboard 
        onRoleChange={handleLogout}
        onPurchase={addOrder}
      />
    );
  }

  return null;
};

export default Dashboard;
