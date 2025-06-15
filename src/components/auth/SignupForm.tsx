
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
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
      <div className="space-y-2">
        <Label htmlFor="signup-name" className="text-xs font-medium text-white/80 font-sans">Full Name</Label>
        <div className="relative">
          <User className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-green-400/60 transition-colors duration-300" />
          <Input
            id="signup-name"
            type="text"
            placeholder="Enter your full name"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="pl-8 h-9 bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder:text-white/40 focus:border-green-400 focus:bg-black/30 transition-all duration-300 text-sm font-sans hover:border-white/30"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signup-email" className="text-xs font-medium text-white/80 font-sans">Email</Label>
        <div className="relative">
          <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-green-400/60 transition-colors duration-300" />
          <Input
            id="signup-email"
            type="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="pl-8 h-9 bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder:text-white/40 focus:border-green-400 focus:bg-black/30 transition-all duration-300 text-sm font-sans hover:border-white/30"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signup-password" className="text-xs font-medium text-white/80 font-sans">Password</Label>
        <div className="relative">
          <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-green-400/60 transition-colors duration-300" />
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="pl-8 pr-8 h-9 bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder:text-white/40 focus:border-green-400 focus:bg-black/30 transition-all duration-300 text-sm font-sans hover:border-white/30"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-green-400/60 hover:text-green-400 transition-all duration-300 hover:scale-110"
          >
            {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold font-sans shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transform hover:scale-105 transition-all duration-300 h-9 text-sm rounded-xl border border-green-400 hover:border-green-300" 
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default SignupForm;
