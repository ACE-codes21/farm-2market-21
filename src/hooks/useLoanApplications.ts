
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface LoanApplicationInput {
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
  document_paths?: Record<string, string>;
}

export interface LoanApplication extends LoanApplicationInput {
  id: string;
  application_number: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  eligibility_score?: number;
  approval_likelihood?: number;
  created_at: string;
  updated_at: string;
}

// Mock data store for development
let mockApplications: LoanApplication[] = [];
let mockIdCounter = 1;

export const useCreateLoanApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (applicationData: LoanApplicationInput): Promise<LoanApplication> => {
      // Generate application number
      const applicationNumber = `LA${Date.now().toString().slice(-8)}`;
      
      // Calculate mock eligibility score and approval likelihood
      const eligibilityScore = Math.floor(Math.random() * 40) + 60; // 60-100
      const approvalLikelihood = Math.floor(Math.random() * 30) + 50; // 50-80

      // Create mock application
      const newApplication: LoanApplication = {
        ...applicationData,
        id: `mock_${mockIdCounter++}`,
        application_number: applicationNumber,
        status: 'pending',
        eligibility_score: eligibilityScore,
        approval_likelihood: approvalLikelihood,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add to mock store
      mockApplications.push(newApplication);
      
      return newApplication;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loan-applications'] });
    },
  });
};

export const useLoanApplications = () => {
  return useQuery({
    queryKey: ['loan-applications'],
    queryFn: async (): Promise<LoanApplication[]> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return [...mockApplications].reverse(); // Return newest first
    },
  });
};

export const useLoanApplicationById = (id: string) => {
  return useQuery({
    queryKey: ['loan-application', id],
    queryFn: async (): Promise<LoanApplication> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const application = mockApplications.find(app => app.id === id);
      if (!application) {
        throw new Error('Application not found');
      }
      
      return application;
    },
    enabled: !!id,
  });
};
