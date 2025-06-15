
import { Product } from "@/types";

export const products: Product[] = [
  { 
    id: 1, 
    name: 'Organic Bananas (1kg)', 
    price: 60, 
    rating: 4.5, 
    reviews: 28,
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop'
    ],
    category: 'Fruits',
    isFreshPick: true,
    freshPickExpiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(),
    vendor: {
      name: 'Ramesh Kumar',
      phone: '+91-9876543210',
      upiId: 'ramesh.kumar@paytm',
      upiQrCode: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=200&h=200&fit=crop'
    }
  },
  { 
    id: 2, 
    name: 'Tomatoes (1kg)', 
    price: 40, 
    rating: 4.7, 
    reviews: 45,
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1546470427-e91e2e244ae6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop'
    ],
    category: 'Vegetables',
    vendor: {
      name: 'Sunita Devi',
      phone: '+91-9876543211',
      upiId: 'sunita.devi@gpay',
      upiQrCode: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=200&h=200&fit=crop'
    }
  },
  { 
    id: 3, 
    name: 'Red Onions (1kg)', 
    price: 30, 
    rating: 4.2, 
    reviews: 32,
    stock: 60,
    images: [
      'https://images.unsplash.com/photo-1508313880080-c4bae5d55a0a?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=400&h=300&fit=crop'
    ],
    category: 'Vegetables',
    vendor: {
      name: 'Mohan Singh',
      phone: '+91-9876543212',
      upiId: 'mohan.singh@phonepe'
    }
  },
  { 
    id: 4, 
    name: 'Samosas (6 pieces)', 
    price: 40, 
    rating: 4.8, 
    reviews: 67,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop'
    ],
    category: 'Street Food',
    vendor: {
      name: 'Ravi Sharma',
      phone: '+91-9876543213',
      upiId: 'ravi.sharma@paytm',
      upiQrCode: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=200&h=200&fit=crop'
    }
  },
  { 
    id: 5, 
    name: 'Orange Juice (250ml)', 
    price: 25, 
    rating: 4.1, 
    reviews: 23,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop'
    ],
    category: 'Beverages',
    vendor: {
      name: 'Kavita Patel',
      phone: '+91-9876543214',
      upiId: 'kavita.patel@gpay'
    }
  },
  { 
    id: 6, 
    name: 'Mango Pickle (500g)', 
    price: 80, 
    rating: 4.6, 
    reviews: 18,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1599599810694-57a2ca8276a8?w=400&h=300&fit=crop'
    ],
    category: 'Condiments',
    vendor: {
      name: 'Pushpa Ben',
      phone: '+91-9876543215',
      upiId: 'pushpa.ben@phonepe',
      upiQrCode: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=200&h=200&fit=crop'
    }
  },
  { 
    id: 7, 
    name: 'Green Chilies (250g)', 
    price: 20, 
    rating: 4.0, 
    reviews: 15,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1583604649804-81d019b8e1e4?w=400&h=300&fit=crop'
    ],
    category: 'Spices',
    vendor: {
      name: 'Rajesh Kumar',
      phone: '+91-9876543216',
      upiId: 'rajesh.kumar@paytm'
    }
  },
  { 
    id: 8, 
    name: 'Coriander Leaves (1 bunch)', 
    price: 10, 
    rating: 4.3, 
    reviews: 41,
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=400&h=300&fit=crop'
    ],
    category: 'Herbs',
    vendor: {
      name: 'Lakshmi Devi',
      phone: '+91-9876543217',
      upiId: 'lakshmi.devi@gpay'
    }
  },
  { 
    id: 9, 
    name: 'Ginger (500g)', 
    price: 35, 
    rating: 4.4, 
    reviews: 29,
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1628340428296-b5cd649bb6c8?w=400&h=300&fit=crop'
    ],
    category: 'Spices',
    vendor: {
      name: 'Suresh Patel',
      phone: '+91-9876543218',
      upiId: 'suresh.patel@phonepe',
      upiQrCode: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=200&h=200&fit=crop'
    }
  },
  { 
    id: 10, 
    name: 'Coconut Water (500ml)', 
    price: 30, 
    rating: 4.5, 
    reviews: 34,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&h=300&fit=crop'
    ],
    category: 'Beverages',
    vendor: {
      name: 'Anil Reddy',
      phone: '+91-9876543219',
      upiId: 'anil.reddy@paytm',
      upiQrCode: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=200&h=200&fit=crop'
    }
  },
  { 
    id: 11, 
    name: 'Roasted Peanuts (200g)', 
    price: 25, 
    rating: 4.2, 
    reviews: 52,
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1582886946878-7f23e1fd1f2d?w=400&h=300&fit=crop'
    ],
    category: 'Dry Fruits',
    vendor: {
      name: 'Deepak Shah',
      phone: '+91-9876543220',
      upiId: 'deepak.shah@gpay'
    }
  },
  { 
    id: 12, 
    name: 'Pani Puri (12 pieces)', 
    price: 30, 
    rating: 4.7, 
    reviews: 88,
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop'
    ],
    category: 'Street Food',
    isFreshPick: true,
    freshPickExpiresAt: new Date(Date.now() + 15 * 60 * 60 * 1000).toISOString(),
    vendor: {
      name: 'Mukesh Gupta',
      phone: '+91-9876543221',
      upiId: 'mukesh.gupta@phonepe',
      upiQrCode: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=200&h=200&fit=crop'
    }
  },
];

export const categories = [
  { value: 'all', label: 'All Items' },
  { value: 'Fruits', label: 'Fruits' },
  { value: 'Vegetables', label: 'Vegetables' },
  { value: 'Street Food', label: 'Street Food' },
  { value: 'Beverages', label: 'Beverages' },
  { value: 'Spices', label: 'Spices' },
  { value: 'Herbs', label: 'Herbs' },
  { value: 'Dry Fruits', label: 'Dry Fruits' },
  { value: 'Condiments', label: 'Condiments' },
];
