
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Grid, List } from 'lucide-react';
import { categories } from '@/data/market';

interface ProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchQueryChange,
}) => {
  return (
    <div className="glass-effect rounded-3xl p-8 mb-8 border border-white/30">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 relative">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
          <Input
            placeholder="Search fresh produce, snacks, beverages..."
            className="elegant-input pl-14 h-14 text-lg font-medium focus:ring-2 focus:ring-primary/20"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="elegant-input w-56 h-14 text-lg font-medium">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="modern-card border border-white/30 shadow-2xl">
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value} className="text-lg py-3 hover:bg-primary/10 rounded-lg">
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="glass-effect rounded-2xl p-2 border border-white/30">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className={`h-12 w-12 p-0 transition-all duration-200 rounded-xl ${
                viewMode === 'grid' ? 'premium-button' : 'hover:bg-white/30'
              }`}
            >
              <Grid className="h-5 w-5" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className={`h-12 w-12 p-0 transition-all duration-200 rounded-xl ${
                viewMode === 'list' ? 'premium-button' : 'hover:bg-white/30'
              }`}
            >
              <List className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
