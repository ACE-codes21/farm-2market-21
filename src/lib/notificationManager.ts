
import { buyerReviews, emergencyAlerts, systemNotifications, BuyerReview, EmergencyAlert, SystemNotification } from '@/data/notifications';

const READ_IDS_KEY = 'farm2market-read-notification-ids';

export const getReadIds = (): string[] => {
    try {
        const stored = sessionStorage.getItem(READ_IDS_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Could not parse read notification IDs from sessionStorage", error);
        return [];
    }
};

const setReadIds = (ids: string[]) => {
    try {
        sessionStorage.setItem(READ_IDS_KEY, JSON.stringify(ids));
    } catch (error) {
        console.error("Could not set read notification IDs in sessionStorage", error);
    }
};

export const getUnreadNotifications = () => {
    const readIds = getReadIds();
    const unreadReviews = buyerReviews.filter(n => !readIds.includes(n.id));
    const unreadAlerts = emergencyAlerts.filter(n => !readIds.includes(n.id));
    const unreadUpdates = systemNotifications.filter(n => !readIds.includes(n.id));
    
    const result = {
        reviews: unreadReviews,
        alerts: unreadAlerts,
        updates: unreadUpdates,
        count: unreadReviews.length + unreadAlerts.length + unreadUpdates.length
    };
    
    console.log('getUnreadNotifications result:', result);
    return result;
};

export const markAllAsRead = () => {
    const allIds = [
        ...buyerReviews.map(r => r.id),
        ...emergencyAlerts.map(a => a.id),
        ...systemNotifications.map(u => u.id),
    ];
    const currentReadIds = getReadIds();
    const newReadIds = Array.from(new Set([...currentReadIds, ...allIds]));
    setReadIds(newReadIds);
    
    // Dispatch custom event to update notification count
    console.log('markAllAsRead: dispatching notifications-updated event');
    window.dispatchEvent(new CustomEvent('notifications-updated', { 
        detail: { count: 0 } 
    }));
};

export const markAsRead = (id: string) => {
    const readIds = getReadIds();
    if (!readIds.includes(id)) {
        setReadIds([...readIds, id]);
        
        // Dispatch custom event to update notification count
        const newCount = getUnreadNotifications().count;
        console.log('markAsRead: dispatching notifications-updated event with count:', newCount);
        window.dispatchEvent(new CustomEvent('notifications-updated', { 
            detail: { count: newCount } 
        }));
    }
};
