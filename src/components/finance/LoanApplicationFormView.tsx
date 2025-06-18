
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PersonalInfoSection } from './form-sections/PersonalInfoSection';
import { LoanDetailsSection } from './form-sections/LoanDetailsSection';
import { FinancialInfoSection } from './form-sections/FinancialInfoSection';
import { DocumentUploadSection } from './form-sections/DocumentUploadSection';
import { FileText, User, DollarSign, Upload, AlertCircle } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';

interface LoanFormData {
  vendor_name: string;
  aadhar_number: string;
  pan_number?: string;
  email?: string;
  phone: string;
  loan_scheme_type: string;
  loan_amount: number;
  purpose: string;
  monthly_income?: number;
  monthly_expenses?: number;
  documents: Record<string, File | null>;
}

interface LoanApplicationFormViewProps {
  formData: LoanFormData;
  errors: Record<string, string>;
  isPending: boolean;
  onInputChange: (field: keyof LoanFormData, value: any) => void;
  onDocumentUpload: (docType: string, file: File | null, fileName: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const FormSection: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  isCompleted?: boolean;
  hasErrors?: boolean;
  children: React.ReactNode;
}> = ({ icon: Icon, title, isCompleted, hasErrors, children }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-3 pb-2 border-b border-slate-700/50">
      <div className={`p-2 rounded-lg ${
        hasErrors ? 'bg-red-500/20 text-red-400' : 
        isCompleted ? 'bg-green-500/20 text-green-400' : 
        'bg-slate-700/50 text-slate-400'
      }`}>
        <Icon className="h-4 w-4" />
      </div>
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      {hasErrors && (
        <Badge variant="destructive" className="text-xs bg-red-500/20 text-red-300 border-red-500/30">
          <AlertCircle className="h-3 w-3 mr-1" />
          Errors
        </Badge>
      )}
    </div>
    {children}
  </div>
);

export const LoanApplicationFormView: React.FC<LoanApplicationFormViewProps> = ({
  formData,
  errors,
  isPending,
  onInputChange,
  onDocumentUpload,
  onSubmit
}) => {
  const personalInfoErrors = Object.keys(errors).some(key => 
    ['vendor_name', 'aadhar_number', 'pan_number', 'phone', 'email'].includes(key)
  );
  
  const loanDetailsErrors = Object.keys(errors).some(key => 
    ['loan_scheme_type', 'loan_amount', 'purpose'].includes(key)
  );

  const personalInfoCompleted = !!(formData.vendor_name && formData.aadhar_number && formData.phone);
  const loanDetailsCompleted = !!(formData.loan_scheme_type && formData.loan_amount && formData.purpose);
  const documentsUploaded = Object.values(formData.documents).some(file => file !== null);

  return (
    <TooltipProvider>
      <div className="bg-slate-900">
        <form onSubmit={onSubmit} className="space-y-6">
          <FormSection
            icon={User}
            title="Personal Information"
            isCompleted={personalInfoCompleted}
            hasErrors={personalInfoErrors}
          >
            <PersonalInfoSection
              formData={formData}
              errors={errors}
              onInputChange={onInputChange}
            />
          </FormSection>
          
          <FormSection
            icon={DollarSign}
            title="Loan Details"
            isCompleted={loanDetailsCompleted}
            hasErrors={loanDetailsErrors}
          >
            <LoanDetailsSection
              formData={formData}
              errors={errors}
              onInputChange={onInputChange}
            />
          </FormSection>
          
          <FormSection
            icon={DollarSign}
            title="Financial Information"
            isCompleted={!!(formData.monthly_income && formData.monthly_expenses)}
          >
            <FinancialInfoSection
              formData={formData}
              onInputChange={onInputChange}
            />
          </FormSection>
          
          <FormSection
            icon={Upload}
            title="Document Upload"
            isCompleted={documentsUploaded}
          >
            <DocumentUploadSection
              onDocumentUpload={onDocumentUpload}
            />
          </FormSection>

          <div className="pt-4 border-t border-slate-700/50">
            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 text-base font-semibold"
            >
              {isPending ? 'Submitting Application...' : 'Submit Loan Application'}
            </Button>
          </div>
        </form>
      </div>
    </TooltipProvider>
  );
};
