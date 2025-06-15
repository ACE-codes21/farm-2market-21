
import React from 'react';
import { UserMenu } from '../UserMenu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from 'react-router-dom';

interface VendorDashboardHeaderProps {
  // onRoleChange is no longer passed as it's handled in UserMenuItems
}

export const VendorDashboardHeader: React.FC<VendorDashboardHeaderProps> = () => {
  return (
    <header className="dark-glass-effect border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold font-display">
              <span className="text-green-500">Vendor</span>
              <span className="text-white"> Dashboard</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="#">
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent text-slate-300 hover:bg-slate-700/50 hover:text-white`}>
                      Analytics
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="#">
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent text-slate-300 hover:bg-slate-700/50 hover:text-white`}>
                      Marketing
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="#">
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent text-slate-300 hover:bg-slate-700/50 hover:text-white`}>
                      Settings
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
