
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CTASectionProps {
  onOpenAuthModal: (role: 'vendor' | 'buyer', mode?: 'login' | 'signup') => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onOpenAuthModal }) => {
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

  return (
    <section ref={sectionRef} className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-black to-orange-900/30"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-green-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500/10 via-green-400/15 to-green-500/10 border border-green-400/30 rounded-full text-green-400 text-sm font-medium backdrop-blur-sm shadow-[0_0_30px_rgba(34,197,94,0.2)] mb-8">
            <Sparkles className="h-4 w-4 animate-pulse" />
            Join the Movement
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to <span className="text-green-400">Transform</span>
            <br />
            Your Market Experience?
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of vendors and buyers who are already experiencing the future of local commerce.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={() => onOpenAuthModal('buyer', 'signup')}
              className="group relative px-10 py-5 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-black font-bold text-xl rounded-2xl border-2 border-green-400 shadow-[0_0_40px_rgba(34,197,94,0.6)] hover:shadow-[0_0_60px_rgba(34,197,94,0.9)] transform hover:scale-110 transition-all duration-300 min-w-[220px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              <span className="relative z-10">Start Shopping</span>
              <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform relative z-10" />
            </Button>

            <Button 
              onClick={() => onOpenAuthModal('vendor', 'signup')}
              variant="outline" 
              className="group relative px-10 py-5 bg-transparent hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-orange-400/10 text-white font-bold text-xl rounded-2xl border-2 border-white/30 hover:border-orange-400 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(251,146,60,0.7)] transform hover:scale-110 transition-all duration-300 min-w-[220px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/15 to-orange-400/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              <span className="relative z-10">Start Selling</span>
              <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform relative z-10" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
