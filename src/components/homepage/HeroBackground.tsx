
import React from 'react';

const HeroBackground: React.FC = () => {
  return (
    <>
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating farm/market icons */}
        <div className="absolute top-20 left-10 text-green-400/20 text-2xl animate-bounce" style={{animationDelay: '0s'}}>🥕</div>
        <div className="absolute top-32 right-20 text-orange-400/20 text-3xl animate-bounce" style={{animationDelay: '1s'}}>🍅</div>
        <div className="absolute top-64 left-1/4 text-yellow-400/20 text-2xl animate-bounce" style={{animationDelay: '2s'}}>🌽</div>
        <div className="absolute bottom-40 right-10 text-red-400/20 text-2xl animate-bounce" style={{animationDelay: '0.5s'}}>🍎</div>
        <div className="absolute bottom-20 left-20 text-purple-400/20 text-3xl animate-bounce" style={{animationDelay: '1.5s'}}>🍆</div>
        <div className="absolute top-40 right-1/3 text-green-400/20 text-2xl animate-bounce" style={{animationDelay: '2.5s'}}>🥬</div>
        
        {/* Animated floating price symbols */}
        <div className="absolute top-16 left-1/3 text-green-400/40 text-lg font-mono animate-float-slow">₹25</div>
        <div className="absolute top-80 right-1/4 text-orange-400/40 text-lg font-mono animate-float-medium" style={{animationDelay: '1s'}}>₹40</div>
        <div className="absolute bottom-60 left-1/2 text-yellow-400/40 text-lg font-mono animate-float-fast" style={{animationDelay: '2s'}}>₹15</div>
        
        {/* Grid dots pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>
      
      {/* Subtle glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
    </>
  );
};

export default HeroBackground;
