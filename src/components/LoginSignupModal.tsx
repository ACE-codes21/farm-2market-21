
import React from 'react';
import AuthModal from '@/components/auth/AuthModal';

interface LoginSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'vendor' | 'buyer' | null;
}

const LoginSignupModal: React.FC<LoginSignupModalProps> = ({ isOpen, onClose, role }) => {
  return (
    <AuthModal
      isOpen={isOpen}
      onClose={onClose}
      role={role}
      defaultMode="signup"
    />
  );
};

export default LoginSignupModal;
