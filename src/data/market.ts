
import { Product } from "@/types";

export const products: Product[] = [
    { 
      id: 1, 
      name: 'Fresh Bananas (1kg)', 
      price: 60, 
      rating: 4.5, 
      reviews: 28,
      images: [
        'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop'
      ],
      category: 'Fruits'
    },
    { 
      id: 2, 
      name: 'Fresh Tomatoes (1kg)', 
      price: 40, 
      rating: 4.7, 
      reviews: 45,
      images: [
        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1546470427-e91e2e244ae6?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop'
      ],
      category: 'Vegetables'
    },
    { 
      id: 3, 
      name: 'Red Onions (1kg)', 
      price: 30, 
      rating: 4.2, 
      reviews: 32,
      images: [
        'https://images.unsplash.com/photo-1508313880080-c4bae5d55a0a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=300&fit=crop'
      ],
      category: 'Vegetables'
    },
    { 
      id: 4, 
      name: 'Street Samosas (6 pcs)', 
      price: 40, 
      rating: 4.8, 
      reviews: 67,
      images: [
        'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop'
      ],
      category: 'Street Food'
    },
    { 
      id: 5, 
      name: 'Fresh Orange Juice', 
      price: 25, 
      rating: 4.6, 
      reviews: 23,
      images: [
        'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop'
      ],
      category: 'Beverages'
    },
    { 
      id: 6, 
      name: 'Homemade Mango Pickle', 
      price: 80, 
      rating: 4.4, 
      reviews: 18,
      images: [
        'https://images.unsplash.com/photo-1599599810694-57a2ca8276a8?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
      ],
      category: 'Condiments'
    },
    { 
      id: 7, 
      name: 'Green Chilies (250g)', 
      price: 20, 
      rating: 4.3, 
      reviews: 15,
      images: [
        'https://images.unsplash.com/photo-1583604649804-81d019b8e1e4?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571568514386-b9c4d2cb4c61?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1609501676725-7186f1b6dfc0?w=400&h=300&fit=crop'
      ],
      category: 'Spices'
    },
    { 
      id: 8, 
      name: 'Fresh Coriander (bunch)', 
      price: 10, 
      rating: 4.5, 
      reviews: 41,
      images: [
        'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=400&h=300&fit=crop'
      ],
      category: 'Herbs'
    },
    { 
      id: 9, 
      name: 'Fresh Ginger (500g)', 
      price: 35, 
      rating: 4.6, 
      reviews: 29,
      images: [
        'https://images.unsplash.com/photo-1628340428296-b5cd649bb6c8?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1609501676628-ba14ce3c4bb3?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1598346487143-3c0903a45c3b?w=400&h=300&fit=crop'
      ],
      category: 'Spices'
    },
    { 
      id: 10, 
      name: 'Fresh Coconut Water', 
      price: 30, 
      rating: 4.7, 
      reviews: 34,
      images: [
        'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop'
      ],
      category: 'Beverages'
    },
    { 
      id: 11, 
      name: 'Roasted Peanuts (200g)', 
      price: 25, 
      rating: 4.4, 
      reviews: 52,
      images: [
        'https://images.unsplash.com/photo-1582886946878-7f23e1fd1f2d?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1608181831042-8a2598f0a8ec?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400&h=300&fit=crop'
      ],
      category: 'Dry Fruits'
    },
    { 
      id: 12, 
      name: 'Street-style Pani Puri', 
      price: 30, 
      rating: 4.9, 
      reviews: 88,
      images: [
        'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1583225214464-9296029427aa?w=400&h=300&fit=crop'
      ],
      category: 'Street Food'
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
