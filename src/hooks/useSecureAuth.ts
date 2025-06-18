
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

interface SecureAuthState {
  user: User | null;
  role: 'vendor' | 'buyer' | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useSecureAuth = () => {
  const [authState, setAuthState] = useState<SecureAuthState>({
    user: null,
    role: null,
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    const getAuthState = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth session error:', error);
          setAuthState({
            user: null,
            role: null,
            isLoading: false,
            isAuthenticated: false
          });
          return;
        }

        if (!session?.user) {
          setAuthState({
            user: null,
            role: null,
            isLoading: false,
            isAuthenticated: false
          });
          return;
        }

        // Fetch user role from profiles table (server-side)
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Profile fetch error:', profileError);
          setAuthState({
            user: session.user,
            role: null,
            isLoading: false,
            isAuthenticated: true
          });
          return;
        }

        setAuthState({
          user: session.user,
          role: profile?.role as 'vendor' | 'buyer' || null,
          isLoading: false,
          isAuthenticated: true
        });

      } catch (error) {
        console.error('Auth state error:', error);
        setAuthState({
          user: null,
          role: null,
          isLoading: false,
          isAuthenticated: false
        });
      }
    };

    getAuthState();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_OUT') {
          // Clear any localStorage remnants
          localStorage.removeItem('userSession');
          setAuthState({
            user: null,
            role: null,
            isLoading: false,
            isAuthenticated: false
          });
        } else if (session?.user) {
          // Re-fetch role from server
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          setAuthState({
            user: session.user,
            role: profile?.role as 'vendor' | 'buyer' || null,
            isLoading: false,
            isAuthenticated: true
          });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return authState;
};
