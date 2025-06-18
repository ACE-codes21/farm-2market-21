
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PersonalInfoSection } from './form-sections/PersonalInfoSection';
import { LoanDetailsSection } from './form-sections/LoanDetailsSection';
import { FinancialInfoSection } from './form-sections/FinancialInfoSection';
import { DocumentUploadSection } from './form-sections/DocumentUploadSection';
import { FileText } from 'lucide-react';
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

export const LoanApplicationFormView: React.FC<LoanApplicationFormViewProps> = ({
  formData,
  errors,
  isPending,
  onInputChange,
  onDocumentUpload,
  onSubmit
}) => {
  return (
    <TooltipProvider>
      <Card className="bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-400" />
            Loan Application
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <form onSubmit={onSubmit} className="space-y-5">
            <PersonalInfoSection
              formData={formData}
              errors={errors}
              onInputChange={onInputChange}
            />
            
            <LoanDetailsSection
              formData={formData}
              errors={errors}
              onInputChange={onInputChange}
            />
            
            <FinancialInfoSection
              formData={formData}
              onInputChange={onInputChange}
            />
            
            <DocumentUploadSection
              onDocumentUpload={onDocumentUpload}
            />

            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium"
            >
              {isPending ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
