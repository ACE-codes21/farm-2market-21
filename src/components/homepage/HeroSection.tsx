
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Store, ArrowRight, Sparkles, MapPin, Clock, Shield, TrendingUp } from 'lucide-react';
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

  const platformHighlights = [
    { icon: MapPin, text: "500+ Local Vendors", color: "green" },
    { icon: Clock, text: "Same-Day Delivery", color: "blue" },
    { icon: Shield, text: "Quality Guaranteed", color: "purple" },
    { icon: TrendingUp, text: "Fair Trade Pricing", color: "orange" }
  ];

  return (
    <>
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Content */}
            <div className="space-y-8 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500/10 via-green-400/15 to-green-500/10 border border-green-400/30 rounded-full text-green-400 text-sm font-medium backdrop-blur-sm shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                <Sparkles className="h-4 w-4 animate-pulse" />
                Connecting Communities Through Fresh Food
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  <span className="text-green-400 drop-shadow-[0_0_30px_rgba(34,197,94,0.8)]">Farm</span>
                  <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">2Market</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                  The future of local commerce. <span className="text-green-400 font-semibold">Fresh food</span>, 
                  <span className="text-orange-400 font-semibold"> fair prices</span>, direct from your neighborhood vendors.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Button 
                  onClick={() => openAuthModal('buyer', 'signup')} 
                  className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-black font-bold text-lg rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:shadow-[0_0_50px_rgba(34,197,94,0.8)] transform hover:scale-105 transition-all duration-300 min-w-[200px]"
                >
                  <ShoppingBag className="h-6 w-6 mr-3" />
                  Start Shopping
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button 
                  onClick={() => openAuthModal('vendor', 'signup')} 
                  variant="outline" 
                  className="group relative px-8 py-4 bg-transparent hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-orange-400/10 text-white font-bold text-lg rounded-2xl border-2 border-white/20 hover:border-orange-400 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(251,146,60,0.6)] transform hover:scale-105 transition-all duration-300 min-w-[200px]"
                >
                  <Store className="h-6 w-6 mr-3" />
                  Sell With Us
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Platform Highlights */}
              <div className="flex flex-wrap gap-4 pt-8">
                {platformHighlights.map((highlight, index) => {
                  const IconComponent = highlight.icon;
                  const colorClasses = {
                    green: "from-green-500/20 to-green-400/10 border-green-400/30 text-green-300",
                    blue: "from-blue-500/20 to-blue-400/10 border-blue-400/30 text-blue-300",
                    purple: "from-purple-500/20 to-purple-400/10 border-purple-400/30 text-purple-300",
                    orange: "from-orange-500/20 to-orange-400/10 border-orange-400/30 text-orange-300"
                  };
                  
                  return (
                    <div 
                      key={index} 
                      className={`flex items-center gap-3 px-4 py-3 bg-gradient-to-r ${colorClasses[highlight.color as keyof typeof colorClasses]} backdrop-blur-sm border rounded-xl transition-all duration-300 hover:scale-105`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium text-sm">{highlight.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Feature Preview */}
            <div className="relative animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="relative">
                {/* Main Preview Card */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">Live Marketplace</h3>
                      <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm font-medium">Online</span>
                      </div>
                    </div>
                    
                    {/* Mock Product Cards */}
                    <div className="space-y-4">
                      {[
                        { name: "Fresh Tomatoes", vendor: "Green Valley Farm", price: "$4.99/lb", status: "Available" },
                        { name: "Organic Lettuce", vendor: "Sunny Acres", price: "$2.50/head", status: "Low Stock" },
                        { name: "Local Honey", vendor: "Bee Happy Co.", price: "$8.99/jar", status: "Available" }
                      ].map((product, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400/20 to-orange-400/20 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">{index === 0 ? '🍅' : index === 1 ? '🥬' : '🍯'}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold">{product.name}</h4>
                            <p className="text-gray-400 text-sm">{product.vendor}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-green-400 font-bold">{product.price}</p>
                            <p className={`text-xs ${product.status === 'Available' ? 'text-green-400' : 'text-orange-400'}`}>
                              {product.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-orange-500/20 to-orange-400/10 backdrop-blur-sm border border-orange-400/30 rounded-2xl p-4 shadow-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-400">2.4k+</p>
                    <p className="text-orange-300 text-sm">Active Users</p>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-purple-500/20 to-purple-400/10 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-4 shadow-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-400">98%</p>
                    <p className="text-purple-300 text-sm">Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={authModal.isOpen} onClose={closeAuthModal} role={authModal.role} defaultMode={authModal.mode} />
    </>
  );
};

export default HeroSection;
