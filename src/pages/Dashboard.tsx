
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import VendorDashboard from '@/components/VendorDashboard';
import BuyerDashboard from '@/components/BuyerDashboard';
import { useAppContext } from '@/contexts/AppContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<'vendor' | 'buyer' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { products, orders, addProduct, editProduct, deleteProduct, addOrder } = useAppContext();

  useEffect(() => {
    const checkAuthAndRole = async () => {
      try {
        // Check Supabase auth state
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // If no Supabase session, check localStorage (for demo/legacy users)
          const sessionData = localStorage.getItem('userSession');
          if (sessionData) {
            const localSession = JSON.parse(sessionData);
            if (localSession.isAuthenticated && localSession.role) {
              setUserRole(localSession.role);
              setIsLoading(false);
              return;
            }
          }
          
          // If not authenticated, redirect to homepage
          navigate('/');
          return;
        }

        // If Supabase session exists, get role from user metadata or localStorage
        let role = session.user.user_metadata?.role;
        
        if (!role) {
          const sessionData = localStorage.getItem('userSession');
          if (sessionData) {
            const localSession = JSON.parse(sessionData);
            role = localSession.role;
          }
        }

        if (role === 'vendor' || role === 'buyer') {
          setUserRole(role);
        } else {
          // If no role found, redirect to demo for role selection
          navigate('/demo');
          return;
        }
        
      } catch (error) {
        console.error('Auth check error:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndRole();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        localStorage.removeItem('userSession');
        navigate('/');
      } else if (session) {
        // Re-check role when session changes
        checkAuthAndRole();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleRoleChange = () => {
    setUserRole(null);
    navigate('/demo');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (userRole === 'vendor') {
    return (
      <VendorDashboard 
        onRoleChange={handleRoleChange} 
        products={products}
        orders={orders}
        onAddProduct={addProduct}
        onEditProduct={editProduct}
        onDeleteProduct={deleteProduct}
      />
    );
  }

  if (userRole === 'buyer') {
    return (
      <BuyerDashboard 
        onRoleChange={handleRoleChange} 
        onPurchase={addOrder}
      />
    );
  }

  // Fallback - redirect to demo if no role
  navigate('/demo');
  return null;
};

export default Dashboard;
