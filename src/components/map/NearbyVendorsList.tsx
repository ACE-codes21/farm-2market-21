import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation, Star, Clock, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface VendorLocation {
  id: string;
  name: string;
  category: string;
  distance: number;
  rating: number;
  isOnline: boolean;
  coordinates: [number, number];
  phone?: string;
  email?: string;
  lastActive: string;
  specialties: string[];
}

interface NearbyVendorsListProps {
  filteredVendors: VendorLocation[];
  selectedVendor: VendorLocation | null;
  searchQuery: string;
  onVendorClick: (vendor: VendorLocation) => void;
}

export const NearbyVendorsList: React.FC<NearbyVendorsListProps> = ({
  filteredVendors,
  selectedVendor,
  searchQuery,
  onVendorClick
}) => {
  const { t } = useLanguage();
  
  return (
    <Card className="dark-glass-effect border-slate-600/30">
      <CardHeader>
        <CardTitle className="text-white">
          {t('vendor.nearbyVendors')} ({filteredVendors.length})
          {searchQuery && (
            <span className="text-sm text-slate-400 font-normal"> - Filtered by "{searchQuery}"</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVendors
            .sort((a, b) => a.distance - b.distance)
            .map((vendor) => (
              <div
                key={vendor.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-slate-700/50 ${
                  selectedVendor?.id === vendor.id 
                    ? 'border-green-500/50 bg-green-500/10' 
                    : 'border-slate-600/30 bg-slate-800/30'
                }`}
                onClick={() => onVendorClick(vendor)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{vendor.name}</h4>
                  <div className={`w-2 h-2 rounded-full ${vendor.isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />
                </div>
                
                <div className="space-y-1 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Navigation className="h-3 w-3" />
                    <span>{vendor.distance} km</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span>{vendor.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>{vendor.lastActive}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
        
        {filteredVendors.length === 0 && (
          <div className="text-center py-8">
            <Search className="h-12 w-12 mx-auto mb-4 text-slate-500" />
            <p className="text-slate-400">No vendors found matching your criteria</p>
            <p className="text-slate-500 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
