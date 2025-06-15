
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Store, ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'vendor' | 'buyer') => {
    navigate(`/auth?role=${role}&mode=signup`);
  };

  return (
    <>
      {/* Main content - centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          {/* Main title - large serif font */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight">
            <span className="font-serif">Fresh From the Street</span>
          </h1>
          
          {/* Subtitle - clean sans-serif */}
          <p className="text-xl md:text-2xl text-white/90 mb-16 font-sans font-light tracking-wide">
            Empowering Vendors. Nourishing Neighborhoods.
          </p>
          
          {/* Two large buttons side by side */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              onClick={() => handleRoleSelect('buyer')}
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 px-12 py-6 text-xl font-semibold rounded-2xl group min-w-[200px]"
            >
              <ShoppingBag className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              Shop Now
            </Button>
            
            <Button 
              onClick={() => handleRoleSelect('vendor')}
              size="lg" 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 shadow-2xl hover:shadow-white/25 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 px-12 py-6 text-xl font-semibold rounded-2xl group min-w-[200px] backdrop-blur-sm"
            >
              <Store className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              Sell with Us
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll down arrow at bottom center */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <ArrowDown className="h-8 w-8 text-white/70" />
      </div>

      {/* Optional: Browse demo section at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-8">
        <div className="text-center">
          <Button 
            onClick={() => navigate('/demo')}
            variant="ghost" 
            className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            Browse Market Demo
          </Button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
