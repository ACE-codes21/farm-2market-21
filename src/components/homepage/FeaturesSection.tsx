
import React from 'react';
import { ShoppingBag, Users, MapPin, Star, Clock, Shield } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: ShoppingBag,
      title: "Fresh Local Products",
      description: "Direct from street vendors to your table - fresher than supermarket produce"
    },
    {
      icon: Users,
      title: "Support Local Community",
      description: "Empower neighborhood vendors and strengthen local economic networks"
    },
    {
      icon: MapPin,
      title: "Find Nearby Vendors",
      description: "Discover authentic street food and fresh produce in your area"
    },
    {
      icon: Star,
      title: "Quality Guaranteed",
      description: "Verified vendors with customer reviews and quality ratings"
    },
    {
      icon: Clock,
      title: "Real-time Availability",
      description: "Live updates on product availability and vendor locations"
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Safe and secure payment processing for all your purchases"
    }
  ];

  return (
    <section id="features-section" className="min-h-screen bg-gradient-to-b from-black to-gray-900 px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Why Choose <span className="text-green-400">Farm2Market?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Bridging the gap between authentic street vendors and conscious consumers, 
            creating a sustainable marketplace for everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-green-400/20 rounded-2xl p-8 hover:border-green-400/40 hover:bg-gray-800/70 transition-all duration-300 group hover:transform hover:scale-105"
              >
                <div className="text-green-400 mb-6 group-hover:text-green-300 transition-colors duration-300">
                  <IconComponent className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-100 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-green-400/80 text-sm tracking-wider">
            <span>READY TO GET STARTED?</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
