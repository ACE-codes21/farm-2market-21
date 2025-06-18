
import React from 'react';
import { DocumentUploader } from '../DocumentUploader';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Upload } from 'lucide-react';

interface DocumentUploadSectionProps {
  onDocumentUpload: (docType: string, file: File | null, fileName: string) => void;
}

const documentTypes = [
  {
    key: 'aadhar',
    label: 'Aadhar Card',
    accept: '.pdf,.jpg,.jpeg,.png',
    required: true,
    description: 'Upload clear copy of your Aadhar card'
  },
  {
    key: 'pan',
    label: 'PAN Card',
    accept: '.pdf,.jpg,.jpeg,.png',
    required: false,
    description: 'PAN card for identity verification'
  },
  {
    key: 'business_plan',
    label: 'Business Plan / Purpose Document',
    accept: '.pdf',
    required: true,
    description: 'Detailed business plan or loan purpose document'
  },
  {
    key: 'bank_statement',
    label: 'Bank Statement (Last 6 months)',
    accept: '.pdf',
    required: true,
    description: 'Recent bank statements for financial verification'
  },
  {
    key: 'caste_certificate',
    label: 'Caste/Domicile Certificate',
    accept: '.pdf,.jpg,.jpeg,.png',
    required: false,
    description: 'For additional benefits and schemes'
  }
];

export const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({
  onDocumentUpload
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-slate-700/50">
          <Upload className="h-4 w-4 text-slate-400" />
        </div>
        <div>
          <p className="text-sm text-slate-300">
            Upload the required documents to complete your application
          </p>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs text-red-300 border-red-400/30">
              Required: 3 docs
            </Badge>
            <Badge variant="outline" className="text-xs text-blue-300 border-blue-400/30">
              Optional: 2 docs
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {documentTypes.map((docType) => (
          <div key={docType.key} className="space-y-2">
            <DocumentUploader
              label={docType.label}
              accept={docType.accept}
              onFileSelect={(file, fileName) => onDocumentUpload(docType.key, file, fileName)}
              required={docType.required}
            />
            <p className="text-xs text-slate-500 pl-1">{docType.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-700/20 rounded-lg p-3 mt-4">
        <div className="flex items-start gap-2">
          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-slate-300">
            <p className="font-medium mb-1">Document Guidelines:</p>
            <ul className="space-y-1 text-slate-400">
              <li>• Ensure documents are clear and readable</li>
              <li>• Maximum file size: 5MB per document</li>
              <li>• Accepted formats: PDF, JPG, PNG</li>
              <li>• All personal information should be clearly visible</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
