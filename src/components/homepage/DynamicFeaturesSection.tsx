
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Search,
  ShoppingCart,
  BarChart4,
  CreditCard,
  Users,
  Settings,
} from 'lucide-react';

/* Neon gradient BG + dynamic icon+preview associations */
const features = [
  {
    icon: <Search className="h-12 w-12 text-green-400 drop-shadow-neon" />,
    title: 'Vendor Discovery Map',
    desc:
      'Find nearby street vendors in real time with an immersive, animated live map. Quickly check availability and reviews.',
    preview: (
      <div className="feature-preview bg-black/50 border-green-400/30 neon-box text-green-300">
        <span className="neon-pulse text-3xl">📍</span> Live Map
      </div>
    ),
    color: 'from-green-800/70 via-black to-gray-900',
    glow: 'shadow-green-400/40',
  },
  {
    icon: <ShoppingCart className="h-12 w-12 text-orange-400 drop-shadow-neon" />,
    title: 'Smart Marketplace',
    desc:
      'Browse curated products & produce with vibrant cards and AI-powered recommendations. Add to cart in one click.',
    preview: (
      <div className="feature-preview bg-black/50 border-orange-400/30 neon-box text-orange-300">
        <span className="neon-pulse text-3xl">🛒</span> Product Cards
      </div>
    ),
    color: 'from-orange-900/70 via-black to-yellow-900',
    glow: 'shadow-orange-400/40',
  },
  {
    icon: <BarChart4 className="h-12 w-12 text-cyan-400 drop-shadow-neon" />,
    title: 'AI Analytics',
    desc:
      'Visual dashboards show live sales & business insights. Instantly spot trends using animated, glowing charts.',
    preview: (
      <div className="feature-preview bg-black/50 border-cyan-400/30 neon-box text-cyan-300">
        <span className="neon-pulse text-3xl">📊</span> Analytics
      </div>
    ),
    color: 'from-cyan-900/70 via-black to-blue-900',
    glow: 'shadow-cyan-400/40',
  },
  {
    icon: <CreditCard className="h-12 w-12 text-yellow-300 drop-shadow-neon" />,
    title: 'Finance & Schemes',
    desc:
      'Get instant access to loans, government schemes, and repayment insights—all managed in a stunning finance hub.',
    preview: (
      <div className="feature-preview bg-black/50 border-yellow-300/30 neon-box text-yellow-200">
        <span className="neon-pulse text-3xl">💳</span> Finance Hub
      </div>
    ),
    color: 'from-yellow-900/60 via-black to-orange-900',
    glow: 'shadow-yellow-300/40',
  },
  {
    icon: <Users className="h-12 w-12 text-pink-400 drop-shadow-neon" />,
    title: 'Community Support',
    desc:
      'Secure chat, direct messaging, and local forums—building real relationships between buyers, vendors, and neighborhoods.',
    preview: (
      <div className="feature-preview bg-black/50 border-pink-400/30 neon-box text-pink-300">
        <span className="neon-pulse text-3xl">💬</span> Community Chat
      </div>
    ),
    color: 'from-pink-900/70 via-black to-purple-900',
    glow: 'shadow-pink-400/40',
  },
  {
    icon: <Settings className="h-12 w-12 text-blue-300 drop-shadow-neon" />,
    title: 'Smart Vendor Tools',
    desc:
      'Powerful, easy-to-use dashboards help vendors manage stock, feedback, finances & deliveries—automated and user-friendly.',
    preview: (
      <div className="feature-preview bg-black/50 border-blue-300/30 neon-box text-blue-300">
        <span className="neon-pulse text-3xl">⚙️</span> Vendor Tools
      </div>
    ),
    color: 'from-blue-900/70 via-black to-cyan-900',
    glow: 'shadow-blue-300/40',
  },
];

/**
 * Cinematic, neon-animated features walkthrough.
 * Preserves modern glass/gradient hero look, glows, animated icons, alt layout.
 */
const animationVariants = {
  offscreenLeft: { opacity: 0, x: -100, scale: 0.96 },
  offscreenRight: { opacity: 0, x: 100, scale: 0.96 },
  onscreen: { opacity: 1, x: 0, scale: 1 },
};

export const DynamicFeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' });

  return (
    <section
      ref={sectionRef}
      id="dynamic-features"
      className="relative px-2 md:px-0 py-32 overflow-hidden"
    >
      {/* Neon animated gradient BG */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-neutral-950/95 to-black" />
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* Floating neon elements for visual depth */}
        <div className="absolute top-10 left-1/4 w-48 h-48 bg-green-500/10 rounded-full blur-3xl neon-blob animate-pulse" />
        <div className="absolute -bottom-20 right-0 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl neon-blob animate-pulse" />
        <div className="absolute bottom-24 left-1/2 w-40 h-40 bg-cyan-400/10 rounded-full blur-2xl neon-blob animate-pulse" />
      </div>
      <div className="relative max-w-6xl mx-auto z-20">
        <h2 className="text-center text-4xl md:text-6xl font-bold mb-16 tracking-tight gradient-text drop-shadow-neon">
          Platform Features
        </h2>
        <div className="flex flex-col gap-28">
          {features.map((f, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={f.title}
                initial={isEven ? 'offscreenLeft' : 'offscreenRight'}
                animate={isInView ? 'onscreen' : (isEven ? 'offscreenLeft' : 'offscreenRight')}
                variants={animationVariants}
                transition={{
                  duration: 0.76,
                  delay: 0.14 * i,
                  type: 'spring',
                  damping: 20,
                  stiffness: 180,
                }}
                className={`relative flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20 group ${
                  !isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Text & Icon */}
                <div
                  className={`flex-shrink-0 w-full md:w-2/5 flex flex-col items-center md:items-start text-center md:text-left ${
                    !isEven ? 'md:items-end md:text-right' : ''
                  }`}
                >
                  {/* Icon with glowing pulse */}
                  <div
                    className={`mb-7 flex items-center justify-center md:justify-start neon-icon-glow transition-transform group-hover:scale-110`}
                  >
                    <div className="flex items-center justify-center p-2 rounded-full bg-gradient-to-br from-white/0 via-white/10 to-white/0">
                      {f.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 gradient-text drop-shadow-neon">
                    {f.title}
                  </h3>
                  <p className="text-lg text-gray-300 font-medium leading-relaxed opacity-90">
                    {f.desc}
                  </p>
                </div>
                {/* Preview / Card */}
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    rotate: isEven ? 2 : -2,
                    boxShadow: `0 10px 60px 0 ${f.glow.replace('-400/40', '70')}`,
                  }}
                  whileTap={{
                    scale: 0.98,
                    boxShadow: `0 0 0 4px ${f.glow.replace('-400/40', '80')}`,
                  }}
                  className={`
                    feature-card w-72 h-36 min-h-[144px] transition-all relative border-2
                    ${f.glow}
                    bg-gradient-to-br ${f.color} rounded-3xl glass-effect
                    flex items-center justify-center text-xl font-semibold shadow-xl
                  `}
                >
                  {f.preview}
                  {/* Subtle animated neon border */}
                  <div className="absolute inset-0 z-0 rounded-3xl border-2 border-white/5 neon-glow-blink pointer-events-none" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
      {/* Key neon enhancements, micro-interactions */}
      <style>
        {`
        .feature-preview {
          @apply w-full h-full flex items-center justify-center gap-3 rounded-2xl font-bold text-xl
            bg-gradient-to-tr from-white/10 to-black;
          transition: box-shadow .28s cubic-bezier(.23,1.14,.32,1), background .35s;
        }
        .feature-card:hover .feature-preview {
          box-shadow: 0 4px 28px 10px #10b98144, 0 0px 4px 0 #fff2;
          background: linear-gradient(120deg, #fff3 10%, #10b98111 60%, #fff1 100%);
        }
        .drop-shadow-neon {
          filter: drop-shadow(0 0 10px #38f3c7c4);
        }
        .neon-glow-blink {
          animation: neon-blink 2.7s infinite alternate;
        }
        .neon-blob {
          filter: blur(30px) brightness(1.2);
        }
        .neon-pulse {
          animation: neonPulse 1.7s infinite alternate;
          filter: drop-shadow(0 0 8px #10b98166);
        }
        @keyframes neon-blink {
          from { box-shadow: 0 0 8px 1px #10b98122, 0 0 40px 3px #fff2; }
          to { box-shadow: 0 0 20px 4px #10b98199, 0 0 100px 8px #fff4; }
        }
        @keyframes neonPulse {
          0% { text-shadow: 0 0 2px #22e58f44, 0 0 10px #10b98155; }
          100% { text-shadow: 0 0 10px #10b981d5, 0 0 16px #fff3; }
        }
        `}
      </style>
    </section>
  );
};

export default DynamicFeaturesSection;
