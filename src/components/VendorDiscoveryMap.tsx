
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock, Navigation, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VendorProductsPage } from './VendorProductsPage';

interface Vendor {
  id: string;
  name: string;
  category: string;
  distance: number;
  rating: number;
  freshness: 'Ultra Fresh' | 'Fresh' | 'Good';
  location: { lat: number; lng: number };
  isOnline: boolean;
  estimatedDelivery: string;
}

const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'Rajesh Kumar Farm',
    category: 'Fresh Produce',
    distance: 0.8,
    rating: 4.8,
    freshness: 'Ultra Fresh',
    location: { lat: 28.6139, lng: 77.2090 },
    isOnline: true,
    estimatedDelivery: '15-20 min'
  },
  {
    id: '2',
    name: 'Spice Route',
    category: 'Spices & Herbs',
    distance: 1.2,
    rating: 4.6,
    freshness: 'Fresh',
    location: { lat: 28.6129, lng: 77.2095 },
    isOnline: true,
    estimatedDelivery: '20-25 min'
  },
  {
    id: '3',
    name: 'Dairy Fresh',
    category: 'Dairy',
    distance: 2.1,
    rating: 4.7,
    freshness: 'Ultra Fresh',
    location: { lat: 28.6149, lng: 77.2085 },
    isOnline: false,
    estimatedDelivery: 'Offline'
  },
  {
    id: '4',
    name: 'Tropical Fruits Hub',
    category: 'Fruits',
    distance: 1.5,
    rating: 4.7,
    freshness: 'Ultra Fresh',
    location: { lat: 28.6145, lng: 77.2100 },
    isOnline: true,
    estimatedDelivery: '18-25 min'
  },
  {
    id: '5',
    name: 'Street Food Express',
    category: 'Snacks',
    distance: 0.9,
    rating: 4.5,
    freshness: 'Fresh',
    location: { lat: 28.6135, lng: 77.2080 },
    isOnline: true,
    estimatedDelivery: '12-18 min'
  }
];

export const VendorDiscoveryMap: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxDistance, setMaxDistance] = useState('5');
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  const filteredVendors = mockVendors.filter(vendor => {
    const categoryMatch = selectedCategory === 'all' || vendor.category.toLowerCase().includes(selectedCategory);
    const distanceMatch = vendor.distance <= parseFloat(maxDistance);
    return categoryMatch && distanceMatch;
  });

  const getFreshnessColor = (freshness: string) => {
    switch (freshness) {
      case 'Ultra Fresh': return 'bg-green-500';
      case 'Fresh': return 'bg-yellow-500';
      default: return 'bg-orange-500';
    }
  };

  const handleViewProducts = (vendorName: string) => {
    setSelectedVendor(vendorName);
  };

  const handleBackToVendors = () => {
    setSelectedVendor(null);
  };

  if (selectedVendor) {
    return <VendorProductsPage vendorName={selectedVendor} onBack={handleBackToVendors} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Nearby Vendors</h3>
          <p className="text-slate-300">Discover fresh products from local vendors around you</p>
        </div>
        <Button variant="outline" className="dark-modern-card border-slate-600/30 text-white hover:bg-slate-700/50">
          <Navigation className="h-4 w-4 mr-2" />
          Enable Location
        </Button>
      </div>

      {/* Filters */}
      <div className="dark-glass-effect rounded-2xl p-6 border border-slate-600/30">
        <div className="flex items-center gap-4 mb-4">
          <Filter className="h-5 w-5 text-slate-400" />
          <span className="text-white font-medium">Filter Vendors</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="dark-elegant-input bg-slate-800/50 border-slate-600/30 text-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="dark-modern-card border border-slate-600/30 bg-slate-800">
              <SelectItem value="all" className="text-white hover:bg-green-500/10">All Categories</SelectItem>
              <SelectItem value="produce" className="text-white hover:bg-green-500/10">Fresh Produce</SelectItem>
              <SelectItem value="spices" className="text-white hover:bg-green-500/10">Spices & Herbs</SelectItem>
              <SelectItem value="dairy" className="text-white hover:bg-green-500/10">Dairy</SelectItem>
              <SelectItem value="fruits" className="text-white hover:bg-green-500/10">Fruits</SelectItem>
              <SelectItem value="snacks" className="text-white hover:bg-green-500/10">Snacks</SelectItem>
            </SelectContent>
          </Select>
          <Select value={maxDistance} onValueChange={setMaxDistance}>
            <SelectTrigger className="dark-elegant-input bg-slate-800/50 border-slate-600/30 text-white">
              <SelectValue placeholder="Max Distance" />
            </SelectTrigger>
            <SelectContent className="dark-modern-card border border-slate-600/30 bg-slate-800">
              <SelectItem value="1" className="text-white hover:bg-green-500/10">Within 1 km</SelectItem>
              <SelectItem value="2" className="text-white hover:bg-green-500/10">Within 2 km</SelectItem>
              <SelectItem value="5" className="text-white hover:bg-green-500/10">Within 5 km</SelectItem>
              <SelectItem value="10" className="text-white hover:bg-green-500/10">Within 10 km</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="dark-glass-effect rounded-2xl border border-slate-600/30 h-64 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-300 text-lg font-medium">Interactive Map Coming Soon</p>
          <p className="text-slate-400">Discover vendors on an interactive map</p>
        </div>
      </div>

      {/* Vendor List */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-white">Vendors Near You ({filteredVendors.length})</h4>
        <div className="grid gap-4">
          {filteredVendors.map((vendor) => (
            <Card key={vendor.id} className="dark-modern-card border-slate-600/30 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h5 className="text-lg font-semibold text-white">{vendor.name}</h5>
                      <div className={`w-3 h-3 rounded-full ${vendor.isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />
                      <Badge variant="secondary" className="text-xs bg-slate-700/50 text-slate-200 border-slate-600/30">
                        {vendor.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-slate-300">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{vendor.distance} km away</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{vendor.rating}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getFreshnessColor(vendor.freshness)}`} />
                        <span>{vendor.freshness}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{vendor.estimatedDelivery}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className={`${vendor.isOnline ? 'premium-button' : 'bg-slate-600 text-slate-300 cursor-not-allowed'}`}
                    disabled={!vendor.isOnline}
                    onClick={() => vendor.isOnline && handleViewProducts(vendor.name)}
                  >
                    {vendor.isOnline ? 'View Products' : 'Offline'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
