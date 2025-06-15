
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
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
      <div className="space-y-2">
        <Label htmlFor="login-email" className="text-xs font-medium text-gray-300">Email</Label>
        <div className="relative">
          <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-green-400/60" />
          <Input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="pl-8 h-9 bg-black/30 border-green-400/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:bg-black/50 transition-all duration-300 text-sm"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="login-password" className="text-xs font-medium text-gray-300">Password</Label>
        <div className="relative">
          <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-green-400/60" />
          <Input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="pl-8 pr-8 h-9 bg-black/30 border-green-400/30 text-white placeholder:text-gray-400 focus:border-green-400 focus:bg-black/50 transition-all duration-300 text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-green-400/60 hover:text-green-400 transition-colors"
          >
            {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transform hover:scale-105 transition-all duration-300 h-9 text-sm rounded-xl border border-green-400" 
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
};

export default LoginForm;
