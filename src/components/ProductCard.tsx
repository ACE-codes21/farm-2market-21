
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

  const handlePurchase = (quantity: number, couponCode?: string, paymentMethod?: string) => {
    console.log('Order placed:', { product, quantity, couponCode, paymentMethod });
    // This will be handled by the parent component
  };

  return (
    <Card 
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:scale-[1.02] hover:bg-white/10"
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
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 pointer-events-none" />
      
      <CardContent className="p-0 relative z-10">
        <div className="relative overflow-hidden rounded-t-3xl">
          <img 
            src={product.images[currentImageIndex]} 
            alt={`${product.name} - ${product.category} available for ₹${product.price}`}
            className="w-full h-56 object-cover transition-all duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {/* Wishlist Button */}
          <Button 
            size="icon"
            variant="ghost"
            className={`absolute top-4 right-4 h-10 w-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl ${
              isInWishlist ? 'text-red-400 bg-red-500/20 border-red-400/30' : 'text-white hover:text-red-400 hover:bg-red-500/20'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist(product);
            }}
            aria-label={isInWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          >
            <Heart className={`h-5 w-5 transition-all ${isInWishlist ? 'fill-current scale-110' : ''}`} />
          </Button>

          {/* Fresh Pick Badge */}
          {product.isFreshPick && product.freshPickExpiresAt && (
            <div className="absolute top-4 left-4">
              <FreshPickBadge expiresAt={product.freshPickExpiresAt} />
            </div>
          )}

          {/* Premium Badge */}
          {isPremium && !product.isFreshPick && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full px-3 py-2 flex items-center gap-2 shadow-lg border border-yellow-300/30">
              <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
              <span className="text-sm font-bold text-white">Premium</span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute bottom-4 left-4">
            <Badge className="text-sm font-medium px-3 py-1.5 bg-black/30 backdrop-blur-md text-white border border-white/20 rounded-xl">
              {product.category}
            </Badge>
          </div>

          {/* Contact Vendor - Only show on hover */}
          {product.vendor && (
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <ContactVendorDialog product={product}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2 text-sm px-3 py-2 h-8 rounded-xl bg-black/30 backdrop-blur-md border border-white/20 hover:border-green-400 hover:text-green-400 transition-all text-white"
                  aria-label={`Contact vendor ${product.vendor.name} for ${product.name}`}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Contact
                </Button>
              </ContactVendorDialog>
            </div>
          )}
        </div>
        
        <div className="p-6 space-y-5">
          <div className="space-y-3">
            <h3 className="font-bold text-xl text-white leading-tight group-hover:text-green-400 transition-colors line-clamp-2">
              {product.name}
            </h3>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center" role="img" aria-label={`Rating: ${product.rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-slate-600'
                    }`}
                    aria-hidden="true"
                  /> 
                ))}
              </div>
              <span className="text-sm text-white font-semibold">
                {product.rating}
              </span>
              <span className="text-sm text-slate-400">
                ({product.reviews} reviews)
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-3xl font-bold text-white" aria-label={`Price: ${product.price} rupees`}>
                ₹{product.price}
              </span>
              {product.stock <= 5 && product.stock > 0 && (
                <div className="text-sm font-medium text-orange-400 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30 inline-block" role="status">
                  Only {product.stock} left!
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {/* Buy Now Button - Primary */}
            <BuyNowDialog 
              product={product}
              onPurchase={handlePurchase}
            >
              <Button 
                className={`flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/25 ${
                  product.stock === 0 ? 'opacity-50 cursor-not-allowed bg-slate-600 hover:bg-slate-600' : ''
                }`}
                disabled={product.stock === 0}
                aria-label={product.stock === 0 ? `${product.name} is out of stock` : `Buy ${product.name} now`}
              >
                <Zap className="mr-2 h-5 w-5" aria-hidden="true" />
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
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 p-3 rounded-xl"
                disabled={product.stock === 0}
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              </Button>
            </AddToCartDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
