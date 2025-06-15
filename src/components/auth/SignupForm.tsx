
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
    <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in" style={{animationDelay: '0.3s'}}>
      <div className="space-y-2">
        <Label htmlFor="signup-name" className="text-sm font-medium text-white/90 font-sans">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400 z-10" />
          <Input
            id="signup-name"
            type="text"
            placeholder="Enter your full name"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="pl-10 h-11 bg-black/30 backdrop-blur-sm border-white/30 text-white placeholder:text-white/50 focus:border-green-400 focus:bg-black/40 transition-all duration-300 text-sm font-sans hover:border-white/40 rounded-xl"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signup-email" className="text-sm font-medium text-white/90 font-sans">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400 z-10" />
          <Input
            id="signup-email"
            type="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="pl-10 h-11 bg-black/30 backdrop-blur-sm border-white/30 text-white placeholder:text-white/50 focus:border-green-400 focus:bg-black/40 transition-all duration-300 text-sm font-sans hover:border-white/40 rounded-xl"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signup-password" className="text-sm font-medium text-white/90 font-sans">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400 z-10" />
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="pl-10 pr-10 h-11 bg-black/30 backdrop-blur-sm border-white/30 text-white placeholder:text-white/50 focus:border-green-400 focus:bg-black/40 transition-all duration-300 text-sm font-sans hover:border-white/40 rounded-xl"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300 transition-all duration-300 hover:scale-110 z-10"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-black font-bold font-sans shadow-[0_0_25px_rgba(34,197,94,0.5)] hover:shadow-[0_0_35px_rgba(34,197,94,0.7)] transform hover:scale-105 transition-all duration-300 h-12 text-base rounded-xl border-2 border-green-400 hover:border-green-300" 
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default SignupForm;
