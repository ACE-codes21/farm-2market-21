
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Store, ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'vendor' | 'buyer') => {
    navigate(`/auth?role=${role}&mode=signup`);
  };

  return (
    <>
      {/* Main content - centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-6xl mx-auto">
          {/* Main title with enhanced animations and typography */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight tracking-wider animate-fade-in-up opacity-0 animation-delay-300">
            <span 
              className="block text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] transform transition-all duration-700 ease-out hover:scale-105"
              style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
            >
              Fresh From the
            </span>
            <br />
            <span 
              className="block text-green-400 drop-shadow-[0_0_40px_rgba(34,197,94,1)] font-extrabold neon-text pulse-glow tracking-widest transform transition-all duration-700 ease-out hover:scale-105"
              style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
            >
              Street
            </span>
          </h1>
          
          {/* Subtitle with refined typography and animation */}
          <p 
            className="text-lg md:text-xl text-gray-400 mb-16 font-light tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] opacity-0 animate-fade-in-up max-w-3xl mx-auto"
            style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
          >
            Empowering Vendors. Nourishing Neighborhoods.
          </p>
          
          {/* Enhanced buttons with smooth animations */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '1.6s', animationFillMode: 'forwards' }}
          >
            <Button 
              onClick={() => handleRoleSelect('buyer')}
              size="lg" 
              className="bg-green-500 hover:bg-green-400 text-black font-bold shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:shadow-[0_0_50px_rgba(34,197,94,0.8)] transform hover:scale-110 transition-all duration-500 ease-out px-16 py-8 text-2xl rounded-2xl group min-w-[280px] border-2 border-green-400 animate-zoom-in"
              style={{ animationDelay: '2s', animationFillMode: 'forwards' }}
            >
              <ShoppingBag className="mr-4 h-8 w-8 group-hover:rotate-12 transition-transform duration-300" />
              Shop Now
            </Button>
            
            <Button 
              onClick={() => handleRoleSelect('vendor')}
              size="lg" 
              variant="outline"
              className="border-2 border-green-400 text-green-400 hover:bg-green-400/10 hover:text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] transform hover:scale-110 transition-all duration-500 ease-out px-16 py-8 text-2xl font-bold rounded-2xl group min-w-[280px] backdrop-blur-sm animate-zoom-in"
              style={{ animationDelay: '2.2s', animationFillMode: 'forwards' }}
            >
              <Store className="mr-4 h-8 w-8 group-hover:rotate-12 transition-transform duration-300" />
              Sell with Us
            </Button>
          </div>
          
          {/* Enhanced tagline */}
          <div 
            className="mt-16 text-green-400/70 text-sm tracking-wider opacity-0 animate-fade-in-up"
            style={{ animationDelay: '2.6s', animationFillMode: 'forwards' }}
          >
            <span className="pulse-glow">CONNECTING FARMERS TO COMMUNITIES</span>
          </div>
        </div>
      </div>

      {/* Enhanced animated scroll hint */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce opacity-0 animate-fade-in-up cursor-pointer group"
        style={{ animationDelay: '3s', animationFillMode: 'forwards' }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-green-400/80 text-xs tracking-wider group-hover:text-green-300 transition-colors duration-300">
            SCROLL DOWN
          </span>
          <ChevronDown className="h-6 w-6 text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)] group-hover:text-green-300 group-hover:drop-shadow-[0_0_15px_rgba(34,197,94,0.7)] transition-all duration-300" />
        </div>
      </div>

      {/* Bottom section with demo link - enhanced */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/90 to-transparent p-8">
        <div className="text-center">
          <Button 
            onClick={() => navigate('/demo')}
            variant="ghost" 
            className="text-green-400/80 hover:text-green-400 hover:bg-green-400/10 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-500 border border-green-400/20 hover:border-green-400/40 transform hover:scale-105"
          >
            Browse Market Demo
          </Button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
