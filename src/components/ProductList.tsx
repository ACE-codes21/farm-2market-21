
import React from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  viewMode,
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

  return (
    <div className={`grid gap-6 ${
      viewMode === 'grid'
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        : 'grid-cols-1'
    }`}>
      {activeProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={() => onAddToCart(product)}
          onAddToWishlist={onAddToWishlist}
          isInWishlist={isInWishlist(product.id)}
        />
      ))}
    </div>
  );
};
