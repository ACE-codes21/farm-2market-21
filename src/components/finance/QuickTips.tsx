
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface QuickTipsProps {
  tips: string[];
}

export const QuickTips: React.FC<QuickTipsProps> = ({ tips }) => {
  const [tip, setTip] = useState('');

  useEffect(() => {
    if (tips.length > 0) {
      setTip(tips[Math.floor(Math.random() * tips.length)]);
    }
  }, [tips]);

  if (!tip) return null;

  return (
    <Card className="h-full bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 shadow-xl rounded-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-400" />
          Quick Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-300 leading-relaxed">{tip}</p>
      </CardContent>
    </Card>
  );
};
