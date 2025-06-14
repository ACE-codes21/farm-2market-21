
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ onRoleChange }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const products = [
    { 
      id: 1, 
      name: 'Fresh Bananas (1kg)', 
      price: 2, 
      rating: 4.5, 
      reviews: 28,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
      category: 'Fruits'
    },
    { 
      id: 2, 
      name: 'Tomatoes (1kg)', 
      price: 3, 
      rating: 4.7, 
      reviews: 45,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop',
      category: 'Vegetables'
    },
    { 
      id: 3, 
      name: 'Onions (1kg)', 
      price: 1, 
      rating: 4.2, 
      reviews: 32,
      image: 'https://images.unsplash.com/photo-1508313880080-c4bae5d55a0a?w=400&h=300&fit=crop',
      category: 'Vegetables'
    },
    { 
      id: 4, 
      name: 'Street Samosas (6 pcs)', 
      price: 4, 
      rating: 4.8, 
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
      category: 'Snacks'
    },
    { 
      id: 5, 
      name: 'Fresh Orange Juice', 
      price: 2, 
      rating: 4.6, 
      reviews: 23,
      image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop',
      category: 'Beverages'
    },
    { 
      id: 6, 
      name: 'Homemade Pickles', 
      price: 5, 
      rating: 4.4, 
      reviews: 18,
      image: 'https://images.unsplash.com/photo-1599599810694-57a2ca8276a8?w=400&h=300&fit=crop',
      category: 'Condiments'
    },
    { 
      id: 7, 
      name: 'Green Chilies (250g)', 
      price: 1, 
      rating: 4.3, 
      reviews: 15,
      image: 'https://images.unsplash.com/photo-1583604649804-81d019b8e1e4?w=400&h=300&fit=crop',
      category: 'Spices'
    },
    { 
      id: 8, 
      name: 'Fresh Coriander (bunch)', 
      price: 1, 
      rating: 4.5, 
      reviews: 41,
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop',
      category: 'Herbs'
    },
    { 
      id: 9, 
      name: 'Ginger (500g)', 
      price: 3, 
      rating: 4.6, 
      reviews: 29,
      image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=400&h=300&fit=crop',
      category: 'Spices'
    },
    { 
      id: 10, 
      name: 'Coconut Water (fresh)', 
      price: 2, 
      rating: 4.7, 
      reviews: 34,
      image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&h=300&fit=crop',
      category: 'Beverages'
    },
    { 
      id: 11, 
      name: 'Roasted Peanuts (200g)', 
      price: 2, 
      rating: 4.4, 
      reviews: 52,
      image: 'https://images.unsplash.com/photo-1582886946878-7f23e1fd1f2d?w=400&h=300&fit=crop',
      category: 'Snacks'
    },
    { 
      id: 12, 
      name: 'Street-style Pani Puri', 
      price: 3, 
      rating: 4.9, 
      reviews: 88,
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop',
      category: 'Street Food'
    },
  ];

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
                Wishlist (3)
              </Button>
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart (0)
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
            <Button variant="outline" className="h-12">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
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
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Button 
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white group-hover:opacity-100 opacity-0 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
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
                      ${product.price}
                    </span>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
