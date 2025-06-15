
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { VendorDashboardHeader } from './VendorDashboardHeader';

export const VendorDashboardSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-200">
      <VendorDashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <div className="mb-8">
          <Skeleton className="h-10 w-1/3 mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        
        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="dark-glass-effect border-slate-700 rounded-lg p-6 h-[112px]">
                <div className="flex items-center justify-between h-full">
                    <div>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-8 w-32 mb-2" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-12 w-12 rounded-full" />
                </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Products Table Skeleton */}
            <div className="dark-glass-effect border-slate-700 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-32" />
              </div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </div>
            {/* Recent Orders Skeleton */}
            <div className="dark-glass-effect border-slate-700 rounded-lg p-6">
              <Skeleton className="h-8 w-40 mb-4" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full rounded-lg" />
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            {/* Demand Forecast Skeleton */}
            <div className="dark-glass-effect border-slate-700 rounded-lg p-6 h-36">
                <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-4" />
                </div>
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
