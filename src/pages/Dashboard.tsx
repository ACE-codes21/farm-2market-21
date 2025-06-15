import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VendorDashboard from '@/components/VendorDashboard';
import BuyerDashboard from '@/components/BuyerDashboard';
import { useAppContext } from '@/contexts/AppContext';
import { supabase } from '@/integrations/supabase/client';

type UserRole = 'vendor' | 'buyer';

interface UserSession {
  email: string;
  role: UserRole;
  isAuthenticated: boolean;
}

const Dashboard = () => {
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { products, orders, addProduct, editProduct, deleteProduct, addOrder } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check Supabase auth state
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // If no Supabase session, check localStorage (for demo/legacy users)
          const sessionData = localStorage.getItem('userSession');
          if (sessionData) {
            const localSession = JSON.parse(sessionData) as UserSession;
            if (localSession.isAuthenticated) {
              setUserSession(localSession);
              setIsLoading(false);
              return;
            }
          }
          
          navigate('/');
          return;
        }

        // If Supabase session exists, check for role in user metadata or localStorage
        let role: UserRole | null = null;
        
        // First try to get role from user metadata
        if (session.user.user_metadata?.role) {
          role = session.user.user_metadata.role as UserRole;
        } else {
          // Fallback to localStorage
          const sessionData = localStorage.getItem('userSession');
          if (sessionData) {
            const localSession = JSON.parse(sessionData) as UserSession;
            role = localSession.role;
          }
        }

        // If no role is found, redirect to homepage to select role
        if (!role) {
          navigate('/');
          return;
        }

        const userSessionData: UserSession = {
          email: session.user.email || '',
          role,
          isAuthenticated: true,
        };

        setUserSession(userSessionData);
        
        // Update localStorage to keep role consistent
        localStorage.setItem('userSession', JSON.stringify(userSessionData));
        
      } catch (error) {
        console.error('Auth check error:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        localStorage.removeItem('userSession');
        setUserSession(null);
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Clear localStorage
      localStorage.removeItem('userSession');
      setUserSession(null);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: still clear local state and redirect
      localStorage.removeItem('userSession');
      setUserSession(null);
      navigate('/');
    }
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

  if (!userSession) {
    return null; // This should not happen due to redirect in useEffect
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
