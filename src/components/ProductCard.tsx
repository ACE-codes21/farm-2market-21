
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, ShoppingCart, Sparkles, MessageCircle, Zap } from 'lucide-react';
import { Product } from '@/types';
import { FreshPickBadge } from './FreshPickBadge';
import { ContactVendorDialog } from './ContactVendorDialog';
import { AddToCartDialog } from './AddToCartDialog';
import { BuyNowDialog } from './BuyNowDialog';

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
      className="group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 hover:scale-[1.02] focus-ring"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
      tabIndex={0}
      role="article"
      aria-label={`Product: ${product.name}`}
    >
      {/* Gradient overlay for premium look */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-900/20 pointer-events-none" />
      
      <CardContent className="p-0 relative z-10">
        <div className="relative overflow-hidden rounded-t-2xl">
          <img 
            src={product.images[currentImageIndex]} 
            alt={`${product.name} - ${product.category} available for ₹${product.price}`}
            className="w-full h-48 object-cover transition-all duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {/* Wishlist Button */}
          <Button 
            size="icon"
            variant="ghost"
            className={`absolute top-3 right-3 h-9 w-9 rounded-full bg-black/20 backdrop-blur-md border border-white/10 transition-all duration-300 shadow-lg hover:shadow-xl focus-ring ${
              isInWishlist ? 'text-red-400 bg-red-500/20' : 'text-white hover:text-red-400 hover:bg-red-500/20'
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
            <div className="absolute top-3 left-3">
              <FreshPickBadge expiresAt={product.freshPickExpiresAt} />
            </div>
          )}

          {/* Premium Badge */}
          {isPremium && !product.isFreshPick && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg border border-yellow-300/20">
              <Sparkles className="h-3 w-3 text-white" aria-hidden="true" />
              <span className="text-xs font-bold text-white">Premium</span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute bottom-3 left-3">
            <Badge className="text-xs font-medium px-2 py-1 bg-black/20 backdrop-blur-md text-white border border-white/10 rounded-lg">
              {product.category}
            </Badge>
          </div>

          {/* Contact Vendor - Only show on hover */}
          {product.vendor && (
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <ContactVendorDialog product={product}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 h-7 rounded-lg bg-black/20 backdrop-blur-md border border-white/10 hover:border-green-400 hover:text-green-400 transition-all text-white"
                  aria-label={`Contact vendor ${product.vendor.name} for ${product.name}`}
                >
                  <MessageCircle className="h-3 w-3" aria-hidden="true" />
                  Contact
                </Button>
              </ContactVendorDialog>
            </div>
          )}
        </div>
        
        <div className="p-5 space-y-4">
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-white leading-tight group-hover:text-green-400 transition-colors line-clamp-2">
              {product.name}
            </h3>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center" role="img" aria-label={`Rating: ${product.rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-3.5 w-3.5 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-slate-500'
                    }`}
                    aria-hidden="true"
                  /> 
                ))}
              </div>
              <span className="text-sm text-white font-semibold">
                {product.rating}
              </span>
              <span className="text-xs text-slate-400">
                ({product.reviews} reviews)
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-2xl font-bold text-white" aria-label={`Price: ${product.price} rupees`}>
                ₹{product.price}
              </span>
              {product.stock <= 5 && product.stock > 0 && (
                <div className="text-xs font-medium text-orange-400 bg-orange-500/20 px-2 py-1 rounded-full border border-orange-500/30 inline-block" role="status">
                  Only {product.stock} left!
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {/* Buy Now Button - Primary */}
            <BuyNowDialog 
              product={product}
              onPurchase={(quantity, couponCode, paymentMethod) => {
                console.log('Purchase:', { product, quantity, couponCode, paymentMethod });
                // Handle purchase logic here
              }}
            >
              <Button 
                className={`flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/30 focus-ring ${
                  product.stock === 0 ? 'opacity-50 cursor-not-allowed bg-slate-600 hover:bg-slate-600' : ''
                }`}
                disabled={product.stock === 0}
                aria-label={product.stock === 0 ? `${product.name} is out of stock` : `Buy ${product.name} now`}
              >
                <Zap className="mr-2 h-4 w-4" aria-hidden="true" />
                {product.stock === 0 ? 'Out of Stock' : 'Buy Now'}
              </Button>
            </BuyNowDialog>

            {/* Add to Cart Button - Secondary */}
            <AddToCartDialog 
              product={product} 
              onAddToCart={onAddToCart}
            >
              <Button 
                variant="outline"
                className="bg-slate-700/50 border-slate-600/30 text-slate-300 hover:bg-slate-600/50 hover:text-white hover:border-slate-500/30 transition-all duration-300 p-2.5 rounded-xl"
                disabled={product.stock === 0}
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              </Button>
            </AddToCartDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
