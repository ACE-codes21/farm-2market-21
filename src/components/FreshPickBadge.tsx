
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FreshPickBadgeProps {
  expiresAt: string;
  className?: string;
}

export const FreshPickBadge: React.FC<FreshPickBadgeProps> = ({ expiresAt, className = '' }) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const expiry = new Date(expiresAt).getTime();
      const timeDiff = expiry - now;

      if (timeDiff <= 0) {
        setIsExpired(true);
        setTimeLeft(t('fresh_pick_badge.expired'));
        return;
      }

      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [expiresAt, t]);

  if (isExpired) {
    return null;
  }

  return (
    <Badge 
      className={`glass-effect bg-gradient-to-r from-orange-500 to-red-500 text-white border-none shadow-lg flex items-center gap-1 animate-pulse ${className}`}
    >
      <Sparkles className="h-3 w-3" />
      <span className="font-bold text-xs">{t('fresh_pick_badge.fresh_pick')}</span>
      <Clock className="h-3 w-3" />
      <span className="text-xs">{timeLeft}</span>
    </Badge>
  );
};
