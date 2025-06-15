
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, ArrowUp, ArrowDown } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export interface FilterOptions {
  priceRange: [number, number];
  minRating: number;
  freshness: 'all' | 'fresh-pick' | 'regular';
  maxDeliveryTime: number;
}

export interface SortOptions {
  field: 'price' | 'rating' | 'none';
  direction: 'asc' | 'desc';
}

interface AdvancedFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  sortOptions: SortOptions;
  onSortChange: (sort: SortOptions) => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  sortOptions,
  onSortChange,
}) => {
  const handlePriceRangeChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [value[0], value[1]]
    });
  };

  const handleRatingChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      minRating: value[0]
    });
  };

  const handleFreshnessChange = (value: string) => {
    onFiltersChange({
      ...filters,
      freshness: value as 'all' | 'fresh-pick' | 'regular'
    });
  };

  const handleDeliveryTimeChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      maxDeliveryTime: value[0]
    });
  };

  const handleSortFieldChange = (field: string) => {
    if (field === 'none') {
      onSortChange({ field: 'none', direction: 'asc' });
    } else {
      onSortChange({
        field: field as 'price' | 'rating',
        direction: sortOptions.direction
      });
    }
  };

  const toggleSortDirection = () => {
    if (sortOptions.field !== 'none') {
      onSortChange({
        ...sortOptions,
        direction: sortOptions.direction === 'asc' ? 'desc' : 'asc'
      });
    }
  };

  return (
    <div className="dark-glass-effect rounded-2xl p-6 border border-slate-600/30">
      <div className="flex items-center gap-3 mb-6">
        <Filter className="h-5 w-5 text-green-400" />
        <h3 className="text-lg font-semibold text-white">Filters & Sort</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {/* Price Range Filter */}
        <div className="space-y-3">
          <Label className="text-white font-medium">Price Range</Label>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceRangeChange}
              max={500}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-slate-300 mt-2">
              <span>₹{filters.priceRange[0]}</span>
              <span>₹{filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="space-y-3">
          <Label className="text-white font-medium">Min Rating</Label>
          <div className="px-2">
            <Slider
              value={[filters.minRating]}
              onValueChange={handleRatingChange}
              max={5}
              min={0}
              step={0.5}
              className="w-full"
            />
            <div className="text-sm text-slate-300 mt-2 text-center">
              {filters.minRating}+ stars
            </div>
          </div>
        </div>

        {/* Freshness Filter */}
        <div className="space-y-3">
          <Label className="text-white font-medium">Freshness</Label>
          <Select value={filters.freshness} onValueChange={handleFreshnessChange}>
            <SelectTrigger className="dark-elegant-input bg-slate-800/50 border-slate-600/30 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark-modern-card border border-slate-600/30 shadow-2xl bg-slate-800">
              <SelectItem value="all" className="text-white hover:bg-green-500/10">All Items</SelectItem>
              <SelectItem value="fresh-pick" className="text-white hover:bg-green-500/10">Fresh Pick Only</SelectItem>
              <SelectItem value="regular" className="text-white hover:bg-green-500/10">Regular Items</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Delivery Time Filter */}
        <div className="space-y-3">
          <Label className="text-white font-medium">Max Delivery Time</Label>
          <div className="px-2">
            <Slider
              value={[filters.maxDeliveryTime]}
              onValueChange={handleDeliveryTimeChange}
              max={60}
              min={5}
              step={5}
              className="w-full"
            />
            <div className="text-sm text-slate-300 mt-2 text-center">
              {filters.maxDeliveryTime} mins
            </div>
          </div>
        </div>

        {/* Sort Options */}
        <div className="space-y-3">
          <Label className="text-white font-medium">Sort By</Label>
          <div className="flex gap-2">
            <Select value={sortOptions.field} onValueChange={handleSortFieldChange}>
              <SelectTrigger className="dark-elegant-input bg-slate-800/50 border-slate-600/30 text-white flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark-modern-card border border-slate-600/30 shadow-2xl bg-slate-800">
                <SelectItem value="none" className="text-white hover:bg-green-500/10">None</SelectItem>
                <SelectItem value="price" className="text-white hover:bg-green-500/10">Price</SelectItem>
                <SelectItem value="rating" className="text-white hover:bg-green-500/10">Rating</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSortDirection}
              disabled={sortOptions.field === 'none'}
              className={`h-10 w-10 p-0 rounded-xl border border-slate-600/30 ${
                sortOptions.field === 'none' 
                  ? 'bg-slate-700/30 text-slate-500' 
                  : 'bg-slate-800/50 text-white hover:bg-slate-700/50'
              }`}
            >
              {sortOptions.direction === 'asc' ? 
                <ArrowUp className="h-4 w-4" /> : 
                <ArrowDown className="h-4 w-4" />
              }
            </Button>
          </div>
          {sortOptions.field !== 'none' && (
            <div className="text-xs text-slate-400 text-center">
              {sortOptions.field === 'price' ? 'Price' : 'Rating'}: {sortOptions.direction === 'asc' ? 'Low to High' : 'High to Low'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
