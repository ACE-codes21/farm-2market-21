
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { UserMenu } from './UserMenu';

interface BuyerHeaderProps {
  wishlistCount: number;
  cartItemCount: number;
  onWishlistOpen: () => void;
  onCartOpen: () => void;
  onRoleChange: () => void;
}

export const BuyerHeader: React.FC<BuyerHeaderProps> = ({
  wishlistCount,
  cartItemCount,
  onWishlistOpen,
  onCartOpen,
  onRoleChange,
}) => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Local Street Market</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onWishlistOpen}>
              <Heart className="h-5 w-5 mr-2" />
              Wishlist ({wishlistCount})
            </Button>
            <Button variant="ghost" size="sm" onClick={onCartOpen}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart ({cartItemCount})
            </Button>
            <UserMenu onLogout={onRoleChange} />
          </div>
        </div>
      </div>
    </header>
  );
};
