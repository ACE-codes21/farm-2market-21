import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import BuyerDashboard from '@/components/BuyerDashboard';
import { useAppContext } from '@/contexts/AppContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<'vendor' | 'buyer' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const checkAuthAndRole = async () => {
      try {
        console.log('Checking buyer auth and role...');
        
        // Check Supabase auth state
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log('No Supabase session found');
          // If no Supabase session, check localStorage (for demo/legacy users)
          const sessionData = localStorage.getItem('userSession');
          console.log('localStorage userSession:', sessionData);
          
          if (sessionData) {
            const localSession = JSON.parse(sessionData);
            if (localSession.isAuthenticated && localSession.role === 'buyer') {
              console.log('Found buyer role in localStorage');
              setUserRole('buyer');
              setIsLoading(false);
              return;
            }
          }
          
          // If not authenticated, redirect to homepage
          console.log('No buyer authentication found, redirecting to homepage');
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

        if (role === 'buyer') {
          console.log('Setting buyer role');
          setUserRole('buyer');
        } else if (role === 'vendor') {
          console.log('User is a vendor, redirecting to vendor portal');
          navigate('/vendor');
          return;
        } else {
          console.log('No valid role found, redirecting to homepage');
          navigate('/');
          return;
        }
        
      } catch (error) {
        console.error('Buyer auth check error:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndRole();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Buyer auth state changed:', event, session?.user?.id);
      
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
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  console.log('Rendering buyer dashboard with role:', userRole);

  if (userRole === 'buyer') {
    return (
      <BuyerDashboard 
        onRoleChange={handleRoleChange} 
      />
    );
  }

  // Fallback - redirect to homepage if not buyer
  console.log('User is not a buyer, redirecting to homepage');
  navigate('/');
  return null;
};

export default Dashboard;
