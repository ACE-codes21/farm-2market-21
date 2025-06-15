
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
    <div className="dark-glass-effect rounded-3xl p-8 mb-8 border border-slate-600/30">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 relative">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 h-6 w-6" />
          <Input
            placeholder="Search fresh produce, snacks, beverages..."
            className="dark-elegant-input pl-14 h-14 text-lg font-medium bg-slate-800/50 border-slate-600/30 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="dark-elegant-input w-56 h-14 text-lg font-medium bg-slate-800/50 border-slate-600/30 text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="dark-modern-card border border-slate-600/30 shadow-2xl bg-slate-800">
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value} className="text-lg py-3 hover:bg-green-500/10 rounded-lg text-white">
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="dark-glass-effect rounded-2xl p-2 border border-slate-600/30">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className={`h-12 w-12 p-0 transition-all duration-200 rounded-xl ${
                viewMode === 'grid' 
                  ? 'bg-gradient-to-r from-green-600 to-orange-500 text-white shadow-lg hover:shadow-xl hover:shadow-green-500/25' 
                  : 'hover:bg-slate-700/50 text-slate-300'
              }`}
            >
              <Grid className="h-5 w-5" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className={`h-12 w-12 p-0 transition-all duration-200 rounded-xl ${
                viewMode === 'list' 
                  ? 'bg-gradient-to-r from-green-600 to-orange-500 text-white shadow-lg hover:shadow-xl hover:shadow-green-500/25' 
                  : 'hover:bg-slate-700/50 text-slate-300'
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
