
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Check } from 'lucide-react';
import { SystemNotification } from '@/data/notifications';
import { Link } from 'react-router-dom';

interface SystemUpdatesProps {
    updates: SystemNotification[];
}

const SystemUpdates: React.FC<SystemUpdatesProps> = ({ updates }) => {
  const getIcon = (title: string) => {
    if (title.toLowerCase().includes('approved')) {
      return <Check className="w-5 h-5 text-green-400" />;
    }
    return <Bell className="w-5 h-5 text-blue-400" />;
  };

  return (
    <Card className="dark-modern-card animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Bell /> System Updates
        </CardTitle>
        <CardDescription>Updates about the app and your services.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {updates.length > 0 ? updates.map(notification => (
            <div key={notification.id} className="flex items-start gap-4 p-3 bg-slate-800/50 rounded-lg">
              <div className="p-2 bg-slate-700/50 rounded-full mt-1">
                  {getIcon(notification.title)}
              </div>
              <div>
                <p className="font-medium text-white">{notification.title}</p>
                <p className="text-sm text-slate-300">{notification.description}</p>
                {notification.link ? (
                    <Link to={notification.link} className="text-xs text-green-400 hover:underline mt-1 inline-block">View Details</Link>
                ) : <div className="h-4" />}
                <p className="text-xs text-slate-500 mt-1">{notification.timestamp}</p>
              </div>
            </div>
          )) : (
              <p className="text-center text-slate-500 py-4">No new updates.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemUpdates;
