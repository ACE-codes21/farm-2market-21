
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Sparkles, TrendingUp } from 'lucide-react';
import { useAIBusinessTips } from '@/hooks/useAIBusinessTips';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export const AIBusinessTips: React.FC = () => {
  const { data: tipsData, isLoading } = useAIBusinessTips();

  if (isLoading) {
    return (
      <Card className="dark-modern-card border-green-500/20 shadow-green-500/10 h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-medium text-white">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            AI Business Tips
            <Badge variant="outline" className="text-xs animate-pulse">
              <Sparkles className="h-3 w-3 mr-1" />
              Analyzing...
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-16 bg-slate-800/50" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const tips = tipsData?.tips || [
    "Focus on quality over quantity. Fresh, high-quality produce builds customer loyalty.",
    "Engage with customers through photos of your fresh harvests to build trust.",
    "Consider offering subscription boxes for regular customers to ensure steady income."
  ];

  return (
    <Card className="dark-modern-card border-green-500/20 shadow-green-500/10 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-medium text-white">
          <Lightbulb className="h-5 w-5 text-yellow-400" />
          AI Business Tips
          <Badge variant="outline" className="text-xs text-green-300 border-green-400/30">
            <TrendingUp className="h-3 w-3 mr-1" />
            Live Data
          </Badge>
        </CardTitle>
        <p className="text-xs text-slate-400">Personalized insights based on your business data</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {tips.map((tip, index) => (
            <li key={index} className="text-sm text-slate-300 leading-relaxed bg-slate-800/50 p-4 rounded-lg border-l-4 border-yellow-400 hover:bg-slate-700/50 transition-colors duration-200">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-yellow-400/20 mt-0.5">
                  <Lightbulb className="h-3 w-3 text-yellow-400" />
                </div>
                <span className="flex-1">{tip}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-slate-700/30">
          <p className="text-xs text-slate-500 text-center">
            Tips refresh every hour based on your latest business activity
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
