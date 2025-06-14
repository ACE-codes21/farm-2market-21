
export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}
