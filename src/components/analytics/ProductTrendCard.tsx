
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';
import { Sparkles, Pause, Clock } from 'lucide-react';

interface ProductTrendCardProps {
  product: {
    id: string;
    name: string;
    trend: 'Trending' | 'Steady' | 'Low Demand';
    icon: string;
    salesData: { day: string; sales: number }[];
    image: string;
  };
}

const trendColors = {
  Trending: 'border-green-400/50 text-green-400 bg-green-500/10',
  Steady: 'border-yellow-400/50 text-yellow-400 bg-yellow-500/10',
  'Low Demand': 'border-red-400/50 text-red-400 bg-red-500/10',
};

const chartColors = {
  Trending: { stroke: '#34d399', fill: '#10b981' },
  Steady: { stroke: '#fcd34d', fill: '#f59e0b' },
  'Low Demand': { stroke: '#f87171', fill: '#ef4444' },
}

export const ProductTrendCard: React.FC<ProductTrendCardProps> = ({ product }) => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handlePromoteClick = () => {
    setShowComingSoon(true);
  };

  const handlePauseClick = () => {
    setShowComingSoon(true);
  };

  return (
    <>
      <Card className="dark-modern-card flex-shrink-0 w-64 snap-start border-slate-700/50 bg-slate-800/40 card-hover-glow">
        <CardHeader className="p-4">
          <div className="flex items-center gap-4">
              <img src={product.image} alt={product.name} className="w-10 h-10 rounded-md object-cover"/>
              <CardTitle className="text-md font-medium text-white flex-1">{product.name}</CardTitle>
          </div>
          <div className={cn("text-xs font-semibold inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full border", trendColors[product.trend])}>
              {product.icon} {product.trend}
          </div>
        </CardHeader>
        <CardContent className="p-0 h-20">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={product.salesData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`color-${product.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColors[product.trend].fill} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={chartColors[product.trend].fill} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(5, 5, 5, 0.8)',
                  borderColor: '#334155',
                  color: '#cbd5e1',
                  fontSize: '12px',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ fontWeight: 'bold' }}
                formatter={(value: number) => [`${value} units`, 'Sales']}
              />
              <Area type="monotone" dataKey="sales" stroke={chartColors[product.trend].stroke} fill={`url(#color-${product.id})`} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
        <CardFooter className="p-4 flex gap-2">
          <Button size="sm" className="flex-1" onClick={handlePromoteClick}>
              <Sparkles className="mr-2 h-4 w-4"/>
              Promote
          </Button>
          <Button size="sm" variant="outline" className="flex-1" onClick={handlePauseClick}>
            <Pause className="mr-2 h-4 w-4"/>
            Pause
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent className="dark-modern-card border-slate-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <Clock className="h-5 w-5 text-blue-400" />
              Coming Soon
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              Product promotion and pause features are currently under development. 
              These features will allow you to:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span>Boost product visibility with targeted promotions</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Pause className="h-4 w-4 text-orange-400" />
              <span>Temporarily pause products when out of stock</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Clock className="h-4 w-4 text-blue-400" />
              <span>Schedule automatic promotions based on trends</span>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={() => setShowComingSoon(false)}>
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
