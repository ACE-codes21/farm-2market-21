import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart, Store, User, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';
interface HeroSectionProps {
  onOpenAuthModal: (role: 'vendor' | 'buyer', mode?: 'login' | 'signup') => void;
}
const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAuthModal
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [userRole, setUserRole] = useState<'vendor' | 'buyer' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const {
    t
  } = useTranslation();
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.3
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const checkAuthAndRole = async () => {
      try {
        // Check Supabase auth state
        const {
          data: {
            session
          }
        } = await supabase.auth.getSession();
        if (!session) {
          // If no Supabase session, check localStorage (for demo/legacy users)
          const sessionData = localStorage.getItem('userSession');
          if (sessionData) {
            const localSession = JSON.parse(sessionData);
            if (localSession.isAuthenticated) {
              setIsAuthenticated(true);
              setUserRole(localSession.role);
            }
          }
        } else {
          setIsAuthenticated(true);

          // Get role from user metadata or localStorage
          let role = session.user.user_metadata?.role;
          if (!role) {
            const sessionData = localStorage.getItem('userSession');
            if (sessionData) {
              const localSession = JSON.parse(sessionData);
              role = localSession.role;
            }
          }
          setUserRole(role);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthAndRole();

    // Listen for auth state changes
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setUserRole(null);
        localStorage.removeItem('userSession');
      } else if (session) {
        checkAuthAndRole();
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  const handleGoToMarket = () => {
    navigate('/buyer');
  };
  const handleGoToDashboard = () => {
    navigate('/vendor');
  };
  const renderButtons = () => {
    if (isLoading) {
      return <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
        </div>;
    }
    if (isAuthenticated && userRole) {
      if (userRole === 'buyer') {
        return <div className="flex justify-center">
            <Button onClick={handleGoToMarket} className="group relative px-10 py-7 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-black font-bold text-xl rounded-2xl border-2 border-green-400 shadow-[0_0_40px_rgba(34,197,94,0.6)] hover:shadow-[0_0_60px_rgba(34,197,94,0.9)] transform hover:scale-110 transition-all duration-300 min-w-[220px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              <ShoppingCart className="h-6 w-6 mr-3 relative z-10" />
              <span className="relative z-10">{t('hero_section.go_to_market')}</span>
              <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform relative z-10" />
            </Button>
          </div>;
      } else if (userRole === 'vendor') {
        return <div className="flex justify-center">
            <Button onClick={handleGoToDashboard} variant="outline" className="group relative px-10 py-7 bg-transparent hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-orange-400/10 text-white font-bold text-xl rounded-2xl border-2 border-white/30 hover:border-orange-400 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(251,146,60,0.7)] transform hover:scale-110 transition-all duration-300 min-w-[220px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/15 to-orange-400/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              <Settings className="h-6 w-6 mr-3 relative z-10" />
              <span className="relative z-10">{t('hero_section.go_to_dashboard')}</span>
              <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform relative z-10" />
            </Button>
          </div>;
      }
    }

    // Show original buttons for non-authenticated users
    return <div className="flex flex-col sm:flex-row gap-12 justify-center items-center">
        <Button onClick={() => onOpenAuthModal('buyer', 'signup')} className="group relative px-10 py-7 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-black font-bold text-xl rounded-2xl border-2 border-green-400 shadow-[0_0_40px_rgba(34,197,94,0.6)] hover:shadow-[0_0_60px_rgba(34,197,94,0.9)] transform hover:scale-110 transition-all duration-300 min-w-[220px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          <ShoppingCart className="h-6 w-6 mr-3 relative z-10" />
          <span className="relative z-10">{t('hero_section.shop_now')}</span>
          <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform relative z-10" />
        </Button>

        <Button onClick={() => onOpenAuthModal('vendor', 'signup')} variant="outline" className="group relative px-10 py-7 bg-transparent hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-orange-400/10 text-white font-bold text-xl rounded-2xl border-2 border-white/30 hover:border-orange-400 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(251,146,60,0.7)] transform hover:scale-110 transition-all duration-300 min-w-[220px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/15 to-orange-400/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          <Store className="h-6 w-6 mr-3 relative z-10" />
          <span className="relative z-10">{t('hero_section.sell_with_us')}</span>
          <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform relative z-10" />
        </Button>
      </div>;
  };
  return <section ref={sectionRef} id="contact" className="relative flex items-center justify-center min-h-screen px-4 py-32">
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="py-[55px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500/10 via-green-400/15 to-green-500/10 border border-green-400/30 rounded-full text-green-400 text-sm font-medium backdrop-blur-sm shadow-[0_0_30px_rgba(34,197,94,0.2)] mb-8">
            <span className="animate-pulse">🌱</span>
            {t('hero_section.badge')}
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            {t('hero_section.heading_1')} <span className="text-green-400">{t('hero_section.heading_farm')}</span> {t('hero_section.heading_2')}
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {t('hero_section.heading_market')}
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('hero_section.subheading_1')} <span className="text-orange-400">{t('hero_section.subheading_vendors')}</span>{t('hero_section.subheading_2')} <span className="text-green-400">{t('hero_section.subheading_neighbourhoods')}</span>.
          </p>

          {/* CTA Buttons */}
          <div className="mb-16">
            {renderButtons()}
          </div>

          {/* Stats */}
          
        </div>
      </div>
    </section>;
};
export default HeroSection;