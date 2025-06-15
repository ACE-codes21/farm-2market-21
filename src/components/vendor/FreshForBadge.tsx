import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { differenceInDays, formatDistanceToNowStrict, isPast } from 'date-fns';
import { useTranslation } from 'react-i18next';

interface FreshForBadgeProps {
  expiryDate?: string;
}

export const FreshForBadge: React.FC<FreshForBadgeProps> = ({ expiryDate }) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState('');
  const [badgeVariant, setBadgeVariant] = useState<'default' | 'destructive' | 'secondary'>('default');

  useEffect(() => {
    if (!expiryDate) {
      setTimeLeft(t('fresh_for_badge.na'));
      setBadgeVariant('secondary');
      return;
    }

    const updateBadge = () => {
      const targetDate = new Date(expiryDate);
      
      if (isPast(targetDate)) {
        setTimeLeft(t('fresh_for_badge.expired'));
        setBadgeVariant('destructive');
        return;
      }

      const daysLeft = differenceInDays(targetDate, new Date());
      
      if (daysLeft <= 3) {
        setBadgeVariant('destructive');
      } else if (daysLeft <= 7) {
        setBadgeVariant('secondary'); // orange-like
      } else {
        setBadgeVariant('default'); // green-like
      }

      setTimeLeft(formatDistanceToNowStrict(targetDate, { addSuffix: true }));
    };

    updateBadge();
    const interval = setInterval(updateBadge, 60000); // update every minute
    return () => clearInterval(interval);
  }, [expiryDate, t]);

  const getVariantClass = () => {
    switch(badgeVariant) {
      case 'destructive':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'secondary':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  }

  return (
    <Badge variant={badgeVariant} className={`whitespace-nowrap ${getVariantClass()}`}>
      {timeLeft}
    </Badge>
  );
};
