
import { Review, ProductReview } from '@/types/review';

const sampleNames = [
  'Priya Sharma', 'Rajesh Kumar', 'Anita Patel', 'Vikram Singh', 'Kavya Reddy',
  'Arjun Gupta', 'Sneha Agarwal', 'Rohit Jain', 'Meera Shah', 'Akash Verma',
  'Deepika Nair', 'Ravi Mehta', 'Pooja Bansal', 'Sanjay Yadav', 'Ritika Das'
];

const sampleComments = [
  'Excellent quality! Fresh and exactly as described.',
  'Good product, delivery was on time.',
  'Amazing freshness, will order again!',
  'Perfect for my daily needs. Highly recommended.',
  'Great value for money. Quality is top-notch.',
  'Fresh and organic. Loved the quality.',
  'Quick delivery and great packaging.',
  'Best quality I have found in this price range.',
  'Super fresh and tasty. Will definitely reorder.',
  'Good experience overall. Product was as expected.',
  'Excellent service and product quality.',
  'Very satisfied with the purchase.',
  'Fresh product with reasonable pricing.',
  'Great quality, exceeded my expectations.',
  'Perfect product, exactly what I was looking for.'
];

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomDate = (): string => {
  const daysAgo = Math.floor(Math.random() * 30) + 1;
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toLocaleDateString();
};

export const generateDummyReviews = (productId: string, count: number = 3): Review[] => {
  const reviews: Review[] = [];
  
  for (let i = 0; i < count; i++) {
    reviews.push({
      id: `review-${productId}-${i}`,
      userName: getRandomElement(sampleNames),
      rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars mostly
      comment: getRandomElement(sampleComments),
      date: getRandomDate(),
      verified: Math.random() > 0.3 // 70% verified purchases
    });
  }
  
  return reviews;
};

export const getProductReviews = (productId: string): ProductReview => {
  const reviewCount = Math.floor(Math.random() * 8) + 3; // 3-10 reviews
  const reviews = generateDummyReviews(productId, reviewCount);
  
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  
  return {
    productId,
    reviews,
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews: reviews.length
  };
};
