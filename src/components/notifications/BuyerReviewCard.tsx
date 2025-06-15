
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { BuyerReview } from '@/data/notifications';

interface BuyerReviewCardProps {
  review: BuyerReview;
}

const BuyerReviewCard: React.FC<BuyerReviewCardProps> = ({ review }) => {
  const renderStars = () => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
      />
    ));
  };

  return (
    <Card className="dark-modern-card border-slate-700/50 animate-fade-in">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <img src={review.productImage} alt={review.productName} className="w-16 h-16 rounded-md object-cover" />
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-white">{review.buyerName}</p>
                {review.buyerTag && (
                  <Badge variant="secondary" className="text-xs bg-green-900/50 text-green-300 border-green-700/50 mt-1">
                    {review.buyerTag === 'Top Buyer' ? '🌟' : '💬'} {review.buyerTag}
                  </Badge>
                )}
                 <p className="text-sm text-slate-400">Purchased: {review.productName}</p>
              </div>
              <p className="text-xs text-slate-500">{review.timestamp}</p>
            </div>

            <div className="flex items-center gap-1 my-2">
              {renderStars()}
            </div>
            
            <p className="text-sm text-slate-300 italic">"{review.feedback}"</p>
            
            <div className="flex justify-end mt-3">
                <Button variant="ghost" className="text-green-400 hover:bg-green-900/50 hover:text-green-300 h-8 px-3">Reply</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuyerReviewCard;
