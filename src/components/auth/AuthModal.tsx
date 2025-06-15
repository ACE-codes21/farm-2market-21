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

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      if (session) {
        onClose();
      }
    };
    if (isOpen) {
      checkAuth();
    }
  }, [isOpen, onClose]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');
    try {
      const {
        error
      } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;

      // Store role in localStorage for dashboard routing
      if (role) {
        const userSession = {
          email,
          role,
          isAuthenticated: true
        };
        localStorage.setItem('userSession', JSON.stringify(userSession));
      }
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in."
      });
      onClose();
    } catch (error: any) {
      setError(error.message);
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
      const {
        error
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            full_name: fullName,
            role
          }
        }
      });
      if (error) throw error;

      // Store role in localStorage for immediate use
      if (role) {
        const userSession = {
          email,
          role,
          isAuthenticated: true
        };
        localStorage.setItem('userSession', JSON.stringify(userSession));
      }
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account."
      });
      onClose();
    } catch (error: any) {
      setError(error.message);
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
      const {
        error
      } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: role ? {
            role
          } : undefined
        }
      });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Social login failed",
        description: error.message,
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const getRoleTitle = () => {
    if (role === 'vendor') return 'Vendor';
    if (role === 'buyer') return 'Buyer';
    return 'User';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 bg-transparent border-none overflow-hidden">
        <div className="relative animate-fade-in opacity-0 transition-opacity duration-700 data-[state=open]:opacity-100 data-[state=open]:animate-[fadeInUp_0.5s_ease-out]">
          {/* Enhanced frosted glass background with dark translucent blur */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md rounded-3xl shadow-xl ring-1 ring-white/10 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/5 before:to-transparent before:p-[1px] before:content-[''] after:absolute after:inset-[1px] after:rounded-3xl after:bg-gradient-to-br after:from-black/20 after:to-black/5"></div>
          
          {/* Subtle ambient glow effects */}
          <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-lime-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>

          {/* Close button with glow on hover */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/30 backdrop-blur-sm ring-1 ring-white/10 text-white/70 hover:text-white hover:bg-black/50 hover:ring-lime-500/50 hover:ring-2 hover:ring-offset-2 hover:ring-offset-transparent hover:scale-110 transition-all duration-300"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Main content */}
          <div className="relative z-10 p-6 sm:p-8">
            {/* Hidden accessibility elements */}
            <DialogTitle className="sr-only">
              {role ? `${getRoleTitle()} Authentication` : 'Welcome to Farm2Market'}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {role ? `Continue as a ${getRoleTitle().toLowerCase()} to access your dashboard` : 'Connect with local vendors and buyers in your community'}
            </DialogDescription>

            <Tabs defaultValue={defaultMode} className="space-y-4 sm:space-y-6">
              {/* Enhanced tabs with neon glow effect */}
              <TabsList className="grid w-full grid-cols-2 bg-black/30 backdrop-blur-sm ring-1 ring-white/10 p-1 rounded-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <TabsTrigger 
                  value="login" 
                  className="text-sm font-semibold text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-lime-500 data-[state=active]:to-lime-400 data-[state=active]:text-black data-[state=active]:ring-2 data-[state=active]:ring-lime-500 data-[state=active]:shadow-lg data-[state=active]:shadow-lime-500/25 transition-all duration-300 hover:text-white hover:scale-105 font-sans rounded-xl py-2 sm:py-3"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="text-sm font-semibold text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-lime-500 data-[state=active]:to-lime-400 data-[state=active]:text-black data-[state=active]:ring-2 data-[state=active]:ring-lime-500 data-[state=active]:shadow-lg data-[state=active]:shadow-lime-500/25 transition-all duration-300 hover:text-white hover:scale-105 font-sans rounded-xl py-2 sm:py-3"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {error && (
                <Alert variant="destructive" className="bg-red-900/30 border-red-500/50 backdrop-blur-sm animate-fade-in rounded-xl">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-200 text-sm font-sans">{error}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="login" className="space-y-4 sm:space-y-5">
                <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 sm:space-y-5">
                <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
              </TabsContent>

              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
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
