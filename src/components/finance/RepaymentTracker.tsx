
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
    <Card className="bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-purple-400" />
          Repayment Tracker
        </CardTitle>
        {data.missedPayments > 0 && (
          <CardDescription className="text-red-400 flex items-center gap-1 text-sm">
            <CircleX className="h-4 w-4" />
            {data.missedPayments} missed payment{data.missedPayments > 1 ? 's' : ''}!
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {data.installments.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2 min-w-[60px]">
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                  item.status === 'Paid' && 'bg-green-500/20 border-green-500',
                  item.status === 'Upcoming' && 'bg-slate-700/50 border-slate-600',
                  item.status === 'Missed' && 'bg-red-500/20 border-red-500',
                )}
              >
                {item.status === 'Paid' && <CircleCheck className="text-green-400 h-3 w-3" />}
                {item.status === 'Upcoming' && <Timer className="text-slate-400 h-3 w-3" />}
                {item.status === 'Missed' && <CircleX className="text-red-400 h-3 w-3" />}
              </div>
              <p className={cn(
                  "text-xs font-medium text-center",
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
