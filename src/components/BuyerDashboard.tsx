
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Heart, 
  ShoppingCart,
  Grid,
  List
} from 'lucide-react';
import { CartItem, Product } from '@/types';
import { products, categories } from '@/data/market';
import { ProductCard } from './ProductCard';
import { CartSheet } from './CartSheet';
import { WishlistSheet } from './WishlistSheet';

interface BuyerDashboardProps {
  onRoleChange: () => void;
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ onRoleChange }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { toast } = useToast();
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevCartItems => {
        const existingItem = prevCartItems.find(item => item.id === product.id);
        if (existingItem) {
            return prevCartItems.map(item => 
                item.id === product.id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
        } else {
            return [...prevCartItems, { ...product, quantity }];
        }
    });
    toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
    });
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
        setCartItems(prev => prev.filter(item => item.id !== productId));
        toast({
            variant: 'destructive',
            title: "Item Removed",
            description: "Item removed from your cart.",
        });
    } else {
        setCartItems(prev => prev.map(item => 
            item.id === productId 
            ? { ...item, quantity: newQuantity } 
            : item
        ));
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
        variant: 'destructive',
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    }
  };

  const removeFromWishlist = (product: Product) => {
    setWishlistItems(prev => prev.filter(item => item.id !== product.id));
    toast({
        variant: 'destructive',
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
    });
  };

  const moveToCart = (product: Product) => {
    addToCart(product);
    removeFromWishlist(product);
    toast({
        title: "Moved to Cart",
        description: `${product.name} has been moved from your cart.`,
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Local Street Market</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setIsWishlistOpen(true)}>
                <Heart className="h-5 w-5 mr-2" />
                Wishlist ({wishlistItems.length})
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsCartOpen(true)}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
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

      <CartSheet 
        cartItems={cartItems}
        onUpdateQuantity={handleQuantityChange}
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
      />
      
      <WishlistSheet 
        wishlistItems={wishlistItems}
        onRemoveFromWishlist={removeFromWishlist}
        onMoveToCart={moveToCart}
        open={isWishlistOpen}
        onOpenChange={setIsWishlistOpen}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              onAddToCart={() => addToCart(product)}
              onAddToWishlist={addToWishlist}
              isInWishlist={isInWishlist(product.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default BuyerDashboard;
