
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
    <Card className="bg-green-900/40 border-green-500/30">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
            <div className="bg-green-500/20 p-2 rounded-full flex-shrink-0">
                <Info className="h-5 w-5 text-green-300" />
            </div>
            <p className="text-sm text-green-200">{tip}</p>
        </div>
      </CardContent>
    </Card>
  );
};
