
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

interface CreditScoreWidgetProps {
  score: number;
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

export const CreditScoreWidget: React.FC<CreditScoreWidgetProps> = ({ score }) => {
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
      </CardContent>
    </Card>
  );
};
