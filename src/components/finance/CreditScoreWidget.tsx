
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { TrendingUp, Info } from 'lucide-react';

interface CreditScoreWidgetProps {
  score: number;
  trustLevel: number;
  activityData: {
    totalOrders: number;
    returnRate: number;
    avgRating: number;
  };
}

const getScoreColor = (score: number) => {
  if (score < 600) return 'text-red-400';
  if (score < 700) return 'text-yellow-400';
  if (score < 800) return 'text-green-400';
  return 'text-emerald-400';
};

const getScoreLabel = (score: number) => {
    if (score < 600) return 'Poor';
    if (score < 700) return 'Fair';
    if (score < 800) return 'Good';
    return 'Excellent';
}

const renderStars = (level: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= level ? 'text-yellow-400' : 'text-slate-600'}>
        ⭐
      </span>
    );
  }
  return stars;
};

export const CreditScoreWidget: React.FC<CreditScoreWidgetProps> = ({ 
  score, 
  trustLevel, 
  activityData 
}) => {
  return (
    <Card className="bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold text-white">Credit Score</CardTitle>
        <TrendingUp className="h-5 w-5 text-green-400" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={cn("text-3xl font-bold font-display mb-1", getScoreColor(score))}>
            {score}
          </div>
          <p className="text-sm text-slate-400">{getScoreLabel(score)}</p>
        </div>
        
        <div className="pt-3 border-t border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">Trust Level</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-slate-400 hover:text-slate-300" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">Calculated from your platform activity and reliability</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {renderStars(trustLevel)}
            </div>
            <span className="text-sm text-slate-400">
              ({trustLevel}/5)
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-2">
            {activityData.totalOrders} orders • {activityData.returnRate}% returns • {activityData.avgRating}★ rating
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
