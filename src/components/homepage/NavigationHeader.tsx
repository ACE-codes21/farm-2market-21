
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Store, ShoppingCart, Users, Menu, X } from 'lucide-react';
import AuthModal from '@/components/auth/AuthModal';

const NavigationHeader: React.FC = () => {
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    role: 'vendor' | 'buyer' | null;
    mode: 'login' | 'signup';
  }>({
    isOpen: false,
    role: null,
    mode: 'login'
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openAuthModal = (role: 'vendor' | 'buyer', mode: 'login' | 'signup' = 'signup') => {
    setAuthModal({
      isOpen: true,
      role,
      mode
    });
  };

  const closeAuthModal = () => {
    setAuthModal({
      isOpen: false,
      role: null,
      mode: 'login'
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="relative z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                <span className="text-green-400">Farm</span>2Market
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('marketplace')}
                className="group flex items-center space-x-2 text-white/80 hover:text-green-400 transition-all duration-300 hover:scale-105"
              >
                <ShoppingCart className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                <span className="font-medium">Marketplace</span>
              </button>
              
              <button 
                onClick={() => scrollToSection('vendor-tools')}
                className="group flex items-center space-x-2 text-white/80 hover:text-orange-400 transition-all duration-300 hover:scale-105"
              >
                <Store className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                <span className="font-medium">Vendor Tools</span>
              </button>
              
              <button 
                onClick={() => scrollToSection('community')}
                className="group flex items-center space-x-2 text-white/80 hover:text-purple-400 transition-all duration-300 hover:scale-105"
              >
                <Users className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                <span className="font-medium">Community</span>
              </button>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => openAuthModal('buyer', 'login')}
                className="text-white hover:text-green-400 hover:bg-white/10 transition-all duration-300"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => openAuthModal('buyer', 'signup')}
                className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-black font-semibold px-6 py-2 rounded-xl border-2 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transform hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:text-green-400 transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/20 shadow-2xl">
              <div className="px-4 py-6 space-y-4">
                <button 
                  onClick={() => scrollToSection('marketplace')}
                  className="flex items-center space-x-3 w-full text-left text-white/80 hover:text-green-400 transition-colors duration-300 py-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Marketplace</span>
                </button>
                
                <button 
                  onClick={() => scrollToSection('vendor-tools')}
                  className="flex items-center space-x-3 w-full text-left text-white/80 hover:text-orange-400 transition-colors duration-300 py-2"
                >
                  <Store className="h-5 w-5" />
                  <span>Vendor Tools</span>
                </button>
                
                <button 
                  onClick={() => scrollToSection('community')}
                  className="flex items-center space-x-3 w-full text-left text-white/80 hover:text-purple-400 transition-colors duration-300 py-2"
                >
                  <Users className="h-5 w-5" />
                  <span>Community</span>
                </button>

                <div className="pt-4 border-t border-white/20 space-y-3">
                  <Button 
                    variant="ghost" 
                    onClick={() => openAuthModal('buyer', 'login')}
                    className="w-full text-white hover:text-green-400 hover:bg-white/10 transition-all duration-300"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={() => openAuthModal('buyer', 'signup')}
                    className="w-full bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-black font-semibold"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModal.isOpen} 
        onClose={closeAuthModal} 
        role={authModal.role} 
        defaultMode={authModal.mode} 
      />
    </>
  );
};

export default NavigationHeader;
