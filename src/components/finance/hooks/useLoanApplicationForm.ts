
import { useState } from 'react';
import { useCreateLoanApplication, type LoanApplicationInput } from '@/hooks/useLoanApplications';
import { useFormValidation } from './useFormValidation';
import { useToast } from '@/hooks/use-toast';

interface LoanFormData extends LoanApplicationInput {
  documents: Record<string, File | null>;
}

const initialFormData: LoanFormData = {
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
};

export const useLoanApplicationForm = () => {
  const [formData, setFormData] = useState<LoanFormData>(initialFormData);
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
    
    const validationData = {
      vendor_name: formData.vendor_name,
      aadhar_number: formData.aadhar_number,
      pan_number: formData.pan_number,
      email: formData.email,
      phone: formData.phone,
      loan_scheme_type: formData.loan_scheme_type,
      loan_amount: formData.loan_amount,
      purpose: formData.purpose,
      monthly_income: formData.monthly_income,
      monthly_expenses: formData.monthly_expenses,
    };

    const { isValid, errors: validationErrors } = validateForm(validationData);
    setErrors(validationErrors);
    
    if (!isValid) return;

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
          description: `Your application number is ${data.application_number}. You can track its status below.`,
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
    setFormData(initialFormData);
    setErrors({});
  };

  return {
    formData,
    errors,
    submittedApplication,
    isPending,
    handleInputChange,
    handleDocumentUpload,
    handleSubmit,
    resetForm
  };
};
