
interface FormData {
  vendor_name: string;
  aadhar_number: string;
  pan_number: string;
  email: string;
  phone: string;
  loan_scheme_type: string;
  loan_amount: number;
  purpose: string;
}

interface FormErrors {
  [key: string]: string;
}

export const useFormValidation = () => {
  const validateForm = (formData: FormData): { isValid: boolean; errors: FormErrors } => {
    const newErrors: FormErrors = {};

    // Required field validations
    if (!formData.vendor_name.trim()) newErrors.vendor_name = 'Vendor name is required';
    
    if (!formData.aadhar_number.trim()) {
      newErrors.aadhar_number = 'Aadhar number is required';
    } else if (!/^\d{12}$/.test(formData.aadhar_number.replace(/\s/g, ''))) {
      newErrors.aadhar_number = 'Aadhar number must be 12 digits';
    }
    
    if (formData.pan_number && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan_number)) {
      newErrors.pan_number = 'PAN format should be ABCDE1234F';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    if (!formData.loan_scheme_type) newErrors.loan_scheme_type = 'Please select a loan scheme';
    if (!formData.loan_amount || formData.loan_amount <= 0) newErrors.loan_amount = 'Please enter a valid loan amount';
    if (!formData.purpose.trim()) newErrors.purpose = 'Purpose is required';

    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors
    };
  };

  return { validateForm };
};
