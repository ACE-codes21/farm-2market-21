
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SalesSummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
  changeType?: 'increase' | 'decrease';
}

export const SalesSummaryCard: React.FC<SalesSummaryCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  changeType,
}) => {
  const { t } = useLanguage();
  
  return (
    <Card className="dark-modern-card card-hover-glow border-green-500/20 shadow-green-500/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">{title}</CardTitle>
        <Icon className="h-4 w-4 text-green-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-display text-white">{value}</div>
        {change && (
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            {changeType === 'increase' ? (
              <ArrowUp className="h-3 w-3 text-green-500" />
            ) : (
              <ArrowDown className="h-3 w-3 text-red-500" />
            )}
            <span className={cn(changeType === 'increase' ? 'text-green-500' : 'text-red-500')}>
              {change}
            </span>
            {t('sales.yesterday')}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
