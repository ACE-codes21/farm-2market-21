
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { applications, Application } from '@/data/services';
import { CheckCircle, Clock, XCircle, FileText, Eye, Calendar, AlertCircle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusConfig = {
  Approved: { 
    icon: CheckCircle, 
    color: 'text-green-400', 
    bg: 'bg-green-500/10 border-green-400/30',
    progress: 100,
    description: 'Your application has been approved successfully!'
  },
  'In Review': { 
    icon: Clock, 
    color: 'text-yellow-400', 
    bg: 'bg-yellow-500/10 border-yellow-400/30',
    progress: 65,
    description: 'Application is under review by our team'
  },
  Rejected: { 
    icon: XCircle, 
    color: 'text-red-400', 
    bg: 'bg-red-500/10 border-red-400/30',
    progress: 100,
    description: 'Application was not approved. Check recommendations.'
  },
};

const ApplicationTracker: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [refreshTime, setRefreshTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setRefreshTime(new Date().toLocaleTimeString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const handleViewDetails = (app: Application) => {
    setSelectedApp(app);
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Header */}
      <Card className="dark-modern-card animate-fade-in bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-lg border border-slate-600/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <FileText className="h-6 w-6 text-blue-400"/>
              </div>
              Application Status Tracker
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <TrendingUp className="h-4 w-4" />
              Last updated: {refreshTime}
            </div>
          </CardTitle>
          <p className="text-slate-300">Monitor your application progress in real-time</p>
        </CardHeader>
      </Card>

      {/* Applications Grid */}
      <div className="grid gap-4">
        {applications.map((app) => {
          const config = statusConfig[app.status];
          const Icon = config.icon;
          
          return (
            <Card key={app.id} className="dark-modern-card animate-fade-in hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className={cn("rounded-lg border p-4", config.bg)}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2 rounded-lg", config.bg)}>
                        <Icon className={cn("h-5 w-5", config.color)} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">{app.schemeName}</h3>
                        <p className="text-sm text-slate-400">Application #{app.id.replace('app-', 'SVN202500')}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={cn("text-sm font-medium", config.color, config.bg)}>
                      <Icon className="mr-2 h-4 w-4" /> 
                      {app.status}
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Progress</span>
                      <span className={config.color}>{config.progress}%</span>
                    </div>
                    <Progress value={config.progress} className="h-2 bg-slate-700/50" />
                  </div>

                  <p className="text-sm text-slate-300 mb-4">{config.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="text-slate-400">Submitted</p>
                        <p className="text-white font-medium">{getTimeAgo(app.submittedDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="text-slate-400">Last Update</p>
                        <p className="text-white font-medium">{getTimeAgo(app.lastUpdate)}</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleViewDetails(app)}
                    variant="outline" 
                    size="sm" 
                    className="w-full bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* No Applications State */}
      {applications.length === 0 && (
        <Card className="dark-modern-card">
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-300 mb-2">No Applications Yet</h3>
            <p className="text-slate-400 mb-4">You haven't submitted any applications. Start by exploring available schemes.</p>
            <Button className="bg-green-600 hover:bg-green-700">
              Explore Schemes
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Detail Modal */}
      {selectedApp && (
        <Card className="dark-modern-card fixed inset-4 z-50 overflow-auto animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Application Details</CardTitle>
            <Button 
              onClick={() => setSelectedApp(null)}
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white"
            >
              ✕
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Scheme Name</p>
                <p className="text-white font-medium">{selectedApp.schemeName}</p>
              </div>
              <div>
                <p className="text-slate-400">Status</p>
                <Badge className={statusConfig[selectedApp.status].color}>
                  {selectedApp.status}
                </Badge>
              </div>
              <div>
                <p className="text-slate-400">Submitted Date</p>
                <p className="text-white font-medium">{selectedApp.submittedDate}</p>
              </div>
              <div>
                <p className="text-slate-400">Last Update</p>
                <p className="text-white font-medium">{selectedApp.lastUpdate}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <p className="text-slate-300">
                {statusConfig[selectedApp.status].description}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApplicationTracker;
