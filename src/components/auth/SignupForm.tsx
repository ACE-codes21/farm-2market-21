
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

interface SignupFormProps {
  onSubmit: (email: string, password: string, fullName: string) => Promise<void>;
  isLoading: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData.email, formData.password, formData.fullName);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in" style={{animationDelay: '0.3s'}}>
      <div className="space-y-3">
        <Label htmlFor="signup-name" className="text-sm font-medium text-gray-300">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400/60" />
          <Input
            id="signup-name"
            type="text"
            placeholder="Enter your full name"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="pl-10 bg-black/30 border-green-400/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:bg-black/50 transition-all duration-300 h-12"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="signup-email" className="text-sm font-medium text-gray-300">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400/60" />
          <Input
            id="signup-email"
            type="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="pl-10 bg-black/30 border-green-400/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:bg-black/50 transition-all duration-300 h-12"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="signup-password" className="text-sm font-medium text-gray-300">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400/60" />
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="pl-10 pr-10 bg-black/30 border-green-400/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:bg-black/50 transition-all duration-300 h-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400/60 hover:text-green-400 transition-colors"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-green-500 hover:bg-green-400 text-black font-bold shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:shadow-[0_0_40px_rgba(34,197,94,0.8)] transform hover:scale-105 transition-all duration-300 py-6 text-lg rounded-2xl border-2 border-green-400" 
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default SignupForm;
