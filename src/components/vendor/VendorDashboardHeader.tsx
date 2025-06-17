
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  useEffect(() => {
    setNotificationCount(getUnreadNotifications().count);

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
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} nav-link-animated-underline bg-transparent text-slate-300 hover:bg-transparent hover:text-white`}>{t('vendor_dashboard_header.dashboard')}</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/vendor/finance">
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} nav-link-animated-underline bg-transparent text-slate-300 hover:bg-transparent hover:text-white`}>{t('vendor_dashboard_header.finance')}</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/vendor/analytics">
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} nav-link-animated-underline bg-transparent text-slate-300 hover:bg-transparent hover:text-white`}>{t('vendor_dashboard_header.ai_analytics')}</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/vendor/services">
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} nav-link-animated-underline bg-transparent text-slate-300 hover:bg-transparent hover:text-white`}>{t('vendor_dashboard_header.services')}</NavigationMenuLink>
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
