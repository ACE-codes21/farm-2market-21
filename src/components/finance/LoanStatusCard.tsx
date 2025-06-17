
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, CreditCard, ExternalLink } from 'lucide-react';

interface LoanStatus {
  id: string;
  applicationNumber: string;
  amount: number;
  status: 'Under Review' | 'Approved' | 'Disbursed';
  appliedDate: string;
  scheme: string;
}

const statusConfig = {
  'Under Review': {
    icon: Clock,
    color: 'bg-yellow-500/10 text-yellow-400 border-yellow-400/20',
    badgeVariant: 'secondary' as const
  },
  'Approved': {
    icon: CheckCircle,
    color: 'bg-green-500/10 text-green-400 border-green-400/20',
    badgeVariant: 'default' as const
  },
  'Disbursed': {
    icon: CreditCard,
    color: 'bg-blue-500/10 text-blue-400 border-blue-400/20',
    badgeVariant: 'default' as const
  }
};

const dummyLoanData: LoanStatus[] = [
  {
    id: '1',
    applicationNumber: 'SVN2025001',
    amount: 25000,
    status: 'Under Review',
    appliedDate: '2025-06-10',
    scheme: 'PM SVANidhi'
  },
  {
    id: '2',
    applicationNumber: 'SVN2024089',
    amount: 15000,
    status: 'Approved',
    appliedDate: '2025-05-20',
    scheme: 'PM SVANidhi'
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
    <Card className="dark-modern-card card-hover-elevate">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold font-display gradient-text">
          Loan Status Tracker
        </CardTitle>
        <Button 
          onClick={handleVisitGovernmentSite}
          variant="outline"
          size="sm"
          className="dark-elegant-input text-slate-300 hover:text-white"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Official Portal
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {dummyLoanData.map((loan, index) => {
          const config = statusConfig[loan.status];
          const StatusIcon = config.icon;
          
          return (
            <div 
              key={loan.id}
              className={`p-4 rounded-xl border animate-fade-in-up ${config.color}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <StatusIcon className="h-5 w-5" />
                  <span className="font-medium text-white">
                    {loan.scheme}
                  </span>
                </div>
                <Badge variant={config.badgeVariant}>
                  {loan.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Application No.</p>
                  <p className="text-white font-medium">{loan.applicationNumber}</p>
                </div>
                <div>
                  <p className="text-slate-400">Amount</p>
                  <p className="text-white font-medium">₹{loan.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-slate-400">Applied Date</p>
                  <p className="text-white font-medium">{loan.appliedDate}</p>
                </div>
                <div>
                  <p className="text-slate-400">Status</p>
                  <p className="text-white font-medium">{loan.status}</p>
                </div>
              </div>
            </div>
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
  );
};
