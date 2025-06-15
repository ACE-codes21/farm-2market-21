import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Clock, CheckCircle, Truck, MapPin, Phone, Eye } from 'lucide-react';
import { useBuyerOrders } from '@/hooks/useBuyerOrders';
import { Order, CartItem } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

// Mock tracking data for demonstration
const mockTrackingData = {
  '1': {
    currentStatus: 'confirmed',
    estimatedDelivery: '20-25 min',
    trackingSteps: [{
      status: 'confirmed',
      label: 'Order Confirmed',
      time: '2 min ago',
      completed: true
    }, {
      status: 'preparing',
      label: 'Preparing Your Order',
      time: 'In progress',
      completed: true
    }, {
      status: 'ready',
      label: 'Ready for Pickup/Delivery',
      time: 'Pending',
      completed: false
    }, {
      status: 'delivered',
      label: 'Delivered',
      time: 'Pending',
      completed: false
    }],
    vendor: {
      name: 'Rajesh Kumar Farm',
      phone: '+91-9876543210',
      location: '0.8 km away'
    }
  }
};
interface OrderCardProps {
  order: Order;
  onTrackOrder: (orderId: number | string) => void;
}
const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onTrackOrder
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'preparing':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'delivered':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };
  return <Card className="dark-modern-card border-slate-600/30 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white font-semibold">Order #{order.id}</CardTitle>
            <p className="text-sm text-slate-400 mt-1">{order.date}</p>
          </div>
          <Badge className={`${getStatusColor(order.status)} font-medium`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {order.items?.slice(0, 2).map((item: CartItem, index: number) => <div key={index} className="flex items-center gap-3">
              <img src={item.images[0]} alt={item.name} className="w-12 h-12 rounded-lg object-cover ring-1 ring-slate-600/30" />
              <div className="flex-1">
                <p className="text-white font-medium text-sm truncate">{item.name}</p>
                <p className="text-slate-400 text-xs">Qty: {item.quantity} × ₹{item.price}</p>
              </div>
            </div>)}
          {order.items && order.items.length > 2 && <p className="text-slate-400 text-xs">+{order.items.length - 2} more items</p>}
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
          <div>
            <span className="text-slate-300 text-sm">Total: </span>
            <span className="text-white font-bold text-lg">₹{(order.total || 0).toFixed(2)}</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => onTrackOrder(order.id)} className="bg-slate-700/50 border-slate-600/30 text-slate-300 hover:bg-slate-600/50 hover:text-white">
            <Eye className="h-4 w-4 mr-2" />
            Track Order
          </Button>
        </div>
      </CardContent>
    </Card>;
};
interface OrderTrackingProps {
  order: Order;
  onBack: () => void;
}
const OrderTracking: React.FC<OrderTrackingProps> = ({
  order,
  onBack
}) => {
  const trackingData = mockTrackingData[String(order.id) as keyof typeof mockTrackingData];
  if (!trackingData) {
    return <div className="text-center py-16">
        <p className="text-white text-lg">Tracking information not available</p>
        <Button onClick={onBack} className="mt-4 premium-button">
          Back to Orders
        </Button>
      </div>;
  }
  return <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="dark-modern-card border-slate-600/30 text-white hover:bg-slate-700/50">
          ← Back to Orders
        </Button>
      </div>

      <Card className="dark-modern-card border-slate-600/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-xl">Order #{order.id}</CardTitle>
              <p className="text-slate-300 mt-2">Estimated delivery: {trackingData.estimatedDelivery}</p>
            </div>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 font-medium px-4 py-2">
              {trackingData.currentStatus.charAt(0).toUpperCase() + trackingData.currentStatus.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Vendor Info */}
          <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/30">
            <h4 className="text-white font-medium mb-3">Vendor Information</h4>
            <div className="flex items-center gap-6 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span>{trackingData.vendor.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{trackingData.vendor.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{trackingData.vendor.location}</span>
              </div>
            </div>
          </div>

          {/* Tracking Steps */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Order Progress</h4>
            <div className="space-y-4">
              {trackingData.trackingSteps.map((step, index) => <div key={index} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-500/20 border border-green-500' : 'bg-slate-700/50 border border-slate-600'}`}>
                    {step.completed ? <CheckCircle className="h-4 w-4 text-green-400" /> : <Clock className="h-4 w-4 text-slate-400" />}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${step.completed ? 'text-white' : 'text-slate-300'}`}>
                      {step.label}
                    </p>
                    <p className={`text-sm ${step.completed ? 'text-green-400' : 'text-slate-400'}`}>
                      {step.time}
                    </p>
                  </div>
                </div>)}
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Items Ordered</h4>
            <div className="space-y-3">
              {order.items?.map((item: CartItem, index: number) => <div key={index} className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
                  <img src={item.images[0]} alt={item.name} className="w-16 h-16 rounded-lg object-cover ring-1 ring-slate-600/30" />
                  <div className="flex-1">
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-slate-300 text-sm">Quantity: {item.quantity}</p>
                    <p className="text-slate-400 text-sm">₹{item.price} each</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>)}
            </div>
          </div>

          {/* Order Total */}
          <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/30">
            <div className="flex justify-between text-lg">
              <span className="text-slate-300">Order Total:</span>
              <span className="text-white font-bold">₹{(order.total || 0).toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export const OrdersPage: React.FC = () => {
  const { data: orders = [], isLoading } = useBuyerOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const activeOrders = orders.filter(order => order.status === 'pending' || order.status === 'confirmed');
  const orderHistory = orders.filter(order => order.status === 'delivered' || order.status === 'cancelled');

  const handleTrackOrder = (orderId: number | string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
    }
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);
  };

  if (selectedOrder) {
    return <OrderTracking order={selectedOrder} onBack={handleBackToOrders} />;
  }
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="dark-glass-effect border border-slate-600/30">
            <TabsTrigger value="active" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Active Orders
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Order History
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="dark-modern-card border-slate-600/30">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-48 mt-2" />
                      </div>
                      <Skeleton className="h-6 w-24" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-12 h-12 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-3 w-2/3" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                      <Skeleton className="h-8 w-28" />
                      <Skeleton className="h-9 w-32" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="dark-glass-effect border border-slate-600/30">
          <TabsTrigger value="active" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Active Orders ({activeOrders.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Order History ({orderHistory.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-6">
          {activeOrders.length > 0 ? (
            <div className="grid gap-4">
              {activeOrders.map(order => (
                <OrderCard key={order.id} order={order} onTrackOrder={handleTrackOrder} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="dark-glass-effect p-12 max-w-md mx-auto border border-slate-600/30">
                <Truck className="h-16 w-16 text-slate-500 mx-auto mb-4" />
                <p className="text-2xl font-semibold text-white mb-3">No Active Orders</p>
                <p className="text-slate-300">You don't have any active orders at the moment.</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4 mt-6">
          {orderHistory.length > 0 ? (
            <div className="grid gap-4">
              {orderHistory.map(order => (
                <OrderCard key={order.id} order={order} onTrackOrder={handleTrackOrder} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="dark-glass-effect p-12 max-w-md mx-auto border border-slate-600/30">
                <Package className="h-16 w-16 text-slate-500 mx-auto mb-4" />
                <p className="text-2xl font-semibold text-white mb-3">No Order History</p>
                <p className="text-slate-300">Your completed orders will appear here.</p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
