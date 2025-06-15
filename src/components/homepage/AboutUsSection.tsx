import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
export const AboutUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true
  });
  return <section ref={sectionRef} id="about-us" className="relative py-24 px-4 bg-gradient-to-b from-neutral-950/95 via-black/90 to-black">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 className="text-4xl md:text-6xl font-bold text-white mb-7 gradient-text" initial={{
        opacity: 0,
        y: 40
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}}>
          Our Mission
        </motion.h2>
        <motion.p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-10" initial={{
        opacity: 0,
        y: 40
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        delay: 0.3
      }}>
          Farm2Market is built to <span className="text-green-300">empower street vendors</span>, connect communities, and make <span className="text-orange-400">fresh, local produce</span> accessible to everyone.<br />
          Our vision centers around <span className="text-cyan-300">vendors and customers</span>, smart tools, and direct relationships between <span className="text-green-400">producers and consumers</span>.<br />
          We believe in technology for good—helping small businesses thrive and nourishing neighborhoods with wholesome food, optimism, and opportunity.
        </motion.p>

        {/* Timeline (subtle visual progression for values) */}
        <motion.div initial={{
        opacity: 0,
        y: 40
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        delay: 0.4
      }}>
          <div className="flex flex-col md:flex-row gap-10 justify-center mt-9">
            <div className="flex-1 flex flex-col items-center">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-green-400 to-green-700 mb-4 flex items-center justify-center text-2xl shadow-lg">🌱</div>
              <div className="text-lg font-semibold text-white mb-1">Empower Vendors</div>
              <div className="text-gray-400 text-sm max-w-xs">Give street vendors digital tools & access to new markets.</div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-orange-300 to-orange-600 mb-4 flex items-center justify-center text-2xl shadow-lg">🛒</div>
              <div className="text-lg font-semibold text-white mb-1">Nourish Communities</div>
              <div className="text-gray-400 text-sm max-w-xs">Create direct connections from farm to table, nourishing neighborhoods.</div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-700 mb-4 flex items-center justify-center text-2xl shadow-lg">🤝</div>
              <div className="text-lg font-semibold text-white mb-1">Drive Inclusion</div>
              <div className="text-gray-400 text-sm max-w-xs">Advance financial inclusion and transparent pricing for all stakeholders.</div>
            </div>
          </div>
          <div className="mx-auto border-t border-dashed mt-10 border-gray-700 w-2/3 opacity-40"></div>
        </motion.div>
      </div>
    </section>;
};
export default AboutUsSection;