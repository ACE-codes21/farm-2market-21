
import React from 'react';
import HeroBackground from '@/components/homepage/HeroBackground';
import NavigationHeader from '@/components/homepage/NavigationHeader';
import HeroSection from '@/components/homepage/HeroSection';
import FeaturesSection from '@/components/homepage/FeaturesSection';

const Homepage: React.FC = () => {
  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden">
        <HeroBackground />
        <NavigationHeader />
        <HeroSection />
      </div>
      
      {/* Features Section */}
      <FeaturesSection />
    </div>
  );
};

export default Homepage;
