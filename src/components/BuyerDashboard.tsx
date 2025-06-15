
import React, { useState, useMemo } from 'react';
import { ProductList } from '@/components/ProductList';
import { ProductFilters } from '@/components/ProductFilters';
import { CartSheet } from '@/components/CartSheet';
import { WishlistSheet } from '@/components/WishlistSheet';
import { BuyerHeader } from '@/components/BuyerHeader';
import { VendorDiscoveryMap } from '@/components/VendorDiscoveryMap';
import { CartItem, Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useAppContext } from '@/contexts/AppContext';
import { Sparkles, Map, Grid3x3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BuyerDashboardProps {
  onRoleChange: () => void;
  onPurchase: (items: CartItem[]) => void;
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ onRoleChange, onPurchase }) => {
  const { products } = useAppContext();
  const [filters, setFilters] = useState({ category: 'all', searchQuery: '' });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'products' | 'vendors'>('products');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  const { cartItems: cart, addToCart, removeFromCart, updateCartQuantity, cartTotalItems, clearCart } = useCart();
  const { wishlistItems: wishlist, handleAddToWishlist: addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch = filters.category === 'all' || product.category === filters.category;
      const searchMatch = product.name.toLowerCase().includes(filters.searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [products, filters]);

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
        onRoleChange={onRoleChange}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold font-display gradient-text mb-2">Discover Local Market</h2>
          <p className="text-slate-300">Find fresh produce and authentic items from local street vendors</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="dark-glass-effect rounded-2xl p-2 border border-slate-600/30 inline-flex">
            <Button
              variant={activeTab === 'products' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                activeTab === 'products' 
                  ? 'bg-gradient-to-r from-green-600 to-orange-500 text-white shadow-lg' 
                  : 'hover:bg-slate-700/50 text-slate-300'
              }`}
            >
              <Grid3x3 className="h-4 w-4" />
              Browse Products
            </Button>
            <Button
              variant={activeTab === 'vendors' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('vendors')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                activeTab === 'vendors' 
                  ? 'bg-gradient-to-r from-green-600 to-orange-500 text-white shadow-lg' 
                  : 'hover:bg-slate-700/50 text-slate-300'
              }`}
            >
              <Map className="h-4 w-4" />
              Discover Vendors
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
                    <p className="text-slate-300">Try adjusting your search or category filters</p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <VendorDiscoveryMap />
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
