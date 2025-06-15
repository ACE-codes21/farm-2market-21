
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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

  const getDescription = () => {
    if (role) {
      return `Continue as a ${getRoleTitle().toLowerCase()} to access your dashboard`;
    }
    return 'Connect with local vendors and buyers in your community';
  };

  const getTitle = () => {
    if (role) {
      return `${getRoleTitle()} Authentication`;
    }
    return 'Welcome to Farm2Market';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 bg-transparent border-none overflow-hidden">
        <div className="relative">
          {/* Dark gradient background matching landing page */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl"></div>
          
          {/* Animated floating elements */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            {/* Floating farm/market icons */}
            <div className="absolute top-4 left-4 text-green-400/10 text-lg animate-bounce" style={{animationDelay: '0s'}}>🥕</div>
            <div className="absolute top-8 right-6 text-orange-400/10 text-xl animate-bounce" style={{animationDelay: '1s'}}>🍅</div>
            <div className="absolute bottom-8 right-4 text-red-400/10 text-lg animate-bounce" style={{animationDelay: '0.5s'}}>🍎</div>
            <div className="absolute bottom-4 left-6 text-purple-400/10 text-xl animate-bounce" style={{animationDelay: '1.5s'}}>🍆</div>
            
            {/* Grid dots pattern */}
            <div className="absolute inset-0 opacity-5 rounded-3xl">
              <div className="w-full h-full" style={{
                backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }}></div>
            </div>
          </div>
          
          {/* Subtle glow effects */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-500/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/30 backdrop-blur-sm border border-green-400/20 text-green-400/60 hover:text-green-400 hover:bg-black/50 transition-all duration-300"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Main content */}
          <div className="relative z-10 p-8">
            <div className="text-center space-y-4 mb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-600 to-green-400 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)] animate-fade-in">
                <span className="text-2xl font-bold text-black">F2M</span>
              </div>
              <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-fade-in" style={{animationDelay: '0.1s'}}>
                {getTitle()}
              </h2>
              <p className="text-gray-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
                {getDescription()}
              </p>
            </div>

            <Tabs defaultValue={defaultMode} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-green-400/20 animate-fade-in" style={{animationDelay: '0.3s'}}>
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
