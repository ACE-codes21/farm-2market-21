
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Package, ShoppingCart, TrendingUp, TrendingDown } from 'lucide-react';
import { VendorStats, StatChanges } from '@/types';
import { cn } from '@/lib/utils';

interface VendorStatsGridProps {
  stats: VendorStats;
  changes: StatChanges;
}

const statsIcons = {
  totalSales: DollarSign,
  totalProducts: Package,
  totalOrders: ShoppingCart,
  totalRevenue: TrendingUp,
};

export const VendorStatsGrid: React.FC<VendorStatsGridProps> = ({ stats, changes }) => {
  const { t } = useTranslation();
  const isNegativeRevenue = stats.totalRevenue < 0;

  const formatChange = (value: number, isPercentage: boolean = true) => {
    const sign = value > 0 ? '+' : '';
    const formattedValue = Math.round(value);
    return `${sign}${formattedValue}${isPercentage ? '%' : ''}`;
  };

  const statsDisplay = [
    { title: t('vendor_stats_grid.total_sales'), value: `₹${stats.totalSales.toLocaleString()}`, icon: statsIcons.totalSales, change: formatChange(changes.sales), isPositive: changes.sales >= 0, key: 'totalSales' },
    { title: t('vendor_stats_grid.total_products'), value: stats.totalProducts.toString(), icon: statsIcons.totalProducts, change: formatChange(changes.products, false), isPositive: true, key: 'totalProducts' },
    { title: t('vendor_stats_grid.orders'), value: stats.totalOrders.toString(), icon: statsIcons.totalOrders, change: formatChange(changes.orders), isPositive: changes.orders >= 0, key: 'totalOrders' },
    { title: t('vendor_stats_grid.revenue'), value: `${isNegativeRevenue ? '-' : ''}₹${Math.abs(stats.totalRevenue).toLocaleString()}`, icon: statsIcons.totalRevenue, change: formatChange(changes.revenue), isPositive: changes.revenue >= 0, key: 'totalRevenue' },
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
                    {stat.key === 'totalProducts' ? t('vendor_stats_grid.last_7_days', { change: stat.change }) : stat.change}
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
