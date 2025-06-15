
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { UserDropdown } from '@/components/UserDropdown';

interface NavigationHeaderProps {
  onOpenAuthModal: (role: 'vendor' | 'buyer', mode?: 'login' | 'signup') => void;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({ onOpenAuthModal }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-6">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-white">
            <span className="text-green-400">Farm</span>2Market
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-white/80 hover:text-white transition-colors">
            Features
          </a>
          <a href="#about" className="text-white/80 hover:text-white transition-colors">
            About
          </a>
          <a href="#contact" className="text-white/80 hover:text-white transition-colors">
            Contact
          </a>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <UserDropdown />
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
                Features
              </a>
              <a href="#about" className="block text-white/80 hover:text-white transition-colors">
                About
              </a>
              <a href="#contact" className="block text-white/80 hover:text-white transition-colors">
                Contact
              </a>
              
              <div className="pt-4 space-y-3 flex flex-col items-start">
                <LanguageSelector />
                <UserDropdown />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavigationHeader;
