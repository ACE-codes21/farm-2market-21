
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const loanSchemes = [
  'PM SVANidhi',
  'MUDRA Loan - Shishu',
  'MUDRA Loan - Kishore', 
  'MUDRA Loan - Tarun',
  'PMEGP (Prime Minister Employment Generation Programme)',
  'Stand-Up India',
  'Startup India Seed Fund',
  'Credit Guarantee Scheme'
];

interface LoanDetailsSectionProps {
  formData: {
    loan_scheme_type: string;
    loan_amount: number;
    purpose: string;
  };
  errors: Record<string, string>;
  onInputChange: (field: string, value: any) => void;
}

export const LoanDetailsSection: React.FC<LoanDetailsSectionProps> = ({
  formData,
  errors,
  onInputChange
}) => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-white border-b border-slate-600 pb-2">
        Loan Details
      </h4>
      
      <div className="space-y-2">
        <Label htmlFor="loanScheme" className="text-slate-300">Loan Scheme Type</Label>
        <Select value={formData.loan_scheme_type} onValueChange={(value) => onInputChange('loan_scheme_type', value)}>
          <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-green-500">
            <SelectValue placeholder="Select a loan scheme" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700 text-white">
            {loanSchemes.map((scheme) => (
              <SelectItem key={scheme} value={scheme} className="hover:bg-slate-700">
                {scheme}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.loan_scheme_type && <p className="text-red-400 text-sm">{errors.loan_scheme_type}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="loanAmount" className="text-slate-300">Desired Loan Amount (₹)</Label>
        <Input
          id="loanAmount"
          type="number"
          value={formData.loan_amount || ''}
          onChange={(e) => onInputChange('loan_amount', Number(e.target.value))}
          className="bg-slate-700/50 border-slate-600 text-white focus:border-green-500"
          placeholder="Enter amount in rupees"
          min="1"
          max="1000000"
        />
        {errors.loan_amount && <p className="text-red-400 text-sm">{errors.loan_amount}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="purpose" className="text-slate-300">Loan Purpose</Label>
        <Textarea
          id="purpose"
          value={formData.purpose}
          onChange={(e) => onInputChange('purpose', e.target.value)}
          className="bg-slate-700/50 border-slate-600 text-white focus:border-green-500"
          placeholder="Describe the purpose of the loan in detail"
          rows={3}
        />
        {errors.purpose && <p className="text-red-400 text-sm">{errors.purpose}</p>}
      </div>
    </div>
  );
};
