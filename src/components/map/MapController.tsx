
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

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

interface MapControllerProps {
  center: [number, number];
  selectedVendor: VendorLocation | null;
}

export const MapController: React.FC<MapControllerProps> = ({ center, selectedVendor }) => {
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
