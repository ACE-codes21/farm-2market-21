
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Filter } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { FilterOptions } from './ProductFilters';

interface FilterDropdownProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  filters,
  onFiltersChange,
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

  const resetFilters = () => {
    onFiltersChange({
      priceRange: [0, 500],
      minRating: 0,
      freshness: 'all',
      maxDeliveryTime: 60
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="dark-elegant-input h-14 px-6 bg-slate-800/50 border-slate-600/30 text-white hover:bg-slate-700/50"
        >
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-6 dark-modern-card border border-slate-600/30 shadow-2xl bg-slate-800" 
        align="end"
        sideOffset={8}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Filters</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="text-slate-400 hover:text-white"
            >
              Reset
            </Button>
          </div>
          
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
            <Label className="text-white font-medium">Minimum Rating</Label>
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
              <SelectTrigger className="dark-elegant-input bg-slate-700/50 border-slate-600/30 text-white">
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
                {filters.maxDeliveryTime} minutes
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
