
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData.email, formData.password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 animate-fade-in" style={{animationDelay: '0.3s'}}>
      <div className="space-y-2">
        <Label htmlFor="login-email" className="text-sm font-medium text-white/90 font-sans">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-lime-400 z-10" />
          <Input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="pl-10 h-10 sm:h-11 bg-black/30 backdrop-blur-sm border-white/30 text-white placeholder:text-white/50 focus:border-lime-400 focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:ring-offset-transparent focus:bg-black/40 transition-all duration-300 text-sm font-sans hover:border-white/40 rounded-xl"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="login-password" className="text-sm font-medium text-white/90 font-sans">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-lime-400 z-10" />
          <Input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="pl-10 pr-10 h-10 sm:h-11 bg-black/30 backdrop-blur-sm border-white/30 text-white placeholder:text-white/50 focus:border-lime-400 focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:ring-offset-transparent focus:bg-black/40 transition-all duration-300 text-sm font-sans hover:border-white/40 rounded-xl"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lime-400 hover:text-lime-300 transition-all duration-300 hover:scale-110 z-10"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-lime-500 to-lime-400 hover:from-lime-400 hover:to-lime-300 text-black font-bold font-sans shadow-lg shadow-lime-500/25 hover:shadow-xl hover:shadow-lime-500/40 hover:ring-2 hover:ring-lime-500 hover:ring-offset-2 hover:ring-offset-transparent hover:scale-105 transition-all duration-300 h-10 sm:h-12 text-sm sm:text-base rounded-xl border-2 border-lime-400 hover:border-lime-300" 
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
};

export default LoginForm;
