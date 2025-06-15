
import React from 'react';
import { UserMenu } from '../UserMenu';

interface VendorDashboardHeaderProps {
  // onRoleChange is no longer passed as it's handled in UserMenuItems
}

export const VendorDashboardHeader: React.FC<VendorDashboardHeaderProps> = () => {
  return (
    <header className="glass-effect border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold font-display gradient-text">Vendor Dashboard</h1>
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
