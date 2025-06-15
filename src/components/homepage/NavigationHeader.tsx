
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn } from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { UserMenu } from '@/components/UserMenu';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface NavigationHeaderProps {
  onOpenAuthModal: (role: 'vendor' | 'buyer', mode?: 'login' | 'signup') => void;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({ onOpenAuthModal }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const { t } = useTranslation();

  React.useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLoginClick = () => {
    // For login, we don't specify a role - user can login with any existing account
    onOpenAuthModal('buyer', 'login');
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-6">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/">
            <h1 className="text-2xl font-bold text-white">
              <span className="text-green-400">Farm</span>2Market
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-white/80 hover:text-white transition-colors nav-link-animated-underline">
            {t('nav.nav_features')}
          </a>
          <a href="#about" className="text-white/80 hover:text-white transition-colors nav-link-animated-underline">
            {t('nav.nav_about')}
          </a>
          <a href="#contact" className="text-white/80 hover:text-white transition-colors nav-link-animated-underline">
            {t('nav.nav_contact')}
          </a>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            {!isLoading && (
              <>
                {user ? (
                  <UserMenu />
                ) : (
                  <Button
                    onClick={handleLoginClick}
                    variant="ghost"
                    className="text-white hover:bg-white/10 flex items-center gap-2"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>{t('nav.nav_login')}</span>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white p-2"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 md:hidden">
            <div className="p-6 space-y-4">
              <a href="#features" className="block text-white/80 hover:text-white transition-colors">
                {t('nav.nav_features')}
              </a>
              <a href="#about" className="block text-white/80 hover:text-white transition-colors">
                {t('nav.nav_about')}
              </a>
              <a href="#contact" className="block text-white/80 hover:text-white transition-colors">
                {t('nav.nav_contact')}
              </a>
              
              <div className="pt-4 space-y-3 flex flex-col items-start">
                <LanguageSelector />
                
                {!isLoading && (
                  <>
                    {user ? (
                      <UserMenu />
                    ) : (
                      <Button
                        onClick={handleLoginClick}
                        variant="ghost"
                        className="text-white hover:bg-white/10 flex items-center gap-2 p-0"
                      >
                        <LogIn className="h-4 w-4" />
                        <span>{t('nav.nav_login')}</span>
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavigationHeader;
