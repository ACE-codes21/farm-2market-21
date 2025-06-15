
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart, Store } from 'lucide-react';

interface HeroSectionProps {
  onOpenAuthModal: (role: 'vendor' | 'buyer', mode?: 'login' | 'signup') => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAuthModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative flex items-center justify-center min-h-screen px-4 py-32">
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500/10 via-green-400/15 to-green-500/10 border border-green-400/30 rounded-full text-green-400 text-sm font-medium backdrop-blur-sm shadow-[0_0_30px_rgba(34,197,94,0.2)] mb-8">
            <span className="animate-pulse">🌱</span>
            Connecting Local Communities Through Fresh Food
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            From <span className="text-green-400">Farm</span> to Your
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Market
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover fresh, local produce directly from farmers in your community. 
            Support sustainable agriculture while enjoying the freshest ingredients.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              onClick={() => onOpenAuthModal('buyer', 'signup')}
              className="group relative px-10 py-5 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-black font-bold text-xl rounded-2xl border-2 border-green-400 shadow-[0_0_40px_rgba(34,197,94,0.6)] hover:shadow-[0_0_60px_rgba(34,197,94,0.9)] transform hover:scale-110 transition-all duration-300 min-w-[220px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              <ShoppingCart className="h-6 w-6 mr-3 relative z-10" />
              <span className="relative z-10">Shop Now</span>
              <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform relative z-10" />
            </Button>

            <Button 
              onClick={() => onOpenAuthModal('vendor', 'signup')}
              variant="outline" 
              className="group relative px-10 py-5 bg-transparent hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-orange-400/10 text-white font-bold text-xl rounded-2xl border-2 border-white/30 hover:border-orange-400 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(251,146,60,0.7)] transform hover:scale-110 transition-all duration-300 min-w-[220px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/15 to-orange-400/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              <Store className="h-6 w-6 mr-3 relative z-10" />
              <span className="relative z-10">Sell with Us</span>
              <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform relative z-10" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">500+</div>
              <div className="text-gray-300">Local Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">10K+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-gray-300">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
