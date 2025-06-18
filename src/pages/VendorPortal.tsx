
import React from 'react';
import { useNavigate } from 'react-router-dom';
import VendorDashboard from '@/components/VendorDashboard';
import { useVendorProducts } from '@/hooks/useVendorProducts';
import { useVendorOrders } from '@/hooks/useVendorOrders';
import { VendorDashboardSkeleton } from '@/components/vendor/VendorDashboardSkeleton';
import { useSecureAuth } from '@/hooks/useSecureAuth';

const VendorPortal = () => {
  const navigate = useNavigate();
  const { user, role, isLoading: isAuthLoading, isAuthenticated } = useSecureAuth();
  const { data: orders, isLoading: isLoadingOrders } = useVendorOrders();
  const { 
    products, 
    isLoadingProducts, 
    addProduct, 
    editProduct, 
    deleteProduct 
  } = useVendorProducts();

  if (isAuthLoading || isLoadingProducts || isLoadingOrders) {
    return <VendorDashboardSkeleton />;
  }

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    console.log('User not authenticated, redirecting to homepage');
    navigate('/');
    return null;
  }

  // Redirect if user is not a vendor
  if (role !== 'vendor') {
    console.log('User is not a vendor, redirecting based on role');
    if (role === 'buyer') {
      navigate('/buyer');
    } else {
      navigate('/');
    }
    return null;
  }

  console.log('Rendering vendor portal for authenticated vendor');
  return (
    <VendorDashboard 
      products={products}
      orders={orders || []}
      onAddProduct={addProduct}
      onEditProduct={editProduct}
      onDeleteProduct={deleteProduct}
    />
  );
};

export default VendorPortal;
