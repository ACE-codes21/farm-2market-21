
import React, { useState, useEffect } from 'react';
import { UserMenu } from '../UserMenu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { buyerReviews, emergencyAlerts, systemNotifications } from '@/data/notifications';

interface VendorDashboardHeaderProps {
  // onRoleChange is no longer passed as it's handled in UserMenuItems
}
export const VendorDashboardHeader: React.FC<VendorDashboardHeaderProps> = () => {
  const [notificationCount, setNotificationCount] = useState(
    buyerReviews.length + emergencyAlerts.length + systemNotifications.length
  );

  useEffect(() => {
    const handleNotificationsUpdate = (event: CustomEvent) => {
      if (typeof event.detail.count === 'number') {
        setNotificationCount(event.detail.count);
      }
    };

    window.addEventListener('notifications-updated', handleNotificationsUpdate as EventListener);

    return () => {
      window.removeEventListener('notifications-updated', handleNotificationsUpdate as EventListener);
    };
  }, []);

  return <header className="dark-glass-effect border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center h-10">
              <h1 className="font-bold font-display">
                <span className="text-green-500 text-xl">Farm</span>
                <span className="text-white text-xl">2Market</span>
              </h1>
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/vendor">
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} nav-link-animated-underline bg-transparent text-slate-300 hover:bg-transparent hover:text-white`}>Dashboard</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/vendor/finance">
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} nav-link-animated-underline bg-transparent text-slate-300 hover:bg-transparent hover:text-white`}>Finance</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/vendor/analytics">
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} nav-link-animated-underline bg-transparent text-slate-300 hover:bg-transparent hover:text-white`}>AI Analytics</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/vendor/services">
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} nav-link-animated-underline bg-transparent text-slate-300 hover:bg-transparent hover:text-white`}>Services</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/vendor/notifications" className="relative">
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} nav-link-animated-underline bg-transparent text-slate-300 hover:bg-transparent hover:text-white`}>Notifications</NavigationMenuLink>
                    {notificationCount > 0 && (
                      <Badge variant="destructive" className="absolute top-1 right-[-8px] h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">
                        {notificationCount}
                      </Badge>
                    )}
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>;
};
