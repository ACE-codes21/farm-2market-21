
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BuyerDashboard from '@/components/BuyerDashboard';
import { useSecureAuth } from '@/hooks/useSecureAuth';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, role, isLoading, isAuthenticated } = useSecureAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    console.log('User not authenticated, redirecting to homepage');
    navigate('/');
    return null;
  }

  // Redirect if user is not a buyer
  if (role !== 'buyer') {
    console.log('User is not a buyer, redirecting based on role');
    if (role === 'vendor') {
      navigate('/vendor');
    } else {
      navigate('/');
    }
    return null;
  }

  const handleRoleChange = () => {
    navigate('/');
  };

  console.log('Rendering buyer dashboard for authenticated user');
  return <BuyerDashboard onRoleChange={handleRoleChange} />;
};

export default Dashboard;
