
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
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isHovered, product.images.length]);

  return (
    <Card 
      className="group overflow-hidden rounded-3xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 modern-card relative"
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
            className="w-full h-56 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Wishlist Button */}
          <Button 
            size="icon"
            variant="ghost"
            className={`absolute top-4 right-4 h-12 w-12 rounded-full glass-effect backdrop-blur-md hover:scale-110 transition-all duration-300 group-hover:opacity-100 opacity-80 shadow-xl ${
              isInWishlist ? 'text-red-500' : 'text-white hover:text-red-500'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist(product);
            }}
          >
            <Heart className={`h-6 w-6 transition-all ${isInWishlist ? 'fill-current scale-110' : ''}`} />
          </Button>

          {/* Fresh Pick Badge */}
          {product.isFreshPick && product.freshPickExpiresAt && (
            <div className="absolute top-4 left-4">
              <FreshPickBadge expiresAt={product.freshPickExpiresAt} />
            </div>
          )}

          {/* Premium Badge */}
          {product.rating >= 4.5 && !product.isFreshPick && (
            <div className="absolute top-4 left-4 glass-effect rounded-full px-3 py-1 flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-xs font-bold text-white">Premium</span>
            </div>
          )}
          
          {/* Image Indicators */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-white scale-125 shadow-lg' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="p-6">
          <Badge variant="secondary" className="text-xs font-bold mb-4 px-3 py-1 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 rounded-full">
            {product.category}
          </Badge>
          <h3 className="font-bold text-xl text-card-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 transition-colors ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground font-semibold bg-gray-100 px-2 py-1 rounded-full">
              {product.rating} ({product.reviews})
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ₹{product.price}
            </span>
            {product.vendor && (
              <ContactVendorDialog product={product}>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Contact
                </Button>
              </ContactVendorDialog>
            )}
          </div>

          <div className="space-y-3">
            <AddToCartDialog 
              product={product} 
              onAddToCart={onAddToCart}
            >
              <Button 
                className={`w-full premium-button px-6 py-3 text-sm font-bold ${
                  product.stock === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:scale-105'
                }`}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
              </Button>
            </AddToCartDialog>

            {/* Stock indicator */}
            {product.stock > 0 && product.stock <= 5 && (
              <div className="text-center">
                <span className="text-xs font-bold text-orange-500 bg-orange-100 px-3 py-1 rounded-full">
                  Only {product.stock} left!
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
