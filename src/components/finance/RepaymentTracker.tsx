
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CalendarDays, CircleCheck, CircleX, Timer } from 'lucide-react';

interface RepaymentData {
    installments: { date: string; status: 'Paid' | 'Upcoming' | 'Missed' }[];
    missedPayments: number;
}

interface RepaymentTrackerProps {
  data: RepaymentData;
}

export const RepaymentTracker: React.FC<RepaymentTrackerProps> = ({ data }) => {
  return (
    <Card className="dark-modern-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-slate-200">
            <CalendarDays className="text-green-400" />
            Repayment Tracker
        </CardTitle>
        {data.missedPayments > 0 && (
            <CardDescription className="text-red-500 flex items-center gap-1">
                <CircleX className="h-4 w-4" />
                {data.missedPayments} missed payment{data.missedPayments > 1 ? 's' : ''}!
            </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {data.installments.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2 min-w-[80px]">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                  item.status === 'Paid' && 'bg-green-500/20 border-green-500',
                  item.status === 'Upcoming' && 'bg-slate-700/50 border-slate-600',
                  item.status === 'Missed' && 'bg-red-500/20 border-red-500',
                )}
              >
                {item.status === 'Paid' && <CircleCheck className="text-green-400 h-5 w-5" />}
                {item.status === 'Upcoming' && <Timer className="text-slate-400 h-5 w-5" />}
                {item.status === 'Missed' && <CircleX className="text-red-400 h-5 w-5" />}
              </div>
              <p className={cn(
                  "text-xs font-medium",
                  item.status === 'Paid' && 'text-slate-400',
                  item.status === 'Upcoming' && 'text-white',
                  item.status === 'Missed' && 'text-red-400',
              )}>
                {item.date}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
