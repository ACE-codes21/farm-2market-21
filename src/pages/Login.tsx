
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Store, ShoppingBag } from 'lucide-react';

// Dummy accounts
const DUMMY_ACCOUNTS = {
  vendor: {
    email: 'vendor@demo.com',
    password: 'vendor123',
    role: 'vendor' as const
  },
  buyer: {
    email: 'buyer@demo.com',
    password: 'buyer123',
    role: 'buyer' as const
  }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check against dummy accounts
    const account = Object.values(DUMMY_ACCOUNTS).find(
      acc => acc.email === email && acc.password === password
    );

    if (account) {
      // Store user session
      localStorage.setItem('userSession', JSON.stringify({
        email: account.email,
        role: account.role,
        isAuthenticated: true
      }));
      
      // Navigate to dashboard
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Try the demo accounts below.');
    }

    setIsLoading(false);
  };

  const handleDemoLogin = (accountType: 'vendor' | 'buyer') => {
    const account = DUMMY_ACCOUNTS[accountType];
    setEmail(account.email);
    setPassword(account.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home button */}
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Accounts Section */}
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-medium text-gray-700 mb-3 text-center">
                Try Demo Accounts
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('vendor')}
                  className="flex flex-col gap-1 h-auto py-3"
                >
                  <Store className="h-4 w-4" />
                  <span className="text-xs">Vendor Demo</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('buyer')}
                  className="flex flex-col gap-1 h-auto py-3"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span className="text-xs">Buyer Demo</span>
                </Button>
              </div>
              <div className="mt-3 text-xs text-gray-500 text-center">
                <p>Vendor: vendor@demo.com / vendor123</p>
                <p>Buyer: buyer@demo.com / buyer123</p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="text-center text-sm text-gray-500">
            Don't have an account? Contact support for access.
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
