import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Clock, Star, Zap, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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

interface VendorDetailsPanelProps {
  selectedVendor: VendorLocation | null;
  onViewProducts: () => void;
  onContactVendor: (vendor: VendorLocation) => void;
  onGetDirections: (vendor: VendorLocation) => void;
}

export const VendorDetailsPanel: React.FC<VendorDetailsPanelProps> = ({
  selectedVendor,
  onViewProducts,
  onContactVendor,
  onGetDirections
}) => {
  const { t } = useLanguage();
  
  return (
    <Card className="dark-glass-effect border-slate-600/30">
      <CardHeader>
        <CardTitle className="text-white">
          {selectedVendor ? t('vendor.vendorDetails') : t('vendor.selectVendor')}
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
                <span className="text-slate-400 text-sm">{t('vendor.rating')}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-blue-400" />
                <span className="text-slate-300">{selectedVendor.distance} {t('vendor.kmAway')}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-400" />
                <span className="text-slate-300">{selectedVendor.lastActive}</span>
              </div>

              <div className="space-y-2">
                <span className="text-slate-400 text-sm">{t('vendor.specialties')}:</span>
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
                onClick={onViewProducts} 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={!selectedVendor.isOnline}
              >
                {selectedVendor.isOnline ? (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    {t('vendor.viewProducts')}
                  </>
                ) : (
                  t('vendor.currentlyOffline')
                )}
              </Button>
              
              {selectedVendor.isOnline && (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => onContactVendor(selectedVendor)}
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {t('vendor.contact')}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => onGetDirections(selectedVendor)}
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    {t('vendor.getDirections')}
                  </Button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-slate-500" />
            <p className="text-slate-400">{t('vendor.clickMarker')}</p>
            <p className="text-slate-500 text-sm mt-2">
              {t('vendor.greenOnline')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
