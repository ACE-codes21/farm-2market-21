
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Search, Phone, Navigation, Star } from 'lucide-react';
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

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-red-600">
            Error loading vendor locations. Please try again later.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Find Vendors Near You</h2>
          <p className="text-slate-400">Discover local vendors on the map</p>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search by location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="dark-input"
          />
          <Button variant="outline">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Section */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Vendor Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-700 rounded-lg h-80 flex items-center justify-center relative overflow-hidden">
              {/* Map Placeholder with Vendor Pins */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20">
                {vendors?.map((vendor, index) => (
                  <div
                    key={vendor.id}
                    className={`absolute bg-green-500 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer transform hover:scale-110 transition-transform ${
                      selectedVendor?.id === vendor.id ? 'ring-4 ring-white' : ''
                    }`}
                    style={{
                      left: `${20 + (index * 15) % 60}%`,
                      top: `${20 + (index * 20) % 60}%`,
                    }}
                    onClick={() => handleVendorSelect(vendor)}
                  >
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                ))}
              </div>
              
              <div className="text-center text-slate-400 z-10 relative">
                <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <div className="text-lg font-medium">Interactive Map</div>
                <div className="text-sm">Click on pins to view vendor details</div>
                {vendors && vendors.length > 0 && (
                  <div className="text-xs mt-2">
                    {vendors.length} vendors found
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vendor List */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Nearby Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {vendors && vendors.length > 0 ? (
                vendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedVendor?.id === vendor.id
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                    }`}
                    onClick={() => handleVendorSelect(vendor)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                        {getUserInitials(vendor.full_name)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white truncate">
                          {vendor.full_name || 'Vendor'}
                        </h3>
                        
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            <Navigation className="h-3 w-3 mr-1" />
                            {getDistance(vendor)}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-slate-400">4.5</span>
                          </div>
                        </div>
                        
                        {vendor.address && (
                          <p className="text-sm text-slate-400 mt-1 truncate">
                            {vendor.address}
                          </p>
                        )}
                        
                        {vendor.phone && (
                          <div className="flex items-center gap-1 mt-2">
                            <Phone className="h-3 w-3 text-slate-400" />
                            <span className="text-xs text-slate-400">{vendor.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <div className="text-lg font-medium mb-2">No vendors found</div>
                  <div className="text-sm">
                    No vendors have set their location yet.
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selected Vendor Details */}
      {selectedVendor && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-500" />
              {selectedVendor.full_name || 'Vendor Details'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-slate-400">Contact</label>
                  <p className="text-white">{selectedVendor.phone || 'Not provided'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-400">Address</label>
                  <p className="text-white">{selectedVendor.address || 'Not provided'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-400">Distance</label>
                  <p className="text-white">{getDistance(selectedVendor)}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-slate-400">UPI ID</label>
                  <p className="text-white">{selectedVendor.upi_id || 'Not provided'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-400">Location Updated</label>
                  <p className="text-white">
                    {selectedVendor.location_updated_at 
                      ? new Date(selectedVendor.location_updated_at).toLocaleDateString()
                      : 'Not set'
                    }
                  </p>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1">
                    View Products
                  </Button>
                  <Button variant="outline" size="sm">
                    Contact Vendor
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
