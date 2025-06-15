
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Store, ArrowRight, Sparkles } from 'lucide-react';
import AuthModal from '@/components/auth/AuthModal';

const HeroSection: React.FC = () => {
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    role: 'vendor' | 'buyer' | null;
    mode: 'login' | 'signup';
  }>({
    isOpen: false,
    role: null,
    mode: 'login'
  });

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

  return (
    <>
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-400/20 rounded-full text-green-400 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Connecting Communities Through Fresh Food
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              <span className="text-green-400 drop-shadow-[0_0_30px_rgba(34,197,94,0.8)]">Farm</span>
              <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">2</span>
              <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Market</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Empowering local farmers and vendors to connect directly with their community. 
              Fresh produce, authentic products, fair prices.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button 
                onClick={() => openAuthModal('buyer', 'signup')}
                className="group relative px-8 py-4 bg-green-500 hover:bg-green-400 text-black font-bold text-lg rounded-2xl border-2 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:shadow-[0_0_40px_rgba(34,197,94,0.8)] transform hover:scale-105 transition-all duration-300 min-w-[200px]"
              >
                <ShoppingBag className="h-6 w-6 mr-3" />
                Shop Now
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button 
                onClick={() => openAuthModal('vendor', 'signup')}
                variant="outline"
                className="group relative px-8 py-4 bg-transparent hover:bg-white/5 text-white font-bold text-lg rounded-2xl border-2 border-white/20 hover:border-orange-400 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(251,146,60,0.5)] transform hover:scale-105 transition-all duration-300 min-w-[200px]"
              >
                <Store className="h-6 w-6 mr-3" />
                Sell With Us
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 pt-12">
              {[
                "🌱 Fresh & Local",
                "💚 Fair Trade",
                "🚚 Direct Delivery",
                "🤝 Community First"
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-gray-300 text-sm hover:bg-white/10 transition-all duration-300"
                  style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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

export default HeroSection;
