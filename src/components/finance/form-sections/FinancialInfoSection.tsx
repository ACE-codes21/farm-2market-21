
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface FinancialInfoSectionProps {
  formData: {
    monthly_income?: number;
    monthly_expenses?: number;
  };
  onInputChange: (field: string, value: number) => void;
}

export const FinancialInfoSection: React.FC<FinancialInfoSectionProps> = ({
  formData,
  onInputChange
}) => {
  const hasFinancialWarning = formData.monthly_income && formData.monthly_expenses && 
    formData.monthly_expenses > formData.monthly_income;

  return (
    <div className="space-y-4">
      <h4 className="text-base font-medium text-white border-b border-slate-600/50 pb-2">
        Financial Information
      </h4>
      
      {hasFinancialWarning && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
          <p className="text-yellow-300 text-xs">
            Your monthly expenses exceed your income. This may affect loan approval. Consider reviewing your financial plan.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="monthlyIncome" className="text-slate-300 text-sm">Monthly Income (₹)</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3 w-3 text-slate-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Your average monthly business income</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="monthlyIncome"
            type="number"
            value={formData.monthly_income || ''}
            onChange={(e) => onInputChange('monthly_income', Number(e.target.value))}
            className="bg-slate-700/50 border-slate-600 text-white focus:border-green-500"
            placeholder="Monthly income"
            min="0"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="monthlyExpenses" className="text-slate-300 text-sm">Monthly Expenses (₹)</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3 w-3 text-slate-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Your average monthly business and personal expenses</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="monthlyExpenses"
            type="number"
            value={formData.monthly_expenses || ''}
            onChange={(e) => onInputChange('monthly_expenses', Number(e.target.value))}
            className="bg-slate-700/50 border-slate-600 text-white focus:border-green-500"
            placeholder="Monthly expenses"
            min="0"
          />
        </div>
      </div>
    </div>
  );
};
