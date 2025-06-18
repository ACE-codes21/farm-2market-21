
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CalendarDays, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface RepaymentData {
  installments: { date: string; status: 'Paid' | 'Upcoming' | 'Missed' }[];
  missedPayments: number;
}

interface RepaymentTrackerProps {
  data: RepaymentData;
}

export const RepaymentTracker: React.FC<RepaymentTrackerProps> = ({ data }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Paid':
        return {
          icon: CheckCircle,
          color: 'bg-green-500',
          textColor: 'text-green-400',
          bgColor: 'bg-green-500/10'
        };
      case 'Upcoming':
        return {
          icon: Clock,
          color: 'bg-blue-500',
          textColor: 'text-blue-400',
          bgColor: 'bg-blue-500/10'
        };
      case 'Missed':
        return {
          icon: AlertTriangle,
          color: 'bg-red-500',
          textColor: 'text-red-400',
          bgColor: 'bg-red-500/10'
        };
      default:
        return {
          icon: Clock,
          color: 'bg-slate-500',
          textColor: 'text-slate-400',
          bgColor: 'bg-slate-500/10'
        };
    }
  };

  return (
    <Card className="bg-slate-800/60 backdrop-blur-lg border border-slate-700/50 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-purple-400" />
            Repayment Timeline
          </CardTitle>
          {data.missedPayments > 0 && (
            <Badge variant="destructive" className="bg-red-500/20 text-red-300 border-red-500/30">
              {data.missedPayments} missed
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-600"></div>
          
          <div className="space-y-4">
            {data.installments.map((item, index) => {
              const config = getStatusConfig(item.status);
              const Icon = config.icon;
              
              return (
                <div key={index} className="relative flex items-center gap-4">
                  {/* Timeline dot */}
                  <div className={cn(
                    "relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 border-slate-800",
                    config.color
                  )}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className={cn(
                    "flex-1 p-3 rounded-lg border",
                    config.bgColor,
                    "border-slate-700/50"
                  )}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">{item.date}</p>
                        <p className={cn("text-xs", config.textColor)}>
                          {item.status}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          config.textColor,
                          "border-current"
                        )}
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
