
import React from 'react';
import { LoanApplicationFormView } from './LoanApplicationFormView';
import { LoanApplicationSuccess } from './LoanApplicationSuccess';
import { useLoanApplicationForm } from './hooks/useLoanApplicationForm';

export const LoanApplicationForm: React.FC = () => {
  const {
    formData,
    errors,
    submittedApplication,
    isPending,
    handleInputChange,
    handleDocumentUpload,
    handleSubmit,
    resetForm
  } = useLoanApplicationForm();

  if (submittedApplication) {
    return (
      <LoanApplicationSuccess
        submittedApplication={submittedApplication}
        onReset={resetForm}
      />
    );
  }

  return (
    <LoanApplicationFormView
      formData={formData}
      errors={errors}
      isPending={isPending}
      onInputChange={handleInputChange}
      onDocumentUpload={handleDocumentUpload}
      onSubmit={handleSubmit}
    />
  );
};
