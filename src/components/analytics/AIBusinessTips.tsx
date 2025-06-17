
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { useAIBusinessTips } from '@/hooks/useAIBusinessTips';
import { Skeleton } from '@/components/ui/skeleton';

export const AIBusinessTips: React.FC = () => {
  const { data: tipsData, isLoading } = useAIBusinessTips();

  if (isLoading) {
    return (
      <Card className="dark-modern-card border-green-500/20 shadow-green-500/10 h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-medium text-white">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            AI Business Tips
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
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {tips.map((tip, index) => (
            <li key={index} className="text-sm text-slate-300 leading-relaxed bg-slate-800/50 p-3 rounded-lg border-l-4 border-yellow-400">
              {tip}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
