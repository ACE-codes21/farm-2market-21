
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Store, Star, Users, TrendingUp, Shield } from 'lucide-react';

const Homepage: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50"></div>
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-300/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-6xl md:text-8xl font-bold font-display mb-6 leading-tight">
              Welcome to <span className="gradient-text">Street Market</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Connecting local street vendors with customers through a modern, seamless marketplace experience
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link to="/login?role=buyer">
                <Button size="lg" className="premium-button px-8 py-4 text-lg">
                  <ShoppingBag className="mr-3 h-6 w-6" />
                  Start Shopping
                </Button>
              </Link>
              <Link to="/login?role=vendor">
                <Button size="lg" variant="outline" className="modern-card border-2 px-8 py-4 text-lg font-semibold hover:bg-primary/10">
                  <Store className="mr-3 h-6 w-6" />
                  Become a Vendor
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="modern-card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">For Customers</h3>
              <p className="text-muted-foreground leading-relaxed">
                Discover fresh, authentic products from trusted local vendors in your community
              </p>
            </div>
            
            <div className="modern-card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">For Vendors</h3>
              <p className="text-muted-foreground leading-relaxed">
                Grow your business with digital tools, inventory management, and expanded reach
              </p>
            </div>
            
            <div className="modern-card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Secure & Reliable</h3>
              <p className="text-muted-foreground leading-relaxed">
                Safe transactions, verified vendors, and quality assurance for peace of mind
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="glass-effect rounded-3xl p-8 mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Active Vendors</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">10K+</div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-500 mb-2">50K+</div>
                <div className="text-muted-foreground">Products Sold</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-500 mb-2">4.9</div>
                <div className="text-muted-foreground flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  Average Rating
                </div>
              </div>
            </div>
          </div>

          {/* Demo Link */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Want to try it out first?</p>
            <Link to="/demo">
              <Button variant="ghost" className="text-primary hover:bg-primary/10 font-semibold">
                Try Demo Version →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
