
import React, { useState } from 'react';
import { Upload, X, FileText, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface DocumentUploaderProps {
  label: string;
  accept: string;
  onFileSelect: (file: File | null, fileName: string) => void;
  required?: boolean;
  className?: string;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  label,
  accept,
  onFileSelect,
  required = false,
  className = ''
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    onFileSelect(file, file ? file.name : '');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files?.[0] || null;
    if (file && accept.split(',').some(type => file.type.includes(type.replace('.', '').replace('*', '')))) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const removeFile = () => {
    handleFileSelect(null);
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return <Image className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-slate-300 flex items-center gap-1">
        {label}
        {required && <span className="text-red-400">*</span>}
      </Label>
      
      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
            isDragOver
              ? 'border-green-400 bg-green-400/10'
              : 'border-slate-600 hover:border-slate-500 bg-slate-700/30'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById(`file-${label}`)?.click()}
        >
          <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-400 mb-1">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-slate-500">
            Accepted: {accept}
          </p>
          <input
            id={`file-${label}`}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {getFileIcon(selectedFile.name)}
            <span className="text-sm text-white truncate">
              {selectedFile.name}
            </span>
            <span className="text-xs text-slate-400">
              ({(selectedFile.size / 1024).toFixed(1)} KB)
            </span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
