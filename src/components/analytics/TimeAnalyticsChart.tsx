
import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimeAnalyticsChartProps {
  data: {
    daily: any[];
    weekly: any[];
    monthly: any[];
  };
  percentageChange?: number;
}

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: '#34d399',
  },
  items: {
    label: 'Items Sold',
    color: '#fb923c',
  },
} satisfies ChartConfig;

export const TimeAnalyticsChart: React.FC<TimeAnalyticsChartProps> = ({ data, percentageChange = 0 }) => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const chartData = data[timeframe];
  
  const formatCurrency = (value: number) => `₹${value.toLocaleString()}`;

  return (
    <Card className="dark-modern-card border-green-500/20 shadow-green-500/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col">
          <CardTitle className="text-lg font-medium text-white">Sales Analytics</CardTitle>
          {percentageChange !== 0 && (
            <div className="flex items-center gap-1 mt-1">
              {percentageChange > 0 ? (
                <ArrowUp className="h-3 w-3 text-green-500" />
              ) : (
                <ArrowDown className="h-3 w-3 text-red-500" />
              )}
              <span className={cn(
                "text-xs font-medium",
                percentageChange > 0 ? 'text-green-500' : 'text-red-500'
              )}>
                {percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(1)}% vs previous period
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant={timeframe === 'daily' ? 'default' : 'ghost'} size="sm" onClick={() => setTimeframe('daily')} className="text-white">Daily</Button>
          <Button variant={timeframe === 'weekly' ? 'default' : 'ghost'} size="sm" onClick={() => setTimeframe('weekly')} className="text-white">Weekly</Button>
          <Button variant={timeframe === 'monthly' ? 'default' : 'ghost'} size="sm" onClick={() => setTimeframe('monthly')} className="text-white">Monthly</Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer>
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorItems" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-items)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-items)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.4)" fontSize={12} />
              <YAxis yAxisId="left" stroke="rgba(255, 255, 255, 0.4)" fontSize={12} tickFormatter={formatCurrency} />
              <YAxis yAxisId="right" orientation="right" stroke="rgba(255, 255, 255, 0.4)" fontSize={12} />
              <Tooltip
                content={<ChartTooltipContent formatter={(value, name) => (name === 'revenue' ? formatCurrency(value as number) : value.toString())} />}
                cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
                contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', borderColor: 'rgba(51, 65, 85, 1)' }}
              />
              <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="var(--color-revenue)" fill="url(#colorRevenue)" />
              <Area yAxisId="right" type="monotone" dataKey="items" stroke="var(--color-items)" fill="url(#colorItems)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
