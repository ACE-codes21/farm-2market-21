
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { TrendingUp, Info, Star } from 'lucide-react';

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

const getScoreGradient = (score: number) => {
  if (score < 600) return 'from-red-600 to-red-400';
  if (score < 700) return 'from-yellow-600 to-yellow-400';
  if (score < 800) return 'from-green-600 to-green-400';
  return 'from-emerald-600 to-emerald-400';
};

const getScoreLabel = (score: number) => {
  if (score < 600) return 'Poor';
  if (score < 700) return 'Fair';
  if (score < 800) return 'Good';
  return 'Excellent';
};

export const CreditScoreWidget: React.FC<CreditScoreWidgetProps> = ({ 
  score, 
  trustLevel, 
  activityData 
}) => {
  const scorePercentage = (score / 850) * 100;

  return (
    <TooltipProvider>
      <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg border border-slate-700/50 shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-lg bg-gradient-to-br",
                getScoreGradient(score)
              )}>
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              Credit Profile
            </CardTitle>
            <Badge className={cn(
              "text-sm font-semibold px-3 py-1",
              getScoreColor(score),
              "bg-current/10 border-current/20"
            )}>
              {getScoreLabel(score)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Main Score Display */}
          <div className="text-center">
            <div className={cn(
              "text-6xl font-bold font-display mb-2 bg-gradient-to-r bg-clip-text text-transparent",
              getScoreGradient(score)
            )}>
              {score}
            </div>
            <Progress value={scorePercentage} className="h-3 mb-2" />
            <p className="text-sm text-slate-400">out of 850</p>
          </div>
          
          {/* Trust Level Section */}
          <div className="border-t border-slate-700/50 pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">Platform Trust Level</span>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-slate-400 hover:text-slate-300" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">Based on your trading history and customer feedback</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={cn(
                      "h-4 w-4",
                      star <= trustLevel ? "text-yellow-400 fill-yellow-400" : "text-slate-600"
                    )} 
                  />
                ))}
                <span className="text-sm text-slate-400 ml-1">({trustLevel}/5)</span>
              </div>
            </div>
            
            {/* Activity Stats */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-700/30 rounded-lg p-3">
                <p className="text-lg font-bold text-white">{activityData.totalOrders}</p>
                <p className="text-xs text-slate-400">Orders</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-3">
                <p className="text-lg font-bold text-white">{activityData.returnRate}%</p>
                <p className="text-xs text-slate-400">Returns</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-3">
                <p className="text-lg font-bold text-white">{activityData.avgRating}★</p>
                <p className="text-xs text-slate-400">Rating</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
