
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';

interface LoanInsightsPanelProps {
  eligibilityScore: number;
  approvalLikelihood: number;
  monthlyIncome?: number;
  monthlyExpenses?: number;
  loanAmount: number;
  loanScheme: string;
}

export const LoanInsightsPanel: React.FC<LoanInsightsPanelProps> = ({
  eligibilityScore,
  approvalLikelihood,
  monthlyIncome = 0,
  monthlyExpenses = 0,
  loanAmount,
  loanScheme
}) => {
  const disposableIncome = monthlyIncome - monthlyExpenses;
  const debtToIncomeRatio = monthlyIncome > 0 ? ((loanAmount / 12) / monthlyIncome) * 100 : 0;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4 text-green-400" />;
    if (score >= 60) return <AlertCircle className="h-4 w-4 text-yellow-400" />;
    return <AlertCircle className="h-4 w-4 text-red-400" />;
  };

  return (
    <Card className="bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-400" />
          Loan Application Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-sm">Eligibility Score</span>
              <div className="flex items-center gap-2">
                {getScoreIcon(eligibilityScore)}
                <span className={`font-bold text-sm ${getScoreColor(eligibilityScore)}`}>
                  {eligibilityScore}%
                </span>
              </div>
            </div>
            <Progress value={eligibilityScore} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-sm">Approval Likelihood</span>
              <div className="flex items-center gap-2">
                {getScoreIcon(approvalLikelihood)}
                <span className={`font-bold text-sm ${getScoreColor(approvalLikelihood)}`}>
                  {approvalLikelihood}%
                </span>
              </div>
            </div>
            <Progress value={approvalLikelihood} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-slate-700/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-green-400" />
              <span className="text-xs text-slate-400">Monthly Surplus</span>
            </div>
            <span className={`text-sm font-bold ${disposableIncome >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ₹{disposableIncome.toLocaleString()}
            </span>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-slate-400">Debt-to-Income</span>
            </div>
            <span className={`text-sm font-bold ${debtToIncomeRatio <= 30 ? 'text-green-400' : debtToIncomeRatio <= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
              {debtToIncomeRatio.toFixed(1)}%
            </span>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-slate-400">Loan Scheme</span>
            </div>
            <span className="text-xs font-medium text-white truncate">
              {loanScheme}
            </span>
          </div>
        </div>

        <div className="bg-slate-700/20 rounded-lg p-3">
          <h4 className="text-sm font-semibold text-white mb-2">Recommendations</h4>
          <ul className="space-y-1 text-xs text-slate-300">
            {eligibilityScore < 70 && (
              <li>• Consider improving your credit history before applying</li>
            )}
            {debtToIncomeRatio > 40 && (
              <li>• Your debt-to-income ratio is high; consider a smaller loan amount</li>
            )}
            {disposableIncome < 0 && (
              <li>• Review your expenses to improve your financial position</li>
            )}
            {eligibilityScore >= 80 && approvalLikelihood >= 80 && (
              <li>• Excellent application! You have a high chance of approval</li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
