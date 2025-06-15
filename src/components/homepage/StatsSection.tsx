
import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, ShoppingBag, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const StatsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ vendors: 0, customers: 0, orders: 0, satisfaction: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const finalValues = { vendors: 500, customers: 10000, orders: 50000, satisfaction: 98 };

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
      const duration = 2500; // 2.5 seconds for smoother animation
      const stepTime = 30; // Update every 30ms for smoother transitions
      const steps = duration / stepTime;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = Math.min(currentStep / steps, 1);
        
        // Use easing function for more natural animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        if (progress >= 1) {
          setCounters(finalValues);
          clearInterval(timer);
        } else {
          setCounters({
            vendors: Math.round(finalValues.vendors * easeOutCubic),
            customers: Math.round(finalValues.customers * easeOutCubic),
            orders: Math.round(finalValues.orders * easeOutCubic),
            satisfaction: Math.round(finalValues.satisfaction * easeOutCubic)
          });
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const formatNumber = (num: number, suffix: string) => {
    if (suffix === '%') return num;
    if (num >= 10000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  const stats = [
    {
      icon: Users,
      value: counters.vendors,
      suffix: '+',
      label: t('stats_section.stats.vendors'),
      color: 'green',
      gradient: 'from-green-500/30 to-emerald-400/10',
      border: 'border-green-400/40',
      glow: 'shadow-green-400/20'
    },
    {
      icon: ShoppingBag,
      value: counters.customers,
      suffix: '+',
      label: t('stats_section.stats.customers'),
      color: 'blue',
      gradient: 'from-blue-500/30 to-cyan-400/10',
      border: 'border-blue-400/40',
      glow: 'shadow-blue-400/20'
    },
    {
      icon: TrendingUp,
      value: counters.orders,
      suffix: '+',
      label: t('stats_section.stats.orders'),
      color: 'purple',
      gradient: 'from-purple-500/30 to-pink-400/10',
      border: 'border-purple-400/40',
      glow: 'shadow-purple-400/20'
    },
    {
      icon: Award,
      value: counters.satisfaction,
      suffix: '%',
      label: t('stats_section.stats.satisfaction'),
      color: 'orange',
      gradient: 'from-orange-500/30 to-yellow-400/10',
      border: 'border-orange-400/40',
      glow: 'shadow-orange-400/20'
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="relative py-32 px-4 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-orange-900/20"></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full animate-pulse" style={{
          backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating orbs for visual depth */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-green-400 via-white to-orange-400 bg-clip-text text-transparent">
            {t('stats_section.heading')} <span className="text-green-400">{t('stats_section.heading_highlight')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('stats_section.subheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;

            return (
              <div
                key={index}
                className={`group relative p-8 bg-gradient-to-br ${stat.gradient} backdrop-blur-sm border ${stat.border} rounded-3xl hover:scale-105 transition-all duration-500 ${stat.glow} hover:shadow-2xl text-center transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{
                  transitionDelay: isVisible ? `${index * 0.2}s` : '0s'
                }}
              >
                {/* Animated background glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Pulsing border effect */}
                <div className="absolute inset-0 rounded-3xl border-2 border-white/10 animate-pulse opacity-50"></div>
                
                <div className="relative z-10">
                  {/* Enhanced icon with glow effect */}
                  <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                    <IconComponent className="h-10 w-10 text-white group-hover:rotate-12 transition-transform duration-300 drop-shadow-lg" />
                  </div>
                  
                  {/* Animated number display */}
                  <div className="text-5xl md:text-6xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300 font-mono tracking-wider">
                    <span className="inline-block">
                      {formatNumber(stat.value, stat.suffix)}{stat.suffix}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-lg font-medium group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
                
                {/* Enhanced pulse effect with gradient */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-pulse opacity-30"></div>
                
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 opacity-0 group-hover:opacity-100"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
