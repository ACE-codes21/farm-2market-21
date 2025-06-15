
import React from 'react';

const HeroBackground: React.FC = () => {
  return (
    <>
      {/* Enhanced dark gradient background with Ken Burns effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 ken-burns"></div>
      
      {/* Animated floating elements with enhanced glow */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating farm/market icons with enhanced animations */}
        <div className="absolute top-20 left-10 text-green-400/30 text-2xl animate-bounce drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" style={{animationDelay: '0s'}}>🥕</div>
        <div className="absolute top-32 right-20 text-orange-400/30 text-3xl animate-bounce drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" style={{animationDelay: '1s'}}>🍅</div>
        <div className="absolute top-64 left-1/4 text-yellow-400/30 text-2xl animate-bounce drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" style={{animationDelay: '2s'}}>🌽</div>
        <div className="absolute bottom-40 right-10 text-red-400/30 text-2xl animate-bounce drop-shadow-[0_0_10px_rgba(248,113,113,0.5)]" style={{animationDelay: '0.5s'}}>🍎</div>
        <div className="absolute bottom-20 left-20 text-purple-400/30 text-3xl animate-bounce drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" style={{animationDelay: '1.5s'}}>🍆</div>
        <div className="absolute top-40 right-1/3 text-green-400/30 text-2xl animate-bounce drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" style={{animationDelay: '2.5s'}}>🥬</div>
        
        {/* Enhanced floating price symbols with glow */}
        <div className="absolute top-16 left-1/3 text-green-400/40 text-lg font-mono animate-pulse drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]">₹25</div>
        <div className="absolute top-80 right-1/4 text-orange-400/40 text-lg font-mono animate-pulse drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]" style={{animationDelay: '1s'}}>₹40</div>
        <div className="absolute bottom-60 left-1/2 text-yellow-400/40 text-lg font-mono animate-pulse drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" style={{animationDelay: '2s'}}>₹15</div>
        
        {/* Enhanced grid dots pattern with subtle animation */}
        <div className="absolute inset-0 opacity-15">
          <div className="w-full h-full animate-pulse" style={{
            backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            animationDuration: '4s'
          }}></div>
        </div>
      </div>
      
      {/* Enhanced glow effects with more intensity */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/15 rounded-full blur-3xl animate-pulse" style={{animationDuration: '3s'}}></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-400/5 rounded-full blur-3xl animate-pulse" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
    </>
  );
};

export default HeroBackground;
