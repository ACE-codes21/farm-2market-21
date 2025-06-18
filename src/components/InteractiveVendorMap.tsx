
import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Phone, Clock, Star, Zap, MessageCircle, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { VendorProductsPage } from './VendorProductsPage';
import { ContactVendorDialog } from './ContactVendorDialog';
import { useVendorProfiles } from '@/hooks/useVendorProfiles';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

// Custom vendor marker icons
const createVendorIcon = (isOnline: boolean, category: string) => {
  const color = isOnline ? '#22c55e' : '#6b7280';
  const iconHtml = `
    <div style="
      background-color: ${color};
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: white;
      font-weight: bold;
    ">
      ${category.charAt(0)}
    </div>
  `;
  
  return L.divIcon({
    html: iconHtml,
    className: 'custom-vendor-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

// User location marker
const createUserIcon = () => {
  const iconHtml = `
    <div style="
      background-color: #3b82f6;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      animation: pulse 2s infinite;
    "></div>
    <style>
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
        100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
      }
    </style>
  `;
  
  return L.divIcon({
    html: iconHtml,
    className: 'user-location-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

interface MapControllerProps {
  center: [number, number];
  selectedVendor: VendorLocation | null;
}

const MapController: React.FC<MapControllerProps> = ({ center, selectedVendor }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedVendor) {
      map.setView(selectedVendor.coordinates, 16, { animate: true });
    }
  }, [selectedVendor, map]);
  
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);
  
  return null;
};

export const InteractiveVendorMap: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState<VendorLocation | null>(null);
  const [showVendorProducts, setShowVendorProducts] = useState(false);
  const [contactVendor, setContactVendor] = useState<VendorLocation | null>(null);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number]>([28.6139, 77.2090]); // Default to Delhi
  const [vendorLocations, setVendorLocations] = useState<VendorLocation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'pending'>('pending');

  const { data: vendorProfiles, isLoading } = useVendorProfiles();

  // Categories and specialties for mock data
  const categories = ['Fresh Produce', 'Spices & Herbs', 'Dairy Products', 'Fruits', 'Vegetables', 'Beverages'];
  const specialties = [
    ['Organic Vegetables', 'Fresh Fruits'],
    ['Traditional Spices', 'Herbal Tea'],
    ['Fresh Milk', 'Organic Cheese'],
    ['Seasonal Fruits', 'Exotic Varieties'],
    ['Local Vegetables', 'Organic Produce'],
    ['Fresh Juices', 'Natural Drinks']
  ];

  // Get user's real location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          setLocationPermission('granted');
        },
        (error) => {
          console.log('Location access denied:', error);
          setLocationPermission('denied');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 600000 }
      );
    }
  }, []);

  // Generate vendor locations with real coordinates around user
  useEffect(() => {
    if (vendorProfiles && vendorProfiles.length > 0) {
      const locations: VendorLocation[] = vendorProfiles.map((profile, index) => {
        // Generate coordinates within 5km radius of user location
        const radiusInDegrees = 0.045; // Approximately 5km
        const angle = (index / vendorProfiles.length) * 2 * Math.PI;
        const distance = Math.random() * radiusInDegrees;
        
        const lat = userLocation[0] + (distance * Math.cos(angle));
        const lng = userLocation[1] + (distance * Math.sin(angle));
        
        return {
          id: profile.id,
          name: profile.full_name || `Vendor ${index + 1}`,
          category: categories[index % categories.length],
          distance: Math.round((Math.random() * 4 + 0.5) * 10) / 10,
          rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
          isOnline: Math.random() > 0.3,
          coordinates: [lat, lng] as [number, number],
          phone: profile.phone || `+91-${9000000000 + Math.floor(Math.random() * 999999999)}`,
          email: `${profile.full_name?.toLowerCase().replace(/\s+/g, '')}@vendor.com`,
          lastActive: Math.random() > 0.5 ? 'Active now' : `${Math.floor(Math.random() * 60)} min ago`,
          specialties: specialties[index % specialties.length]
        };
      });
      setVendorLocations(locations);
    }
  }, [vendorProfiles, userLocation]);

  // Filter vendors based on search and category
  const filteredVendors = useMemo(() => {
    return vendorLocations.filter(vendor => {
      const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          vendor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = !filterCategory || vendor.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [vendorLocations, searchQuery, filterCategory]);

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

  const handleGetDirections = (vendor: VendorLocation) => {
    const url = `https://www.google.com/maps/dir/${userLocation[0]},${userLocation[1]}/${vendor.coordinates[0]},${vendor.coordinates[1]}`;
    window.open(url, '_blank');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="dark-glass-effect border-slate-600/30">
          <CardContent className="p-6">
            <div className="h-96 bg-slate-800/50 rounded-lg flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
          </CardContent>
        </Card>
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
      {/* Search and Filter Controls */}
      <Card className="dark-glass-effect border-slate-600/30">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search vendors or specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-600 text-white"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-md text-white text-sm"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <Card className="lg:col-span-2 dark-glass-effect border-slate-600/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-400" />
              Interactive Vendor Map
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                {filteredVendors.length} Vendors
              </Badge>
              {locationPermission === 'granted' && (
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  Live Location
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 rounded-lg overflow-hidden border border-slate-600/30">
              <MapContainer
                center={userLocation}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <MapController center={userLocation} selectedVendor={selectedVendor} />
                
                {/* User location marker */}
                <Marker position={userLocation} icon={createUserIcon()}>
                  <Popup>
                    <div className="text-center">
                      <strong>Your Location</strong>
                      {locationPermission === 'granted' ? (
                        <p className="text-sm text-green-600">Live location enabled</p>
                      ) : (
                        <p className="text-sm text-yellow-600">Approximate location</p>
                      )}
                    </div>
                  </Popup>
                </Marker>

                {/* Delivery radius circle */}
                <Circle
                  center={userLocation}
                  radius={5000}
                  pathOptions={{
                    fillColor: '#22c55e',
                    fillOpacity: 0.1,
                    color: '#22c55e',
                    weight: 2,
                    opacity: 0.5
                  }}
                />

                {/* Vendor markers */}
                {filteredVendors.map((vendor) => (
                  <Marker
                    key={vendor.id}
                    position={vendor.coordinates}
                    icon={createVendorIcon(vendor.isOnline, vendor.category)}
                    eventHandlers={{
                      click: () => handleVendorClick(vendor),
                    }}
                  >
                    <Popup>
                      <div className="p-2 min-w-[200px]">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{vendor.name}</h4>
                          <div className={`w-2 h-2 rounded-full ${vendor.isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{vendor.category}</p>
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-sm">{vendor.rating}</span>
                          <span className="text-xs text-gray-500">• {vendor.distance} km</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            onClick={() => handleViewProducts()}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs"
                            disabled={!vendor.isOnline}
                          >
                            View Products
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleGetDirections(vendor)}
                            className="flex-1 text-xs"
                          >
                            Directions
                          </Button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
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
                    <>
                      <Button 
                        variant="outline" 
                        onClick={() => handleContactVendor(selectedVendor)}
                        className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact Vendor
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={() => handleGetDirections(selectedVendor)}
                        className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>
                    </>
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

      {/* Nearby Vendors List */}
      <Card className="dark-glass-effect border-slate-600/30">
        <CardHeader>
          <CardTitle className="text-white">
            Nearby Vendors ({filteredVendors.length})
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
          
          {filteredVendors.length === 0 && (
            <div className="text-center py-8">
              <Search className="h-12 w-12 mx-auto mb-4 text-slate-500" />
              <p className="text-slate-400">No vendors found matching your criteria</p>
              <p className="text-slate-500 text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          )}
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
