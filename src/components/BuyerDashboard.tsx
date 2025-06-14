
import React, { useState, useMemo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { CartSheet } from '@/components/CartSheet';
import { WishlistSheet } from '@/components/WishlistSheet';
import BuyerHeader from '@/components/BuyerHeader';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { initialProducts } from '@/data/market';

interface BuyerDashboardProps {
  onRoleChange: () => void;
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ onRoleChange }) => {
  const [products] = useState<Product[]>(initialProducts);
  const [filters, setFilters] = useState({ category: 'all', minPrice: 0, maxPrice: 1000, searchQuery: '' });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch = filters.category === 'all' || product.category === filters.category;
      const priceMatch = product.price >= filters.minPrice && product.price <= filters.maxPrice;
      const searchMatch = product.name.toLowerCase().includes(filters.searchQuery.toLowerCase());
      return categoryMatch && priceMatch && searchMatch;
    });
  }, [products, filters]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BuyerHeader
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistItemCount={wishlist.length}
        onRoleChange={onRoleChange}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <ProductFilters filters={filters} onFilterChange={setFilters} />
          </aside>
          
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold font-display mb-6">Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onAddToCart={() => addToCart(product)}
                  onAddToWishlist={addToWishlist}
                  isInWishlist={isInWishlist(product.id)}
                />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-xl">No products match your criteria.</p>
                <p>Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <CartSheet 
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        cartItems={cart}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
      <WishlistSheet
        isOpen={isWishlistOpen}
        onOpenChange={setIsWishlistOpen}
        wishlistItems={wishlist}
        onRemoveFromWishlist={removeFromWishlist}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default BuyerDashboard;
