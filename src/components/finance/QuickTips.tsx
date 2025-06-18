
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, ChevronRight, Target, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickTipsProps {
  tips: string[];
}

export const QuickTips: React.FC<QuickTipsProps> = ({ tips }) => {
  const [currentTip, setCurrentTip] = useState('');
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

  // Enhanced tips focused on trust building
  const trustBuildingTips = [
    "Complete orders on time to build buyer trust and improve your platform rating.",
    "Respond quickly to buyer messages - fast communication boosts your credibility score.",
    "Upload high-quality product photos to increase buyer confidence and trust.",
    "Maintain consistent product quality to reduce returns and improve trust rating.",
    "Engage with customer reviews professionally to show reliability.",
    "Keep your profile updated with accurate business information for better credibility."
  ];

  const displayTips = tips.length > 0 ? tips : trustBuildingTips;
  const displayTip = currentTip || displayTips[0];

  return (
    <Card className="bg-slate-800/80 backdrop-blur-lg border border-slate-700/50 shadow-xl h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <Target className="h-4 w-4 text-white" />
            </div>
            <CardTitle className="text-base font-semibold text-white">Trust Building Tips</CardTitle>
            <Badge variant="outline" className="text-xs text-blue-300 border-blue-400/30">
              {tipIndex + 1}/{displayTips.length}
            </Badge>
          </div>
          <TrendingUp className="h-4 w-4 text-emerald-400" />
        </div>
        <p className="text-xs text-slate-400">Actionable tips to boost your platform credibility</p>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
          <div className="flex items-start gap-3">
            <div className="p-1 rounded-full bg-blue-500/20 mt-0.5">
              <Lightbulb className="h-3 w-3 text-blue-400" />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed flex-1">{displayTip}</p>
          </div>
        </div>
        
        {displayTips.length > 1 && (
          <Button
            variant="outline"
            size="sm"
            onClick={nextTip}
            className="w-full bg-slate-700/30 border-slate-600 text-slate-300 hover:bg-blue-600/20 hover:border-blue-500/50 hover:text-white text-xs transition-all duration-200"
          >
            Next Tip
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        )}

        <div className="text-center pt-2 border-t border-slate-700/30">
          <p className="text-xs text-slate-500">Higher trust = More buyer confidence</p>
        </div>
      </CardContent>
    </Card>
  );
};
