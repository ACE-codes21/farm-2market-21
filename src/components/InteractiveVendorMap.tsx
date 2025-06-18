
import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { VendorProductsPage } from './VendorProductsPage';
import { ContactVendorDialog } from './ContactVendorDialog';
import { MapControls } from './map/MapControls';
import { VendorDetailsPanel } from './map/VendorDetailsPanel';
import { NearbyVendorsList } from './map/NearbyVendorsList';
import { MapController } from './map/MapController';
import { VendorMarkers } from './map/VendorMarkers';
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
      <MapControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        categories={categories}
      />

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
                
                <VendorMarkers
                  vendors={filteredVendors}
                  userLocation={userLocation}
                  onVendorClick={handleVendorClick}
                  onViewProducts={handleViewProducts}
                  onGetDirections={handleGetDirections}
                />
              </MapContainer>
            </div>
          </CardContent>
        </Card>

        {/* Vendor Details Panel */}
        <VendorDetailsPanel
          selectedVendor={selectedVendor}
          onViewProducts={handleViewProducts}
          onContactVendor={handleContactVendor}
          onGetDirections={handleGetDirections}
        />
      </div>

      {/* Nearby Vendors List */}
      <NearbyVendorsList
        filteredVendors={filteredVendors}
        selectedVendor={selectedVendor}
        searchQuery={searchQuery}
        onVendorClick={handleVendorClick}
      />

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
