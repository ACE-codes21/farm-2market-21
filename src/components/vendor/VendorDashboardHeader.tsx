
import React from 'react';
import { Button } from '@/components/ui/button';

interface VendorDashboardHeaderProps {
  onRoleChange: () => void;
}

export const VendorDashboardHeader: React.FC<VendorDashboardHeaderProps> = ({ onRoleChange }) => {
  return (
    <header className="bg-background shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold font-display text-foreground">Vendor Dashboard</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={onRoleChange}
            className="font-semibold"
          >
            Switch Role
          </Button>
        </div>
      </div>
    </header>
  );
};
