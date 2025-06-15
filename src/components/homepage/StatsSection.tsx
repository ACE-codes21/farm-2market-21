
import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, ShoppingBag, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const StatsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ vendors: 0, customers: 0, orders: 0, satisfaction: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const finalValues = { vendors: 500, customers: 5000, orders: 25000, satisfaction: 98 };

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

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const stepTime = 50; // Update every 50ms
      const steps = duration / stepTime;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        if (progress >= 1) {
          setCounters(finalValues);
          clearInterval(timer);
        } else {
          setCounters({
            vendors: Math.round(finalValues.vendors * progress),
            customers: Math.round(finalValues.customers * progress),
            orders: Math.round(finalValues.orders * progress),
            satisfaction: Math.round(finalValues.satisfaction * progress)
          });
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const stats = [
    {
      icon: Users,
      value: counters.vendors,
      suffix: '+',
      label: t('stats_section.stats.vendors'),
      color: 'green'
    },
    {
      icon: ShoppingBag,
      value: counters.customers,
      suffix: '+',
      label: t('stats_section.stats.customers'),
      color: 'blue'
    },
    {
      icon: TrendingUp,
      value: counters.orders,
      suffix: '+',
      label: t('stats_section.stats.orders'),
      color: 'purple'
    },
    {
      icon: Award,
      value: counters.satisfaction,
      suffix: '%',
      label: t('stats_section.stats.satisfaction'),
      color: 'orange'
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 via-black to-orange-900/20"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('stats_section.heading')} <span className="text-green-400">{t('stats_section.heading_highlight')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('stats_section.subheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const colorClasses = {
              green: "from-green-500/30 to-green-400/10 border-green-400/40",
              blue: "from-blue-500/30 to-blue-400/10 border-blue-400/40",
              purple: "from-purple-500/30 to-purple-400/10 border-purple-400/40",
              orange: "from-orange-500/30 to-orange-400/10 border-orange-400/40"
            };

            return (
              <div
                key={index}
                className={`group relative p-8 bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses]} backdrop-blur-sm border rounded-3xl hover:scale-105 transition-all duration-500 shadow-2xl text-center transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{
                  transitionDelay: isVisible ? `${index * 0.15}s` : '0s'
                }}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-10 w-10 text-white group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </div>
                  
                  <p className="text-gray-300 text-lg font-medium group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
                
                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 animate-pulse opacity-50"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
