
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, CheckCircle } from 'lucide-react';

interface LoanApplicationData {
  vendorName: string;
  aadharNumber: string;
  phone: string;
  purpose: string;
  loanAmount: string;
}

export const LoanApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<LoanApplicationData>({
    vendorName: '',
    aadharNumber: '',
    phone: '',
    purpose: '',
    loanAmount: ''
  });
  const [errors, setErrors] = useState<Partial<LoanApplicationData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<LoanApplicationData> = {};

    if (!formData.vendorName.trim()) {
      newErrors.vendorName = 'Vendor name is required';
    }

    if (!formData.aadharNumber.trim()) {
      newErrors.aadharNumber = 'Aadhar number is required';
    } else if (!/^\d{12}$/.test(formData.aadharNumber.replace(/\s/g, ''))) {
      newErrors.aadharNumber = 'Aadhar number must be 12 digits';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose is required';
    }

    if (!formData.loanAmount.trim()) {
      newErrors.loanAmount = 'Loan amount is required';
    } else if (isNaN(Number(formData.loanAmount)) || Number(formData.loanAmount) <= 0) {
      newErrors.loanAmount = 'Please enter a valid loan amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (field: keyof LoanApplicationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <Card className="dark-modern-card border-green-500/20 shadow-green-500/10">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Application Submitted Successfully!</h3>
          <p className="text-slate-300 mb-4">
            After loan application has been submitted successfully, view your personalized loan insights and recommendations instantly!
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)}
            className="premium-button"
          >
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dark-modern-card card-hover-elevate">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-green-400" />
          <CardTitle className="text-xl font-bold font-display gradient-text">
            Loan Application Form
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vendorName" className="text-slate-300">Vendor Name</Label>
            <Input
              id="vendorName"
              value={formData.vendorName}
              onChange={(e) => handleInputChange('vendorName', e.target.value)}
              className="dark-elegant-input"
              placeholder="Enter your business name"
            />
            {errors.vendorName && (
              <p className="text-red-400 text-sm">{errors.vendorName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="aadharNumber" className="text-slate-300">Aadhar Number</Label>
            <Input
              id="aadharNumber"
              value={formData.aadharNumber}
              onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
              className="dark-elegant-input"
              placeholder="Enter 12-digit Aadhar number"
              maxLength={12}
            />
            {errors.aadharNumber && (
              <p className="text-red-400 text-sm">{errors.aadharNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="dark-elegant-input"
              placeholder="Enter 10-digit phone number"
              maxLength={10}
            />
            {errors.phone && (
              <p className="text-red-400 text-sm">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose" className="text-slate-300">Loan Purpose</Label>
            <Textarea
              id="purpose"
              value={formData.purpose}
              onChange={(e) => handleInputChange('purpose', e.target.value)}
              className="dark-elegant-input"
              placeholder="Describe the purpose of the loan"
              rows={3}
            />
            {errors.purpose && (
              <p className="text-red-400 text-sm">{errors.purpose}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanAmount" className="text-slate-300">Desired Loan Amount (₹)</Label>
            <Input
              id="loanAmount"
              type="number"
              value={formData.loanAmount}
              onChange={(e) => handleInputChange('loanAmount', e.target.value)}
              className="dark-elegant-input"
              placeholder="Enter amount in rupees"
              min="1"
              max="50000"
            />
            {errors.loanAmount && (
              <p className="text-red-400 text-sm">{errors.loanAmount}</p>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="premium-button w-full"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
