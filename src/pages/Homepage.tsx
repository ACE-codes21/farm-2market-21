
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Store } from 'lucide-react';

const Homepage: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background shapes */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold font-display text-foreground mb-4">
            Welcome to <span className="text-primary">E-Commerce Platform</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Your one-stop solution for buying and selling. Discover amazing products or grow your business with us.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login?role=buyer">
              <Button size="lg" className="w-full sm:w-auto font-semibold">
                <ShoppingBag className="mr-2" />
                Start Shopping
              </Button>
            </Link>
            <Link to="/login?role=vendor">
              <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold">
                <Store className="mr-2" />
                Become a Vendor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
