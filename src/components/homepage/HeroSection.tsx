import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Store, ArrowDown } from 'lucide-react';
const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const handleRoleSelect = (role: 'vendor' | 'buyer') => {
    navigate(`/auth?role=${role}&mode=signup`);
  };
  return <>
      {/* Main content - centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          {/* Main title with neon glow effect */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight">
            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] font-thin">Fresh From the</span>
            <br />
            <span className="text-green-400 drop-shadow-[0_0_30px_rgba(34,197,94,0.8)] font-extrabold animate-pulse">Street</span>
          </h1>
          
          {/* Subtitle with subtle glow */}
          <p className="text-xl md:text-2xl text-gray-300 mb-16 font-light tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            Empowering Vendors. Nourishing Neighborhoods.
          </p>
          
          {/* Two large buttons with neon styling */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Button onClick={() => handleRoleSelect('buyer')} size="lg" className="bg-green-500 hover:bg-green-400 text-black font-bold shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:shadow-[0_0_40px_rgba(34,197,94,0.8)] transform hover:scale-105 transition-all duration-300 px-16 py-8 text-2xl rounded-2xl group min-w-[280px] border-2 border-green-400">
              <ShoppingBag className="mr-4 h-8 w-8 group-hover:rotate-12 transition-transform duration-300" />
              Shop Now
            </Button>
            
            <Button onClick={() => handleRoleSelect('vendor')} size="lg" variant="outline" className="border-2 border-green-400 text-green-400 hover:bg-green-400/10 hover:text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transform hover:scale-105 transition-all duration-300 px-16 py-8 text-2xl font-bold rounded-2xl group min-w-[280px] backdrop-blur-sm">
              <Store className="mr-4 h-8 w-8 group-hover:rotate-12 transition-transform duration-300" />
              Sell with Us
            </Button>
          </div>
          
          {/* Additional glow text elements */}
          <div className="mt-16 text-green-400/60 text-sm tracking-wider">
            <span className="animate-pulse">CONNECTING FARMERS TO COMMUNITIES</span>
          </div>
        </div>
      </div>

      {/* Animated scroll down arrow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <ArrowDown className="h-8 w-8 text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
      </div>

      {/* Bottom section with demo link */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-8">
        <div className="text-center">
          <Button onClick={() => navigate('/demo')} variant="ghost" className="text-green-400/80 hover:text-green-400 hover:bg-green-400/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300 border border-green-400/20">
            Browse Market Demo
          </Button>
        </div>
      </div>
    </>;
};
export default HeroSection;