
export interface Product {
  id: string; // was number
  name: string;
  price: number;
  rating: number | null;
  reviews: number | null;
  images: string[] | null;
  category: string;
  stock: number;
  description?: string | null;
  vendor_id?: string;
  vendor?: {
    name: string | null;
    phone: string | null;
    upiId?: string | null;
    upiQrCode?: string | null;
  };
  expiryDate?: string | null;
  restockReminder?: boolean | null;
  barcode?: string | null;
  isFreshPick?: boolean | null;
  freshPickExpiresAt?: string | null;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string; // uuid
  created_at: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  total_amount: number;
  order_items: {
    quantity: number;
    price: number;
    products: {
      name: string;
      images: string[] | null;
    } | null;
  }[];
}

export interface VendorStats {
  totalSales: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}
