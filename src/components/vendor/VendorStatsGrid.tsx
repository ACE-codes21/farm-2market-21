
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
  const statsDisplay = [
    { title: 'Total Sales', value: `₹${stats.totalSales.toLocaleString()}`, icon: statsIcons.totalSales, change: '+12%', key: 'totalSales' },
    { title: 'Products', value: stats.totalProducts.toString(), icon: statsIcons.totalProducts, change: '+3', key: 'totalProducts' },
    { title: 'Orders', value: stats.totalOrders.toString(), icon: statsIcons.totalOrders, change: '+8%', key: 'totalOrders' },
    { title: 'Revenue', value: `${stats.totalRevenue < 0 ? '-' : ''}₹${Math.abs(stats.totalRevenue).toLocaleString()}`, icon: statsIcons.totalRevenue, change: '+15%', key: 'totalRevenue' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsDisplay.map((stat) => {
        const isNegativeRevenue = stat.key === 'totalRevenue' && stats.totalRevenue < 0;
        const Icon = isNegativeRevenue ? TrendingDown : stat.icon;

        return (
          <Card key={stat.key} className="dark-glass-effect border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                  <p className="text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-400 font-medium">{stat.change}</p>
                </div>
                <div className={cn(
                  "p-3 rounded-full",
                  isNegativeRevenue ? "bg-rose-500/10" : "bg-primary/10"
                )}>
                  <Icon className={cn(
                    "h-6 w-6",
                    isNegativeRevenue ? "text-rose-400" : "text-primary"
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
