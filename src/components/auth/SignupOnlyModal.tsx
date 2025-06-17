
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import SignupForm from '@/components/auth/SignupForm';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons';

interface SignupOnlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'vendor' | 'buyer';
}

const SignupOnlyModal: React.FC<SignupOnlyModalProps> = ({
  isOpen,
  onClose,
  role
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getRoleTitle = () => {
    return role === 'vendor' ? 'Vendor' : 'Buyer';
  };

  const getRoleDescription = () => {
    return role === 'vendor' 
      ? 'Start selling your fresh produce to local customers'
      : 'Start shopping for fresh, local produce';
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
            role: role
          }
        }
      });

      if (signupError) throw signupError;

      // Store role in localStorage for immediate dashboard routing
      const userSession = {
        email,
        role,
        isAuthenticated: true,
      };
      localStorage.setItem('userSession', JSON.stringify(userSession));
      console.log('Role stored in localStorage during signup:', role);

      toast({
        title: "Account created!",
        description: `Welcome to Farm2Market! You've signed up as a ${getRoleTitle().toLowerCase()}.`,
      });
      
      onClose();
      
      // Navigate to appropriate role-based route after a short delay
      setTimeout(() => {
        if (role === 'vendor') {
          navigate('/vendor');
        } else {
          navigate('/buyer');
        }
      }, 1000);
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
      console.log('Social login with role:', role);
      
      const redirectUrl = role === 'vendor' ? '/vendor' : '/buyer';
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}${redirectUrl}`,
          queryParams: {
            role: role
          }
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
              {getRoleTitle()} Signup
            </DialogTitle>
            <DialogDescription className="sr-only">
              {getRoleDescription()}
            </DialogDescription>

            {/* Role indicator */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-green-400/10 border border-green-400/30 rounded-full text-green-400 text-sm font-medium backdrop-blur-sm">
                {getRoleTitle()} Registration
              </div>
              <p className="text-white/80 text-sm mt-2">{getRoleDescription()}</p>
            </div>

            {error && (
              <Alert variant="destructive" className="bg-red-900/30 border-red-500/50 backdrop-blur-sm animate-fade-in rounded-xl mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-200 text-sm">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-5">
              <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
              
              <div className="animate-fade-in">
                <SocialLoginButtons 
                  onGoogleLogin={() => handleSocialLogin('google')} 
                  onFacebookLogin={() => handleSocialLogin('facebook')} 
                  isLoading={isLoading} 
                />
              </div>
            </div>

            {/* Already have account link */}
            <div className="text-center mt-6">
              <p className="text-white/60 text-sm">
                Already have an account?{' '}
                <button 
                  onClick={onClose}
                  className="text-green-400 hover:text-green-300 font-medium transition-colors"
                >
                  Use the Log In button in the navigation
                </button>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupOnlyModal;
