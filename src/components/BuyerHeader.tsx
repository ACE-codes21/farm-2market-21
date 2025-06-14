
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
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold font-display gradient-text">Local Street Market</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onWishlistOpen}
              className="relative hover:bg-primary/10 transition-all duration-200 rounded-full px-4"
            >
              <Heart className="h-5 w-5 mr-2 text-red-500" />
              <span className="hidden sm:inline">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {wishlistCount}
                </span>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onCartOpen}
              className="relative hover:bg-primary/10 transition-all duration-200 rounded-full px-4"
            >
              <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
              <span className="hidden sm:inline">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
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
