
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/types';
import { format } from 'date-fns';

interface VendorRecentOrdersProps {
  orders: Order[];
}

export const VendorRecentOrders: React.FC<VendorRecentOrdersProps> = ({ orders }) => {
  return (
    <Card className="dark-glass-effect border-slate-700">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50">
                <div>
                  <p className="font-medium text-card-foreground">Order #{String(order.id).substring(0, 8)}</p>
                  <p className="text-sm text-muted-foreground">{order.created_at ? format(new Date(order.created_at), 'dd MMM yyyy, p') : ''}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.order_items?.reduce((sum, item) => sum + item.quantity, 0) || 0} items
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-primary">₹{order.total_amount || 0}</p>
                  <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30 capitalize">
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">No orders yet</p>
        )}
      </CardContent>
    </Card>
  );
};
