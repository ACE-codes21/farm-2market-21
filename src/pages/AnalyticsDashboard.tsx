
import { VendorDashboardHeader } from '@/components/vendor/VendorDashboardHeader';
import { SalesSummaryCard } from '@/components/analytics/SalesSummaryCard';
import { TimeAnalyticsChart } from '@/components/analytics/TimeAnalyticsChart';
import { AIBusinessTips } from '@/components/analytics/AIBusinessTips';
import { ProductTrendCard } from '@/components/analytics/ProductTrendCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useVendorAnalytics } from '@/hooks/useVendorAnalytics';
import { useTodaysEarnings } from '@/hooks/useTodaysEarnings';
import { useTopSellingProduct } from '@/hooks/useTopSellingProduct';
import { useActiveTimeAnalysis } from '@/hooks/useActiveTimeAnalysis';
import { useProductTrends } from '@/hooks/useProductTrends';
import { IndianRupee, Clock, Leaf, TrendingUp, Activity } from 'lucide-react';

const AnalyticsDashboard = () => {
  const { data: analyticsData, isLoading: analyticsLoading } = useVendorAnalytics();
  const { data: earningsData, isLoading: earningsLoading } = useTodaysEarnings();
  const { data: topProduct, isLoading: topProductLoading } = useTopSellingProduct();
  const { data: activeTime, isLoading: activeTimeLoading } = useActiveTimeAnalysis();
  const { data: productTrends, isLoading: trendsLoading } = useProductTrends();

  const isLoading = analyticsLoading || earningsLoading || topProductLoading || activeTimeLoading;

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200">
      <VendorDashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold font-display gradient-text mb-2">Analytics Dashboard</h2>
              <p className="text-slate-400">Track your business performance with real-time insights</p>
            </div>
            <Badge variant="outline" className="text-green-300 border-green-400/30">
              <Activity className="h-3 w-3 mr-1" />
              Live Data
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          {earningsLoading ? (
            <Skeleton className="h-32 bg-slate-800" />
          ) : (
            <SalesSummaryCard 
              title="Today's Earnings"
              value={`₹${earningsData?.todaysEarnings?.toLocaleString() || '0'}`}
              icon={IndianRupee}
              change={earningsData ? `${earningsData.percentageChange >= 0 ? '+' : ''}${earningsData.percentageChange.toFixed(1)}%` : undefined}
              changeType={earningsData?.changeType}
            />
          )}

          {topProductLoading ? (
            <Skeleton className="h-32 bg-slate-800" />
          ) : (
            <SalesSummaryCard 
              title="Top Selling Product"
              value={topProduct ? `${topProduct.icon} ${topProduct.name}` : 'No sales data'}
              icon={Leaf}
            />
          )}

          {activeTimeLoading ? (
            <Skeleton className="h-32 bg-slate-800" />
          ) : (
            <SalesSummaryCard 
              title="Most Active Time"
              value={activeTime?.timeWindow || 'Calculating...'}
              icon={Clock}
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-3 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            {analyticsLoading ? (
              <Skeleton className="h-[400px] bg-slate-800" />
            ) : (
              <TimeAnalyticsChart 
                data={analyticsData || { daily: [], weekly: [], monthly: [] }} 
                percentageChange={analyticsData?.percentageChange || 0}
              />
            )}
          </div>
          <div className="lg:col-span-2 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <AIBusinessTips />
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-2xl font-bold font-display text-white">Product Trends</h3>
            <Badge variant="outline" className="text-blue-300 border-blue-400/30">
              <TrendingUp className="h-3 w-3 mr-1" />
              Real-time Analysis
            </Badge>
          </div>
          {trendsLoading ? (
            <div className="flex gap-6 overflow-x-auto pb-4">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-64 w-64 flex-shrink-0 bg-slate-800" />
              ))}
            </div>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory animate-fade-in-up" style={{animationDelay: '1s'}}>
              {(productTrends || []).length > 0 ? (
                productTrends.map(product => (
                  <ProductTrendCard key={product.id} product={product} />
                ))
              ) : (
                <div className="flex items-center justify-center w-full h-64 bg-slate-800/40 rounded-lg border border-slate-700/50">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">No product trends available</p>
                    <p className="text-sm text-slate-500">Start selling to see product analytics</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;
