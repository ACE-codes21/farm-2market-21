
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Wrench, Users } from 'lucide-react';

const NavigationHeader: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Logo at top-left with glow effect */}
      <div className="absolute top-6 left-6 z-20">
        <h1 className="text-2xl font-bold text-white">
          <span className="text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">Farm</span>
          <span className="text-white">2Market</span>
        </h1>
      </div>

      {/* Navigation Menu in center */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <nav className="flex items-center gap-1 bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-2 py-2">
          <button
            onClick={() => scrollToSection('marketplace')}
            className="group flex items-center gap-2 px-4 py-2 text-white hover:text-green-400 hover:bg-white/10 rounded-full transition-all duration-300"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="text-sm font-medium">Marketplace</span>
          </button>
          <button
            onClick={() => scrollToSection('vendor-tools')}
            className="group flex items-center gap-2 px-4 py-2 text-white hover:text-orange-400 hover:bg-white/10 rounded-full transition-all duration-300"
          >
            <Wrench className="h-4 w-4" />
            <span className="text-sm font-medium">Vendor Tools</span>
          </button>
          <button
            onClick={() => scrollToSection('community')}
            className="group flex items-center gap-2 px-4 py-2 text-white hover:text-purple-400 hover:bg-white/10 rounded-full transition-all duration-300"
          >
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">Community</span>
          </button>
        </nav>
      </div>

      {/* Login/Signup buttons at top-right */}
      <div className="absolute top-6 right-6 z-20 flex gap-3">
        <Link to="/auth?mode=login">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-green-400 border border-green-400/30 hover:bg-green-400/10 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 backdrop-blur-sm"
          >
            Login
          </Button>
        </Link>
        <Link to="/auth?mode=signup">
          <Button 
            size="sm"
            className="bg-green-500 hover:bg-green-400 text-black font-semibold hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all duration-300"
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </>
  );
};

export default NavigationHeader;
