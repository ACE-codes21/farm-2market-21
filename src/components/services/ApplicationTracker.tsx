
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { applications, Application } from '@/data/services';
import { CheckCircle, Clock, XCircle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusConfig = {
  Approved: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10 border-green-400/30' },
  'In Review': { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-400/30' },
  Rejected: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-400/30' },
};

const ApplicationTracker: React.FC = () => {
  return (
    <Card className="dark-modern-card mt-6 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
            <FileText className="text-green-400"/> My Application Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {applications.map((app) => {
          const config = statusConfig[app.status];
          const Icon = config.icon;
          return (
            <div key={app.id} className={cn("p-4 rounded-lg border flex items-center justify-between", config.bg)}>
                <div>
                    <p className="font-bold text-white">{app.schemeName}</p>
                    <p className="text-xs text-slate-400">Submitted: {app.submittedDate} | Last Update: {app.lastUpdate}</p>
                </div>
                <Badge variant="outline" className={cn("text-sm", config.color, config.bg)}>
                    <Icon className="mr-2 h-4 w-4" /> {app.status}
                </Badge>
            </div>
          )
        })}
      </CardContent>
    </Card>
  );
};

export default ApplicationTracker;
