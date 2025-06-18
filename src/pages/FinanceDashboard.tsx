
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <VendorDashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold font-display text-white mb-1">Finance Dashboard</h2>
          <p className="text-slate-400 text-sm">Manage your financial health and opportunities</p>
        </div>

        {/* Top Section: Credit Score & Quick Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <CreditScoreWidget 
            score={creditScore} 
            trustLevel={trustLevel}
            activityData={vendorActivityData}
          />
          <QuickTips tips={quickTips} />
          <RepaymentTracker data={repaymentData} />
        </div>

        {/* Loan Management Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Loan Application & Management
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <LoanApplicationForm />
            <LoanStatusCard />
          </div>
        </div>

        {/* Available Schemes Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Available Loan Schemes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
