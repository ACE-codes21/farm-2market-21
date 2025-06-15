
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { SortOptions } from './ProductFilters';

interface SortDropdownProps {
  sortOptions: SortOptions;
  onSortChange: (sort: SortOptions) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  sortOptions,
  onSortChange,
}) => {
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

  const resetSort = () => {
    onSortChange({ field: 'none', direction: 'asc' });
  };

  const getSortLabel = () => {
    if (sortOptions.field === 'none') return 'Sort';
    const fieldLabel = sortOptions.field === 'price' ? 'Price' : 'Rating';
    const directionLabel = sortOptions.direction === 'asc' ? 'Low to High' : 'High to Low';
    return `${fieldLabel}: ${directionLabel}`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="dark-elegant-input h-14 px-6 bg-slate-800/50 border-slate-600/30 text-white hover:bg-slate-700/50"
        >
          <ArrowUpDown className="h-5 w-5 mr-2" />
          {getSortLabel()}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-56 p-4 dark-modern-card border border-slate-600/30 shadow-2xl bg-slate-800" 
        align="end"
        sideOffset={8}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Sort Options</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetSort}
              className="text-xs text-slate-400 hover:text-white h-6 px-2"
            >
              Reset
            </Button>
          </div>
          
          {/* Sort Field Selection */}
          <div className="space-y-2">
            <Label className="text-xs text-white font-medium">Sort By</Label>
            <Select value={sortOptions.field} onValueChange={handleSortFieldChange}>
              <SelectTrigger className="dark-elegant-input bg-slate-700/50 border-slate-600/30 text-white h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark-modern-card border border-slate-600/30 shadow-2xl bg-slate-800">
                <SelectItem value="none" className="text-white hover:bg-green-500/10 text-xs">None</SelectItem>
                <SelectItem value="price" className="text-white hover:bg-green-500/10 text-xs">Price</SelectItem>
                <SelectItem value="rating" className="text-white hover:bg-green-500/10 text-xs">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Direction */}
          {sortOptions.field !== 'none' && (
            <div className="space-y-2">
              <Label className="text-xs text-white font-medium">Order</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={sortOptions.direction === 'asc' ? 'default' : 'outline'}
                  onClick={() => onSortChange({ ...sortOptions, direction: 'asc' })}
                  className={`flex items-center gap-1 text-xs h-8 ${
                    sortOptions.direction === 'asc' 
                      ? 'bg-gradient-to-r from-green-600 to-orange-500 text-white' 
                      : 'bg-slate-700/50 border-slate-600/30 text-white hover:bg-slate-600/50'
                  }`}
                >
                  <ArrowUp className="h-3 w-3" />
                  Low to High
                </Button>
                <Button
                  variant={sortOptions.direction === 'desc' ? 'default' : 'outline'}
                  onClick={() => onSortChange({ ...sortOptions, direction: 'desc' })}
                  className={`flex items-center gap-1 text-xs h-8 ${
                    sortOptions.direction === 'desc' 
                      ? 'bg-gradient-to-r from-green-600 to-orange-500 text-white' 
                      : 'bg-slate-700/50 border-slate-600/30 text-white hover:bg-slate-600/50'
                  }`}
                >
                  <ArrowDown className="h-3 w-3" />
                  High to Low
                </Button>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
