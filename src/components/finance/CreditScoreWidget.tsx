
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
  if (score < 600) return 'text-red-500';
  if (score < 700) return 'text-yellow-500';
  if (score < 800) return 'text-green-500';
  return 'text-emerald-400';
};

const getScoreLabel = (score: number) => {
    if (score < 600) return 'Poor 😟';
    if (score < 700) return 'Fair 😐';
    if (score < 800) return 'Good 😊';
    return 'Excellent 😍';
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
    <Card className="dark-modern-card card-hover-glow border-green-500/20 shadow-green-500/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">Credit Score</CardTitle>
        <TrendingUp className="h-4 w-4 text-green-400" />
      </CardHeader>
      <CardContent>
        <div className={cn("text-5xl font-bold font-display", getScoreColor(score))} style={{ textShadow: '0 0 10px hsl(var(--primary))' }}>
          {score}
        </div>
        <p className="text-xs text-slate-400 mt-2">{getScoreLabel(score)}</p>
        
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">Your Trust Level:</span>
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
          <div className="flex items-center mt-1">
            {renderStars(trustLevel)}
            <span className="ml-2 text-xs text-slate-400">
              ({trustLevel}/5)
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-2">
            Based on {activityData.totalOrders} orders, {activityData.returnRate}% return rate, {activityData.avgRating}★ rating
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
