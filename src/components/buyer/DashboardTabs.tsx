
import React from 'react';
import { Button } from '@/components/ui/button';
import { Map, Grid3x3, Package } from 'lucide-react';

type ActiveTab = 'products' | 'vendors' | 'orders';

interface DashboardTabsProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabConfig = {
    products: { label: 'Products', icon: Grid3x3 },
    vendors: { label: 'Vendors', icon: Map },
    orders: { label: 'Orders', icon: Package },
  };

  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold font-display gradient-text mb-2">
          {activeTab === 'products' && 'Discover Fresh Market'}
          {activeTab === 'vendors' && 'Discover Vendors'}
          {activeTab === 'orders' && 'My Orders'}
        </h2>
        <p className="text-slate-300">
          {activeTab === 'products' && 'Browse fresh produce from local farmers'}
          {activeTab === 'vendors' && 'Find trusted vendors in your area'}
          {activeTab === 'orders' && 'Track your current and past orders'}
        </p>
      </div>

      <div className="dark-glass-effect rounded-2xl p-2 border border-slate-600/30 inline-flex">
        {(Object.keys(tabConfig) as ActiveTab[]).map(tab => {
          const { label, icon: Icon } = tabConfig[tab];
          return (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'ghost'}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-green-600 to-orange-500 text-white shadow-lg' 
                  : 'hover:bg-slate-700/50 text-slate-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
