
import React, { useState, useMemo } from 'react';
import { ProductList } from '@/components/ProductList';
import { ProductFilters } from '@/components/ProductFilters';
import { CartSheet } from '@/components/CartSheet';
import { WishlistSheet } from '@/components/WishlistSheet';
import { BuyerHeader } from '@/components/BuyerHeader';
import { CartItem, Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { products as initialProducts } from '@/data/market';

interface BuyerDashboardProps {
  onRoleChange: () => void;
  onPurchase: (items: CartItem[]) => void;
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ onRoleChange, onPurchase }) => {
  const [products] = useState<Product[]>(initialProducts);
  const [filters, setFilters] = useState({ category: 'all', searchQuery: '' });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  const { cartItems: cart, addToCart, removeFromCart, updateCartQuantity, cartTotalItems } = useCart();
  const { wishlistItems: wishlist, handleAddToWishlist: addToWishlist, removeFromWishlist: removeFromWishlistFromHook, isInWishlist } = useWishlist();

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch = filters.category === 'all' || product.category === filters.category;
      const searchMatch = product.name.toLowerCase().includes(filters.searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [products, filters]);

  const handleRemoveFromWishlist = (product: Product) => {
    removeFromWishlistFromHook(product);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BuyerHeader
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        cartItemCount={cartTotalItems}
        wishlistItemCount={wishlist.length}
        onRoleChange={onRoleChange}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                onAddToCart={addToCart}
                onAddToWishlist={addToWishlist}
                isInWishlist={isInWishlist}
            />
            {filteredProducts.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-xl">No products match your criteria.</p>
                <p>Try adjusting your filters.</p>
              </div>
            )}
          </div>
      </main>
      
      <CartSheet 
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        cartItems={cart}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateCartQuantity}
        onCheckout={onPurchase}
      />
      <WishlistSheet
        open={isWishlistOpen}
        onOpenChange={setIsWishlistOpen}
        wishlistItems={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default BuyerDashboard;
