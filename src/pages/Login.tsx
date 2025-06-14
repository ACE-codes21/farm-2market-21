
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, User, Briefcase } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState<'buyer' | 'vendor'>('buyer');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam === 'vendor') {
      setRole('vendor');
    } else {
      setRole('buyer');
    }
  }, [location.search]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const isBuyer = role === 'buyer' && email === 'buyer@demo.com' && password === 'buyer123';
    const isVendor = role === 'vendor' && email === 'vendor@demo.com' && password === 'vendor123';

    if (isBuyer || isVendor) {
      localStorage.setItem('userRole', role);
      navigate('/dashboard');
    } else {
      setError('Invalid email or password for the selected role.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-display">
            {role === 'buyer' ? 'Buyer Login' : 'Vendor Login'}
          </CardTitle>
          <CardDescription>
            Welcome back! Please enter your credentials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-6">
            <div className="flex rounded-md bg-muted p-1">
              <Button variant={role === 'buyer' ? 'default' : 'ghost'} onClick={() => setRole('buyer')} className="rounded-md">
                <User className="mr-2 h-4 w-4"/> Buyer
              </Button>
              <Button variant={role === 'vendor' ? 'default' : 'ghost'} onClick={() => setRole('vendor')} className="rounded-md">
                <Briefcase className="mr-2 h-4 w-4"/> Vendor
              </Button>
            </div>
          </div>
          <p className="text-sm text-center text-muted-foreground mb-4">
            Use demo credentials: <br/>
            Email: <span className="font-mono">{role}@demo.com</span> | Password: <span className="font-mono">{role}123</span>
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full font-semibold">
              Log In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
