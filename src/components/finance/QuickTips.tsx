
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, ChevronRight, Minimize2, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickTipsProps {
  tips: string[];
}

export const QuickTips: React.FC<QuickTipsProps> = ({ tips }) => {
  const [currentTip, setCurrentTip] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    if (tips.length > 0) {
      setCurrentTip(tips[0]);
    }
  }, [tips]);

  const nextTip = () => {
    const nextIndex = (tipIndex + 1) % tips.length;
    setTipIndex(nextIndex);
    setCurrentTip(tips[nextIndex]);
  };

  if (!currentTip) return null;

  return (
    <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg border border-blue-700/30 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <Lightbulb className="h-4 w-4 text-white" />
            </div>
            <CardTitle className="text-base font-semibold text-white">Smart Tips</CardTitle>
            <Badge variant="outline" className="text-xs text-blue-300 border-blue-400/30">
              {tipIndex + 1}/{tips.length}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-6 w-6 p-0 text-slate-400 hover:text-white"
          >
            {isExpanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className={cn("pt-0", isExpanded ? "block" : "hidden sm:block")}>
        <p className="text-sm text-slate-300 leading-relaxed mb-3">{currentTip}</p>
        
        {tips.length > 1 && (
          <Button
            variant="outline"
            size="sm"
            onClick={nextTip}
            className="w-full bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white text-xs"
          >
            Next Tip
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
