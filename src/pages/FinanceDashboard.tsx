
import { useState } from 'react';
import { VendorDashboardHeader } from '@/components/vendor/VendorDashboardHeader';
import { CreditScoreWidget } from '@/components/finance/CreditScoreWidget';
import { LoanSchemeCard } from '@/components/finance/LoanSchemeCard';
import { RepaymentTracker } from '@/components/finance/RepaymentTracker';
import { QuickTips } from '@/components/finance/QuickTips';
import { LoanApplicationCTA } from '@/components/finance/LoanApplicationCTA';
import { LoanApplicationModal } from '@/components/finance/LoanApplicationModal';
import { LoanStatusCard } from '@/components/finance/LoanStatusCard';
import { HelpFAQSection } from '@/components/finance/HelpFAQSection';
import { LoanInsightsPanel } from '@/components/finance/LoanInsightsPanel';
import { useLoanApplications } from '@/hooks/useLoanApplications';
import { 
  creditScore, 
  loanSchemes, 
  repaymentData, 
  quickTips, 
  vendorActivityData, 
  trustLevel 
} from '@/data/finance';

const FinanceDashboard = () => {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const { data: applications = [] } = useLoanApplications();
  
  // Check if user has submitted any applications to show insights
  const hasSubmittedApplications = applications.length > 0;
  const latestApplication = applications[0]; // Most recent application

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200">
      <VendorDashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold font-display gradient-text mb-2">Finance Dashboard</h2>
          <p className="text-slate-400">Manage your financial health and loan opportunities</p>
        </div>

        {/* Top Row: Credit Score + Quick Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <CreditScoreWidget 
              score={creditScore} 
              trustLevel={trustLevel}
              activityData={vendorActivityData}
            />
          </div>
          <div className="lg:col-span-1">
            <QuickTips tips={quickTips} />
          </div>
        </div>

        {/* Loan Application CTA */}
        <div className="mb-6">
          <LoanApplicationCTA onOpenApplication={() => setIsApplicationModalOpen(true)} />
        </div>

        {/* Loan Insights Panel - Only show if user has submitted applications */}
        {hasSubmittedApplications && latestApplication && (
          <div className="mb-6">
            <LoanInsightsPanel
              eligibilityScore={latestApplication.eligibility_score || 0}
              approvalLikelihood={latestApplication.approval_likelihood || 0}
              monthlyIncome={latestApplication.monthly_income}
              monthlyExpenses={latestApplication.monthly_expenses}
              loanAmount={latestApplication.loan_amount}
              loanScheme={latestApplication.loan_scheme_type}
            />
          </div>
        )}

        {/* Middle Row: Loan Management */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px bg-gradient-to-r from-green-600 to-emerald-600 flex-1"></div>
            <h3 className="text-xl font-bold text-white px-4">Loan Management</h3>
            <div className="h-px bg-gradient-to-l from-green-600 to-emerald-600 flex-1"></div>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <LoanStatusCard />
            <RepaymentTracker data={repaymentData} />
          </div>
        </div>

        {/* Bottom Row: Available Schemes */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px bg-gradient-to-r from-blue-600 to-purple-600 flex-1"></div>
            <h3 className="text-xl font-bold text-white px-4">Available Loan Schemes</h3>
            <div className="h-px bg-gradient-to-l from-blue-600 to-purple-600 flex-1"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {loanSchemes.map((scheme) => (
              <LoanSchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        </div>

        {/* Help Section */}
        <HelpFAQSection />

        {/* Loan Application Modal */}
        <LoanApplicationModal
          isOpen={isApplicationModalOpen}
          onClose={() => setIsApplicationModalOpen(false)}
        />
      </main>
    </div>
  );
};

export default FinanceDashboard;
