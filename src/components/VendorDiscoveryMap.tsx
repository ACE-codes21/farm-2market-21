import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock, Navigation, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VendorProductsPage } from './VendorProductsPage';
import { ContactVendorDialog } from './ContactVendorDialog';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DynamicVendorMap } from './DynamicVendorMap';

interface Vendor {
  id: string;
  name: string;
  category: string;
  distance: number;
  rating: number;
  freshness: 'Ultra Fresh' | 'Fresh' | 'Good';
  location: {
    lat: number;
    lng: number;
  };
  isOnline: boolean;
  estimatedDelivery: string;
  phone?: string;
  email?: string;
}

const mockVendors: Vendor[] = [{
  id: '1',
  name: 'Rajesh Kumar Farm',
  category: 'Fresh Produce',
  distance: 0.8,
  rating: 4.8,
  freshness: 'Ultra Fresh',
  location: {
    lat: 28.6139,
    lng: 77.2090
  },
  isOnline: true,
  estimatedDelivery: '15-20 min',
  phone: '+91-9876543210',
  email: 'rajesh@farm.com'
}, {
  id: '2',
  name: 'Spice Route',
  category: 'Spices & Herbs',
  distance: 1.2,
  rating: 4.6,
  freshness: 'Fresh',
  location: {
    lat: 28.6129,
    lng: 77.2095
  },
  isOnline: true,
  estimatedDelivery: '20-25 min',
  phone: '+91-8765432109',
  email: 'info@spiceroute.com'
}, {
  id: '3',
  name: 'Dairy Fresh',
  category: 'Dairy',
  distance: 2.1,
  rating: 4.7,
  freshness: 'Ultra Fresh',
  location: {
    lat: 28.6149,
    lng: 77.2085
  },
  isOnline: false,
  estimatedDelivery: 'Offline',
  phone: '+91-7654321098',
  email: 'contact@dairyfresh.com'
}, {
  id: '4',
  name: 'Tropical Fruits Hub',
  category: 'Fruits',
  distance: 1.5,
  rating: 4.7,
  freshness: 'Ultra Fresh',
  location: {
    lat: 28.6145,
    lng: 77.2100
  },
  isOnline: true,
  estimatedDelivery: '18-25 min',
  phone: '+91-6543210987',
  email: 'tropical@fruits.com'
}, {
  id: '5',
  name: 'Street Food Express',
  category: 'Snacks',
  distance: 0.9,
  rating: 4.5,
  freshness: 'Fresh',
  location: {
    lat: 28.6135,
    lng: 77.2080
  },
  isOnline: true,
  estimatedDelivery: '12-18 min',
  phone: '+91-5432109876',
  email: 'street@food.com'
}];

export const VendorDiscoveryMap: React.FC = () => {
  return <DynamicVendorMap />;
};
