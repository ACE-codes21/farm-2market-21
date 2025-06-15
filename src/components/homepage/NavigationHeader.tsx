
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NavigationHeader: React.FC = () => {
  return (
    <>
      {/* Logo at top-left */}
      <div className="absolute top-6 left-6 z-20">
        <h1 className="text-2xl font-bold text-white">
          <span className="text-orange-400">Farm</span>2Market
        </h1>
      </div>

      {/* Login/Signup buttons at top-right */}
      <div className="absolute top-6 right-6 z-20 flex gap-3">
        <Link to="/auth?mode=login">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white border-white/30 hover:bg-white/10 backdrop-blur-sm"
          >
            Login
          </Button>
        </Link>
        <Link to="/auth?mode=signup">
          <Button 
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </>
  );
};

export default NavigationHeader;
