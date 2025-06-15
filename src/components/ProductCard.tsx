
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, ShoppingCart, Sparkles, MessageCircle, CreditCard, Phone } from 'lucide-react';
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
      }, 2500); // Slower slideshow - 2.5 seconds
    }
    return () => clearInterval(interval);
  }, [isHovered, product.images.length]);

  // Only show premium badge for ratings 4.6 and above
  const isPremium = product.rating >= 4.6;

  return (
    <Card 
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg card-hover-elevate card-hover-glow relative focus-ring"
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
            className="w-full h-56 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Wishlist Button */}
          <Button 
            size="icon"
            variant="ghost"
            className={`absolute top-3 right-3 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm btn-hover-elevate transition-all duration-300 shadow-lg focus-ring ${
              isInWishlist ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
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
            <div className="absolute top-3 left-3">
              <FreshPickBadge expiresAt={product.freshPickExpiresAt} />
            </div>
          )}

          {/* Premium Badge - Only for high rated items */}
          {isPremium && !product.isFreshPick && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
              <Sparkles className="h-3 w-3 text-white" aria-hidden="true" />
              <span className="text-xs font-bold text-white">Premium</span>
            </div>
          )}
        </div>
        
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="secondary" className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-700 rounded-md">
              {product.category}
            </Badge>
            {product.vendor && (
              <ContactVendorDialog product={product}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 text-xs px-2 py-1 h-7 rounded-lg border-gray-300 hover:border-green-500 hover:text-green-600 transition-colors btn-hover-elevate focus-ring"
                  aria-label={`Contact vendor ${product.vendor.name} for ${product.name}`}
                >
                  <MessageCircle className="h-3 w-3" aria-hidden="true" />
                  Contact
                </Button>
              </ContactVendorDialog>
            )}
          </div>

          <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2 leading-snug group-hover:text-green-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center" role="img" aria-label={`Rating: ${product.rating} out of 5 stars`}>
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                  aria-hidden="true"
                /> 
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {product.rating}
            </span>
            <span className="text-xs text-gray-600">
              ({product.reviews} reviews)
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-gray-900" aria-label={`Price: ${product.price} rupees`}>
              ₹{product.price}
            </span>
            {product.stock <= 5 && product.stock > 0 && (
              <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full" role="status">
                Only {product.stock} left
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Add to Cart Button */}
            <AddToCartDialog 
              product={product} 
              onAddToCart={onAddToCart}
            >
              <Button 
                className={`w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 btn-hover-elevate btn-hover-glow focus-ring ${
                  product.stock === 0 ? 'opacity-50 cursor-not-allowed bg-gray-400 hover:bg-gray-400' : ''
                }`}
                disabled={product.stock === 0}
                aria-label={product.stock === 0 ? `${product.name} is out of stock` : `Add ${product.name} to cart`}
              >
                <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </AddToCartDialog>

            {/* Contact & Payment Buttons */}
            <div className="grid grid-cols-2 gap-2">
              {/* Contact Vendor Button */}
              {product.vendor && (
                <ContactVendorDialog product={product}>
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2 text-sm py-2 rounded-lg border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-500 transition-colors btn-hover-elevate focus-ring"
                    aria-label={`Contact vendor ${product.vendor.name}`}
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call/Chat
                  </Button>
                </ContactVendorDialog>
              )}

              {/* Pay via UPI Button */}
              {product.vendor?.upiId && (
                <ContactVendorDialog product={product}>
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2 text-sm py-2 rounded-lg border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-500 transition-colors btn-hover-elevate focus-ring"
                    aria-label="Pay via UPI"
                  >
                    <CreditCard className="h-4 w-4" aria-hidden="true" />
                    Pay UPI
                  </Button>
                </ContactVendorDialog>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
