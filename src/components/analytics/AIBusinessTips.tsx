
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface AIBusinessTipsProps {
  tips: string[];
}

export const AIBusinessTips: React.FC<AIBusinessTipsProps> = ({ tips }) => {
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
