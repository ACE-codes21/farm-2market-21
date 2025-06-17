
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

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
  return (
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
        <Button size="sm" className="flex-1">
            <Sparkles className="mr-2 h-4 w-4"/>
            Promote
        </Button>
        <Button size="sm" variant="outline" className="flex-1">Pause</Button>
      </CardFooter>
    </Card>
  );
};
