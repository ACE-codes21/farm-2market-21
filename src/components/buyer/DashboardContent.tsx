
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
      <div className="dark-glass-effect rounded-3xl p-8 border border-slate-600/30">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 relative">
            <input 
              placeholder="Search fresh produce, snacks, beverages..." 
              className="w-full pl-14 h-14 text-lg font-medium bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder:text-slate-400 focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50" 
            />
          </div>
        </div>
      </div>
      
      <ProductList
        products={filteredProducts}
        viewMode={viewMode}
        onAddToCart={onAddToCart}
        onAddToWishlist={onAddToWishlist}
        isInWishlist={isInWishlist}
      />
    </div>
  );
};
