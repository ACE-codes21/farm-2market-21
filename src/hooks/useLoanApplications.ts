
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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

export const useCreateLoanApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (applicationData: LoanApplicationInput): Promise<LoanApplication> => {
      // Generate application number
      const applicationNumber = `LA${Date.now().toString().slice(-8)}`;
      
      // Calculate mock eligibility score and approval likelihood
      const eligibilityScore = Math.floor(Math.random() * 40) + 60; // 60-100
      const approvalLikelihood = Math.floor(Math.random() * 30) + 50; // 50-80

      const { data, error } = await supabase
        .from('loan_applications')
        .insert({
          ...applicationData,
          application_number: applicationNumber,
          status: 'pending',
          eligibility_score: eligibilityScore,
          approval_likelihood: approvalLikelihood,
        })
        .select()
        .single();

      if (error) throw error;
      return data as LoanApplication;
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
      const { data, error } = await supabase
        .from('loan_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as LoanApplication[];
    },
  });
};

export const useLoanApplicationById = (id: string) => {
  return useQuery({
    queryKey: ['loan-application', id],
    queryFn: async (): Promise<LoanApplication> => {
      const { data, error } = await supabase
        .from('loan_applications')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as LoanApplication;
    },
    enabled: !!id,
  });
};
