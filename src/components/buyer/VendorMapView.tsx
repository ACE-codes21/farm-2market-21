import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock, CreditCard, Eye, MessageCircle } from 'lucide-react';
import { useVendorProfiles } from '@/hooks/useVendorProfiles';
import { VendorProductsPage } from '@/components/VendorProductsPage';
interface Vendor {
  id: string;
  name: string;
  phone: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  lastUpdated: string;
  distance: string;
  upiId?: string;
  email?: string;
}
export const VendorMapView: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [showVendorProducts, setShowVendorProducts] = useState(false);
  const {
    data: vendorProfiles
  } = useVendorProfiles();

  // Mock vendors with locations for demonstration
  const vendors: Vendor[] = [{
    id: '1',
    name: 'Fresh Farm Market',
    phone: '+91-9876543210',
    location: {
      lat: 28.6139,
      lng: 77.2090
    },
    address: '123 Market Street, Delhi',
    lastUpdated: '2 hours ago',
    distance: '0.8 km',
    upiId: 'freshfarm@paytm',
    email: 'contact@freshfarm.com'
  }, {
    id: '2',
    name: 'Organic Valley',
    phone: '+91-8765432109',
    location: {
      lat: 28.7041,
      lng: 77.1025
    },
    address: '456 Green Avenue, Delhi',
    lastUpdated: '4 hours ago',
    distance: '1.2 km',
    upiId: 'organicvalley@gpay',
    email: 'info@organicvalley.com'
  }, {
    id: '3',
    name: 'Local Grocery Hub',
    phone: '+91-7654321098',
    location: {
      lat: 28.5355,
      lng: 77.3910
    },
    address: '789 Local Market, Delhi',
    lastUpdated: '1 hour ago',
    distance: '2.1 km',
    upiId: 'localgrocery@phonepe',
    email: 'support@localgrocery.com'
  }];
  const handleVendorSelect = (vendor: Vendor) => {
    setSelectedVendor(vendor);
  };
  const handleViewProducts = () => {
    if (selectedVendor) {
      setShowVendorProducts(true);
    }
  };
  const handleContact = () => {
    if (selectedVendor?.phone) {
      const message = `Hi! I found your business on Farm2Market. I'm interested in your products.`;
      const whatsappUrl = `https://wa.me/${selectedVendor.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };
  if (showVendorProducts && selectedVendor) {
    return <VendorProductsPage vendorName={selectedVendor.name} onBack={() => setShowVendorProducts(false)} />;
  }
  return <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Map */}
        <Card className="dark-glass-effect border-slate-600/30">
          <CardHeader>
            <CardTitle className="text-white">Interactive Vendor Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-96 bg-slate-800/50 rounded-lg border border-slate-600/30 overflow-hidden">
              {/* Simple map representation */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-white">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-green-400" />
                    <p className="text-lg font-medium">Interactive Map</p>
                    <p className="text-slate-400 text-sm">Coming Soon</p>
                  </div>
                </div>
                
                {/* Vendor markers */}
                {vendors.map((vendor, index) => <div key={vendor.id} style={{
                left: `${30 + index * 25}%`,
                top: `${40 + index * 15}%`
              }} onClick={() => handleVendorSelect(vendor)} className="" />)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vendor Details */}
        <Card className="dark-glass-effect border-slate-600/30">
          <CardHeader>
            <CardTitle className="text-white">
              {selectedVendor ? 'Vendor Details' : 'Select a Vendor'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedVendor ? <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{selectedVendor.name}</h3>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                    {selectedVendor.distance} away
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Phone className="h-4 w-4 text-blue-400" />
                    <span>{selectedVendor.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-slate-300">
                    <MapPin className="h-4 w-4 text-red-400" />
                    <span>{selectedVendor.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-slate-300">
                    <Clock className="h-4 w-4 text-yellow-400" />
                    <span>Last updated: {selectedVendor.lastUpdated}</span>
                  </div>
                  
                  {selectedVendor.upiId && <div className="flex items-center gap-3 text-slate-300">
                      <CreditCard className="h-4 w-4 text-purple-400" />
                      <span>UPI ID: {selectedVendor.upiId}</span>
                    </div>}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleViewProducts} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                    <Eye className="h-4 w-4 mr-2" />
                    View Products
                  </Button>
                  <Button onClick={handleContact} variant="outline" className="flex-1 border-slate-600 text-zinc-300 bg-slate-700 hover:bg-slate-600">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div> : <div className="text-center py-8">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-slate-500" />
                <p className="text-slate-400">Click on a vendor marker to view details</p>
              </div>}
          </CardContent>
        </Card>
      </div>

      {/* Nearby Vendors List */}
      <Card className="dark-glass-effect border-slate-600/30">
        <CardHeader>
          <CardTitle className="text-white">Nearby Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vendors.map(vendor => <div key={vendor.id} className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-slate-700/50 ${selectedVendor?.id === vendor.id ? 'border-green-500/50 bg-green-500/10' : 'border-slate-600/30 bg-slate-800/30'}`} onClick={() => handleVendorSelect(vendor)}>
                <h4 className="font-medium text-white mb-2">{vendor.name}</h4>
                <div className="space-y-1 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span>{vendor.distance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>{vendor.lastUpdated}</span>
                  </div>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;
};