
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const demandLevels = ['High', 'Moderate', 'Low'];

export const DemandForecastPanel: React.FC = () => {
  // Mock logic to get a random demand level
  const [demand, setDemand] = React.useState('Moderate');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDemand(demandLevels[Math.floor(Math.random() * demandLevels.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getDemandColor = () => {
    if (demand === 'High') return 'text-green-400';
    if (demand === 'Moderate') return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <Card className="dark-glass-effect border-slate-700 animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">Demand Forecast</CardTitle>
        <TrendingUp className="h-4 w-4 text-slate-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">
          <span className={getDemandColor()}>{demand}</span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Expected demand based on market trends.
        </p>
      </CardContent>
    </Card>
  );
};
