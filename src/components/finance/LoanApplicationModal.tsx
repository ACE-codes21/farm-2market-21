
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LoanApplicationFormView } from './LoanApplicationFormView';
import { LoanApplicationSuccess } from './LoanApplicationSuccess';
import { useLoanApplicationForm } from './hooks/useLoanApplicationForm';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LoanApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoanApplicationModal: React.FC<LoanApplicationModalProps> = ({
  isOpen,
  onClose
}) => {
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

  const handleSuccess = () => {
    onClose();
    resetForm();
  };

  const handleReset = () => {
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {submittedApplication ? 'Application Submitted' : 'Loan Application'}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="pr-4">
            {submittedApplication ? (
              <LoanApplicationSuccess
                submittedApplication={submittedApplication}
                onReset={handleReset}
              />
            ) : (
              <LoanApplicationFormView
                formData={formData}
                errors={errors}
                isPending={isPending}
                onInputChange={handleInputChange}
                onDocumentUpload={handleDocumentUpload}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
