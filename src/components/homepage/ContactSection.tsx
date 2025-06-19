
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, Instagram, Linkedin, Facebook, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const socials = [{
  name: "Instagram",
  icon: <Instagram className="h-6 w-6" />,
  url: "https://instagram.com/"
}, {
  name: "LinkedIn",
  icon: <Linkedin className="h-6 w-6" />,
  url: "https://linkedin.com/"
}, {
  name: "Facebook",
  icon: <Facebook className="h-6 w-6" />,
  url: "https://facebook.com/"
}];

export const ContactSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const isInView = useInView(ref, {
    once: true,
    margin: '-20%'
  });
  
  return (
    <footer ref={ref} id="contact-footer" className="relative py-16 px-4 bg-gradient-to-b from-black/80 via-neutral-900/95 to-black border-t border-white/10">
      <motion.div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between" initial={{
        opacity: 0,
        y: 40
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}}>
        <div className="mb-10 md:mb-0">
          <h3 className="text-2xl font-bold text-white mb-3 tracking-tight gradient-text">{t('contact.title')}</h3>
          <div className="flex gap-8 text-lg text-gray-300">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-green-400" />
              <a href="mailto:info@farm2market.app" className="hover:text-green-300 underline">info@farm2market.app</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-orange-300" />
              <a href="tel:+919876543210" className="hover:text-orange-200 underline">+91 87562 60291</a>
            </div>
          </div>
        </div>
        {/* Socials */}
        <div>
          <div className="flex gap-6 mb-4">
            {socials.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition transform text-gray-300 hover:text-green-400">
                {s.icon}
              </a>
            ))}
          </div>
          {/* Optionally: a simple message form */}
          <form className="flex gap-2" onSubmit={e => {
            e.preventDefault();
            alert(t('contact.message'));
          }}>
            <input type="email" required placeholder={t('contact.yourEmail')} className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400" />
            <button type="submit" className="px-5 py-2 rounded-xl premium-button">{t('contact.send')}</button>
          </form>
        </div>
      </motion.div>
      <div className="text-center text-gray-700 text-xs mt-10 opacity-60">
        © {new Date().getFullYear()} Farm2Market. {t('contact.rightsReserved')}.
      </div>
    </footer>
  );
};

export default ContactSection;
