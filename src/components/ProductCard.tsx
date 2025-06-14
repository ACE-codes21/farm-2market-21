
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
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

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && product.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isHovered, product.images.length]);

  return (
    <Card 
      className="group overflow-hidden rounded-2xl border-border/20 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
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
            className="w-full h-48 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Button 
            size="icon"
            variant="ghost"
            className={`absolute top-3 right-3 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 opacity-70 scale-90 shadow-lg ${
              isInWishlist ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist(product);
            }}
          >
            <Heart className={`h-5 w-5 transition-all ${isInWishlist ? 'fill-current' : ''}`} />
          </Button>
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 pointer-events-none">
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
        
        <div className="p-5">
          <Badge variant="secondary" className="text-xs font-medium mb-3 bg-primary/10 text-primary border-primary/20">
            {product.category}
          </Badge>
          <h3 className="font-semibold text-lg text-card-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 mb-4">
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
            <span className="text-sm text-muted-foreground font-medium">
              {product.rating} ({product.reviews})
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ₹{product.price}
            </span>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
