
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

interface AuthFormLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const AuthFormLayout: React.FC<AuthFormLayoutProps> = ({ title, description, children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Dark gradient background matching landing page */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      
      {/* Animated floating elements - matching landing page */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating farm/market icons */}
        <div className="absolute top-20 left-10 text-green-400/10 text-2xl animate-bounce" style={{animationDelay: '0s'}}>🥕</div>
        <div className="absolute top-32 right-20 text-orange-400/10 text-3xl animate-bounce" style={{animationDelay: '1s'}}>🍅</div>
        <div className="absolute top-64 left-1/4 text-yellow-400/10 text-2xl animate-bounce" style={{animationDelay: '2s'}}>🌽</div>
        <div className="absolute bottom-40 right-10 text-red-400/10 text-2xl animate-bounce" style={{animationDelay: '0.5s'}}>🍎</div>
        <div className="absolute bottom-20 left-20 text-purple-400/10 text-3xl animate-bounce" style={{animationDelay: '1.5s'}}>🍆</div>
        <div className="absolute top-40 right-1/3 text-green-400/10 text-2xl animate-bounce" style={{animationDelay: '2.5s'}}>🥬</div>
        
        {/* Grid dots pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>
      
      {/* Subtle glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>

      {/* Top-left branding matching landing page */}
      <div className="absolute top-6 left-6 z-20">
        <Link to="/" className="group flex items-center gap-3 hover:scale-105 transition-transform duration-300">
          <ArrowLeft className="h-5 w-5 text-green-400/60 group-hover:text-green-400 transition-colors" />
          <h1 className="text-2xl font-bold text-white">
            <span className="text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">Farm</span>
            <span className="text-white">2Market</span>
          </h1>
        </Link>
      </div>

      {/* Main content - centered and animated */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-green-400/20 shadow-[0_0_50px_rgba(34,197,94,0.15)] animate-fade-in">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-600 to-green-400 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
              <span className="text-2xl font-bold text-black">F2M</span>
            </div>
            <CardTitle className="text-3xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              {title}
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              {description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pb-8">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthFormLayout;
