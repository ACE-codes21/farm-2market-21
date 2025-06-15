
import React, { useEffect, useRef, useState } from 'react';
import { ShoppingBag, Wrench, Users, MapPin, Clock, TrendingUp, Shield, Star, Truck } from 'lucide-react';

const CoreFeaturesSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const featureSections = [
    {
      id: 'marketplace',
      title: 'Smart Marketplace',
      subtitle: 'Discover fresh, local produce',
      icon: ShoppingBag,
      color: 'green',
      features: [
        { icon: MapPin, title: 'Location-Based Discovery', desc: 'Find vendors in your neighborhood' },
        { icon: Clock, title: 'Real-Time Availability', desc: 'Live inventory updates' },
        { icon: Star, title: 'Quality Ratings', desc: 'Community-verified vendors' }
      ]
    },
    {
      id: 'vendor-tools',
      title: 'Vendor Tools',
      subtitle: 'Grow your business digitally',
      icon: Wrench,
      color: 'orange',
      features: [
        { icon: TrendingUp, title: 'Sales Analytics', desc: 'Track performance and growth' },
        { icon: Shield, title: 'Secure Payments', desc: 'Fast, reliable transactions' },
        { icon: Truck, title: 'Delivery Management', desc: 'Coordinate orders efficiently' }
      ]
    },
    {
      id: 'community',
      title: 'Community Hub',
      subtitle: 'Connect with your neighbors',
      icon: Users,
      color: 'purple',
      features: [
        { icon: Star, title: 'Reviews & Feedback', desc: 'Build trust through transparency' },
        { icon: MapPin, title: 'Local Events', desc: 'Farmers markets and community gatherings' },
        { icon: Users, title: 'Social Impact', desc: 'Support local economy growth' }
      ]
    }
  ];

  const colorClasses = {
    green: {
      bg: 'from-green-500/10 to-green-400/5',
      border: 'border-green-400/30',
      text: 'text-green-400',
      accent: 'text-green-300'
    },
    orange: {
      bg: 'from-orange-500/10 to-orange-400/5',
      border: 'border-orange-400/30',
      text: 'text-orange-400',
      accent: 'text-orange-300'
    },
    purple: {
      bg: 'from-purple-500/10 to-purple-400/5',
      border: 'border-purple-400/30',
      text: 'text-purple-400',
      accent: 'text-purple-300'
    }
  };

  return (
    <section ref={sectionRef} className="relative py-24 px-4 bg-gradient-to-b from-black via-gray-900/95 to-black">
      <div className="max-w-7xl mx-auto">
        {featureSections.map((section, sectionIndex) => {
          const SectionIcon = section.icon;
          const colors = colorClasses[section.color as keyof typeof colorClasses];
          
          return (
            <div 
              key={section.id}
              id={section.id}
              className={`mb-32 last:mb-0 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${sectionIndex * 0.2}s` }}
            >
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${colors.bg} ${colors.border} border rounded-full mb-6`}>
                  <SectionIcon className={`h-6 w-6 ${colors.text}`} />
                  <span className={`font-semibold ${colors.text}`}>{section.title}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {section.subtitle}
                </h2>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                {section.features.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div
                      key={index}
                      className={`group p-8 bg-gradient-to-br ${colors.bg} backdrop-blur-sm ${colors.border} border rounded-3xl hover:scale-105 transition-all duration-500 shadow-2xl`}
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <FeatureIcon className={`h-8 w-8 ${colors.text}`} />
                      </div>
                      
                      <h3 className={`text-2xl font-bold text-white mb-4 group-hover:${colors.text} transition-colors duration-300`}>
                        {feature.title}
                      </h3>
                      
                      <p className={`${colors.accent} leading-relaxed group-hover:text-white transition-colors duration-300`}>
                        {feature.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CoreFeaturesSection;
