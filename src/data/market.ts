import { Product } from '../types';

export const marketProducts: Product[] = [
  // This data will now be fetched from Supabase
];

// Add the missing exports that other files are expecting
export const products = marketProducts;

export const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'Vegetables', label: 'Vegetables' },
  { value: 'Fruits', label: 'Fruits' },
  { value: 'Dairy', label: 'Dairy' },
  { value: 'Snacks', label: 'Snacks' },
  { value: 'Spices', label: 'Spices' },
  { value: 'Natural Products', label: 'Natural Products' },
  { value: 'Desserts', label: 'Desserts' },
  { value: 'Beverages', label: 'Beverages' },
  { value: 'Grains', label: 'Grains' },
  { value: 'Bakery', label: 'Bakery' }
];
