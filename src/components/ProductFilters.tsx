
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
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search fresh produce, snacks, beverages..."
          className="pl-10 h-12"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-48 h-12">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex border rounded-lg p-1 bg-white">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className="h-10 w-10 p-0"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            className="h-10 w-10 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
