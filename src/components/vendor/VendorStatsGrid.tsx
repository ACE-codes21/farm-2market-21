
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Package, ShoppingCart, TrendingUp, TrendingDown } from 'lucide-react';
import { VendorStats } from '@/types';
import { cn } from '@/lib/utils';

interface VendorStatsGridProps {
  stats: VendorStats;
}

const statsIcons = {
  totalSales: DollarSign,
  totalProducts: Package,
  totalOrders: ShoppingCart,
  totalRevenue: TrendingUp,
};

export const VendorStatsGrid: React.FC<VendorStatsGridProps> = ({ stats }) => {
  const isNegativeRevenue = stats.totalRevenue < 0;

  const statsDisplay = [
    { title: 'Total Sales', value: `₹${stats.totalSales.toLocaleString()}`, icon: statsIcons.totalSales, change: '+12%', isPositive: true, key: 'totalSales' },
    { title: 'Products', value: stats.totalProducts.toString(), icon: statsIcons.totalProducts, change: '+3', isPositive: true, key: 'totalProducts' },
    { title: 'Orders', value: stats.totalOrders.toString(), icon: statsIcons.totalOrders, change: '+8%', isPositive: true, key: 'totalOrders' },
    { title: 'Revenue', value: `${isNegativeRevenue ? '-' : ''}₹${Math.abs(stats.totalRevenue).toLocaleString()}`, icon: statsIcons.totalRevenue, change: isNegativeRevenue ? '-15%' : '+15%', isPositive: !isNegativeRevenue, key: 'totalRevenue' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsDisplay.map((stat) => {
        const Icon = (stat.key === 'totalRevenue' && !stat.isPositive) ? TrendingDown : stat.icon;
        
        return (
          <Card key={stat.key} className="dark-glass-effect border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                  <p className="text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className={cn(
                    "text-sm font-medium",
                    stat.isPositive ? "text-green-400" : "text-amber-400"
                  )}>
                    {stat.change}
                  </p>
                </div>
                <div className={cn(
                  "p-3 rounded-full",
                  stat.isPositive ? "bg-green-500/10" : "bg-amber-500/10"
                )}>
                  <Icon className={cn(
                    "h-6 w-6",
                    stat.isPositive ? "text-green-500" : "text-amber-500"
                  )} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
