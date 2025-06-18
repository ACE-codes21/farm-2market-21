
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ChevronDown, ChevronUp, Shield } from 'lucide-react';
import { Review } from '@/types/review';

interface ProductReviewSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export const ProductReviewSection: React.FC<ProductReviewSectionProps> = ({
  reviews,
  averageRating,
  totalReviews
}) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="dark-modern-card border-slate-600/30 mt-4">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-3">
          <div className="flex items-center gap-2">
            {renderStars(Math.floor(averageRating))}
            <span className="text-lg font-semibold">{averageRating}</span>
          </div>
          <span className="text-slate-400 text-sm">({totalReviews} reviews)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayedReviews.map((review) => (
          <div key={review.id} className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{review.userName}</span>
                {review.verified && (
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="text-slate-400 text-sm">{review.date}</div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              {renderStars(review.rating)}
            </div>
            <p className="text-slate-300 text-sm">{review.comment}</p>
          </div>
        ))}
        
        {reviews.length > 3 && (
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            {showAllReviews ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Show Less Reviews
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Show All {reviews.length} Reviews
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
