
import React from 'react';
import { VendorDashboardHeader } from '@/components/vendor/VendorDashboardHeader';
import ReviewInsights from '@/components/notifications/ReviewInsights';
import EmergencyAlerts from '@/components/notifications/EmergencyAlerts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BuyerReviewCard from '@/components/notifications/BuyerReviewCard';
import { buyerReviews } from '@/data/notifications';
import SystemUpdates from '@/components/notifications/SystemUpdates';
import { Star, AlertTriangle, Bell } from 'lucide-react';

const NotificationsPage = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-gray-200">
            <VendorDashboardHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8 animate-fade-in-up">
                    <div>
                        <h2 className="text-3xl font-bold font-display gradient-text mb-2">Notifications</h2>
                        <p className="text-slate-400">Your central hub for reviews, alerts, and updates.</p>
                    </div>
                    <Button variant="outline" className="border-slate-600 hover:bg-slate-800">Mark all as read</Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Tabs defaultValue="reviews" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 p-1 h-auto">
                                <TabsTrigger value="reviews" className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-white text-slate-300 hover:bg-slate-700/80 hover:text-white">
                                    <Star className="w-4 h-4 mr-2" /> Reviews <Badge className="ml-2 bg-green-500/20 text-green-300">{buyerReviews.length}</Badge>
                                </TabsTrigger>
                                <TabsTrigger value="alerts" className="data-[state=active]:bg-red-900/40 data-[state=active]:text-white text-slate-300 hover:bg-slate-700/80 hover:text-white">
                                    <AlertTriangle className="w-4 h-4 mr-2" /> Alerts <Badge className="ml-2 bg-red-500/20 text-red-300">2</Badge>
                                </TabsTrigger>
                                <TabsTrigger value="updates" className="data-[state=active]:bg-blue-900/40 data-[state=active]:text-white text-slate-300 hover:bg-slate-700/80 hover:text-white">
                                    <Bell className="w-4 h-4 mr-2" /> Updates <Badge className="ml-2 bg-blue-500/20 text-blue-300">3</Badge>
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="reviews" className="mt-6 space-y-4">
                                {buyerReviews.map(review => (
                                    <BuyerReviewCard key={review.id} review={review} />
                                ))}
                            </TabsContent>
                            <TabsContent value="alerts" className="mt-6">
                                <EmergencyAlerts />
                            </TabsContent>
                            <TabsContent value="updates" className="mt-6">
                                <SystemUpdates />
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <ReviewInsights />
                        <div className="hidden lg:block">
                            <EmergencyAlerts />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NotificationsPage;
