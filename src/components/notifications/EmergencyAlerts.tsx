
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Bell } from 'lucide-react';
import { emergencyAlerts } from '@/data/notifications';
import { useToast } from '@/hooks/use-toast';

const EmergencyAlerts: React.FC = () => {
    const { toast } = useToast();

    const handlePanic = () => {
        toast({
            variant: "destructive",
            title: "Panic Alert Triggered",
            description: "Your location has been shared with emergency contacts and nearby authorities.",
        })
    }

    const handleReport = () => {
        toast({
            title: "Report Incident",
            description: "This feature is coming soon.",
        })
    }

    return (
        <Card className="dark-modern-card border-red-500/20 animate-fade-in">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                    <AlertTriangle /> Safety & Alerts
                </CardTitle>
                <CardDescription>Emergency information and reporting.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {emergencyAlerts.map(alert => (
                        <div key={alert.id} className="flex items-start gap-3 p-3 bg-red-900/20 rounded-lg">
                            <div className="p-2 bg-red-900/50 rounded-full">
                                <Bell className="w-5 h-5 text-red-400" />
                            </div>
                            <div>
                                <p className="font-medium text-white">{alert.type}</p>
                                <p className="text-sm text-slate-300">{alert.message}</p>
                                <p className="text-xs text-slate-500 mt-1">{alert.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="destructive" className="w-full flex items-center gap-2" onClick={handlePanic}>
                        <AlertTriangle className="w-5 h-5" /> Panic Button
                    </Button>
                    <Button variant="outline" className="w-full border-red-400/50 text-red-400 hover:bg-red-900/50 hover:text-red-300" onClick={handleReport}>
                        <AlertTriangle className="w-5 h-5" /> Report Incident
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default EmergencyAlerts;
