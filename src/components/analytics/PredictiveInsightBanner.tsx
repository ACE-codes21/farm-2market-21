
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface PredictiveInsightBannerProps {
  message: string;
}

export const PredictiveInsightBanner: React.FC<PredictiveInsightBannerProps> = ({ message }) => {
  return (
    <Card className="bg-gradient-to-r from-green-500/20 via-slate-800 to-slate-800 border-l-4 border-green-400 shadow-lg shadow-green-500/10">
      <CardContent className="p-6 flex items-center gap-4">
        <div className="p-3 bg-green-500/20 rounded-full">
            <TrendingUp className="h-6 w-6 text-green-300" />
        </div>
        <p className="text-lg font-medium text-white">{message}</p>
      </CardContent>
    </Card>
  );
};
