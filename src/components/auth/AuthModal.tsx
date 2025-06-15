
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

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, role, defaultMode = 'login' }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Store role in localStorage for dashboard routing
      if (role) {
        const userSession = {
          email,
          role,
          isAuthenticated: true,
        };
        localStorage.setItem('userSession', JSON.stringify(userSession));
      }

      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      
      onClose();
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
            role,
          }
        }
      });

      if (error) throw error;

      // Store role in localStorage for immediate use
      if (role) {
        const userSession = {
          email,
          role,
          isAuthenticated: true,
        };
        localStorage.setItem('userSession', JSON.stringify(userSession));
      }

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
      
      onClose();
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
          queryParams: role ? { role } : undefined,
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
    if (role === 'vendor') return 'Vendor';
    if (role === 'buyer') return 'Buyer';
    return 'User';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 bg-transparent border-none overflow-hidden">
        <div className="relative">
          {/* Dark gradient background matching landing page */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl"></div>
          
          {/* Subtle animated elements */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute top-2 left-2 text-green-400/5 text-sm animate-bounce" style={{animationDelay: '0s'}}>🥕</div>
            <div className="absolute top-3 right-3 text-orange-400/5 text-sm animate-bounce" style={{animationDelay: '1s'}}>🍅</div>
            <div className="absolute bottom-3 right-2 text-red-400/5 text-sm animate-bounce" style={{animationDelay: '0.5s'}}>🍎</div>
            
            {/* Grid dots pattern */}
            <div className="absolute inset-0 opacity-3 rounded-2xl">
              <div className="w-full h-full" style={{
                backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}></div>
            </div>
          </div>
          
          {/* Subtle glow effect */}
          <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-green-500/5 rounded-full blur-xl"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/30 backdrop-blur-sm border border-green-400/20 text-green-400/60 hover:text-green-400 hover:bg-black/50 transition-all duration-300"
          >
            <X className="h-3 w-3" />
          </button>

          {/* Main content */}
          <div className="relative z-10 p-6">
            {/* Hidden title and description for accessibility */}
            <DialogTitle className="sr-only">
              {role ? `${getRoleTitle()} Authentication` : 'Welcome to Farm2Market'}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {role ? `Continue as a ${getRoleTitle().toLowerCase()} to access your dashboard` : 'Connect with local vendors and buyers in your community'}
            </DialogDescription>

            <div className="text-center space-y-3 mb-6">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-green-600 to-green-400 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)] animate-fade-in">
                <span className="text-lg font-bold text-black">F2M</span>
              </div>
              <h2 className="text-xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-fade-in" style={{animationDelay: '0.1s'}}>
                {role ? `${getRoleTitle()} Portal` : 'Welcome'}
              </h2>
            </div>

            <Tabs defaultValue={defaultMode} className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-green-400/20 animate-fade-in" style={{animationDelay: '0.2s'}}>
                <TabsTrigger 
                  value="login" 
                  className="text-sm font-medium text-gray-300 data-[state=active]:bg-green-500 data-[state=active]:text-black data-[state=active]:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="text-sm font-medium text-gray-300 data-[state=active]:bg-green-500 data-[state=active]:text-black data-[state=active]:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {error && (
                <Alert variant="destructive" className="bg-red-900/20 border-red-500/50 backdrop-blur-sm animate-fade-in">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-200 text-sm">{error}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="login" className="space-y-4">
                <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
              </TabsContent>

              <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
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
