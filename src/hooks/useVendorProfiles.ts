
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface VendorProfile {
  id: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  avatar_url: string | null;
  upi_id: string | null;
  location_updated_at: string | null;
}

const fetchVendorProfiles = async (): Promise<VendorProfile[]> => {
  console.log('Fetching vendor profiles with locations...');

  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, phone, address, latitude, longitude, avatar_url, upi_id, location_updated_at')
    .eq('role', 'vendor')
    .not('latitude', 'is', null)
    .not('longitude', 'is', null);

  if (error) {
    console.error('Error fetching vendor profiles:', error);
    throw new Error(error.message);
  }

  console.log('Vendor profiles fetched successfully:', data);
  return data || [];
};

export const useVendorProfiles = () => {
  return useQuery<VendorProfile[]>({
    queryKey: ['vendor-profiles'],
    queryFn: fetchVendorProfiles,
  });
};
