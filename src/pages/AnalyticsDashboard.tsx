
import { VendorDashboardHeader } from '@/components/vendor/VendorDashboardHeader';
import { SalesSummaryCard } from '@/components/analytics/SalesSummaryCard';
import { TimeAnalyticsChart } from '@/components/analytics/TimeAnalyticsChart';
import { AIBusinessTips } from '@/components/analytics/AIBusinessTips';
import { ProductTrendCard } from '@/components/analytics/ProductTrendCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useVendorAnalytics } from '@/hooks/useVendorAnalytics';
import { useTodaysEarnings } from '@/hooks/useTodaysEarnings';
import { useTopSellingProduct } from '@/hooks/useTopSellingProduct';
import { useActiveTimeAnalysis } from '@/hooks/useActiveTimeAnalysis';
import { useProductTrends } from '@/hooks/useProductTrends';
import { IndianRupee, Clock, Leaf } from 'lucide-react';
import { aiBusinessTips } from '@/data/analytics';

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
          <h2 className="text-3xl font-bold font-display gradient-text mb-2">Analytics Dashboard</h2>
          <p className="text-slate-400">Track your business performance and growth</p>
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
              value={topProduct ? `${topProduct.icon} ${topProduct.name}` : 'No data'}
              icon={Leaf}
            />
          )}

          {activeTimeLoading ? (
            <Skeleton className="h-32 bg-slate-800" />
          ) : (
            <SalesSummaryCard 
              title="Most Active Time"
              value={activeTime?.timeWindow || 'No data'}
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
            <AIBusinessTips tips={aiBusinessTips} />
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-2xl font-bold font-display text-white mb-4 animate-fade-in-up" style={{animationDelay: '0.8s'}}>Product Trends</h3>
          {trendsLoading ? (
            <div className="flex gap-6 overflow-x-auto pb-4">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-64 w-64 flex-shrink-0 bg-slate-800" />
              ))}
            </div>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory animate-fade-in-up" style={{animationDelay: '1s'}}>
              {(productTrends || []).map(product => (
                <ProductTrendCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;
