
import React from 'react';

const HeroBackground: React.FC = () => {
  return (
    <>
      {/* Full-screen background image */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070')`
          }}
        ></div>
        {/* Dark semi-transparent overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
    </>
  );
};

export default HeroBackground;
