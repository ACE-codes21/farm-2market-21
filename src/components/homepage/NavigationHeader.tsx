
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NavigationHeader: React.FC = () => {
  return (
    <>
      {/* Logo at top-left with glow effect */}
      <div className="absolute top-6 left-6 z-20">
        <h1 className="text-2xl font-bold text-white">
          <span className="text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">Farm</span>
          <span className="text-white">2Market</span>
        </h1>
      </div>

      {/* Login/Signup buttons at top-right */}
      <div className="absolute top-6 right-6 z-20 flex gap-3">
        <Link to="/auth?mode=login">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-green-400 border border-green-400/30 hover:bg-green-400/10 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 backdrop-blur-sm"
          >
            Login
          </Button>
        </Link>
        <Link to="/auth?mode=signup">
          <Button 
            size="sm"
            className="bg-green-500 hover:bg-green-400 text-black font-semibold hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all duration-300"
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </>
  );
};

export default NavigationHeader;
