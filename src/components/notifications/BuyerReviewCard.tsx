
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { BuyerReview } from '@/data/notifications';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter, 
  DialogClose, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface BuyerReviewCardProps {
  review: BuyerReview;
  onReply: (reviewId: string) => void;
}

const BuyerReviewCard: React.FC<BuyerReviewCardProps> = ({ review, onReply }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSendReply = () => {
    // In a real app, you'd handle form state and send the reply text to a backend.
    onReply(review.id);
    toast({
      title: "Reply Sent",
      description: "Your reply has been sent to the buyer.",
    });
    setIsDialogOpen(false);
  };

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
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="text-green-400 hover:bg-green-900/50 hover:text-green-300 h-8 px-3">Reply</Button>
                </DialogTrigger>
                <DialogContent className="dark-modern-card border-slate-700/50 text-white bg-slate-900">
                  <DialogHeader>
                    <DialogTitle>Reply to {review.buyerName}</DialogTitle>
                    <DialogDescription className="text-slate-400">
                      Your response will be visible to the buyer.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Textarea 
                      placeholder="Type your reply here..." 
                      className="bg-slate-800/50 border-slate-600 focus:border-green-500 text-white"
                      rows={4}
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white">Cancel</Button>
                    </DialogClose>
                    <Button type="button" onClick={handleSendReply} className="bg-green-600 hover:bg-green-700 text-white">Send Reply</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuyerReviewCard;
