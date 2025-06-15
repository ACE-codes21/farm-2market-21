import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Store, ArrowRight, Sparkles, Leaf, Heart, Truck, Users } from 'lucide-react';
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
  const features = [{
    icon: Leaf,
    text: "Fresh & Local",
    color: "green"
  }, {
    icon: Heart,
    text: "Fair Trade",
    color: "red"
  }, {
    icon: Truck,
    text: "Direct Delivery",
    color: "blue"
  }, {
    icon: Users,
    text: "Community First",
    color: "purple"
  }];
  return <>
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500/10 via-green-400/15 to-green-500/10 border border-green-400/30 rounded-full text-green-400 text-sm font-medium backdrop-blur-sm shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] transition-all duration-500 transform hover:scale-105">
              <Sparkles className="h-4 w-4 animate-pulse" />
              Connecting Communities Through Fresh Food
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/0 via-green-400/20 to-green-400/0 animate-pulse"></div>
            </div>

            {/* Inspirational Intro Line */}
            <div className="mb-4">
              <h2 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-wide">
                
              </h2>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              <span className="text-green-400 drop-shadow-[0_0_30px_rgba(34,197,94,0.8)] animate-pulse text-8xl">Farm</span>
              <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] text-8xl">2</span>
              <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] text-8xl">Market</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{
            animationDelay: '0.2s'
          }}>
              Empowering <span className="text-orange-400 font-semibold">vendors</span>. Nourishing <span className="text-green-400 font-semibold">neighborhoods</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button onClick={() => openAuthModal('buyer', 'signup')} className="group relative px-8 py-6 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-black font-bold text-lg rounded-2xl border-2 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:shadow-[0_0_50px_rgba(34,197,94,0.8)] transform hover:scale-105 transition-all duration-300 min-w-[200px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                <ShoppingBag className="h-6 w-6 mr-3 relative z-10" />
                <span className="relative z-10">Shop Now</span>
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
              </Button>

              <Button onClick={() => openAuthModal('vendor', 'signup')} variant="outline" className="group relative px-8 py-4 bg-transparent hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-orange-400/10 text-white font-bold text-lg rounded-2xl border-2 border-white/20 hover:border-orange-400 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(251,146,60,0.6)] transform hover:scale-105 transition-all duration-300 min-w-[200px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/10 to-orange-400/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                <Store className="h-6 w-6 mr-3 relative z-10" />
                <span className="relative z-10">Sell With Us</span>
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
              </Button>
            </div>

            {/* Enhanced Feature Pills */}
            <div className="flex flex-wrap justify-center gap-6 pt-16">
              {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const colorClasses = {
                green: "from-green-500/20 to-green-400/10 border-green-400/30 text-green-300 shadow-green-500/20",
                red: "from-red-500/20 to-red-400/10 border-red-400/30 text-red-300 shadow-red-500/20",
                blue: "from-blue-500/20 to-blue-400/10 border-blue-400/30 text-blue-300 shadow-blue-500/20",
                purple: "from-purple-500/20 to-purple-400/10 border-purple-400/30 text-purple-300 shadow-purple-500/20"
              };
              return;
            })}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={authModal.isOpen} onClose={closeAuthModal} role={authModal.role} defaultMode={authModal.mode} />
    </>;
};
export default HeroSection;