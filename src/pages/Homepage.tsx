
import React, { useState } from 'react';
import HeroBackground from '@/components/homepage/HeroBackground';
import NavigationHeader from '@/components/homepage/NavigationHeader';
import HeroSection from '@/components/homepage/HeroSection';
import FeaturesSection from '@/components/homepage/FeaturesSection';
import StatsSection from '@/components/homepage/StatsSection';
import CTASection from '@/components/homepage/CTASection';
import AuthModal from '@/components/auth/AuthModal';
import SignupOnlyModal from '@/components/auth/SignupOnlyModal';

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

  const [signupModal, setSignupModal] = useState<{
    isOpen: boolean;
    role: 'vendor' | 'buyer' | null;
  }>({
    isOpen: false,
    role: null
  });

  const openAuthModal = (role: 'vendor' | 'buyer', mode: 'login' | 'signup' = 'login') => {
    if (mode === 'signup') {
      // Open signup-only modal for role-based signups
      setSignupModal({
        isOpen: true,
        role
      });
    } else {
      // Open regular auth modal for login
      setAuthModal({
        isOpen: true,
        role,
        mode
      });
    }
  };

  const closeAuthModal = () => {
    setAuthModal({
      isOpen: false,
      role: null,
      mode: 'login'
    });
  };

  const closeSignupModal = () => {
    setSignupModal({
      isOpen: false,
      role: null
    });
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Section with Background */}
      <div className="relative min-h-screen">
        <HeroBackground />
        <NavigationHeader onOpenAuthModal={openAuthModal} />
        <HeroSection onOpenAuthModal={openAuthModal} />
      </div>

      {/* Additional Sections */}
      <FeaturesSection />
      <StatsSection />
      <CTASection onOpenAuthModal={openAuthModal} />

      {/* Regular Auth Modal (for login) */}
      <AuthModal 
        isOpen={authModal.isOpen} 
        onClose={closeAuthModal} 
        role={authModal.role} 
        defaultMode={authModal.mode} 
      />

      {/* Signup-Only Modal (for role-based signups) */}
      {signupModal.role && (
        <SignupOnlyModal
          isOpen={signupModal.isOpen}
          onClose={closeSignupModal}
          role={signupModal.role}
        />
      )}
    </div>
  );
};

export default Homepage;
