import React, { useState, useEffect } from 'react';
import { UserMenu } from '../UserMenu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';
import { getUnreadNotifications } from '@/lib/notificationManager';

interface VendorDashboardHeaderProps {
  // onRoleChange is no longer passed as it's handled in UserMenuItems
}
export const VendorDashboardHeader: React.FC<VendorDashboardHeaderProps> = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    console.log('VendorDashboardHeader: initializing notification count');
    const initialCount = getUnreadNotifications().count;
    console.log('VendorDashboardHeader: initial notification count:', initialCount);
    setNotificationCount(initialCount);

    const handleNotificationsUpdate = (event: CustomEvent) => {
      console.log('VendorDashboardHeader: received notifications-updated event:', event.detail);
      if (typeof event.detail.count === 'number') {
        setNotificationCount(event.detail.count);
      }
    };

    console.log('VendorDashboardHeader: adding event listener');
    window.addEventListener('notifications-updated', handleNotificationsUpdate as EventListener);

    return () => {
      console.log('VendorDashboardHeader: removing event listener');
      window.removeEventListener('notifications-updated', handleNotificationsUpdate as EventListener);
    };
  }, []);

  console.log('VendorDashboardHeader: rendering with notification count:', notificationCount);

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
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/notifications"
              className="relative p-2 rounded-full bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700/60 transition-all duration-300"
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-bold bg-red-500 text-white border-2 border-slate-900"
                >
                  {notificationCount > 99 ? '99+' : notificationCount}
                </Badge>
              )}
            </Link>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>;
};
