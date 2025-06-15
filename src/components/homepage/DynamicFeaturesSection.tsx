
import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Users, MapPin, Search, CreditCard, BarChart4, ShoppingCart, Phone, Settings } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const features = [
  {
    icon: <Search className="h-10 w-10 text-green-300 group-hover:text-green-400 transition" />,
    title: "Vendor Discovery Map",
    desc: "Find vendors near you with our live interactive map and real-time updates.",
    preview: (
      <div className="rounded-lg overflow-hidden border border-green-700/40 shadow-lg w-36 h-24 bg-black/20 flex items-center justify-center text-green-300 text-lg font-bold">Map Preview</div>
    ),
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-orange-300 group-hover:text-orange-400 transition" />,
    title: "Smart Marketplace",
    desc: "Shop from curated, fresh, and authentic street vendor products and produce.",
    preview: (
      <div className="rounded-lg overflow-hidden border border-orange-400/40 shadow-lg w-36 h-24 bg-black/20 flex items-center justify-center text-orange-300 text-lg font-bold">Product Cards</div>
    ),
  },
  {
    icon: <BarChart4 className="h-10 w-10 text-cyan-300 group-hover:text-cyan-400 transition" />,
    title: "AI Analytics",
    desc: "Vendors access AI-powered analytics: track sales, customer trends, and business growth with beautiful dashboards.",
    preview: (
      <div className="rounded-lg overflow-hidden border border-cyan-400/40 shadow-lg w-36 h-24 bg-black/20 flex items-center justify-center text-cyan-300 text-lg font-bold">Analytics</div>
    ),
  },
  {
    icon: <CreditCard className="h-10 w-10 text-yellow-300 group-hover:text-yellow-400 transition" />,
    title: "Finance & Schemes",
    desc: "Easy access to loans, government schemes, and finance hub with repayment tracking tools.",
    preview: (
      <div className="rounded-lg overflow-hidden border border-yellow-400/40 shadow-lg w-36 h-24 bg-black/20 flex items-center justify-center text-yellow-300 text-lg font-bold">Finance</div>
    ),
  },
  {
    icon: <Users className="h-10 w-10 text-pink-300 group-hover:text-pink-400 transition" />,
    title: "Community-Driven Support",
    desc: "Empowering vendors & connecting communities for food resilience and direct communication.",
    preview: (
      <div className="rounded-lg overflow-hidden border border-pink-400/40 shadow-lg w-36 h-24 bg-black/20 flex items-center justify-center text-pink-300 text-lg font-bold">Chat</div>
    ),
  },
  {
    icon: <Settings className="h-10 w-10 text-slate-200 group-hover:text-blue-400 transition" />,
    title: "Smart Vendor Tools",
    desc: "Vendors manage inventory, orders, feedback and deliveries from friendly dashboards.",
    preview: (
      <div className="rounded-lg overflow-hidden border border-blue-400/40 shadow-lg w-36 h-24 bg-black/20 flex items-center justify-center text-blue-300 text-lg font-bold">Vendor Tools</div>
    ),
  },
];

export const DynamicFeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });

  return (
    <section ref={sectionRef} id="dynamic-features" className="relative py-28 px-2 md:px-0 min-h-[680px] bg-gradient-to-b from-transparent via-black/90 to-neutral-950/95">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-4xl md:text-6xl font-bold mb-12 text-white tracking-tight">
          <span className="gradient-text">Platform Features</span>
        </h2>
        <div className="flex flex-col gap-16">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60, scale: 0.92 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.12 * i, ease: 'easeOut' }}
              className={`flex flex-col md:flex-row items-center ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              } gap-10 md:gap-24 group`}
            >
              <div className="flex-none flex flex-col items-center md:items-start w-full md:w-[38%]">
                <div className="mb-6">{f.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-lg text-gray-300">{f.desc}</p>
              </div>
              <div className="flex-1 flex justify-center">
                <motion.div
                  className="hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.09, rotate: i % 2 === 0 ? 3 : -3, boxShadow: '0 8px 40px #10b98144' }}
                >
                  {f.preview}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
};

export default DynamicFeaturesSection;
