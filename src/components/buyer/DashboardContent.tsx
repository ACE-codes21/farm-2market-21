
import React from 'react';
import { ProductList } from '@/components/ProductList';
import { ProductFilters, FilterOptions, SortOptions } from '@/components/ProductFilters';
import { VendorDiscoveryMap } from '@/components/VendorDiscoveryMap';
import { OrdersPage } from '@/components/OrdersPage';
import { Product } from '@/types';

interface DashboardContentProps {
  activeTab: 'products' | 'vendors' | 'orders';
  isLoadingProducts: boolean;
  filteredProducts: Product[];
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  filters: { category: string; searchQuery: string };
  setFilters: React.Dispatch<React.SetStateAction<{ category: string; searchQuery: string; }>>;
  advancedFilters: FilterOptions;
  setAdvancedFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  sortOptions: SortOptions;
  setSortOptions: React.Dispatch<React.SetStateAction<SortOptions>>;
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
  if (activeTab === 'products') {
    return (
      <>
        <ProductFilters
          selectedCategory={filters.category}
          onCategoryChange={(category) => setFilters(f => ({ ...f, category }))}
          searchQuery={filters.searchQuery}
          onSearchQueryChange={(searchQuery) => setFilters(f => ({ ...f, searchQuery }))}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          filters={advancedFilters}
          onFiltersChange={setAdvancedFilters}
          sortOptions={sortOptions}
          onSortChange={setSortOptions}
        />
        <div className="mt-6">
          {isLoadingProducts ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-slate-300">Fetching fresh products...</p>
            </div>
          ) : (
            <>
              <ProductList
                products={filteredProducts}
                viewMode={viewMode}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
                isInWishlist={isInWishlist}
              />
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <div className="dark-glass-effect rounded-3xl p-12 max-w-md mx-auto border border-slate-600/30">
                    <p className="text-2xl font-semibold text-white mb-3">No products found</p>
                    <p className="text-slate-300">Try adjusting your search or filters</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </>
    );
  }

  if (activeTab === 'vendors') {
    return <VendorDiscoveryMap />;
  }
  
  return <OrdersPage />;
};
