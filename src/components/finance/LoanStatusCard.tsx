
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
    color: 'bg-yellow-500/10 text-yellow-300 border-yellow-400/30',
    badgeClass: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
  },
  'Approved': {
    icon: CheckCircle,
    color: 'bg-green-500/10 text-green-300 border-green-400/30',
    badgeClass: 'bg-green-500/20 text-green-300 border-green-500/40'
  },
  'Disbursed': {
    icon: CreditCard,
    color: 'bg-blue-500/10 text-blue-300 border-blue-400/30',
    badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
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
    <Card className="bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-white">
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
            <div 
              key={loan.id}
              className={`p-3 rounded-lg border ${config.color}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <StatusIcon className="h-4 w-4" />
                  <span className="font-medium text-white text-sm">
                    {loan.scheme}
                  </span>
                </div>
                <Badge className={`${config.badgeClass} border text-xs`}>
                  {loan.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
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
          <div className="text-center py-6">
            <p className="text-slate-400 text-sm">No loan applications found</p>
            <p className="text-slate-500 text-xs mt-1">Submit your first application to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
