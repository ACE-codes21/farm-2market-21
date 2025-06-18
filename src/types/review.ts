
export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
}

export interface ProductReview {
  productId: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}
