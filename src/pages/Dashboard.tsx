
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        // Check Supabase auth state
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // If no Supabase session, check localStorage (for demo/legacy users)
          const sessionData = localStorage.getItem('userSession');
          if (sessionData) {
            const localSession = JSON.parse(sessionData);
            if (localSession.isAuthenticated) {
              // Redirect authenticated users to demo page
              navigate('/demo');
              return;
            }
          }
          
          // If not authenticated, redirect to homepage
          navigate('/');
          return;
        }

        // If Supabase session exists, redirect to demo page
        navigate('/demo');
        
      } catch (error) {
        console.error('Auth check error:', error);
        navigate('/');
      }
    };

    checkAuthAndRedirect();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        localStorage.removeItem('userSession');
        navigate('/');
      } else if (session) {
        navigate('/demo');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default Dashboard;
