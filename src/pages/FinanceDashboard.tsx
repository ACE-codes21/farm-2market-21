
import { VendorDashboardHeader } from '@/components/vendor/VendorDashboardHeader';
import { CreditScoreWidget } from '@/components/finance/CreditScoreWidget';
import { LoanSchemeCard } from '@/components/finance/LoanSchemeCard';
import { RepaymentTracker } from '@/components/finance/RepaymentTracker';
import { QuickTips } from '@/components/finance/QuickTips';
import { LoanApplicationForm } from '@/components/finance/LoanApplicationForm';
import { LoanStatusCard } from '@/components/finance/LoanStatusCard';
import { 
  creditScore, 
  loanSchemes, 
  repaymentData, 
  quickTips, 
  vendorActivityData, 
  trustLevel 
} from '@/data/finance';

const FinanceDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-200">
      <VendorDashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold font-display gradient-text mb-2">Finance Dashboard</h2>
          <p className="text-slate-400">Manage your financial health and opportunities</p>
        </div>

        {/* Top Section: Credit Score & Quick Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <CreditScoreWidget 
              score={creditScore} 
              trustLevel={trustLevel}
              activityData={vendorActivityData}
            />
          </div>
          <div className="lg:col-span-1">
            <QuickTips tips={quickTips} />
          </div>
          <div className="lg:col-span-1">
            <RepaymentTracker data={repaymentData} />
          </div>
        </div>

        {/* Loan Management Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold font-display text-white mb-6">
            Loan Application & Management
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LoanApplicationForm />
            <LoanStatusCard />
          </div>
        </div>

        {/* Available Schemes Section */}
        <div>
          <h3 className="text-2xl font-bold font-display text-white mb-6">
            Available Loan Schemes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {loanSchemes.map((scheme) => (
              <LoanSchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinanceDashboard;
