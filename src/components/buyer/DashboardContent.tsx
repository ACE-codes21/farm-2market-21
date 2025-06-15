
import React from 'react';
import { ProductList } from '@/components/ProductList';
import { ProductFilters } from '@/components/ProductFilters';
import { OrdersPage } from '@/components/OrdersPage';
import { VendorMapView } from './VendorMapView';
import { Product } from '@/types';

interface DashboardContentProps {
  activeTab: string;
  isLoadingProducts: boolean;
  filteredProducts: Product[];
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  filters: any;
  setFilters: (filters: any) => void;
  advancedFilters: any;
  setAdvancedFilters: (filters: any) => void;
  sortOptions: any;
  setSortOptions: (options: any) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onAddToWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
  activeTab,
  isLoadingProducts,
  filteredProducts,
  viewMode,
  setViewMode,
  filters,
  setFilters,
  advancedFilters,
  setAdvancedFilters,
  sortOptions,
  setSortOptions,
  onAddToCart,
  onAddToWishlist,
  isInWishlist,
}) => {
  if (activeTab === 'orders') {
    return <OrdersPage />;
  }

  if (activeTab === 'vendors') {
    return <VendorMapView />;
  }

  return (
    <div className="space-y-6">
      <ProductFilters
        filters={filters}
        setFilters={setFilters}
        advancedFilters={advancedFilters}
        setAdvancedFilters={setAdvancedFilters}
        sortOptions={sortOptions}
        setSortOptions={setSortOptions}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      
      <ProductList
        products={filteredProducts}
        viewMode={viewMode}
        isLoading={isLoadingProducts}
        onAddToCart={onAddToCart}
        onAddToWishlist={onAddToWishlist}
        isInWishlist={isInWishlist}
      />
    </div>
  );
};
