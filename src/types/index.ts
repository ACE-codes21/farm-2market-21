export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  category: string;
  stock: number;
  isFreshPick?: boolean;
  freshPickExpiresAt?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'confirmed' | 'delivered';
}

export interface VendorStats {
  totalSales: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}
