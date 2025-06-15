
import React, { useState, useEffect } from 'react';
import { VendorDashboardHeader } from '@/components/vendor/VendorDashboardHeader';
import ReviewInsights from '@/components/notifications/ReviewInsights';
import EmergencyAlerts from '@/components/notifications/EmergencyAlerts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BuyerReviewCard from '@/components/notifications/BuyerReviewCard';
import { buyerReviews as initialBuyerReviews, emergencyAlerts as initialEmergencyAlerts, systemNotifications as initialSystemUpdates } from '@/data/notifications';
import SystemUpdates from '@/components/notifications/SystemUpdates';
import { Star, AlertTriangle, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NotificationsPage = () => {
    const { toast } = useToast();

    const [reviews, setReviews] = useState(initialBuyerReviews);
    const [alerts, setAlerts] = useState(initialEmergencyAlerts);
    const [updates, setUpdates] = useState(initialSystemUpdates);

    useEffect(() => {
        const totalCount = reviews.length + alerts.length + updates.length;
        window.dispatchEvent(new CustomEvent('notifications-updated', { detail: { count: totalCount } }));
    }, [reviews, alerts, updates]);

    const handleMarkAllAsRead = () => {
        setReviews([]);
        setAlerts([]);
        setUpdates([]);
        toast({
            title: "All caught up!",
            description: "All notifications have been marked as read.",
        });
    };

    const handleReply = (reviewId: string) => {
        setReviews(currentReviews => currentReviews.filter(r => r.id !== reviewId));
    };

    return (
        <div className="min-h-screen bg-slate-900 text-gray-200">
            <VendorDashboardHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8 animate-fade-in-up">
                    <div>
                        <h2 className="text-3xl font-bold font-display gradient-text mb-2">Notifications</h2>
                        <p className="text-slate-400">Your central hub for reviews, alerts, and updates.</p>
                    </div>
                    <Button variant="ghost" className="text-slate-400 hover:bg-slate-800 hover:text-white" onClick={handleMarkAllAsRead}>Mark all as read</Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Tabs defaultValue="reviews" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 p-1 h-auto">
                                <TabsTrigger value="reviews" className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-white text-slate-300 hover:bg-slate-700/80 hover:text-white">
                                    <Star className="w-4 h-4 mr-2" /> Reviews <Badge className="ml-2 bg-green-500/20 text-green-300">{reviews.length}</Badge>
                                </TabsTrigger>
                                <TabsTrigger value="alerts" className="data-[state=active]:bg-red-900/40 data-[state=active]:text-white text-slate-300 hover:bg-slate-700/80 hover:text-white">
                                    <AlertTriangle className="w-4 h-4 mr-2" /> Alerts <Badge className="ml-2 bg-red-500/20 text-red-300">{alerts.length}</Badge>
                                </TabsTrigger>
                                <TabsTrigger value="updates" className="data-[state=active]:bg-blue-900/40 data-[state=active]:text-white text-slate-300 hover:bg-slate-700/80 hover:text-white">
                                    <Bell className="w-4 h-4 mr-2" /> Updates <Badge className="ml-2 bg-blue-500/20 text-blue-300">{updates.length}</Badge>
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="reviews" className="mt-6 space-y-4">
                                {reviews.length > 0 ? reviews.map(review => (
                                    <BuyerReviewCard key={review.id} review={review} onReply={handleReply} />
                                )) : (
                                    <div className="text-center text-slate-500 py-10">
                                        <p>No new reviews.</p>
                                    </div>
                                )}
                            </TabsContent>
                            <TabsContent value="alerts" className="mt-6">
                                <EmergencyAlerts alerts={alerts} />
                            </TabsContent>
                            <TabsContent value="updates" className="mt-6">
                                <SystemUpdates updates={updates} />
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <ReviewInsights />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NotificationsPage;
