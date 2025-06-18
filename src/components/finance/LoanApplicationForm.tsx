
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PersonalInfoSection } from './form-sections/PersonalInfoSection';
import { LoanDetailsSection } from './form-sections/LoanDetailsSection';
import { FinancialInfoSection } from './form-sections/FinancialInfoSection';
import { DocumentUploadSection } from './form-sections/DocumentUploadSection';
import { LoanInsightsPanel } from './LoanInsightsPanel';
import { useCreateLoanApplication, type LoanApplicationInput } from '@/hooks/useLoanApplications';
import { useFormValidation } from './hooks/useFormValidation';
import { FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TooltipProvider } from '@/components/ui/tooltip';

interface LoanFormData extends LoanApplicationInput {
  documents: Record<string, File | null>;
}

export const LoanApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<LoanFormData>({
    vendor_name: '',
    aadhar_number: '',
    pan_number: '',
    email: '',
    phone: '',
    loan_scheme_type: '',
    loan_amount: 0,
    purpose: '',
    monthly_income: 0,
    monthly_expenses: 0,
    documents: {
      aadhar: null,
      pan: null,
      business_plan: null,
      bank_statement: null,
      caste_certificate: null
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedApplication, setSubmittedApplication] = useState<any>(null);
  const { mutate: createApplication, isPending } = useCreateLoanApplication();
  const { validateForm } = useFormValidation();
  const { toast } = useToast();

  const handleInputChange = (field: keyof LoanFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDocumentUpload = (docType: string, file: File | null, fileName: string) => {
    setFormData(prev => ({
      ...prev,
      documents: { ...prev.documents, [docType]: file }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { isValid, errors: validationErrors } = validateForm(formData);
    setErrors(validationErrors);
    
    if (!isValid) return;

    // Mock document paths (in real implementation, upload to Supabase storage)
    const documentPaths: Record<string, string> = {};
    Object.entries(formData.documents).forEach(([key, file]) => {
      if (file) {
        documentPaths[key] = `documents/${Date.now()}-${file.name}`;
      }
    });

    const applicationData: LoanApplicationInput = {
      vendor_name: formData.vendor_name,
      aadhar_number: formData.aadhar_number,
      pan_number: formData.pan_number || undefined,
      email: formData.email || undefined,
      phone: formData.phone,
      loan_scheme_type: formData.loan_scheme_type,
      loan_amount: formData.loan_amount,
      purpose: formData.purpose,
      monthly_income: formData.monthly_income || undefined,
      monthly_expenses: formData.monthly_expenses || undefined,
      document_paths: documentPaths
    };

    createApplication(applicationData, {
      onSuccess: (data) => {
        setSubmittedApplication(data);
        toast({
          title: "Application Submitted Successfully!",
          description: `Your application number is ${data.application_number}`,
        });
      },
      onError: (error) => {
        console.error('Error submitting application:', error);
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: "Please try again later or contact support.",
        });
      }
    });
  };

  const resetForm = () => {
    setSubmittedApplication(null);
    setFormData({
      vendor_name: '',
      aadhar_number: '',
      pan_number: '',
      email: '',
      phone: '',
      loan_scheme_type: '',
      loan_amount: 0,
      purpose: '',
      monthly_income: 0,
      monthly_expenses: 0,
      documents: {
        aadhar: null,
        pan: null,
        business_plan: null,
        bank_statement: null,
        caste_certificate: null
      }
    });
    setErrors({});
  };

  if (submittedApplication) {
    return (
      <div className="space-y-6">
        <LoanInsightsPanel
          eligibilityScore={submittedApplication.eligibility_score || 0}
          approvalLikelihood={submittedApplication.approval_likelihood || 0}
          monthlyIncome={submittedApplication.monthly_income}
          monthlyExpenses={submittedApplication.monthly_expenses}
          loanAmount={submittedApplication.loan_amount}
          loanScheme={submittedApplication.loan_scheme_type}
        />
        <Card className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 shadow-xl rounded-xl">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Application Submitted Successfully!</h3>
              <p className="text-slate-300">
                Application Number: <span className="font-mono text-green-400">{submittedApplication.application_number}</span>
              </p>
              <Button 
                onClick={resetForm}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                Submit Another Application
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <Card className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-400" />
            Enhanced Loan Application
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <PersonalInfoSection
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
            />
            
            <LoanDetailsSection
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
            />
            
            <FinancialInfoSection
              formData={formData}
              onInputChange={handleInputChange}
            />
            
            <DocumentUploadSection
              onDocumentUpload={handleDocumentUpload}
            />

            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
            >
              {isPending ? 'Submitting Application...' : 'Submit Loan Application'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
