
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  errors,
  onInputChange
}) => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-white border-b border-slate-600 pb-2">
        Personal Information
      </h4>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="vendorName" className="text-slate-300">Business/Vendor Name</Label>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-3 w-3 text-slate-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Enter your registered business name or trading name</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Input
          id="vendorName"
          value={formData.vendor_name}
          onChange={(e) => onInputChange('vendor_name', e.target.value)}
          className="bg-slate-700/50 border-slate-600 text-white focus:border-green-500"
          placeholder="Enter your business name"
        />
        {errors.vendor_name && <p className="text-red-400 text-sm">{errors.vendor_name}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="aadharNumber" className="text-slate-300">Aadhar Number</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3 w-3 text-slate-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>12-digit Aadhar number without spaces</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="aadharNumber"
            value={formData.aadhar_number}
            onChange={(e) => onInputChange('aadhar_number', e.target.value)}
            className="bg-slate-700/50 border-slate-600 text-white focus:border-green-500"
            placeholder="12-digit Aadhar"
            maxLength={12}
          />
          {errors.aadhar_number && <p className="text-red-400 text-sm">{errors.aadhar_number}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="panNumber" className="text-slate-300">PAN Number</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3 w-3 text-slate-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Format: ABCDE1234F (Optional but recommended)</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="panNumber"
            value={formData.pan_number || ''}
            onChange={(e) => onInputChange('pan_number', e.target.value.toUpperCase())}
            className="bg-slate-700/50 border-slate-600 text-white focus:border-green-500"
            placeholder="ABCDE1234F"
            maxLength={10}
          />
          {errors.pan_number && <p className="text-red-400 text-sm">{errors.pan_number}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            className="bg-slate-700/50 border-slate-600 text-white focus:border-green-500"
            placeholder="10-digit phone"
            maxLength={10}
          />
          {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="email" className="text-slate-300">Email Address</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3 w-3 text-slate-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Optional but recommended for status updates</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="email"
            type="email"
            value={formData.email || ''}
            onChange={(e) => onInputChange('email', e.target.value)}
            className="bg-slate-700/50 border-slate-600 text-white focus:border-green-500"
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
        </div>
      </div>
    </div>
  );
};
