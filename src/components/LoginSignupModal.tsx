
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Store, User, UserPlus } from 'lucide-react';

interface LoginSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'vendor' | 'buyer' | null;
}

const LoginSignupModal: React.FC<LoginSignupModalProps> = ({ isOpen, onClose, role }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(`/auth?role=${role}&mode=login`);
    onClose();
  };

  const handleSignup = () => {
    navigate(`/auth?role=${role}&mode=signup`);
    onClose();
  };

  const getRoleInfo = () => {
    if (role === 'vendor') {
      return {
        icon: Store,
        title: 'Join as a Vendor',
        description: 'Start selling your products and grow your business',
        color: 'from-green-600 to-green-700'
      };
    } else {
      return {
        icon: ShoppingBag,
        title: 'Join as a Buyer',
        description: 'Discover fresh products from local vendors',
        color: 'from-orange-500 to-orange-600'
      };
    }
  };

  const roleInfo = getRoleInfo();
  const RoleIcon = roleInfo.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className={`w-16 h-16 bg-gradient-to-br ${roleInfo.color} rounded-2xl flex items-center justify-center shadow-lg`}>
              <RoleIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl font-bold text-gray-900">
            {roleInfo.title}
          </DialogTitle>
          <p className="text-center text-gray-600 mt-2">
            {roleInfo.description}
          </p>
        </DialogHeader>
        
        <div className="grid gap-4 mt-6">
          <Button
            onClick={handleSignup}
            className={`h-14 flex items-center gap-3 bg-gradient-to-r ${roleInfo.color} hover:opacity-90 transition-all duration-200 transform hover:scale-105`}
            size="lg"
          >
            <UserPlus size={24} />
            <div className="text-left">
              <div className="text-lg font-semibold">Sign Up</div>
              <div className="text-sm opacity-90">Create a new account</div>
            </div>
          </Button>
          
          <Button
            onClick={handleLogin}
            variant="outline"
            className="h-14 flex items-center gap-3 border-2 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
            size="lg"
          >
            <User size={24} />
            <div className="text-left">
              <div className="text-lg font-semibold text-gray-900">Log In</div>
              <div className="text-sm text-gray-600">Already have an account?</div>
            </div>
          </Button>
        </div>

        <div className="text-center mt-4">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginSignupModal;
