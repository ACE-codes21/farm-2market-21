
```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Store, Users, TrendingUp, Shield, Globe } from 'lucide-react';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-foreground">Street Vendor MarketPlace</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/login">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-6 animate-fade-in">
            Empowering Local Street Vendors
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in">
            Connect communities through fresh, affordable products and digital commerce solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/login">
              <Button size="lg" className="px-8 py-4 text-lg">
                Start Selling
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-muted-foreground">Designed specifically for street vendors and local communities</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow animate-fade-in">
              <Store className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold text-card-foreground mb-4">For Vendors</h3>
              <p className="text-muted-foreground mb-4">Digitize your business with our easy-to-use vendor dashboard</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Manage inventory and pricing</li>
                <li>• Track sales and revenue</li>
                <li>• View customer orders</li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow animate-fade-in">
              <ShoppingBag className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold text-card-foreground mb-4">For Buyers</h3>
              <p className="text-muted-foreground mb-4">Discover amazing local products from trusted vendors</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Browse fresh produce and snacks</li>
                <li>• Create wishlists and cart</li>
                <li>• Easy checkout process</li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow animate-fade-in">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold text-card-foreground mb-4">Community Focused</h3>
              <p className="text-muted-foreground mb-4">Building stronger local communities through commerce</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Support local businesses</li>
                <li>• Real-time inventory updates</li>
                <li>• Authentic local products</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Active Vendors</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Products Sold</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Join thousands of vendors and buyers who trust our platform
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg font-semibold">
              Join Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Street Vendor MarketPlace</h3>
          <p className="text-gray-400 mb-6">Empowering local communities through digital commerce</p>
          <div className="flex justify-center space-x-6 text-gray-400">
            <Globe className="h-6 w-6" />
            <Shield className="h-6 w-6" />
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
```
