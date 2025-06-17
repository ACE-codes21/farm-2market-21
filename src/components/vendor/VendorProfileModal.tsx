
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Camera, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { LocationPicker } from './LocationPicker';
import { useUserSession } from '@/hooks/useUserSession';

interface VendorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProfileData {
  full_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  avatar_url: string | null;
  upi_id: string | null;
}

export const VendorProfileModal: React.FC<VendorProfileModalProps> = ({ isOpen, onClose }) => {
  const user = useUserSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    latitude: null,
    longitude: null,
    avatar_url: '',
    upi_id: ''
  });

  useEffect(() => {
    if (isOpen && user) {
      fetchProfile();
    }
  }, [isOpen, user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        const profileData = data as any;
        setProfile({
          full_name: profileData.full_name || '',
          email: profileData.email || user.email || '',
          phone: profileData.phone || '',
          address: profileData.address || '',
          latitude: profileData.latitude || null,
          longitude: profileData.longitude || null,
          avatar_url: profileData.avatar_url || '',
          upi_id: profileData.upi_id || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile({
        full_name: '',
        email: user.email || '',
        phone: '',
        address: '',
        latitude: null,
        longitude: null,
        avatar_url: '',
        upi_id: ''
      });
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const updateData: any = {
        full_name: profile.full_name,
        phone: profile.phone,
        avatar_url: profile.avatar_url,
        upi_id: profile.upi_id
      };

      if (profile.address) {
        updateData.address = profile.address;
      }

      if (profile.latitude && profile.longitude) {
        updateData.latitude = profile.latitude;
        updateData.longitude = profile.longitude;
        updateData.location_updated_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });

      onClose();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    setProfile(prev => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      address: address
    }));
    setShowLocationPicker(false);
  };

  const getUserInitials = () => {
    if (profile.full_name) {
      return profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return profile.email?.charAt(0).toUpperCase() || 'V';
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-[#212A34]/95 border border-slate-600/40 backdrop-blur-xl text-white">
          <DialogHeader className="border-b border-slate-700/30 pb-4">
            <DialogTitle className="flex items-center justify-between text-2xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
              <span>Vendor Profile</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                className="text-slate-400 hover:text-white hover:bg-slate-700/50"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-2 ring-green-500/30">
                  <AvatarImage src={profile.avatar_url || undefined} />
                  <AvatarFallback className="text-xl bg-gradient-to-br from-green-500/20 to-green-600/20 text-green-300 border border-green-500/20">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-slate-700/80 border-slate-600/50 hover:bg-slate-600/80 text-green-400"
                  onClick={() => {
                    toast({
                      title: "Coming Soon",
                      description: "Avatar upload will be available soon!",
                    });
                  }}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-slate-200 font-medium">Full Name</Label>
                <Input
                  id="fullName"
                  value={profile.full_name || ''}
                  onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                  placeholder="Enter your full name"
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-green-500/50 focus:ring-green-500/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200 font-medium">Email</Label>
                <Input
                  id="email"
                  value={profile.email || ''}
                  disabled
                  className="bg-slate-600/30 border-slate-600/30 text-slate-300 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-200 font-medium">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone || ''}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter your phone number"
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-green-500/50 focus:ring-green-500/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="upiId" className="text-slate-200 font-medium">UPI ID</Label>
                <Input
                  id="upiId"
                  value={profile.upi_id || ''}
                  onChange={(e) => setProfile(prev => ({ ...prev, upi_id: e.target.value }))}
                  placeholder="Enter your UPI ID"
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-green-500/50 focus:ring-green-500/20"
                />
              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-slate-200 font-medium">Business Location</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLocationPicker(true)}
                  className="flex items-center gap-2 bg-slate-700/50 border-slate-600/50 text-green-400 hover:bg-slate-600/50 hover:text-green-300"
                >
                  <MapPin className="h-4 w-4" />
                  {profile.latitude && profile.longitude ? 'Update Location' : 'Set Location'}
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-slate-200 font-medium">Business Address</Label>
                <Input
                  id="address"
                  value={profile.address || ''}
                  onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter your business address"
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-green-500/50 focus:ring-green-500/20"
                />
              </div>

              {profile.latitude && profile.longitude && (
                <div className="text-sm text-slate-400 flex items-center gap-2 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
                  <MapPin className="h-4 w-4 text-green-400" />
                  <span>Coordinates: {profile.latitude.toFixed(6)}, {profile.longitude.toFixed(6)}</span>
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-slate-700/30">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="bg-transparent border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={loading} 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium flex items-center gap-2 shadow-lg"
              >
                <Save className="h-4 w-4" />
                {loading ? 'Saving...' : 'Save Profile'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <LocationPicker
        isOpen={showLocationPicker}
        onClose={() => setShowLocationPicker(false)}
        onLocationSelect={handleLocationSelect}
        currentLocation={
          profile.latitude && profile.longitude
            ? { lat: profile.latitude, lng: profile.longitude }
            : null
        }
      />
    </>
  );
};
