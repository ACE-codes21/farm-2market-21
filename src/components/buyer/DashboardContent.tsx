
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
  filters: { category: string; searchQuery: string };
  setFilters: (filters: { category: string; searchQuery: string }) => void;
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
  isInWishlist,
}) => {
  if (activeTab === 'vendors') {
    return <VendorMapView />;
  }

  if (activeTab === 'orders') {
    return <OrdersPage />;
  }

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="dark-glass-effect rounded-3xl p-8 border border-slate-600/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="text-white">Discover </span>
            <span className="text-green-400">Local Market</span>
          </h2>
          <p className="text-slate-400 text-center text-lg mb-8">
            Fresh produce directly from local vendors to your doorstep
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-slate-400" />
            <Input
              type="text"
              placeholder="Search fresh products, snacks, beverages..."
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              className="pl-12 h-14 text-lg bg-slate-800/50 border-slate-600/30 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50 rounded-2xl"
            />
            <Button className="absolute right-2 top-2 h-10 px-6 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white border-0 rounded-xl">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
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
