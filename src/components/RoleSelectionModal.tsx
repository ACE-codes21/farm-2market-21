
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Store } from 'lucide-react';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onRoleSelect: (role: 'vendor' | 'buyer') => void;
}

const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({ isOpen, onRoleSelect }) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-900">
            Welcome to MarketPlace
          </DialogTitle>
          <p className="text-center text-gray-600 mt-2">
            Choose your role to get started
          </p>
        </DialogHeader>
        
        <div className="grid gap-4 mt-6">
          <Button
            onClick={() => onRoleSelect('vendor')}
            className="h-20 flex flex-col gap-2 bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
            size="lg"
          >
            <Store size={28} />
            <span className="text-lg font-semibold">I'm a Vendor</span>
            <span className="text-sm opacity-90">Sell your products</span>
          </Button>
          
          <Button
            onClick={() => onRoleSelect('buyer')}
            className="h-20 flex flex-col gap-2 bg-green-600 hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
            size="lg"
          >
            <ShoppingBag size={28} />
            <span className="text-lg font-semibold">I'm a Buyer</span>
            <span className="text-sm opacity-90">Shop amazing products</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleSelectionModal;
