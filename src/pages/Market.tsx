
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag, Store, Leaf } from 'lucide-react';

const Market: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-black to-green-800/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500/10 via-green-400/15 to-green-500/10 border border-green-400/30 rounded-full text-green-400 text-sm font-medium backdrop-blur-sm shadow-[0_0_30px_rgba(34,197,94,0.2)] mb-6">
            <Leaf className="h-4 w-4" />
            Explore Our Market
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="text-green-400">Farm</span>2Market
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Discover fresh, local produce and connect with vendors in your community.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-black/30 backdrop-blur-md border border-green-400/20 rounded-2xl p-8 hover:bg-black/40 transition-all duration-300">
              <ShoppingBag className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Browse Products</h3>
              <p className="text-gray-300 mb-6">
                Explore a wide variety of fresh, local produce from trusted vendors in your area.
              </p>
              <Button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold"
              >
                Start Shopping
              </Button>
            </div>

            <div className="bg-black/30 backdrop-blur-md border border-orange-400/20 rounded-2xl p-8 hover:bg-black/40 transition-all duration-300">
              <Store className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Vendor Dashboard</h3>
              <p className="text-gray-300 mb-6">
                Manage your products, view orders, and connect with customers through your vendor dashboard.
              </p>
              <Button
                onClick={() => navigate('/dashboard')}
                variant="outline"
                className="w-full border-orange-400 text-orange-400 hover:bg-orange-400/10"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
