
import { Product } from '../types';

export const marketProducts: Product[] = [
  {
    id: 1,
    name: "Farm Fresh Organic Tomatoes",
    price: 80,
    rating: 4.8,
    reviews: 127,
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1546470427-227c3d343e04?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&h=500&fit=crop&crop=center"
    ],
    category: "Vegetables",
    stock: 25,
    description: "Premium organic tomatoes grown without pesticides. Perfect for salads, cooking, and sauces.",
    isFreshPick: true,
    freshPickExpiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    vendor: {
      name: "Rajesh Kumar Farm",
      phone: "+91-9876543210"
    }
  },
  {
    id: 2,
    name: "Premium Basmati Rice (5kg)",
    price: 450,
    rating: 4.9,
    reviews: 89,
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=500&h=500&fit=crop&crop=center"
    ],
    category: "Grains",
    stock: 15,
    description: "Aged premium basmati rice with extra long grains and authentic aroma. Perfect for biryanis and pulavs.",
    vendor: {
      name: "Grain Master Co.",
      phone: "+91-9123456789"
    }
  },
  {
    id: 3,
    name: "Exotic Seasonal Fruit Box",
    price: 280,
    rating: 4.7,
    reviews: 156,
    images: [
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1571197119382-028d0b8d5d46?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&h=500&fit=crop&crop=center"
    ],
    category: "Fruits",
    stock: 12,
    description: "Carefully curated selection of seasonal exotic fruits including dragon fruit, kiwi, and passion fruit.",
    isFreshPick: true,
    freshPickExpiresAt: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
    vendor: {
      name: "Tropical Fruits Hub",
      phone: "+91-9988776655"
    }
  },
  {
    id: 4,
    name: "Artisanal Fresh Paneer (500g)",
    price: 180,
    rating: 4.6,
    reviews: 93,
    images: [
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1563379091339-03246963d272?w=500&h=500&fit=crop&crop=center"
    ],
    category: "Dairy",
    stock: 8,
    description: "Handcrafted fresh paneer made from pure A2 milk. Soft, creamy texture perfect for all Indian dishes.",
    vendor: {
      name: "Dairy Fresh",
      phone: "+91-9567891234"
    }
  },
  {
    id: 5,
    name: "Gourmet Street Samosas (Pack of 8)",
    price: 120,
    rating: 4.5,
    reviews: 234,
    images: [
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1626132647523-66579ea48251?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1627662056029-4b23b9e90e4a?w=500&h=500&fit=crop&crop=center"
    ],
    category: "Snacks",
    stock: 30,
    description: "Crispy golden samosas with spiced potato and pea filling. Made fresh daily with traditional recipes.",
    vendor: {
      name: "Street Food Express",
      phone: "+91-9444555666"
    }
  },
  {
    id: 6,
    name: "Organic Honey (250ml)",
    price: 320,
    rating: 4.8,
    reviews: 67,
    images: [
      "https://images.unsplash.com/photo-1587049016823-41f87ea6fcf9?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=500&h=500&fit=crop&crop=center"
    ],
    category: "Natural Products",
    stock: 18,
    description: "Pure organic honey sourced directly from beekeepers. Raw, unprocessed, and rich in natural enzymes.",
    vendor: {
      name: "Bee Natural",
      phone: "+91-9333222111"
    }
  },
  {
    id: 7,
    name: "Handmade Chocolate Truffles (Box of 12)",
    price: 450,
    rating: 4.9,
    reviews: 78,
    images: [
      "https://images.unsplash.com/photo-1549644237-1bb8d8b0cac8?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1511381939415-e44015466834?w=500&h=500&fit=crop&crop=center"
    ],
    category: "Desserts",
    stock: 6,
    description: "Luxurious handcrafted chocolate truffles made with Belgian cocoa and premium ingredients.",
    vendor: {
      name: "Choco Craft",
      phone: "+91-9222111000"
    }
  },
  {
    id: 8,
    name: "Fresh Coconut Water (6 Pack)",
    price: 90,
    rating: 4.4,
    reviews: 112,
    images: [
      "https://images.unsplash.com/photo-1585832725244-803b07bf0bb0?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1553514029-1318c9127859?w=500&h=500&fit=crop&crop=center"
    ],
    category: "Beverages",
    stock: 40,
    description: "Fresh tender coconut water packed with natural electrolytes. Perfect for hydration and health.",
    vendor: {
      name: "Coconut King",
      phone: "+91-9111000999"
    }
  },
  {
    id: 9,
    name: "Artisan Sourdough Bread",
    price: 180,
    rating: 4.7,
    reviews: 89,
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&h=500&fit=crop&crop=center"
    ],
    category: "Bakery",
    stock: 12,
    description: "Handcrafted sourdough bread with crispy crust and soft interior. Made with natural fermentation.",
    vendor: {
      name: "Artisan Bakery",
      phone: "+91-9000888777"
    }
  },
  {
    id: 10,
    name: "Premium Green Tea Leaves (100g)",
    price: 250,
    rating: 4.6,
    reviews: 134,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&h=500&fit=crop&crop=center"
    ],
    category: "Beverages",
    stock: 22,
    description: "High-grade green tea leaves sourced from Himalayan gardens. Rich in antioxidants and natural flavor.",
    vendor: {
      name: "Tea Garden Direct",
      phone: "+91-8999777666"
    }
  },
  {
    id: 11,
    name: "Spiced Chai Masala Blend",
    price: 180,
    rating: 4.8,
    reviews: 167,
    images: [
      "https://images.unsplash.com/photo-1571170804058-d9d4e5a8f8f6?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1599049296194-c2e1ec04e752?w=500&h=500&fit=crop&crop=center"
    ],
    category: "Spices",
    stock: 35,
    description: "Authentic chai masala blend with cardamom, cinnamon, cloves, and ginger. Perfect for traditional tea.",
    vendor: {
      name: "Spice Route",
      phone: "+91-8888999777"
    }
  },
  {
    id: 12,
    name: "Fresh Mango Pulp (1kg)",
    price: 220,
    rating: 4.7,
    reviews: 198,
    images: [
      "https://images.unsplash.com/photo-1605027990121-3b2c6c8cea7d?w=500&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop&crop=center"
    ],
    category: "Fruits",
    stock: 16,
    description: "Pure Alphonso mango pulp without preservatives. Ideal for smoothies, desserts, and traditional sweets.",
    isFreshPick: true,
    freshPickExpiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    vendor: {
      name: "Mango Orchard",
      phone: "+91-7777888999"
    }
  }
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
