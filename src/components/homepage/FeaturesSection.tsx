
import React, { useEffect, useRef, useState } from 'react';
import { 
  ShoppingCart, Store, Users, Search, BarChart3, MessageSquare, 
  MapPin, Clock, Shield, Star, Truck, Leaf, Heart, Award 
} from 'lucide-react';

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

  const featureCategories = [
    {
      id: 'marketplace',
      title: 'Smart Marketplace',
      subtitle: 'Discover Fresh Produce Like Never Before',
      icon: ShoppingCart,
      color: 'green',
      features: [
        {
          icon: Search,
          title: 'AI-Powered Search',
          description: 'Find exactly what you need with intelligent product recommendations and local vendor matching.'
        },
        {
          icon: MapPin,
          title: 'Location-Based Discovery',
          description: 'Discover vendors in your neighborhood and explore fresh produce within your delivery radius.'
        },
        {
          icon: Clock,
          title: 'Real-Time Availability',
          description: 'See live inventory updates and reserve items before they sell out.'
        },
        {
          icon: Star,
          title: 'Quality Assurance',
          description: 'Verified ratings and reviews ensure you get the freshest, highest-quality products.'
        }
      ]
    },
    {
      id: 'vendor-tools',
      title: 'Vendor Dashboard',
      subtitle: 'Powerful Tools for Local Businesses',
      icon: Store,
      color: 'orange',
      features: [
        {
          icon: BarChart3,
          title: 'Sales Analytics',
          description: 'Comprehensive insights into your sales performance, customer behavior, and market trends.'
        },
        {
          icon: Shield,
          title: 'Inventory Management',
          description: 'Track stock levels, set automated alerts, and manage your product catalog effortlessly.'
        },
        {
          icon: Truck,
          title: 'Delivery Coordination',
          description: 'Streamlined logistics with route optimization and delivery partner integration.'
        },
        {
          icon: Award,
          title: 'Business Growth',
          description: 'Marketing tools, promotional campaigns, and customer retention strategies.'
        }
      ]
    },
    {
      id: 'community',
      title: 'Community Hub',
      subtitle: 'Building Stronger Local Connections',
      icon: Users,
      color: 'purple',
      features: [
        {
          icon: MessageSquare,
          title: 'Direct Communication',
          description: 'Chat directly with vendors, ask questions, and build lasting relationships with local producers.'
        },
        {
          icon: Heart,
          title: 'Community Reviews',
          description: 'Share experiences, photos, and honest reviews to help others discover great local vendors.'
        },
        {
          icon: Leaf,
          title: 'Sustainability Focus',
          description: 'Track your environmental impact and support eco-friendly farming practices.'
        },
        {
          icon: Users,
          title: 'Local Events',
          description: 'Stay updated on farmers markets, community events, and seasonal produce availability.'
        }
      ]
    }
  ];

  const colorClasses = {
    green: {
      bg: "from-green-500/10 via-green-400/5 to-green-500/10",
      border: "border-green-400/30",
      text: "text-green-400",
      glow: "shadow-green-500/20",
      hover: "hover:shadow-green-500/40"
    },
    orange: {
      bg: "from-orange-500/10 via-orange-400/5 to-orange-500/10",
      border: "border-orange-400/30",
      text: "text-orange-400",
      glow: "shadow-orange-500/20",
      hover: "hover:shadow-orange-500/40"
    },
    purple: {
      bg: "from-purple-500/10 via-purple-400/5 to-purple-500/10",
      border: "border-purple-400/30",
      text: "text-purple-400",
      glow: "shadow-purple-500/20",
      hover: "hover:shadow-purple-500/40"
    }
  };

  return (
    <section ref={sectionRef} className="relative py-32 px-4 overflow-hidden">
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
            Platform <span className="text-green-400">Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the comprehensive tools and features that make Farm2Market the ultimate platform for local food commerce
          </p>
        </div>

        <div className="space-y-32">
          {featureCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            const colors = colorClasses[category.color as keyof typeof colorClasses];
            
            return (
              <div key={category.id} className="relative">
                {/* Category Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: `${categoryIndex * 0.2}s`}}>
                  <div className={`inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r ${colors.bg} backdrop-blur-sm border ${colors.border} rounded-2xl mb-6 ${colors.glow} hover:scale-105 transition-all duration-500`}>
                    <CategoryIcon className={`h-8 w-8 ${colors.text}`} />
                    <span className={`text-2xl font-bold ${colors.text}`}>{category.title}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{category.subtitle}</h3>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.features.map((feature, index) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <div
                        key={index}
                        className={`group relative p-8 bg-gradient-to-br ${colors.bg} backdrop-blur-sm border ${colors.border} rounded-3xl hover:scale-105 transition-all duration-500 shadow-2xl ${colors.hover} transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{
                          transitionDelay: isVisible ? `${categoryIndex * 0.2 + index * 0.1}s` : '0s'
                        }}
                      >
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative z-10">
                          <div className={`w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${colors.glow}`}>
                            <FeatureIcon className={`h-8 w-8 ${colors.text} group-hover:rotate-12 transition-transform duration-300`} />
                          </div>
                          
                          <h4 className={`text-2xl font-bold text-white mb-4 group-hover:${colors.text.replace('text-', 'text-')} transition-colors duration-300`}>
                            {feature.title}
                          </h4>
                          
                          <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300 text-lg">
                            {feature.description}
                          </p>
                        </div>
                        
                        {/* Glow effect */}
                        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
