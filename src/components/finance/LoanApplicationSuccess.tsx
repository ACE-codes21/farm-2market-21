
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoanInsightsPanel } from './LoanInsightsPanel';

interface LoanApplicationSuccessProps {
  submittedApplication: {
    application_number: string;
    eligibility_score?: number;
    approval_likelihood?: number;
    monthly_income?: number;
    monthly_expenses?: number;
    loan_amount: number;
    loan_scheme_type: string;
  };
  onReset: () => void;
}

export const LoanApplicationSuccess: React.FC<LoanApplicationSuccessProps> = ({
  submittedApplication,
  onReset
}) => {
  return (
    <div className="space-y-4">
      <LoanInsightsPanel
        eligibilityScore={submittedApplication.eligibility_score || 0}
        approvalLikelihood={submittedApplication.approval_likelihood || 0}
        monthlyIncome={submittedApplication.monthly_income}
        monthlyExpenses={submittedApplication.monthly_expenses}
        loanAmount={submittedApplication.loan_amount}
        loanScheme={submittedApplication.loan_scheme_type}
      />
      <Card className="bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 shadow-lg">
        <CardContent className="p-6 text-center space-y-3">
          <h3 className="text-lg font-semibold text-white">Application Submitted Successfully!</h3>
          <p className="text-slate-300 text-sm">
            Application Number: <span className="font-mono text-green-400">{submittedApplication.application_number}</span>
          </p>
          <Button 
            onClick={onReset}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
          >
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
