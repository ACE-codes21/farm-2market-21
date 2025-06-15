
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

const ReviewInsights: React.FC = () => {
  return (
    <Card className="dark-modern-card animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <MessageSquare className="text-green-400" />
          AI Review Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="text-slate-400 text-sm space-y-2">
        <p>✅ Most buyers praise your fresh spinach and organic tomatoes.</p>
        <p>📈 Your average rating is 4.8 stars this week. Keep it up!</p>
        <p>💡 Consider bundling popular items to increase average order value.</p>
      </CardContent>
    </Card>
  );
};

export default ReviewInsights;
