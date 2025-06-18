
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Phone, Clock, Star, Zap } from 'lucide-react';
import { VendorProductsPage } from './VendorProductsPage';
import { ContactVendorDialog } from './ContactVendorDialog';

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

const mockVendors: VendorLocation[] = [
  {
    id: '1',
    name: 'Fresh Farm Market',
    category: 'Fresh Produce',
    distance: 0.8,
    rating: 4.8,
    isOnline: true,
    position: { x: 25, y: 30 },
    phone: '+91-9876543210',
    email: 'fresh@farm.com',
    lastActive: '2 min ago',
    specialties: ['Organic Vegetables', 'Fresh Fruits']
  },
  {
    id: '2',
    name: 'Spice Corner',
    category: 'Spices & Herbs',
    distance: 1.2,
    rating: 4.6,
    isOnline: true,
    position: { x: 60, y: 45 },
    phone: '+91-8765432109',
    email: 'spice@corner.com',
    lastActive: '5 min ago',
    specialties: ['Traditional Spices', 'Herbal Tea']
  },
  {
    id: '3',
    name: 'Dairy Fresh',
    category: 'Dairy Products',
    distance: 2.1,
    rating: 4.7,
    isOnline: false,
    position: { x: 80, y: 20 },
    phone: '+91-7654321098',
    email: 'dairy@fresh.com',
    lastActive: '1 hour ago',
    specialties: ['Fresh Milk', 'Organic Cheese']
  },
  {
    id: '4',
    name: 'Street Food Hub',
    category: 'Ready-to-Eat',
    distance: 0.5,
    rating: 4.4,
    isOnline: true,
    position: { x: 40, y: 65 },
    phone: '+91-6543210987',
    email: 'street@food.com',
    lastActive: 'Active now',
    specialties: ['Hot Snacks', 'Traditional Sweets']
  },
  {
    id: '5',
    name: 'Fruit Paradise',
    category: 'Fruits',
    distance: 1.5,
    rating: 4.9,
    isOnline: true,
    position: { x: 15, y: 75 },
    phone: '+91-5432109876',
    email: 'fruit@paradise.com',
    lastActive: 'Active now',
    specialties: ['Seasonal Fruits', 'Exotic Varieties']
  }
];

export const DynamicVendorMap: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState<VendorLocation | null>(null);
  const [hoveredVendor, setHoveredVendor] = useState<string | null>(null);
  const [showVendorProducts, setShowVendorProducts] = useState(false);
  const [contactVendor, setContactVendor] = useState<VendorLocation | null>(null);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [userLocation, setUserLocation] = useState({ x: 50, y: 50 });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update vendor online status
      const randomVendor = mockVendors[Math.floor(Math.random() * mockVendors.length)];
      if (Math.random() > 0.8) {
        randomVendor.isOnline = !randomVendor.isOnline;
        randomVendor.lastActive = randomVendor.isOnline ? 'Active now' : 'Just now';
      }
    }, 10000);

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
    return Math.sqrt(dx * dx + dy * dy) / 20; // Scale down for realistic distances
  };

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
                Live
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-600/30 overflow-hidden">
              {/* Map Background */}
              <div className="absolute inset-0 opacity-20">
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
              {mockVendors.map((vendor) => (
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
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-30 border border-slate-600">
                      <div className="font-medium">{vendor.name}</div>
                      <div className="text-slate-300">{vendor.category}</div>
                      <div className="text-green-400">{calculateDistance(vendor).toFixed(1)} km</div>
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
                    <span className="text-slate-300">{calculateDistance(selectedVendor).toFixed(1)} km away</span>
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
                      <Phone className="h-4 w-4 mr-2" />
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
          <CardTitle className="text-white">Nearby Vendors ({mockVendors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockVendors
              .sort((a, b) => calculateDistance(a) - calculateDistance(b))
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
                      <span>{calculateDistance(vendor).toFixed(1)} km</span>
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
