import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Heart, 
  ShoppingCart, 
  Star,
  Filter,
  Grid,
  List
} from 'lucide-react';

interface BuyerDashboardProps {
  onRoleChange: () => void;
}

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  category: string;
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ onRoleChange }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const { toast } = useToast();
  
  const products = [
    { 
      id: 1, 
      name: 'Fresh Bananas (1kg)', 
      price: 60, 
      rating: 4.5, 
      reviews: 28,
      images: [
        'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&h=300&fit=crop'
      ],
      category: 'Fruits'
    },
    { 
      id: 2, 
      name: 'Fresh Tomatoes (1kg)', 
      price: 40, 
      rating: 4.7, 
      reviews: 45,
      images: [
        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1546470427-e91e2e244ae6?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop'
      ],
      category: 'Vegetables'
    },
    { 
      id: 3, 
      name: 'Red Onions (1kg)', 
      price: 30, 
      rating: 4.2, 
      reviews: 32,
      images: [
        'https://images.unsplash.com/photo-1508313880080-c4bae5d55a0a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=300&fit=crop'
      ],
      category: 'Vegetables'
    },
    { 
      id: 4, 
      name: 'Street Samosas (6 pcs)', 
      price: 40, 
      rating: 4.8, 
      reviews: 67,
      images: [
        'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop'
      ],
      category: 'Street Food'
    },
    { 
      id: 5, 
      name: 'Fresh Orange Juice', 
      price: 25, 
      rating: 4.6, 
      reviews: 23,
      images: [
        'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop'
      ],
      category: 'Beverages'
    },
    { 
      id: 6, 
      name: 'Homemade Mango Pickle', 
      price: 80, 
      rating: 4.4, 
      reviews: 18,
      images: [
        'https://images.unsplash.com/photo-1599599810694-57a2ca8276a8?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
      ],
      category: 'Condiments'
    },
    { 
      id: 7, 
      name: 'Green Chilies (250g)', 
      price: 20, 
      rating: 4.3, 
      reviews: 15,
      images: [
        'https://images.unsplash.com/photo-1583604649804-81d019b8e1e4?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571568514386-b9c4d2cb4c61?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1609501676725-7186f1b6dfc0?w=400&h=300&fit=crop'
      ],
      category: 'Spices'
    },
    { 
      id: 8, 
      name: 'Fresh Coriander (bunch)', 
      price: 10, 
      rating: 4.5, 
      reviews: 41,
      images: [
        'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=400&h=300&fit=crop'
      ],
      category: 'Herbs'
    },
    { 
      id: 9, 
      name: 'Fresh Ginger (500g)', 
      price: 35, 
      rating: 4.6, 
      reviews: 29,
      images: [
        'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1609501676628-ba14ce3c4bb3?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1628340428296-b5cd649bb6c8?w=400&h=300&fit=crop'
      ],
      category: 'Spices'
    },
    { 
      id: 10, 
      name: 'Fresh Coconut Water', 
      price: 30, 
      rating: 4.7, 
      reviews: 34,
      images: [
        'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop'
      ],
      category: 'Beverages'
    },
    { 
      id: 11, 
      name: 'Roasted Peanuts (200g)', 
      price: 25, 
      rating: 4.4, 
      reviews: 52,
      images: [
        'https://images.unsplash.com/photo-1582886946878-7f23e1fd1f2d?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1608181831042-8a2598f0a8ec?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400&h=300&fit=crop'
      ],
      category: 'Dry Fruits'
    },
    { 
      id: 12, 
      name: 'Street-style Pani Puri', 
      price: 30, 
      rating: 4.9, 
      reviews: 88,
      images: [
        'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1583225214464-9296029427aa?w=400&h=300&fit=crop'
      ],
      category: 'Street Food'
    },
  ];

  const categories = [
    { value: 'all', label: 'All Items' },
    { value: 'Fruits', label: 'Fruits' },
    { value: 'Vegetables', label: 'Vegetables' },
    { value: 'Street Food', label: 'Street Food' },
    { value: 'Beverages', label: 'Beverages' },
    { value: 'Spices', label: 'Spices' },
    { value: 'Herbs', label: 'Herbs' },
    { value: 'Dry Fruits', label: 'Dry Fruits' },
    { value: 'Condiments', label: 'Condiments' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (!existingItem) {
      setCartItems([...cartItems, product]);
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
    } else {
      toast({
        title: "Already in Cart",
        description: `${product.name} is already in your cart.`,
      });
    }
  };

  const addToWishlist = (product: Product) => {
    const existingItem = wishlistItems.find(item => item.id === product.id);
    if (!existingItem) {
      setWishlistItems([...wishlistItems, product]);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    } else {
      setWishlistItems(wishlistItems.filter(item => item.id !== product.id));
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Local Street Market</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Heart className="h-5 w-5 mr-2" />
                Wishlist ({wishlistItems.length})
              </Button>
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart ({cartItems.length})
              </Button>
              <Button 
                variant="outline" 
                onClick={onRoleChange}
                className="hover:bg-gray-50"
              >
                Switch Role
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search fresh produce, snacks, beverages..." 
              className="pl-10 h-12"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 h-12">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex border rounded-lg p-1 bg-white">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-10 w-10 p-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-10 w-10 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart}
              onAddToWishlist={addToWishlist}
              isInWishlist={isInWishlist(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
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
      className="group hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
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
            className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-110"
          />
          <Button 
            size="sm"
            variant="ghost"
            className={`absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white group-hover:opacity-100 opacity-0 transition-opacity ${
              isInWishlist ? 'text-red-500' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist(product);
            }}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </Button>
          {product.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
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
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
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
                onAddToCart(product);
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

export default BuyerDashboard;
