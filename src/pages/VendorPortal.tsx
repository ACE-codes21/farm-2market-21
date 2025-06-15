import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import VendorDashboard from '@/components/VendorDashboard';
import { useVendorProducts } from '@/hooks/useVendorProducts';
import { useVendorOrders } from '@/hooks/useVendorOrders';
import { VendorDashboardSkeleton } from '@/components/vendor/VendorDashboardSkeleton';

const VendorPortal = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<'vendor' | 'buyer' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: orders, isLoading: isLoadingOrders } = useVendorOrders();
  const { 
    products, 
    isLoadingProducts, 
    addProduct, 
    editProduct, 
    deleteProduct 
  } = useVendorProducts();

  useEffect(() => {
    const checkAuthAndRole = async () => {
      try {
        console.log('Checking vendor auth and role...');
        
        // Check Supabase auth state
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log('No Supabase session found');
          // If no Supabase session, check localStorage (for demo/legacy users)
          const sessionData = localStorage.getItem('userSession');
          console.log('localStorage userSession:', sessionData);
          
          if (sessionData) {
            const localSession = JSON.parse(sessionData);
            if (localSession.isAuthenticated && localSession.role === 'vendor') {
              console.log('Found vendor role in localStorage');
              setUserRole('vendor');
              setIsLoading(false);
              return;
            }
          }
          
          // If not authenticated, redirect to homepage
          console.log('No vendor authentication found, redirecting to homepage');
          navigate('/');
          return;
        }

        console.log('Supabase session found:', session.user.id);

        // If Supabase session exists, get role from user metadata or localStorage
        let role = session.user.user_metadata?.role;
        console.log('Role from user metadata:', role);
        
        if (!role) {
          const sessionData = localStorage.getItem('userSession');
          if (sessionData) {
            const localSession = JSON.parse(sessionData);
            role = localSession.role;
            console.log('Role from localStorage:', role);
          }
        }

        if (role === 'vendor') {
          console.log('Setting vendor role');
          setUserRole('vendor');
        } else {
          console.log('User is not a vendor, redirecting to buyer dashboard');
          navigate('/buyer');
          return;
        }
        
      } catch (error) {
        console.error('Vendor auth check error:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndRole();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Vendor auth state changed:', event, session?.user?.id);
      
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

  if (isLoading || isLoadingProducts || isLoadingOrders) {
    return <VendorDashboardSkeleton />;
  }

  console.log('Rendering vendor portal with role:', userRole);

  if (userRole === 'vendor') {
    return (
      <VendorDashboard 
        products={products}
        orders={orders || []}
        onAddProduct={addProduct}
        onEditProduct={editProduct}
        onDeleteProduct={deleteProduct}
      />
    );
  }

  // Fallback - redirect to homepage if not vendor
  console.log('User is not a vendor, redirecting to homepage');
  navigate('/');
  return null;
};

export default VendorPortal;
