
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Star } from 'lucide-react';
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
      className="group overflow-hidden rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
            className="w-full h-48 object-cover rounded-t-lg transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          <Button 
            size="icon"
            variant="ghost"
            className={`absolute top-2 right-2 h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 opacity-0 scale-90 ${
              isInWishlist ? 'text-red-500' : 'text-gray-700'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist(product);
            }}
          >
            <Heart className={`h-5 w-5 transition-all ${isInWishlist ? 'fill-current' : ''}`} />
          </Button>
          {product.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5 pointer-events-none">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-white scale-110' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <Badge variant="secondary" className="text-xs mb-2">
            {product.category}
          </Badge>
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors truncate">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-1 mb-2">
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
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews})
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.price}
            </span>
            <Button 
              size="sm" 
              className="bg-green-600 hover:bg-green-700"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
