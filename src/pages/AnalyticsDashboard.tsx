
import { useTranslation } from 'react-i18next';
import { VendorDashboardHeader } from '@/components/vendor/VendorDashboardHeader';
import { SalesSummaryCard } from '@/components/analytics/SalesSummaryCard';
import { TimeAnalyticsChart } from '@/components/analytics/TimeAnalyticsChart';
import { AIBusinessTips } from '@/components/analytics/AIBusinessTips';
import { ProductTrendCard } from '@/components/analytics/ProductTrendCard';
import {
  salesSummary,
  timeAnalyticsData,
  aiBusinessTips,
  productTrends,
} from '@/data/analytics';
import { Separator } from '@/components/ui/separator';

const AnalyticsDashboard = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-slate-900 text-gray-200">
      <VendorDashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <div className="mb-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold font-display gradient-text mb-2">{t('analytics_dashboard.title')}</h2>
          <p className="text-slate-400">{t('analytics_dashboard.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          {salesSummary.map((item, index) => (
            <SalesSummaryCard 
              key={index}
              title={t(`analytics_dashboard.sales_summary.${item.title}`)}
              value={item.value}
              icon={item.icon}
              change={item.change}
              changeType={item.changeType}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
            <div className="lg:col-span-3 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <TimeAnalyticsChart data={timeAnalyticsData} />
            </div>
            <div className="lg:col-span-2 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                <AIBusinessTips tips={aiBusinessTips} />
            </div>
        </div>
        
        <div className="mb-8">
            <h3 className="text-2xl font-bold font-display text-white mb-4 animate-fade-in-up" style={{animationDelay: '0.8s'}}>{t('analytics_dashboard.product_trends')}</h3>
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory animate-fade-in-up" style={{animationDelay: '1s'}}>
                {productTrends.map(product => (
                    <ProductTrendCard key={product.id} product={product} />
                ))}
            </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;
