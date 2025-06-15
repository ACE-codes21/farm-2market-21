
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

  // First try to fetch with new columns, fallback if they don't exist
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, phone, avatar_url, upi_id')
    .eq('role', 'vendor');

  if (error) {
    console.error('Error fetching vendor profiles:', error);
    throw new Error(error.message);
  }

  console.log('Vendor profiles fetched successfully:', data);
  
  // Transform the data to match our interface, with default values for missing columns
  const transformedData: VendorProfile[] = (data || []).map(profile => ({
    id: profile.id,
    full_name: profile.full_name,
    phone: profile.phone,
    address: null, // Will be null until database migration is complete
    latitude: null,
    longitude: null,
    avatar_url: profile.avatar_url,
    upi_id: profile.upi_id,
    location_updated_at: null
  }));

  return transformedData;
};

export const useVendorProfiles = () => {
  return useQuery<VendorProfile[]>({
    queryKey: ['vendor-profiles'],
    queryFn: fetchVendorProfiles,
  });
};
