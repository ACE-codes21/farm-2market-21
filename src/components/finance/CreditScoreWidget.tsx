
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { TrendingUp, Info, Star, ShieldCheck, Users, Award } from 'lucide-react';

interface CreditScoreWidgetProps {
  score: number;
  trustLevel: number;
  activityData: {
    totalOrders: number;
    returnRate: number;
    avgRating: number;
  };
}

const getTrustColor = (trustLevel: number) => {
  if (trustLevel < 2) return 'text-red-400';
  if (trustLevel < 3) return 'text-yellow-400';
  if (trustLevel < 4) return 'text-green-400';
  return 'text-emerald-400';
};

const getTrustGradient = (trustLevel: number) => {
  if (trustLevel < 2) return 'from-red-600 to-red-400';
  if (trustLevel < 3) return 'from-yellow-600 to-yellow-400';
  if (trustLevel < 4) return 'from-green-600 to-green-400';
  return 'from-emerald-600 to-emerald-400';
};

const getTrustLabel = (trustLevel: number) => {
  if (trustLevel < 2) return 'Building Trust';
  if (trustLevel < 3) return 'Reliable';
  if (trustLevel < 4) return 'Trusted';
  return 'Highly Trusted';
};

const getTrustBadgeColor = (trustLevel: number) => {
  if (trustLevel < 2) return 'bg-red-500/20 text-red-300 border-red-500/30';
  if (trustLevel < 3) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
  if (trustLevel < 4) return 'bg-green-500/20 text-green-300 border-green-500/30';
  return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
};

export const CreditScoreWidget: React.FC<CreditScoreWidgetProps> = ({ 
  score, 
  trustLevel, 
  activityData 
}) => {
  const trustPercentage = (trustLevel / 5) * 100;
  const credibilityScore = Math.round((trustLevel * 20) + (score / 850 * 80));

  return (
    <TooltipProvider>
      <Card className="bg-slate-800/80 backdrop-blur-lg border border-slate-700/50 shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              Platform Trust Level
            </CardTitle>
            <Badge className={cn(
              "text-sm font-semibold px-3 py-1",
              getTrustBadgeColor(trustLevel)
            )}>
              {getTrustLabel(trustLevel)}
            </Badge>
          </div>
          <p className="text-slate-400 text-sm">Your credibility score visible to buyers</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Main Trust Display */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-center">
                <div className={cn(
                  "text-4xl font-bold font-display mb-1 bg-gradient-to-r bg-clip-text text-transparent",
                  getTrustGradient(trustLevel)
                )}>
                  {credibilityScore}%
                </div>
                <p className="text-xs text-slate-400">Credibility Score</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={cn(
                        "h-6 w-6",
                        star <= trustLevel ? "text-emerald-400 fill-emerald-400" : "text-slate-600"
                      )} 
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-400">Trust Rating</p>
              </div>
            </div>
            <Progress value={trustPercentage} className="h-3 mb-2" />
            <p className="text-sm text-slate-400">Buyers see this trust level when viewing your products</p>
          </div>
          
          {/* Trust Factors */}
          <div className="border-t border-slate-700/50 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-white">Trust Building Factors</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-slate-400 hover:text-slate-300" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm max-w-xs">Based on your trading history, customer feedback, and platform engagement</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            {/* Activity Stats */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="h-4 w-4 text-blue-400" />
                  <p className="text-lg font-bold text-white">{activityData.totalOrders}</p>
                </div>
                <p className="text-xs text-slate-400">Completed Orders</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <p className="text-lg font-bold text-white">{activityData.returnRate}%</p>
                </div>
                <p className="text-xs text-slate-400">Return Rate</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <p className="text-lg font-bold text-white">{activityData.avgRating}</p>
                </div>
                <p className="text-xs text-slate-400">Avg Rating</p>
              </div>
            </div>
          </div>

          {/* Credit Score Info */}
          <div className="bg-slate-700/20 rounded-lg p-3 border border-slate-600/20">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Credit Score</span>
              <span className={cn("text-sm font-semibold", getTrustColor(Math.floor(score/200)))}>{score}/850</span>
            </div>
            <Progress value={(score / 850) * 100} className="h-2 mt-2" />
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
