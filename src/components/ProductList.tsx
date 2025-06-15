
import React from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  isLoading?: boolean;
  onAddToCart: (product: Product, quantity: number) => void;
  onAddToWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  viewMode,
  isLoading = false,
  onAddToCart,
  onAddToWishlist,
  isInWishlist,
}) => {
  // Filter out expired Fresh Pick items
  const activeProducts = products.filter(product => {
    if (product.isFreshPick && product.freshPickExpiresAt) {
      return new Date(product.freshPickExpiresAt).getTime() > new Date().getTime();
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-slate-800/50 rounded-lg h-64 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${
      viewMode === 'grid'
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
        : 'grid-cols-1 max-w-4xl mx-auto'
    }`}>
      {activeProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={(quantity: number) => onAddToCart(product, quantity)}
          onAddToWishlist={onAddToWishlist}
          isInWishlist={isInWishlist(product.id)}
        />
      ))}
    </div>
  );
};
