
```tsx
import React, { useState } from 'react';
import { CartSheet } from './CartSheet';
import { WishlistSheet } from './WishlistSheet';

import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { BuyerHeader } from './BuyerHeader';
import { ProductFilters } from './ProductFilters';
import { ProductList } from './ProductList';
import { Product, CartItem } from '@/types';

interface BuyerDashboardProps {
  onRoleChange: () => void;
  products: Product[];
  onPurchase: (items: CartItem[]) => void;
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ onRoleChange, products, onPurchase }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const { cartItems, addToCart, updateCartQuantity, cartTotalItems, clearCart } = useCart();
  const { 
    wishlistItems, 
    handleAddToWishlist, 
    removeFromWishlist, 
    moveToCart, 
    isInWishlist 
  } = useWishlist(addToCart);
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleCheckout = () => {
    onPurchase(cartItems);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-secondary">
      <BuyerHeader
        wishlistCount={wishlistItems.length}
        cartItemCount={cartTotalItems}
        onWishlistOpen={() => setIsWishlistOpen(true)}
        onCartOpen={() => setIsCartOpen(true)}
        onRoleChange={onRoleChange}
      />

      <CartSheet 
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        onCheckout={handleCheckout}
      />
      
      <WishlistSheet 
        wishlistItems={wishlistItems}
        onRemoveFromWishlist={removeFromWishlist}
        onMoveToCart={moveToCart}
        open={isWishlistOpen}
        onOpenChange={setIsWishlistOpen}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <ProductList
          products={filteredProducts}
          viewMode={viewMode}
          onAddToCart={addToCart}
          onAddToWishlist={handleAddToWishlist}
          isInWishlist={isInWishlist}
        />
      </main>
    </div>
  );
};

export default BuyerDashboard;
```
