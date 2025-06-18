
import React from 'react';
import { Marker, Popup, Circle } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import L from 'leaflet';

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

interface VendorMarkersProps {
  vendors: VendorLocation[];
  userLocation: [number, number];
  onVendorClick: (vendor: VendorLocation) => void;
  onViewProducts: () => void;
  onGetDirections: (vendor: VendorLocation) => void;
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

export const VendorMarkers: React.FC<VendorMarkersProps> = ({
  vendors,
  userLocation,
  onVendorClick,
  onViewProducts,
  onGetDirections
}) => {
  return (
    <>
      {/* User location marker */}
      <Marker position={userLocation} icon={createUserIcon()}>
        <Popup>
          <div className="text-center">
            <strong>Your Location</strong>
            <p className="text-sm text-green-600">Live location enabled</p>
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
      {vendors.map((vendor) => (
        <Marker
          key={vendor.id}
          position={vendor.coordinates}
          icon={createVendorIcon(vendor.isOnline, vendor.category)}
          eventHandlers={{
            click: () => onVendorClick(vendor),
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
                  onClick={() => onViewProducts()}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs"
                  disabled={!vendor.isOnline}
                >
                  View Products
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onGetDirections(vendor)}
                  className="flex-1 text-xs"
                >
                  Directions
                </Button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};
