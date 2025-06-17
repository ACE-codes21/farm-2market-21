
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <div className="mb-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold font-display gradient-text mb-2">Finance Dashboard</h2>
          <p className="text-slate-400">Manage your financial health and opportunities</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 flex flex-col gap-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <CreditScoreWidget 
                  score={creditScore} 
                  trustLevel={trustLevel}
                  activityData={vendorActivityData}
                />
                <QuickTips tips={quickTips} />
            </div>
            <div className="lg:col-span-2 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <RepaymentTracker data={repaymentData} />
            </div>
        </div>

        {/* Loan Application & Status Section */}
        <div className="mt-12">
            <h3 className="text-2xl font-bold font-display text-white mb-6 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              Loan Application & Status
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
                    <LoanApplicationForm />
                </div>
                <div className="animate-fade-in-up" style={{animationDelay: '1.0s'}}>
                    <LoanStatusCard />
                </div>
            </div>
        </div>

        <div className="mt-12">
            <h3 className="text-2xl font-bold font-display text-white mb-6 animate-fade-in-up" style={{animationDelay: '1.2s'}}>Available Loan Schemes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {loanSchemes.map((scheme, index) => (
                    <div key={scheme.id} className="animate-fade-in-up" style={{animationDelay: `${1.4 + index * 0.2}s`}}>
                      <LoanSchemeCard scheme={scheme} />
                    </div>
                ))}
            </div>
        </div>
      </main>
    </div>
  );
};

export default FinanceDashboard;
