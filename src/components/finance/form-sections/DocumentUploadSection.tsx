
import React from 'react';
import { DocumentUploader } from '../DocumentUploader';

interface DocumentUploadSectionProps {
  onDocumentUpload: (docType: string, file: File | null, fileName: string) => void;
}

export const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({
  onDocumentUpload
}) => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-white border-b border-slate-600 pb-2">
        Document Upload
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DocumentUploader
          label="Aadhaar Card"
          accept=".pdf,.jpg,.jpeg,.png"
          onFileSelect={(file, fileName) => onDocumentUpload('aadhar', file, fileName)}
          required
        />
        
        <DocumentUploader
          label="PAN Card"
          accept=".pdf,.jpg,.jpeg,.png"
          onFileSelect={(file, fileName) => onDocumentUpload('pan', file, fileName)}
        />
        
        <DocumentUploader
          label="Business Plan / Purpose Document"
          accept=".pdf"
          onFileSelect={(file, fileName) => onDocumentUpload('business_plan', file, fileName)}
          required
        />
        
        <DocumentUploader
          label="Bank Statement (Last 6 months)"
          accept=".pdf"
          onFileSelect={(file, fileName) => onDocumentUpload('bank_statement', file, fileName)}
          required
        />
        
        <DocumentUploader
          label="Caste/Domicile Certificate"
          accept=".pdf,.jpg,.jpeg,.png"
          onFileSelect={(file, fileName) => onDocumentUpload('caste_certificate', file, fileName)}
          className="md:col-span-2"
        />
      </div>
    </div>
  );
};
