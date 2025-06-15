
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UploadCloud, X } from 'lucide-react';

interface ImageUploaderProps {
  onFileSelect: (file: File | null) => void;
  className?: string;
  reset?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileSelect, className = '', reset }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      onFileSelect(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    } else {
      onFileSelect(null);
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setPreview(null);
    }
  };

  const removeImage = () => {
    onFileSelect(null);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (reset) {
      removeImage();
    }
  }, [reset]);

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-slate-300">Product Image</Label>
      <div className="w-full h-48 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center text-slate-400 relative overflow-hidden bg-slate-900/50">
        {preview ? (
          <>
            <img src={preview} alt="Product preview" className="h-full w-full object-cover" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 bg-black/50 hover:bg-black/75 border-none"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="text-center cursor-pointer p-4 w-full h-full flex flex-col items-center justify-center" onClick={() => fileInputRef.current?.click()}>
            <UploadCloud className="mx-auto h-12 w-12 text-slate-500" />
            <p className="text-sm mt-2">Click to upload an image</p>
            <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
          </div>
        )}
        <Input 
          id="product-image" 
          type="file" 
          ref={fileInputRef} 
          className="hidden"
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/jpg, image/webp"
        />
      </div>
    </div>
  );
};
