
import React, { useState } from 'react';
import RoleSelectionModal from '@/components/RoleSelectionModal';
import VendorDashboard from '@/components/VendorDashboard';
import BuyerDashboard from '@/components/BuyerDashboard';

type UserRole = 'vendor' | 'buyer' | null;

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);

  const handleRoleSelect = (role: 'vendor' | 'buyer') => {
    setUserRole(role);
  };

  const handleRoleChange = () => {
    setUserRole(null);
  };

  if (userRole === 'vendor') {
    return <VendorDashboard onRoleChange={handleRoleChange} />;
  }

  if (userRole === 'buyer') {
    return <BuyerDashboard onRoleChange={handleRoleChange} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
      <RoleSelectionModal 
        isOpen={userRole === null} 
        onRoleSelect={handleRoleSelect} 
      />
      
      {/* Background content */}
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
          Welcome to MarketPlace
        </h1>
        <p className="text-xl text-gray-600 mb-8 animate-fade-in">
          Your one-stop destination for buying and selling amazing products
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg animate-fade-in">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">For Vendors</h3>
            <p className="text-gray-600">
              Manage your products, track sales, and grow your business with our comprehensive vendor tools.
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg animate-fade-in">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">For Buyers</h3>
            <p className="text-gray-600">
              Discover amazing products, compare prices, and enjoy a seamless shopping experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
