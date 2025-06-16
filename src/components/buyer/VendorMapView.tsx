
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Search, Phone, Navigation, Star, Filter, Users } from 'lucide-react';
import { useVendorProfiles, VendorProfile } from '@/hooks/useVendorProfiles';
import { Skeleton } from '@/components/ui/skeleton';

export const VendorMapView: React.FC = () => {
  const { data: vendors, isLoading, error } = useVendorProfiles();
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<VendorProfile | null>(null);

  const handleVendorSelect = (vendor: VendorProfile) => {
    setSelectedVendor(vendor);
  };

  const getDistance = (vendor: VendorProfile) => {
    // Mock distance calculation - in real implementation, you'd calculate based on user's location
    const mockDistance = Math.floor(Math.random() * 50) + 1;
    return `${mockDistance} km`;
  };

  const getUserInitials = (name: string | null) => {
    if (!name) return 'V';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleViewProducts = () => {
    // TODO: Navigate to vendor products page
    console.log('View products for vendor:', selectedVendor?.full_name);
  };

  const handleContact = () => {
    if (selectedVendor?.phone) {
      window.open(`tel:${selectedVendor.phone}`, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="dark-glass-effect rounded-3xl p-8 border border-slate-600/30">
          <Skeleton className="h-8 w-64 bg-slate-700/50" />
          <Skeleton className="h-4 w-48 mt-2 bg-slate-700/50" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96 bg-slate-700/50 rounded-2xl" />
          <Skeleton className="h-96 bg-slate-700/50 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dark-glass-effect rounded-3xl p-8 border border-slate-600/30">
        <div className="text-center text-red-400">
          <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <div className="text-lg font-medium mb-2">Error Loading Vendors</div>
          <div className="text-sm text-slate-400">
            Unable to load vendor locations. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="dark-glass-effect rounded-3xl p-8 border border-slate-600/30">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <MapPin className="h-8 w-8 text-green-400" />
              Find Vendors Near You
            </h2>
            <p className="text-slate-400 text-lg">Discover fresh produce from local vendors in your area</p>
          </div>
          
          <div className="flex gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search by location or vendor name..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-12 h-12 bg-slate-800/50 border-slate-600/30 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50"
              />
            </div>
            <Button variant="outline" className="h-12 px-6 border-slate-600/30 bg-slate-800/50 text-white hover:bg-slate-700/50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="xl:col-span-2">
          <Card className="dark-glass-effect border-slate-600/30 h-[500px]">
            <CardHeader className="pb-4">
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-400" />
                Interactive Vendor Map
                {vendors && vendors.length > 0 && (
                  <Badge variant="secondary" className="ml-auto bg-green-500/10 text-green-400 border-green-500/20">
                    {vendors.length} vendors
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[400px]">
              <div className="relative h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-b-lg overflow-hidden">
                {/* Enhanced Map Placeholder with Vendor Pins */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-blue-900/10 to-purple-900/10">
                  {vendors?.map((vendor, index) => (
                    <div
                      key={vendor.id}
                      className={`absolute bg-gradient-to-r from-green-500 to-green-400 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transform hover:scale-125 transition-all duration-300 shadow-lg ${
                        selectedVendor?.id === vendor.id ? 'ring-4 ring-white/50 scale-125' : ''
                      }`}
                      style={{
                        left: `${15 + (index * 12) % 70}%`,
                        top: `${15 + (index * 18) % 70}%`,
                      }}
                      onClick={() => handleVendorSelect(vendor)}
                    >
                      <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-slate-300 bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8">
                    <MapPin className="h-16 w-16 mx-auto mb-4 text-green-400" />
                    <div className="text-xl font-semibold mb-2">Interactive Map</div>
                    <div className="text-sm text-slate-400 mb-4">Click on the green pins to view vendor details</div>
                    {vendors && vendors.length > 0 && (
                      <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
                        <Users className="h-3 w-3 mr-1" />
                        {vendors.length} vendors available
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vendor List */}
        <div className="xl:col-span-1">
          <Card className="dark-glass-effect border-slate-600/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-green-400" />
                Nearby Vendors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2">
                {vendors && vendors.length > 0 ? (
                  vendors.map((vendor) => (
                    <div
                      key={vendor.id}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                        selectedVendor?.id === vendor.id
                          ? 'border-green-500/50 bg-green-500/5 shadow-lg shadow-green-500/10'
                          : 'border-slate-600/30 bg-slate-700/30 hover:border-slate-500/50 hover:bg-slate-700/50'
                      }`}
                      onClick={() => handleVendorSelect(vendor)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-400 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                          {getUserInitials(vendor.full_name)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white truncate mb-1">
                            {vendor.full_name || 'Vendor'}
                          </h3>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs bg-slate-600/50 text-slate-300 border-slate-500/30">
                              <Navigation className="h-3 w-3 mr-1" />
                              {getDistance(vendor)}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-slate-400">4.5</span>
                            </div>
                          </div>
                          
                          {vendor.address && (
                            <p className="text-xs text-slate-400 truncate mb-2">
                              {vendor.address}
                            </p>
                          )}
                          
                          {vendor.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3 text-slate-400" />
                              <span className="text-xs text-slate-400">{vendor.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-400">
                    <Users className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <div className="text-lg font-medium mb-2 text-slate-300">No Vendors Found</div>
                    <div className="text-sm">
                      No vendors have set their location yet. Check back later!
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Selected Vendor Details */}
      {selectedVendor && (
        <Card className="dark-glass-effect border-slate-600/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-400 rounded-lg flex items-center justify-center">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              {selectedVendor.full_name || 'Vendor Details'}
              <Badge variant="secondary" className="ml-auto bg-green-500/10 text-green-400 border-green-500/20">
                Selected
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="bg-slate-700/30 rounded-xl p-4">
                  <label className="text-sm font-medium text-slate-400 block mb-1">Contact</label>
                  <p className="text-white font-medium">{selectedVendor.phone || 'Not provided'}</p>
                </div>
                
                <div className="bg-slate-700/30 rounded-xl p-4">
                  <label className="text-sm font-medium text-slate-400 block mb-1">Distance</label>
                  <p className="text-white font-medium">{getDistance(selectedVendor)}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-slate-700/30 rounded-xl p-4">
                  <label className="text-sm font-medium text-slate-400 block mb-1">Address</label>
                  <p className="text-white font-medium">{selectedVendor.address || 'Not provided'}</p>
                </div>
                
                <div className="bg-slate-700/30 rounded-xl p-4">
                  <label className="text-sm font-medium text-slate-400 block mb-1">UPI ID</label>
                  <p className="text-white font-medium">{selectedVendor.upi_id || 'Not provided'}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-slate-700/30 rounded-xl p-4">
                  <label className="text-sm font-medium text-slate-400 block mb-1">Last Updated</label>
                  <p className="text-white font-medium">
                    {selectedVendor.location_updated_at 
                      ? new Date(selectedVendor.location_updated_at).toLocaleDateString()
                      : 'Not set'
                    }
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white border-0"
                    onClick={handleViewProducts}
                  >
                    View Products
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-slate-600/30 bg-slate-700/30 text-white hover:bg-slate-600/50"
                    onClick={handleContact}
                  >
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
