
import React from 'react';
import HeroBackground from '@/components/homepage/HeroBackground';
import NavigationHeader from '@/components/homepage/NavigationHeader';
import HeroSection from '@/components/homepage/HeroSection';

const Homepage: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <HeroBackground />
      <NavigationHeader />
      <HeroSection />
    </div>
  );
};

export default Homepage;
