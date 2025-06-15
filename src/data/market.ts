
import { Product } from '../types';

export const marketProducts: Product[] = [
  {
    id: 1,
    name: "Fresh Organic Tomatoes",
    price: 60,
    rating: 4.8,
    reviews: 45,
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1546470427-227c3d343e04?w=400&h=400&fit=crop"
    ],
    category: "Vegetables",
    stock: 12,
    description: "Farm-fresh organic tomatoes, perfect for cooking and salads. Grown without pesticides in local farms.",
    isFreshPick: true,
    freshPickExpiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    vendor: {
      name: "Ravi Kumar",
      phone: "+91-9876543210",
      upiId: "ravikumar@paytm",
      upiQrCode: "https://images.unsplash.com/photo-1617647905505-96c37d50bb99?w=300&h=300&fit=crop"
    }
  },
  {
    id: 2,
    name: "Fresh Green Leafy Vegetables Mix",
    price: 40,
    rating: 4.6,
    reviews: 32,
    images: [
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400&h=400&fit=crop"
    ],
    category: "Vegetables",
    stock: 8,
    description: "Mixed fresh green leafy vegetables including spinach, methi, and coriander. Rich in vitamins and minerals.",
    vendor: {
      name: "Sunita Devi",
      phone: "+91-9123456789",
      upiId: "sunita.devi@phonepe",
      upiQrCode: "https://images.unsplash.com/photo-1617647905505-96c37d50bb99?w=300&h=300&fit=crop"
    }
  },
  {
    id: 3,
    name: "Seasonal Fresh Fruit Basket",
    price: 150,
    rating: 4.9,
    reviews: 67,
    images: [
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571197119382-028d0b8d5d46?w=400&h=400&fit=crop"
    ],
    category: "Fruits",
    stock: 5,
    description: "Assorted seasonal fruits including apples, oranges, and bananas. Perfect for daily nutrition needs.",
    isFreshPick: true,
    freshPickExpiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
    vendor: {
      name: "Amit Singh",
      phone: "+91-9988776655",
      upiId: "amitsingh@gpay",
      upiQrCode: "https://images.unsplash.com/photo-1617647905505-96c37d50bb99?w=300&h=300&fit=crop"
    }
  },
  {
    id: 4,
    name: "Homemade Fresh Paneer",
    price: 120,
    rating: 4.7,
    reviews: 28,
    images: [
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=400&fit=crop"
    ],
    category: "Dairy",
    stock: 3,
    description: "Fresh homemade paneer made from pure milk. Soft texture and rich taste, perfect for curries.",
    vendor: {
      name: "Meera Sharma",
      phone: "+91-9567891234",
      upiId: "meera.sharma@paytm",
      upiQrCode: "https://images.unsplash.com/photo-1617647905505-96c37d50bb99?w=300&h=300&fit=crop"
    }
  },
  {
    id: 5,
    name: "Street-Style Samosas (Pack of 6)",
    price: 30,
    rating: 4.5,
    reviews: 89,
    images: [
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1626132647523-66579ea48251?w=400&h=400&fit=crop"
    ],
    category: "Snacks",
    stock: 15,
    description: "Crispy and delicious street-style samosas with spiced potato filling. Perfect evening snack.",
    vendor: {
      name: "Rajesh Gupta",
      phone: "+91-9444555666",
      upiId: "rajesh.gupta@phonepe",
      upiQrCode: "https://images.unsplash.com/photo-1617647905505-96c37d50bb99?w=300&h=300&fit=crop"
    }
  },
  {
    id: 6,
    name: "Fresh Ginger-Garlic Paste",
    price: 25,
    rating: 4.4,
    reviews: 23,
    images: [
      "https://images.unsplash.com/photo-1599049296194-c2e1ec04e752?w=400&h=400&fit=crop"
    ],
    category: "Spices",
    stock: 20,
    description: "Freshly ground ginger-garlic paste made daily. No preservatives, pure and natural flavor.",
    vendor: {
      name: "Lakshmi Reddy",
      phone: "+91-9333222111",
      upiId: "lakshmi.reddy@gpay",
      upiQrCode: "https://images.unsplash.com/photo-1617647905505-96c37d50bb99?w=300&h=300&fit=crop"
    }
  },
  {
    id: 7,
    name: "Traditional Jaggery Blocks",
    price: 80,
    rating: 4.8,
    reviews: 34,
    images: [
      "https://images.unsplash.com/photo-1609501676725-7186f62cc4ac?w=400&h=400&fit=crop"
    ],
    category: "Sweeteners",
    stock: 10,
    description: "Pure jaggery blocks made from sugarcane. Natural sweetener rich in minerals and iron.",
    vendor: {
      name: "Manoj Yadav",
      phone: "+91-9222111000",
      upiId: "manojyadav@paytm",
      upiQrCode: "https://images.unsplash.com/photo-1617647905505-96c37d50bb99?w=300&h=300&fit=crop"
    }
  },
  {
    id: 8,
    name: "Fresh Coconut Water",
    price: 20,
    rating: 4.6,
    reviews: 56,
    images: [
      "https://images.unsplash.com/photo-1585832725244-803b07bf0bb0?w=400&h=400&fit=crop"
    ],
    category: "Beverages",
    stock: 25,
    description: "Fresh tender coconut water, naturally sweet and refreshing. Perfect for hot summer days.",
    vendor: {
      name: "Suresh Nair",
      phone: "+91-9111000999",
      upiId: "sureshnair@phonepe",
      upiQrCode: "https://images.unsplash.com/photo-1617647905505-96c37d50bb99?w=300&h=300&fit=crop"
    }
  },
  {
    id: 9,
    name: "Handmade Wheat Flour",
    price: 45,
    rating: 4.7,
    reviews: 41,
    images: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop"
    ],
    category: "Grains",
    stock: 18,
    description: "Stone-ground wheat flour made from locally sourced wheat. Perfect for making fresh rotis and bread.",
    vendor: {
      name: "Kamala Devi",
      phone: "+91-9000888777",
      upiId: "kamaladevi@gpay",
      upiQrCode: "https://images.unsplash.com/photo-1617647905505-96c37d50bb99?w=300&h=300&fit=crop"
    }
  },
  {
    id: 10,
    name: "Fresh Mint & Coriander Bundle",
    price: 15,
    rating: 4.5,
    reviews: 29,
    images: [
      "https://images.unsplash.com/photo-1557296124-4fc85c19e05d?w=400&h=400&fit=crop"
    ],
    category: "Herbs",
    stock: 30,
    description: "Fresh mint and coriander leaves bundle. Perfect for garnishing and making chutneys.",
    vendor: {
      name: "Priya Patel",
      phone: "+91-8999777666",
      upiId: "priyapatel@paytm",
      upiQrCode: "https://images.unsplash.com/photo-1617647905505-96c37d50bb99?w=300&h=300&fit=crop"
    }
  }
];
