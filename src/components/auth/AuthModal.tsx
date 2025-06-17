
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'vendor' | 'buyer' | null;
  defaultMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  role,
  defaultMode = 'login'
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');

    try {
      console.log('Logging in user...');
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (loginError) throw loginError;

      // Get user profile to determine role
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Fetch user profile to get role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        const userRole = profile?.role || 'buyer';
        console.log('User role from profile:', userRole);

        // Store role in localStorage for dashboard routing
        const userSession = {
          email,
          role: userRole,
          isAuthenticated: true,
        };
        localStorage.setItem('userSession', JSON.stringify(userSession));
      }

      toast({
        title: "Welcome back!",
        description: "You've successfully logged in. Use the buttons on the homepage to navigate to your dashboard.",
      });
      
      onClose();
      // No automatic redirect - user can use homepage buttons to navigate
    } catch (error: any) {
      setError(error.message || 'Login failed.');
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    setError('');

    try {
      console.log('Signing up user with role:', role);
      const { error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName,
            role: role || 'buyer'
          }
        }
      });

      if (signupError) throw signupError;

      // Store role in localStorage for dashboard routing
      const userSession = {
        email,
        role: role || 'buyer',
        isAuthenticated: true,
      };
      localStorage.setItem('userSession', JSON.stringify(userSession));
      
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account."
      });
      
      onClose();
      // No automatic redirect - user can use homepage buttons to navigate
    } catch (error: any) {
      setError(error.message || 'Signup failed.');
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive"
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
          redirectTo: `${window.location.origin}/`,
          queryParams: role ? { role } : undefined
        }
      });

      if (error) throw error;
    } catch (error: any) {
      setError(error.message || 'Social login failed');
      toast({
        title: "Social login failed",
        description: error.message,
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 bg-transparent border-none overflow-hidden">
        <div className="relative animate-fade-in">
          {/* Enhanced frosted glass background */}
          <div className="absolute inset-0 backdrop-blur-xl bg-black/60 rounded-3xl border border-white/20 shadow-[0_0_60px_rgba(34,197,94,0.4),0_0_120px_rgba(34,197,94,0.2)]"></div>
          
          {/* Close button */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-black/50 transition-all duration-300"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Main content */}
          <div className="relative z-10 p-8">
            {/* Hidden accessibility elements */}
            <DialogTitle className="sr-only">
              Welcome to Farm2Market
            </DialogTitle>
            <DialogDescription className="sr-only">
              Sign in to your existing account
            </DialogDescription>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-white/70 text-sm">Log in to your account</p>
            </div>

            <Tabs defaultValue={defaultMode} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="bg-red-900/30 border-red-500/50 backdrop-blur-sm animate-fade-in rounded-xl">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-200 text-sm">{error}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="login" className="space-y-5">
                <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
              </TabsContent>

              <TabsContent value="signup" className="space-y-5">
                <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
              </TabsContent>

              <div className="animate-fade-in">
                <SocialLoginButtons 
                  onGoogleLogin={() => handleSocialLogin('google')} 
                  onFacebookLogin={() => handleSocialLogin('facebook')} 
                  isLoading={isLoading} 
                />
              </div>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
