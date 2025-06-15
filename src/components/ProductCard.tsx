
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
      }, 2500); // Slower slideshow - 2.5 seconds
    }
    return () => clearInterval(interval);
  }, [isHovered, product.images.length]);

  // Only show premium badge for ratings 4.6 and above
  const isPremium = product.rating >= 4.6;

  return (
    <Card 
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={product.images[currentImageIndex]} 
            alt={product.name}
            className="w-full h-56 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Wishlist Button */}
          <Button 
            size="icon"
            variant="ghost"
            className={`absolute top-3 right-3 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:scale-110 transition-all duration-300 shadow-lg ${
              isInWishlist ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist(product);
            }}
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
              <Sparkles className="h-3 w-3 text-white" />
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
                <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs px-2 py-1 h-7 rounded-lg border-gray-300 hover:border-green-500 hover:text-green-600 transition-colors">
                  <MessageCircle className="h-3 w-3" />
                  Contact
                </Button>
              </ContactVendorDialog>
            )}
          </div>

          <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2 leading-snug group-hover:text-green-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {product.rating}
            </span>
            <span className="text-xs text-gray-500">
              ({product.reviews} reviews)
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.price}
            </span>
            {product.stock <= 5 && product.stock > 0 && (
              <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                Only {product.stock} left
              </span>
            )}
          </div>

          <AddToCartDialog 
            product={product} 
            onAddToCart={onAddToCart}
          >
            <Button 
              className={`w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 ${
                product.stock === 0 ? 'opacity-50 cursor-not-allowed bg-gray-400 hover:bg-gray-400' : 'hover:shadow-lg'
              }`}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </AddToCartDialog>
        </div>
      </CardContent>
    </Card>
  );
};
