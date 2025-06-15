
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';
import { FilterOptions, SortOptions } from '@/components/ProductFilters';

export const useBuyerDashboard = () => {
  const { data: products = [], isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          vendor:profiles (
            full_name,
            phone,
            upi_id,
            upi_qr_code
          )
        `)
        .gt('stock', 0);

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
      
      return data.map((p: any) => ({
        ...p,
        id: p.id,
        price: Number(p.price),
        vendor: p.vendor ? { name: p.vendor.full_name, phone: p.vendor.phone, upiId: p.vendor.upi_id, upiQrCode: p.vendor.upi_qr_code } : undefined,
      }));
    },
  });

  const [filters, setFilters] = useState({ category: 'all', searchQuery: '' });
  const [advancedFilters, setAdvancedFilters] = useState<FilterOptions>({
    priceRange: [0, 500],
    minRating: 0,
    freshness: 'all' as const,
    maxDeliveryTime: 60
  });
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: 'none',
    direction: 'asc'
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'products' | 'vendors' | 'orders'>('products');

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const categoryMatch = filters.category === 'all' || product.category === filters.category;
      const searchMatch = product.name.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const priceMatch = product.price >= advancedFilters.priceRange[0] && product.price <= advancedFilters.priceRange[1];
      const ratingMatch = product.rating >= advancedFilters.minRating;
      const freshnessMatch = advancedFilters.freshness === 'all' || 
        (advancedFilters.freshness === 'fresh-pick' && product.isFreshPick) ||
        (advancedFilters.freshness === 'regular' && !product.isFreshPick);
      const estimatedDeliveryTime = Math.floor(Math.random() * 35) + 10;
      const deliveryTimeMatch = estimatedDeliveryTime <= advancedFilters.maxDeliveryTime;
      
      return categoryMatch && searchMatch && priceMatch && ratingMatch && freshnessMatch && deliveryTimeMatch;
    });

    if (sortOptions.field !== 'none') {
      filtered.sort((a, b) => {
        let comparison = 0;
        if (sortOptions.field === 'price') {
          comparison = a.price - b.price;
        } else if (sortOptions.field === 'rating') {
          comparison = a.rating - b.rating;
        }
        return sortOptions.direction === 'desc' ? -comparison : comparison;
      });
    }

    return filtered;
  }, [products, filters, advancedFilters, sortOptions]);

  return {
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
    filteredProducts,
  };
};
