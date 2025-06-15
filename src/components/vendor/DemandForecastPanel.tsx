
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';
import { predictiveInsight } from '@/data/analytics';

export const DemandForecastPanel: React.FC = () => {
  return (
    <Card className="dark-glass-effect border-slate-700 animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">Predictive Insight</CardTitle>
        <Bot className="h-4 w-4 text-slate-400" />
      </CardHeader>
      <CardContent>
        <div className="text-lg font-semibold text-white">
          {predictiveInsight.message}
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Powered by AI market analysis.
        </p>
      </CardContent>
    </Card>
  );
};
