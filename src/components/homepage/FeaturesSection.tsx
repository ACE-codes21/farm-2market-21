
import React, { useEffect, useRef, useState } from 'react';
import { Leaf, ShoppingCart, Users, TrendingUp, MapPin, Clock } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Leaf,
      title: 'Fresh & Organic',
      description: 'Get the freshest organic produce directly from local farmers',
      color: "green"
    },
    {
      icon: ShoppingCart,
      title: 'Easy Shopping',
      description: 'Simple and intuitive shopping experience with secure payments',
      color: "blue"
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Connect with local farmers and support your community',
      color: "purple"
    },
    {
      icon: TrendingUp,
      title: 'Fair Pricing',
      description: 'Transparent pricing that benefits both farmers and customers',
      color: "orange"
    },
    {
      icon: MapPin,
      title: 'Local Network',
      description: 'Find vendors and farmers in your local area',
      color: "red"
    },
    {
      icon: Clock,
      title: 'Quick Delivery',
      description: 'Fast and reliable delivery of fresh produce to your doorstep',
      color: "indigo"
    }
  ];

  const colorClasses = {
    green: "from-green-500/20 to-green-400/5 border-green-400/30 shadow-green-500/20",
    blue: "from-blue-500/20 to-blue-400/5 border-blue-400/30 shadow-blue-500/20",
    purple: "from-purple-500/20 to-purple-400/5 border-purple-400/30 shadow-purple-500/20",
    orange: "from-orange-500/20 to-orange-400/5 border-orange-400/30 shadow-orange-500/20",
    red: "from-red-500/20 to-red-400/5 border-red-400/30 shadow-red-500/20",
    indigo: "from-indigo-500/20 to-indigo-400/5 border-indigo-400/30 shadow-indigo-500/20"
  };

  return (
    <section ref={sectionRef} id="features" className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/95 to-black"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-green-400/10 text-4xl animate-bounce" style={{animationDelay: '0s'}}>🥕</div>
        <div className="absolute top-40 right-20 text-orange-400/10 text-5xl animate-bounce" style={{animationDelay: '2s'}}>🍅</div>
        <div className="absolute bottom-40 left-20 text-red-400/10 text-4xl animate-bounce" style={{animationDelay: '1s'}}>🍎</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Why Choose <span className="text-green-400">Farm2Market</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the best of farm-to-table freshness with our innovative platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`group relative p-8 bg-gradient-to-br ${colorClasses[feature.color as keyof typeof colorClasses]} backdrop-blur-sm border rounded-3xl hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-3xl transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{
                  transitionDelay: isVisible ? `${index * 0.1}s` : '0s'
                }}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/0 via-green-400/10 to-green-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
