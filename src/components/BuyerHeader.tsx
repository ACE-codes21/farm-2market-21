
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
    <header className="dark-glass-effect sticky top-0 z-50 border-b border-slate-600/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold font-display gradient-text">Street Market</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onWishlistOpen}
              className="relative dark-modern-card border-0 px-5 py-3 text-white hover:bg-slate-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
            >
              <Heart className="h-5 w-5 mr-2 text-red-400" />
              <span className="hidden sm:inline font-medium">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onCartOpen}
              className="relative dark-modern-card border-0 px-5 py-3 text-white hover:bg-slate-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
            >
              <ShoppingCart className="h-5 w-5 mr-2 text-green-400" />
              <span className="hidden sm:inline font-medium">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-orange-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </Button>
            <UserMenu onLogout={onRoleChange} />
          </div>
        </div>
      </div>
    </header>
  );
};
