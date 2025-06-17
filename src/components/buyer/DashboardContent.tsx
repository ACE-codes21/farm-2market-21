
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProductList } from '@/components/ProductList';
import { ProductFilters, FilterOptions, SortOptions } from '@/components/ProductFilters';
import { VendorMapView } from './VendorMapView';
import { OrdersPage } from '@/components/OrdersPage';
import { Product } from '@/types';

interface DashboardContentProps {
  activeTab: 'products' | 'vendors' | 'orders';
  isLoadingProducts: boolean;
  filteredProducts: Product[];
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  filters: {
    category: string;
    searchQuery: string;
  };
  setFilters: (filters: {
    category: string;
    searchQuery: string;
  }) => void;
  advancedFilters: FilterOptions;
  setAdvancedFilters: (filters: FilterOptions) => void;
  sortOptions: SortOptions;
  setSortOptions: (options: SortOptions) => void;
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
  isInWishlist
}) => {
  if (activeTab === 'vendors') {
    return <VendorMapView />;
  }

  if (activeTab === 'orders') {
    return <OrdersPage />;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <ProductFilters 
        selectedCategory={filters.category} 
        onCategoryChange={category => setFilters({
          ...filters,
          category
        })} 
        viewMode={viewMode} 
        onViewModeChange={setViewMode} 
        searchQuery={filters.searchQuery} 
        onSearchQueryChange={searchQuery => setFilters({
          ...filters,
          searchQuery
        })} 
        filters={advancedFilters} 
        onFiltersChange={setAdvancedFilters} 
        sortOptions={sortOptions} 
        onSortChange={setSortOptions} 
      />

      {/* Products List */}
      <ProductList 
        products={filteredProducts} 
        isLoading={isLoadingProducts} 
        viewMode={viewMode} 
        onAddToCart={onAddToCart} 
        onAddToWishlist={onAddToWishlist} 
        isInWishlist={isInWishlist} 
      />
    </div>
  );
};
