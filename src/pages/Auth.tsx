
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Store role in localStorage for dashboard routing
      if (roleFromUrl) {
        const userSession = {
          email,
          role: roleFromUrl,
          isAuthenticated: true,
        };
        localStorage.setItem('userSession', JSON.stringify(userSession));
      }

      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      
      navigate('/dashboard');
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
            role: roleFromUrl, // Store role in user metadata
          }
        }
      });

      if (error) throw error;

      // Store role in localStorage for immediate use
      if (roleFromUrl) {
        const userSession = {
          email,
          role: roleFromUrl,
          isAuthenticated: true,
        };
        localStorage.setItem('userSession', JSON.stringify(userSession));
      }

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
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
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="login" className="font-semibold">Login</TabsTrigger>
          <TabsTrigger value="signup" className="font-semibold">Sign Up</TabsTrigger>
        </TabsList>

        {error && (
          <Alert variant="destructive" className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <TabsContent value="login" className="space-y-4">
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="signup" className="space-y-4">
          <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
        </TabsContent>

        <SocialLoginButtons
          onGoogleLogin={() => handleSocialLogin('google')}
          onFacebookLogin={() => handleSocialLogin('facebook')}
          isLoading={isLoading}
        />
      </Tabs>
    </AuthFormLayout>
  );
};

export default Auth;
