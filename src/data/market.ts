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

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Tomatoes",
    price: 25,
    category: "vegetables",
    images: [
      "https://images.unsplash.com/photo-1546470427-227eb2b9d22d?q=80&w=1000",
      "https://images.unsplash.com/photo-1572441713132-51c75654db73?q=80&w=1000",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=1000"
    ],
    description: "Locally grown red tomatoes, perfect for cooking",
    rating: 4.2,
    reviews: 28,
    stock: 12,
    vendor: {
      id: 1,
      name: "Ravi Kumar",
      phone: "+919876543210",
      upiId: "ravi.kumar@paytm",
      upiQrCode: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=400"
    }
  },
  {
    id: 2,
    name: "Bananas",
    price: 30,
    category: "fruits",
    images: [
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=1000",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=1000",
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=1000"
    ],
    description: "Sweet yellow bananas from local farms",
    rating: 4.7,
    reviews: 45,
    stock: 8,
    vendor: {
      id: 2,
      name: "Sunita Devi",
      phone: "+919876543211",
      upiId: "sunita.devi@phonepe",
      upiQrCode: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=400"
    }
  },
  {
    id: 3,
    name: "Mangoes",
    price: 80,
    category: "fruits",
    images: [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1000",
      "https://images.unsplash.com/photo-1605027990121-3b2c78f7effc?q=80&w=1000",
      "https://images.unsplash.com/photo-1574471965350-a36ee4b8e98c?q=80&w=1000"
    ],
    description: "Seasonal Alphonso mangoes, sweet and juicy",
    rating: 4.9,
    reviews: 67,
    stock: 15,
    isFreshPick: true,
    freshPickExpiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    vendor: {
      id: 3,
      name: "Amit Shah",
      phone: "+919876543212",
      upiId: "amit.shah@gpay",
      upiQrCode: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=400"
    }
  },
  {
    id: 4,
    name: "Onions",
    price: 20,
    category: "vegetables",
    images: [
      "https://images.unsplash.com/photo-1508313880080-c4bef43d8a8f?q=80&w=1000",
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=1000",
      "https://images.unsplash.com/photo-1692264446371-b5c1ff86e5c0?q=80&w=1000"
    ],
    description: "Red onions for everyday cooking needs",
    rating: 4.0,
    reviews: 22,
    stock: 20,
    vendor: {
      id: 4,
      name: "Priya Sharma",
      phone: "+919876543213",
      upiId: "priya.sharma@paytm",
      upiQrCode: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=400"
    }
  },
  {
    id: 5,
    name: "Potatoes",
    price: 15,
    category: "vegetables",
    images: [
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=1000",
      "https://images.unsplash.com/photo-1590334089495-b8da80314b13?q=80&w=1000",
      "https://images.unsplash.com/photo-1622205313162-be1d5712a43f?q=80&w=1000"
    ],
    description: "Quality potatoes for all your cooking requirements",
    rating: 4.3,
    reviews: 31,
    stock: 25,
    vendor: {
      id: 5,
      name: "Vikram Singh",
      phone: "+919876543214",
      upiId: "vikram.singh@phonepe",
      upiQrCode: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=400"
    }
  },
  {
    id: 6,
    name: "Apples",
    price: 120,
    category: "fruits",
    images: [
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?q=80&w=1000",
      "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?q=80&w=1000",
      "https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=1000"
    ],
    description: "Crisp red apples imported from Kashmir",
    rating: 4.6,
    reviews: 89,
    stock: 18,
    vendor: {
      id: 6,
      name: "Meera Joshi",
      phone: "+919876543215",
      upiId: "meera.joshi@gpay",
      upiQrCode: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=400"
    }
  },
  {
    id: 7,
    name: "Rice",
    price: 45,
    category: "grains",
    images: [
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=1000",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1000",
      "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=1000"
    ],
    description: "Premium basmati rice, 1kg pack",
    rating: 4.4,
    reviews: 56,
    stock: 30,
    vendor: {
      id: 7,
      name: "Rajesh Gupta",
      phone: "+919876543216",
      upiId: "rajesh.gupta@paytm",
      upiQrCode: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=400"
    }
  },
  {
    id: 8,
    name: "Green Chili",
    price: 35,
    category: "vegetables",
    images: [
      "https://images.unsplash.com/photo-1583286801908-3b5ac4b0de5d?q=80&w=1000",
      "https://images.unsplash.com/photo-1612507790849-32b2ef7b7740?q=80&w=1000",
      "https://images.unsplash.com/photo-1612542114344-84f5ae3f6e84?q=80&w=1000"
    ],
    description: "Spicy green chilies for authentic Indian cooking",
    rating: 4.1,
    reviews: 19,
    stock: 10,
    vendor: {
      id: 8,
      name: "Anita Verma",
      phone: "+919876543217",
      upiId: "anita.verma@phonepe",
      upiQrCode: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=400"
    }
  },
  {
    id: 9,
    name: "Coriander",
    price: 10,
    category: "herbs",
    images: [
      "https://images.unsplash.com/photo-1524158900728-c23f6ed8eb12?q=80&w=1000",
      "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=1000",
      "https://images.unsplash.com/photo-1627662055477-2b97b81dc8c4?q=80&w=1000"
    ],
    description: "Bunches of coriander leaves, aromatic and fresh",
    rating: 4.5,
    reviews: 38,
    stock: 15,
    isFreshPick: true,
    freshPickExpiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    vendor: {
      id: 9,
      name: "Deepak Yadav",
      phone: "+919876543218",
      upiId: "deepak.yadav@gpay",
      upiQrCode: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=400"
    }
  },
  {
    id: 10,
    name: "Wheat Flour",
    price: 40,
    category: "grains",
    images: [
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1000",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?q=80&w=1000",
      "https://images.unsplash.com/photo-1619298725118-4fcf54e79625?q=80&w=1000"
    ],
    description: "Whole wheat flour, finely ground, 1kg pack",
    rating: 4.2,
    reviews: 42,
    stock: 22,
    vendor: {
      id: 10,
      name: "Sanjay Patel",
      phone: "+919876543219",
      upiId: "sanjay.patel@paytm",
      upiQrCode: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=400"
    }
  }
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
