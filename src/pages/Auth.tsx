import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AuthFormLayout from '@/components/auth/AuthFormLayout';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Get role from URL params
  const roleFromUrl = searchParams.get('role') as 'vendor' | 'buyer' | null;
  const modeFromUrl = searchParams.get('mode') as 'login' | 'signup' | null;

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');

    try {
      // Fetch intended user role if roleFromUrl is specified
      if (roleFromUrl) {
        const { data, error: fetchRoleError } = await supabase
          .from('profiles')
          .select('role')
          .eq('email', email)
          .maybeSingle();

        // If user exists and role mismatches, prevent login
        if (data && data.role && data.role !== roleFromUrl) {
          setError(
            `This account is registered as a ${data.role}. You cannot log in as a ${roleFromUrl}.`
          );
          setIsLoading(false);
          return;
        }
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Store role in localStorage immediately for dashboard routing
      if (roleFromUrl) {
        const userSession = {
          email,
          role: roleFromUrl,
          isAuthenticated: true,
        };
        localStorage.setItem('userSession', JSON.stringify(userSession));
        console.log('Role stored in localStorage:', roleFromUrl);
      }

      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      
      // Navigate to dashboard after a short delay to ensure localStorage is set
      setTimeout(() => {
        navigate('/dashboard');
      }, 100);
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            full_name: fullName,
            role: roleFromUrl,
          }
        }
      });

      if (error) throw error;

      // Store role in localStorage immediately for dashboard routing
      if (roleFromUrl) {
        const userSession = {
          email,
          role: roleFromUrl,
          isAuthenticated: true,
        };
        localStorage.setItem('userSession', JSON.stringify(userSession));
        console.log('Role stored in localStorage during signup:', roleFromUrl);
      }

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
      
      // Navigate to dashboard after a short delay to ensure localStorage is set
      setTimeout(() => {
        navigate('/dashboard');
      }, 100);
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: roleFromUrl ? { role: roleFromUrl } : undefined,
        }
      });

      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Social login failed",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const getRoleTitle = () => {
    if (roleFromUrl === 'vendor') return 'Vendor';
    if (roleFromUrl === 'buyer') return 'Buyer';
    return 'User';
  };

  const getDescription = () => {
    if (roleFromUrl) {
      return `Continue as a ${getRoleTitle().toLowerCase()} to access your dashboard`;
    }
    return 'Connect with local vendors and buyers in your community';
  };

  const getTitle = () => {
    if (roleFromUrl) {
      return `${getRoleTitle()} Authentication`;
    }
    return 'Welcome to Farm2Market';
  };

  const defaultTab = modeFromUrl === 'signup' ? 'signup' : 'login';

  return (
    <AuthFormLayout title={getTitle()} description={getDescription()}>
      <Tabs defaultValue={defaultTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-green-400/20">
          <TabsTrigger 
            value="login" 
            className="font-semibold text-gray-300 data-[state=active]:bg-green-500 data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all duration-300"
          >
            Login
          </TabsTrigger>
          <TabsTrigger 
            value="signup" 
            className="font-semibold text-gray-300 data-[state=active]:bg-green-500 data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all duration-300"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        {error && (
          <Alert variant="destructive" className="bg-red-900/20 border-red-500/50 backdrop-blur-sm animate-fade-in">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-200">{error}</AlertDescription>
          </Alert>
        )}

        <TabsContent value="login" className="space-y-4">
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="signup" className="space-y-4">
          <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
        </TabsContent>

        <div className="animate-fade-in" style={{animationDelay: '0.5s'}}>
          <SocialLoginButtons
            onGoogleLogin={() => handleSocialLogin('google')}
            onFacebookLogin={() => handleSocialLogin('facebook')}
            isLoading={isLoading}
          />
        </div>
      </Tabs>
    </AuthFormLayout>
  );
};

export default Auth;
