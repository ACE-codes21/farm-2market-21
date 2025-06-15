
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, Crosshair } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  currentLocation?: { lat: number; lng: number } | null;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  isOpen,
  onClose,
  onLocationSelect,
  currentLocation
}) => {
  const { toast } = useToast();
  const [searchAddress, setSearchAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  useEffect(() => {
    if (currentLocation) {
      setSelectedLocation({
        lat: currentLocation.lat,
        lng: currentLocation.lng,
        address: searchAddress
      });
    }
  }, [currentLocation]);

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Geolocation is not supported by this browser.",
      });
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        // For now, we'll use a simple format for the address
        // In a real implementation, you'd use a reverse geocoding service
        const address = `Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        
        setSelectedLocation({ lat, lng, address });
        setSearchAddress(address);
        setIsGettingLocation(false);
        
        toast({
          title: "Location Found",
          description: "Your current location has been detected.",
        });
      },
      (error) => {
        console.error('Error getting location:', error);
        toast({
          variant: "destructive",
          title: "Location Error",
          description: "Unable to get your current location. Please enter manually.",
        });
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleSearchLocation = () => {
    if (!searchAddress.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter an address to search.",
      });
      return;
    }

    // For demo purposes, we'll simulate a location search
    // In a real implementation, you'd use a geocoding service like Google Maps API
    const mockLat = 28.6139 + (Math.random() - 0.5) * 0.1; // Around Delhi
    const mockLng = 77.2090 + (Math.random() - 0.5) * 0.1;
    
    setSelectedLocation({
      lat: mockLat,
      lng: mockLng,
      address: searchAddress
    });

    toast({
      title: "Location Found",
      description: "Location has been set based on your search.",
    });
  };

  const handleConfirmLocation = () => {
    if (!selectedLocation) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a location first.",
      });
      return;
    }

    onLocationSelect(selectedLocation.lat, selectedLocation.lng, selectedLocation.address);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Set Your Location
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="text-sm text-gray-600">
            Set your business location to help buyers find you easily on the map.
          </div>

          {/* Search Address */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                placeholder="Enter your business address"
                onKeyPress={(e) => e.key === 'Enter' && handleSearchLocation()}
              />
              <Button variant="outline" onClick={handleSearchLocation}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Get Current Location */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
              className="flex items-center gap-2"
            >
              <Crosshair className="h-4 w-4" />
              {isGettingLocation ? 'Getting Location...' : 'Use Current Location'}
            </Button>
          </div>

          {/* Selected Location Display */}
          {selectedLocation && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-sm font-medium text-green-800 mb-1">Selected Location:</div>
              <div className="text-sm text-green-700">{selectedLocation.address}</div>
              <div className="text-xs text-green-600 mt-1">
                Coordinates: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
              </div>
            </div>
          )}

          {/* Map Placeholder */}
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="h-8 w-8 mx-auto mb-2" />
              <div className="text-sm">Interactive Map</div>
              <div className="text-xs">Coming Soon with Mapbox Integration</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmLocation}
              disabled={!selectedLocation}
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Confirm Location
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
