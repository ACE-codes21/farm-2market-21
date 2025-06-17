
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Package } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { useTranslation } from 'react-i18next';

interface BuyerHeaderProps {
  onCartOpen: () => void;
  onWishlistOpen: () => void;
  cartItemCount: number;
  wishlistCount: number;
  onOrdersClick?: () => void;
}

export const BuyerHeader: React.FC<BuyerHeaderProps> = ({
  onCartOpen,
  onWishlistOpen,
  cartItemCount,
  wishlistCount,
  onOrdersClick
}) => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <span className="text-xl font-bold">
                <span className="text-green-500">{t('buyer_header.farm')}</span>
                <span className="text-white">{t('buyer_header.tomarket')}</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Orders Button */}
            {onOrdersClick && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onOrdersClick}
                className="relative text-slate-300 hover:text-white hover:bg-slate-700/50 p-2"
              >
                <Package className="h-5 w-5" />
              </Button>
            )}
            
            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onWishlistOpen}
              className="relative text-slate-300 hover:text-white hover:bg-slate-700/50 p-2"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500 hover:bg-red-500 text-white text-xs">
                  {wishlistCount}
                </Badge>
              )}
            </Button>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartOpen}
              className="relative text-slate-300 hover:text-white hover:bg-slate-700/50 p-2"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-green-500 hover:bg-green-500 text-white text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
