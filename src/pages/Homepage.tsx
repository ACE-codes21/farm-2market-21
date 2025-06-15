
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Store, Users, TrendingUp, Shield, Star, ArrowRight } from 'lucide-react';

const Homepage: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Hero Background with India street vendor vibe */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/90 via-green-50/90 to-yellow-50/90"></div>
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070')`
          }}
        ></div>
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200/30 rounded-full filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-200/30 rounded-full filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-200/30 rounded-full filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display mb-6 leading-tight">
              <span className="text-orange-800">Farm</span>
              <span className="text-green-700">2</span>
              <span className="text-orange-800">Market</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 font-semibold mb-4">
              Connecting Street Vendors to Local Buyers
            </p>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Empowering local street vendors with digital tools while connecting communities through fresh, authentic products
            </p>
            
            {/* Role Selection Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link to="/auth?role=vendor">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-2xl group"
                >
                  <Store className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  I am a Vendor
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link to="/auth?role=buyer">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-2xl group"
                >
                  <ShoppingBag className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  I am a Buyer
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-yellow-600 text-yellow-700 hover:bg-yellow-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-2xl group"
                >
                  <Users className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  Browse Market
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-orange-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">For Local Buyers</h3>
              <p className="text-gray-600 leading-relaxed">
                Discover fresh, authentic products from trusted street vendors in your community with guaranteed quality
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-green-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">For Street Vendors</h3>
              <p className="text-gray-600 leading-relaxed">
                Digitize your business with inventory management, order tracking, and expanded customer reach
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-yellow-100">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Secure & Trusted</h3>
              <p className="text-gray-600 leading-relaxed">
                Safe transactions, verified vendors, and quality assurance for a reliable marketplace experience
              </p>
            </div>
          </div>

          {/* Stats Section with earthy theme */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 mb-16 shadow-2xl border border-cream-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-700 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Active Vendors</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">10K+</div>
                <div className="text-gray-600 font-medium">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">50K+</div>
                <div className="text-gray-600 font-medium">Products Sold</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">4.9</div>
                <div className="text-gray-600 font-medium flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  Average Rating
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-gray-600 mb-4 text-lg">Ready to join our marketplace?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-green-600 to-orange-600 hover:from-green-700 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Get Started Today →
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="ghost" className="text-gray-700 hover:bg-white/50 font-semibold px-6 py-3 rounded-xl transition-all duration-300">
                  Try Demo Version
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
