
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Phone, Clock, Star, Zap, MessageCircle } from 'lucide-react';
import { VendorProductsPage } from './VendorProductsPage';
import { ContactVendorDialog } from './ContactVendorDialog';
import { useVendorProfiles } from '@/hooks/useVendorProfiles';

interface VendorLocation {
  id: string;
  name: string;
  category: string;
  distance: number;
  rating: number;
  isOnline: boolean;
  position: { x: number; y: number };
  phone?: string;
  email?: string;
  lastActive: string;
  specialties: string[];
}

// Generate random positions for vendors
const generateRandomPosition = (index: number) => ({
  x: 20 + (index % 3) * 25 + Math.random() * 15,
  y: 20 + Math.floor(index / 3) * 25 + Math.random() * 15
});

const categories = ['Fresh Produce', 'Spices & Herbs', 'Dairy Products', 'Fruits', 'Vegetables', 'Beverages'];
const specialties = [
  ['Organic Vegetables', 'Fresh Fruits'],
  ['Traditional Spices', 'Herbal Tea'],
  ['Fresh Milk', 'Organic Cheese'],
  ['Seasonal Fruits', 'Exotic Varieties'],
  ['Local Vegetables', 'Organic Produce'],
  ['Fresh Juices', 'Natural Drinks']
];

export const VendorDiscoveryMap: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState<VendorLocation | null>(null);
  const [hoveredVendor, setHoveredVendor] = useState<string | null>(null);
  const [showVendorProducts, setShowVendorProducts] = useState(false);
  const [contactVendor, setContactVendor] = useState<VendorLocation | null>(null);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [userLocation, setUserLocation] = useState({ x: 50, y: 50 });
  const [vendorLocations, setVendorLocations] = useState<VendorLocation[]>([]);

  const { data: vendorProfiles, isLoading } = useVendorProfiles();

  // Convert vendor profiles to interactive map data
  useEffect(() => {
    if (vendorProfiles && vendorProfiles.length > 0) {
      const locations: VendorLocation[] = vendorProfiles.map((profile, index) => ({
        id: profile.id,
        name: profile.full_name || `Vendor ${index + 1}`,
        category: categories[index % categories.length],
        distance: Math.round((Math.random() * 2 + 0.5) * 10) / 10,
        rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
        isOnline: Math.random() > 0.3,
        position: generateRandomPosition(index),
        phone: profile.phone || `+91-${9000000000 + Math.floor(Math.random() * 999999999)}`,
        email: `${profile.full_name?.toLowerCase().replace(/\s+/g, '')}@vendor.com`,
        lastActive: Math.random() > 0.5 ? 'Active now' : `${Math.floor(Math.random() * 60)} min ago`,
        specialties: specialties[index % specialties.length]
      }));
      setVendorLocations(locations);
    }
  }, [vendorProfiles]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVendorLocations(prev => prev.map(vendor => ({
        ...vendor,
        isOnline: Math.random() > 0.8 ? !vendor.isOnline : vendor.isOnline,
        lastActive: vendor.isOnline ? 'Active now' : `${Math.floor(Math.random() * 60)} min ago`
      })));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleVendorClick = (vendor: VendorLocation) => {
    setSelectedVendor(vendor);
  };

  const handleViewProducts = () => {
    if (selectedVendor) {
      setShowVendorProducts(true);
    }
  };

  const handleContactVendor = (vendor: VendorLocation) => {
    setContactVendor(vendor);
    setShowContactDialog(true);
  };

  const calculateDistance = (vendor: VendorLocation) => {
    const dx = vendor.position.x - userLocation.x;
    const dy = vendor.position.y - userLocation.y;
    return Math.sqrt(dx * dx + dy * dy) / 20;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 dark-glass-effect border-slate-600/30">
            <CardContent className="p-6">
              <div className="h-96 bg-slate-800/50 rounded-lg flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
              </div>
            </CardContent>
          </Card>
          <Card className="dark-glass-effect border-slate-600/30">
            <CardContent className="p-6">
              <div className="h-96 bg-slate-800/50 rounded-lg flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showVendorProducts && selectedVendor) {
    return (
      <VendorProductsPage 
        vendorName={selectedVendor.name} 
        onBack={() => setShowVendorProducts(false)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <Card className="lg:col-span-2 dark-glass-effect border-slate-600/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-400" />
              Live Vendor Map
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                {vendorLocations.length} Vendors
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-600/30 overflow-hidden">
              {/* Map Background Grid */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-8 grid-rows-6 h-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-slate-600/20" />
                  ))}
                </div>
              </div>

              {/* User Location */}
              <div
                className="absolute w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg z-20 animate-pulse"
                style={{
                  left: `${userLocation.x}%`,
                  top: `${userLocation.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-blue-400 font-medium whitespace-nowrap">
                  You
                </div>
              </div>

              {/* Vendor Markers */}
              {vendorLocations.map((vendor) => (
                <div
                  key={vendor.id}
                  className={`absolute w-6 h-6 rounded-full border-2 cursor-pointer transition-all duration-300 z-10 ${
                    vendor.isOnline 
                      ? 'bg-green-500 border-green-300 shadow-green-500/50' 
                      : 'bg-gray-500 border-gray-300'
                  } ${hoveredVendor === vendor.id || selectedVendor?.id === vendor.id 
                    ? 'scale-150 shadow-lg' 
                    : 'hover:scale-125'
                  }`}
                  style={{
                    left: `${vendor.position.x}%`,
                    top: `${vendor.position.y}%`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: vendor.isOnline ? '0 0 10px rgba(34, 197, 94, 0.6)' : 'none'
                  }}
                  onClick={() => handleVendorClick(vendor)}
                  onMouseEnter={() => setHoveredVendor(vendor.id)}
                  onMouseLeave={() => setHoveredVendor(null)}
                >
                  {vendor.isOnline && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                  )}
                  
                  {/* Vendor Info Tooltip */}
                  {hoveredVendor === vendor.id && (
                    <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-30 border border-slate-600">
                      <div className="font-medium">{vendor.name}</div>
                      <div className="text-slate-300">{vendor.category}</div>
                      <div className="text-green-400">{vendor.distance} km</div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span>{vendor.rating}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Distance Circles */}
              <div className="absolute inset-0 pointer-events-none">
                {[1, 2, 3].map((radius) => (
                  <div
                    key={radius}
                    className="absolute border border-blue-300/20 rounded-full"
                    style={{
                      width: `${radius * 40}%`,
                      height: `${radius * 40}%`,
                      left: `${userLocation.x}%`,
                      top: `${userLocation.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vendor Details Panel */}
        <Card className="dark-glass-effect border-slate-600/30">
          <CardHeader>
            <CardTitle className="text-white">
              {selectedVendor ? 'Vendor Details' : 'Select a Vendor'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedVendor ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">{selectedVendor.name}</h3>
                  <div className={`w-3 h-3 rounded-full ${selectedVendor.isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white">{selectedVendor.rating}</span>
                    <span className="text-slate-400 text-sm">rating</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-blue-400" />
                    <span className="text-slate-300">{selectedVendor.distance} km away</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-400" />
                    <span className="text-slate-300">{selectedVendor.lastActive}</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-slate-400 text-sm">Specialties:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedVendor.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="bg-slate-700/50 text-slate-200 border-slate-600/30 text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <Button 
                    onClick={handleViewProducts} 
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={!selectedVendor.isOnline}
                  >
                    {selectedVendor.isOnline ? (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        View Products
                      </>
                    ) : (
                      'Currently Offline'
                    )}
                  </Button>
                  
                  {selectedVendor.isOnline && (
                    <Button 
                      variant="outline" 
                      onClick={() => handleContactVendor(selectedVendor)}
                      className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact Vendor
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-slate-500" />
                <p className="text-slate-400">Click on a vendor marker to view details</p>
                <p className="text-slate-500 text-sm mt-2">
                  Green markers are online, gray are offline
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Vendor List */}
      <Card className="dark-glass-effect border-slate-600/30">
        <CardHeader>
          <CardTitle className="text-white">Nearby Vendors ({vendorLocations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vendorLocations
              .sort((a, b) => a.distance - b.distance)
              .map((vendor) => (
                <div
                  key={vendor.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-slate-700/50 ${
                    selectedVendor?.id === vendor.id 
                      ? 'border-green-500/50 bg-green-500/10' 
                      : 'border-slate-600/30 bg-slate-800/30'
                  }`}
                  onClick={() => handleVendorClick(vendor)}
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
        </CardContent>
      </Card>

      {/* Contact Dialog */}
      {contactVendor && (
        <ContactVendorDialog
          open={showContactDialog}
          onOpenChange={setShowContactDialog}
          vendorName={contactVendor.name}
          vendorPhone={contactVendor.phone || ''}
          vendorEmail={contactVendor.email}
        />
      )}
    </div>
  );
};
