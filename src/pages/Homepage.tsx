
import React, { useState } from 'react';
import HeroBackground from '@/components/homepage/HeroBackground';
import NavigationHeader from '@/components/homepage/NavigationHeader';
import HeroSection from '@/components/homepage/HeroSection';
import CoreFeaturesSection from '@/components/homepage/CoreFeaturesSection';
import CTASection from '@/components/homepage/CTASection';
import AuthModal from '@/components/auth/AuthModal';

const Homepage: React.FC = () => {
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

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Section with Background */}
      <div className="relative min-h-screen">
        <HeroBackground />
        <NavigationHeader />
        <HeroSection />
      </div>

      {/* Core Features Section */}
      <CoreFeaturesSection />

      {/* CTA Section */}
      <CTASection onOpenAuthModal={openAuthModal} />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModal.isOpen} 
        onClose={closeAuthModal} 
        role={authModal.role} 
        defaultMode={authModal.mode} 
      />
    </div>
  );
};

export default Homepage;
