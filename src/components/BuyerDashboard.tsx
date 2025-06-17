
import React, { useState } from 'react';
import { CartSheet } from '@/components/CartSheet';
import { WishlistSheet } from '@/components/WishlistSheet';
import { BuyerHeader } from '@/components/BuyerHeader';
import { CartItem, Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useBuyerDashboard } from '@/hooks/useBuyerDashboard';
import { DashboardTabs } from '@/components/buyer/DashboardTabs';
import { DashboardContent } from '@/components/buyer/DashboardContent';
import { Sparkles } from 'lucide-react';

interface BuyerDashboardProps {
  onRoleChange: () => void;
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({
  onRoleChange
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const {
    cartItems: cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    cartTotalItems,
    clearCart
  } = useCart();

  const {
    wishlistItems: wishlist,
    handleAddToWishlist: addToWishlist,
    removeFromWishlist,
    isInWishlist
  } = useWishlist();

  const {
    isLoadingProducts,
    filters,
    setFilters,
    advancedFilters,
    setAdvancedFilters,
    sortOptions,
    setSortOptions,
    viewMode,
    setViewMode,
    activeTab,
    setActiveTab,
    filteredProducts
  } = useBuyerDashboard();

  const handleRemoveFromWishlist = (product: Product) => {
    removeFromWishlist(product);
  };

  const handleCheckout = async (paymentMethod: string = 'card') => {
    await clearCart(paymentMethod);
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
      <BuyerHeader 
        onCartOpen={() => setIsCartOpen(true)} 
        onWishlistOpen={() => setIsWishlistOpen(true)} 
        cartItemCount={cartTotalItems} 
        wishlistCount={wishlist.length} 
        onOrdersClick={() => setActiveTab('orders')} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <DashboardContent 
          activeTab={activeTab} 
          isLoadingProducts={isLoadingProducts} 
          filteredProducts={filteredProducts} 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          filters={filters} 
          setFilters={setFilters} 
          advancedFilters={advancedFilters} 
          setAdvancedFilters={setAdvancedFilters} 
          sortOptions={sortOptions} 
          setSortOptions={setSortOptions} 
          onAddToCart={handleAddToCart} 
          onAddToWishlist={addToWishlist} 
          isInWishlist={isInWishlist} 
        />
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
