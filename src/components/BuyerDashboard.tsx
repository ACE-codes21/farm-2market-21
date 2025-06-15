import React, { useState, useMemo } from 'react';
import { ProductList } from '@/components/ProductList';
import { ProductFilters, FilterOptions, SortOptions } from '@/components/ProductFilters';
import { CartSheet } from '@/components/CartSheet';
import { WishlistSheet } from '@/components/WishlistSheet';
import { BuyerHeader } from '@/components/BuyerHeader';
import { VendorDiscoveryMap } from '@/components/VendorDiscoveryMap';
import { OrdersPage } from '@/components/OrdersPage';
import { CartItem, Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useAppContext } from '@/contexts/AppContext';
import { Sparkles, Map, Grid3x3, List, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BuyerDashboardProps {
  onRoleChange: () => void;
  onPurchase: (items: CartItem[]) => void;
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ onRoleChange, onPurchase }) => {
  const { products } = useAppContext();
  const [filters, setFilters] = useState({ category: 'all', searchQuery: '' });
  const [advancedFilters, setAdvancedFilters] = useState<FilterOptions>({
    priceRange: [0, 500],
    minRating: 0,
    freshness: 'all' as const,
    maxDeliveryTime: 60
  });
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: 'none',
    direction: 'asc'
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'products' | 'vendors' | 'orders'>('products');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  const { cartItems: cart, addToCart, removeFromCart, updateCartQuantity, cartTotalItems, clearCart } = useCart();
  const { wishlistItems: wishlist, handleAddToWishlist: addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const categoryMatch = filters.category === 'all' || product.category === filters.category;
      const searchMatch = product.name.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const priceMatch = product.price >= advancedFilters.priceRange[0] && product.price <= advancedFilters.priceRange[1];
      const ratingMatch = product.rating >= advancedFilters.minRating;
      const freshnessMatch = advancedFilters.freshness === 'all' || 
        (advancedFilters.freshness === 'fresh-pick' && product.isFreshPick) ||
        (advancedFilters.freshness === 'regular' && !product.isFreshPick);
      // Note: Delivery time would be calculated based on vendor location vs user location in a real app
      // For now, we'll simulate with a random delivery time between 10-45 minutes
      const estimatedDeliveryTime = Math.floor(Math.random() * 35) + 10;
      const deliveryTimeMatch = estimatedDeliveryTime <= advancedFilters.maxDeliveryTime;
      
      return categoryMatch && searchMatch && priceMatch && ratingMatch && freshnessMatch && deliveryTimeMatch;
    });

    // Apply sorting
    if (sortOptions.field !== 'none') {
      filtered.sort((a, b) => {
        let comparison = 0;
        if (sortOptions.field === 'price') {
          comparison = a.price - b.price;
        } else if (sortOptions.field === 'rating') {
          comparison = a.rating - b.rating;
        }
        return sortOptions.direction === 'desc' ? -comparison : comparison;
      });
    }

    return filtered;
  }, [products, filters, advancedFilters, sortOptions]);

  const handleRemoveFromWishlist = (product: Product) => {
    removeFromWishlist(product);
  }

  const handleCheckout = () => {
    onPurchase(cart);
    clearCart();
  };

  const handleMoveToCart = (product: Product) => {
    addToCart(product, 1);
    removeFromWishlist(product);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      {/* Brand Banner */}
      <div className="bg-gradient-to-r from-green-600 via-orange-500 to-green-600 py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4 text-white animate-pulse" />
          <span className="text-white font-medium text-sm tracking-wide">
            🌿 Welcome to Farm2Market | Fresh from the Street
          </span>
          <Sparkles className="h-4 w-4 text-white animate-pulse" />
        </div>
      </div>

      <BuyerHeader
        onCartOpen={() => setIsCartOpen(true)}
        onWishlistOpen={() => setIsWishlistOpen(true)}
        cartItemCount={cartTotalItems}
        wishlistCount={wishlist.length}
        onOrdersClick={() => setActiveTab('orders')}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section with Tab Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold font-display gradient-text mb-2">
              {activeTab === 'products' && 'Discover Local Market'}
              {activeTab === 'vendors' && 'Discover Vendors'}
              {activeTab === 'orders' && 'My Orders'}
            </h2>
            <p className="text-slate-300">
              {activeTab === 'products' && 'Find fresh produce and authentic items from local street vendors'}
              {activeTab === 'vendors' && 'Find fresh products from local vendors around you'}
              {activeTab === 'orders' && 'Track your orders and view order history'}
            </p>
          </div>
          
          {/* Tab Navigation moved to right side */}
          <div className="dark-glass-effect rounded-2xl p-2 border border-slate-600/30 inline-flex">
            <Button
              variant={activeTab === 'products' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === 'products' 
                  ? 'bg-gradient-to-r from-green-600 to-orange-500 text-white shadow-lg' 
                  : 'hover:bg-slate-700/50 text-slate-300'
              }`}
            >
              <Grid3x3 className="h-4 w-4" />
              Products
            </Button>
            <Button
              variant={activeTab === 'vendors' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('vendors')}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === 'vendors' 
                  ? 'bg-gradient-to-r from-green-600 to-orange-500 text-white shadow-lg' 
                  : 'hover:bg-slate-700/50 text-slate-300'
              }`}
            >
              <Map className="h-4 w-4" />
              Vendors
            </Button>
            <Button
              variant={activeTab === 'orders' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === 'orders' 
                  ? 'bg-gradient-to-r from-green-600 to-orange-500 text-white shadow-lg' 
                  : 'hover:bg-slate-700/50 text-slate-300'
              }`}
            >
              <Package className="h-4 w-4" />
              Orders
            </Button>
          </div>
        </div>

        {activeTab === 'products' ? (
          <>
            <ProductFilters
              selectedCategory={filters.category}
              onCategoryChange={(category) => setFilters(f => ({ ...f, category }))}
              searchQuery={filters.searchQuery}
              onSearchQueryChange={(searchQuery) => setFilters(f => ({ ...f, searchQuery }))}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              filters={advancedFilters}
              onFiltersChange={setAdvancedFilters}
              sortOptions={sortOptions}
              onSortChange={setSortOptions}
            />
            <div className="mt-6">
              <ProductList
                products={filteredProducts}
                viewMode={viewMode}
                onAddToCart={handleAddToCart}
                onAddToWishlist={addToWishlist}
                isInWishlist={isInWishlist}
              />
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <div className="dark-glass-effect rounded-3xl p-12 max-w-md mx-auto border border-slate-600/30">
                    <p className="text-2xl font-semibold text-white mb-3">No products found</p>
                    <p className="text-slate-300">Try adjusting your search or filters</p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : activeTab === 'vendors' ? (
          <VendorDiscoveryMap />
        ) : (
          <OrdersPage />
        )}
      </main>
      
      <CartSheet 
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        cartItems={cart}
        onUpdateQuantity={updateCartQuantity}
        onCheckout={handleCheckout}
      />
      <WishlistSheet
        open={isWishlistOpen}
        onOpenChange={setIsWishlistOpen}
        wishlistItems={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleMoveToCart}
      />
    </div>
  );
};

export default BuyerDashboard;
