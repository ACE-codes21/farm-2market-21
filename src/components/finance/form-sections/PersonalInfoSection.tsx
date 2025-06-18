
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Info, CheckCircle, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface PersonalInfoSectionProps {
  formData: {
    vendor_name: string;
    aadhar_number: string;
    pan_number?: string;
    phone: string;
    email?: string;
  };
  errors: Record<string, string>;
  onInputChange: (field: string, value: string) => void;
}

const validateAadhar = (value: string): boolean => {
  return /^\d{12}$/.test(value.replace(/\s/g, ''));
};

const validatePAN = (value: string): boolean => {
  return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
};

const validatePhone = (value: string): boolean => {
  return /^\d{10}$/.test(value.replace(/\s/g, ''));
};

const validateEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const InputWithValidation: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder: string;
  maxLength?: number;
  tooltip?: string;
  validator?: (value: string) => boolean;
  required?: boolean;
  type?: string;
}> = ({ 
  id, 
  label, 
  value, 
  onChange, 
  error, 
  placeholder, 
  maxLength, 
  tooltip, 
  validator,
  required = false,
  type = "text"
}) => {
  const isValid = validator ? validator(value) : true;
  const showValidation = value.length > 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={id} className="text-slate-300 text-sm font-medium">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </Label>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-3 w-3 text-slate-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
        {showValidation && validator && (
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs px-2 py-0.5",
              isValid 
                ? "text-green-400 border-green-400/30 bg-green-400/10" 
                : "text-red-400 border-red-400/30 bg-red-400/10"
            )}
          >
            {isValid ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Valid
              </>
            ) : (
              <>
                <AlertCircle className="h-3 w-3 mr-1" />
                Invalid
              </>
            )}
          </Badge>
        )}
      </div>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "bg-slate-700/50 border-slate-600 text-white focus:border-green-500 transition-colors",
          error && "border-red-500 focus:border-red-500",
          showValidation && validator && (
            isValid ? "border-green-500/50" : "border-red-500/50"
          )
        )}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      {error && <p className="text-red-400 text-sm flex items-center gap-1">
        <AlertCircle className="h-3 w-3" />
        {error}
      </p>}
    </div>
  );
};

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  errors,
  onInputChange
}) => {
  return (
    <div className="space-y-4">
      <InputWithValidation
        id="vendorName"
        label="Business/Vendor Name"
        value={formData.vendor_name}
        onChange={(value) => onInputChange('vendor_name', value)}
        error={errors.vendor_name}
        placeholder="Enter your business name"
        tooltip="Enter your registered business name or trading name"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWithValidation
          id="aadharNumber"
          label="Aadhar Number"
          value={formData.aadhar_number}
          onChange={(value) => onInputChange('aadhar_number', value)}
          error={errors.aadhar_number}
          placeholder="12-digit Aadhar"
          maxLength={12}
          tooltip="12-digit Aadhar number without spaces"
          validator={validateAadhar}
          required
        />

        <InputWithValidation
          id="panNumber"
          label="PAN Number"
          value={formData.pan_number || ''}
          onChange={(value) => onInputChange('pan_number', value.toUpperCase())}
          error={errors.pan_number}
          placeholder="ABCDE1234F"
          maxLength={10}
          tooltip="Format: ABCDE1234F (Optional but recommended)"
          validator={validatePAN}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWithValidation
          id="phone"
          label="Phone Number"
          value={formData.phone}
          onChange={(value) => onInputChange('phone', value)}
          error={errors.phone}
          placeholder="10-digit phone"
          maxLength={10}
          validator={validatePhone}
          required
        />

        <InputWithValidation
          id="email"
          label="Email Address"
          type="email"
          value={formData.email || ''}
          onChange={(value) => onInputChange('email', value)}
          error={errors.email}
          placeholder="your.email@example.com"
          tooltip="Optional but recommended for status updates"
          validator={validateEmail}
        />
      </div>
    </div>
  );
};
