
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Clock, CheckCircle, CreditCard, ExternalLink, Calendar, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoanStatus {
  id: string;
  applicationNumber: string;
  amount: number;
  status: 'Under Review' | 'Approved' | 'Disbursed';
  appliedDate: string;
  scheme: string;
  expectedDate?: string;
}

const statusConfig = {
  'Under Review': {
    icon: Clock,
    color: 'bg-yellow-500/10 text-yellow-400 border-yellow-400/20',
    badgeClass: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    tooltip: 'Application is being reviewed by our team'
  },
  'Approved': {
    icon: CheckCircle,
    color: 'bg-green-500/10 text-green-400 border-green-400/20',
    badgeClass: 'bg-green-500/20 text-green-300 border-green-500/30',
    tooltip: 'Approved! Funds will be credited within 5-7 business days'
  },
  'Disbursed': {
    icon: CreditCard,
    color: 'bg-blue-500/10 text-blue-400 border-blue-400/20',
    badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    tooltip: 'Funds have been successfully credited to your account'
  }
};

const dummyLoanData: LoanStatus[] = [
  {
    id: '1',
    applicationNumber: 'SVN2025001',
    amount: 25000,
    status: 'Under Review',
    appliedDate: '2025-06-10',
    scheme: 'PM SVANidhi',
    expectedDate: '2025-06-20'
  },
  {
    id: '2',
    applicationNumber: 'SVN2024089',
    amount: 15000,
    status: 'Approved',
    appliedDate: '2025-05-20',
    scheme: 'PM SVANidhi',
    expectedDate: '2025-06-25'
  },
  {
    id: '3',
    applicationNumber: 'SVN2024076',
    amount: 10000,
    status: 'Disbursed',
    appliedDate: '2025-04-15',
    scheme: 'PM SVANidhi'
  }
];

export const LoanStatusCard: React.FC = () => {
  const handleVisitGovernmentSite = () => {
    window.open('https://pmsvanidhi.mohua.gov.in/', '_blank');
  };

  return (
    <TooltipProvider>
      <Card className="bg-slate-800/60 backdrop-blur-lg border border-slate-700/50 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl font-bold text-white">
            Loan Status Tracker
          </CardTitle>
          <Button 
            onClick={handleVisitGovernmentSite}
            variant="outline"
            size="sm"
            className="bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Official Portal
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {dummyLoanData.map((loan) => {
            const config = statusConfig[loan.status];
            const StatusIcon = config.icon;
            
            return (
              <Tooltip key={loan.id}>
                <TooltipTrigger asChild>
                  <div className={cn(
                    "p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]",
                    config.color
                  )}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <StatusIcon className="h-5 w-5" />
                        <div>
                          <p className="font-medium text-white text-sm">{loan.scheme}</p>
                          <p className="text-xs text-slate-400">#{loan.applicationNumber}</p>
                        </div>
                      </div>
                      <Badge className={cn(config.badgeClass, "border text-xs")}>
                        {loan.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-3 w-3 text-slate-400" />
                        <div>
                          <p className="text-slate-400">Amount</p>
                          <p className="text-white font-medium">₹{loan.amount.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        <div>
                          <p className="text-slate-400">
                            {loan.status === 'Disbursed' ? 'Disbursed' : 'Applied'}
                          </p>
                          <p className="text-white font-medium">{loan.appliedDate}</p>
                        </div>
                      </div>
                    </div>

                    {loan.expectedDate && loan.status !== 'Disbursed' && (
                      <div className="mt-2 pt-2 border-t border-slate-600/30">
                        <p className="text-xs text-slate-400">
                          Expected by: <span className="text-white">{loan.expectedDate}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm max-w-xs">{config.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
          
          {dummyLoanData.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-400">No loan applications found</p>
              <p className="text-slate-500 text-sm mt-1">Submit your first application to get started</p>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
