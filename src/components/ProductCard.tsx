
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, ShoppingCart, Sparkles, MessageCircle } from 'lucide-react';
import { Product } from '@/types';
import { FreshPickBadge } from './FreshPickBadge';
import { ContactVendorDialog } from './ContactVendorDialog';
import { AddToCartDialog } from './AddToCartDialog';

interface ProductCardProps {
  product: Product;
  onAddToCart: (quantity: number) => void;
  onAddToWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onAddToWishlist, 
  isInWishlist 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Check if fresh pick is expired
  const isFreshPickExpired = product.isFreshPick && product.freshPickExpiresAt && 
    new Date(product.freshPickExpiresAt).getTime() <= new Date().getTime();

  // Don't render if fresh pick is expired
  if (isFreshPickExpired) {
    return null;
  }

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && product.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isHovered, product.images.length]);

  const isPremium = product.rating >= 4.6;

  return (
    <Card 
      className="group overflow-hidden rounded-xl border border-slate-600/30 bg-slate-800/40 backdrop-blur-lg shadow-lg hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 hover:scale-[1.02] focus-ring"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
      tabIndex={0}
      role="article"
      aria-label={`Product: ${product.name}`}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={product.images[currentImageIndex]} 
            alt={`${product.name} - ${product.category} available for ₹${product.price}`}
            className="w-full h-40 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Wishlist Button */}
          <Button 
            size="icon"
            variant="ghost"
            className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-slate-800/80 backdrop-blur-sm transition-all duration-300 shadow-lg focus-ring ${
              isInWishlist ? 'text-red-400' : 'text-slate-300 hover:text-red-400'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist(product);
            }}
            aria-label={isInWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          >
            <Heart className={`h-4 w-4 transition-all ${isInWishlist ? 'fill-current scale-110' : ''}`} />
          </Button>

          {/* Fresh Pick Badge */}
          {product.isFreshPick && product.freshPickExpiresAt && (
            <div className="absolute top-2 left-2">
              <FreshPickBadge expiresAt={product.freshPickExpiresAt} />
            </div>
          )}

          {/* Premium Badge */}
          {isPremium && !product.isFreshPick && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full px-2 py-1 flex items-center gap-1 shadow-lg">
              <Sparkles className="h-3 w-3 text-white" aria-hidden="true" />
              <span className="text-xs font-bold text-white">Premium</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs font-medium px-2 py-0.5 bg-slate-700/50 text-slate-200 border-slate-600/30 rounded-md">
              {product.category}
            </Badge>
            {product.vendor && (
              <ContactVendorDialog product={product}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 text-xs px-2 py-1 h-6 rounded-lg border-slate-600/30 hover:border-green-500 hover:text-green-400 transition-colors bg-slate-800/50 text-slate-300"
                  aria-label={`Contact vendor ${product.vendor.name} for ${product.name}`}
                >
                  <MessageCircle className="h-3 w-3" aria-hidden="true" />
                  Contact
                </Button>
              </ContactVendorDialog>
            )}
          </div>

          <h3 className="font-semibold text-base text-white mb-2 line-clamp-2 leading-tight group-hover:text-green-400 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center" role="img" aria-label={`Rating: ${product.rating} out of 5 stars`}>
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-slate-500'
                  }`}
                  aria-hidden="true"
                /> 
              ))}
            </div>
            <span className="text-sm text-slate-300 font-medium">
              {product.rating}
            </span>
            <span className="text-xs text-slate-400">
              ({product.reviews})
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-white" aria-label={`Price: ${product.price} rupees`}>
              ₹{product.price}
            </span>
            {product.stock <= 5 && product.stock > 0 && (
              <span className="text-xs font-medium text-orange-400 bg-orange-500/20 px-2 py-1 rounded-full border border-orange-500/30" role="status">
                {product.stock} left
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            {/* Add to Cart Button */}
            <AddToCartDialog 
              product={product} 
              onAddToCart={onAddToCart}
            >
              <Button 
                className={`w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-green-500/25 focus-ring ${
                  product.stock === 0 ? 'opacity-50 cursor-not-allowed bg-slate-600 hover:bg-slate-600' : ''
                }`}
                disabled={product.stock === 0}
                aria-label={product.stock === 0 ? `${product.name} is out of stock` : `Add ${product.name} to cart`}
              >
                <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </AddToCartDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
