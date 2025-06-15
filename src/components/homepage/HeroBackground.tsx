
import React from 'react';

const HeroBackground: React.FC = () => {
  return (
    <>
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      
      {/* Mathematical elements and numbers scattered around */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Mathematical symbols and numbers */}
        <div className="absolute top-20 left-10 text-gray-600/30 text-6xl font-mono animate-pulse" style={{animationDelay: '0s'}}>2</div>
        <div className="absolute top-32 right-20 text-gray-600/20 text-4xl font-mono animate-pulse" style={{animationDelay: '1s'}}>12</div>
        <div className="absolute top-64 left-1/4 text-gray-600/25 text-5xl font-mono animate-pulse" style={{animationDelay: '2s'}}>-15+6</div>
        <div className="absolute bottom-40 right-10 text-gray-600/30 text-3xl font-mono animate-pulse" style={{animationDelay: '0.5s'}}>24</div>
        <div className="absolute bottom-20 left-20 text-gray-600/20 text-7xl font-mono animate-pulse" style={{animationDelay: '1.5s'}}>3y</div>
        <div className="absolute top-40 right-1/3 text-gray-600/25 text-4xl font-mono animate-pulse" style={{animationDelay: '2.5s'}}>6</div>
        <div className="absolute top-80 left-1/3 text-gray-600/20 text-5xl font-mono animate-pulse" style={{animationDelay: '3s'}}>-8</div>
        <div className="absolute bottom-60 right-1/4 text-gray-600/30 text-6xl font-mono animate-pulse" style={{animationDelay: '3.5s'}}>5×9</div>
        
        {/* Small scattered numbers */}
        <div className="absolute top-16 left-1/3 text-gray-500/40 text-2xl font-mono">√</div>
        <div className="absolute top-96 right-1/5 text-gray-500/30 text-2xl font-mono">π</div>
        <div className="absolute bottom-80 left-1/2 text-gray-500/35 text-2xl font-mono">∞</div>
        <div className="absolute top-60 left-1/5 text-gray-500/30 text-2xl font-mono">≠</div>
        <div className="absolute bottom-32 right-1/3 text-gray-500/40 text-2xl font-mono">∑</div>
        
        {/* Floating dots pattern similar to screenshot */}
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/15 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-white/25 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-1/4 right-1/5 w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '2.5s'}}></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>
      
      {/* Subtle glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-400/3 rounded-full blur-3xl"></div>
    </>
  );
};

export default HeroBackground;
