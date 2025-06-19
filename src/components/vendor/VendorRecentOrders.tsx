
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/types';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';

interface VendorRecentOrdersProps {
  orders: Order[];
}

export const VendorRecentOrders: React.FC<VendorRecentOrdersProps> = ({
  orders
}) => {
  const { t } = useLanguage();
  
  return (
    <Card className="dark-glass-effect border-slate-700">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">{t('vendor.recentOrders')}</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-slate-700 rounded-lg hover:bg-slate-800/50 transition-colors">
                <div>
                  <p className="font-medium text-slate-100">{t('order.orderNumber')} #{String(order.id).substring(0, 8)}</p>
                  <p className="text-sm text-slate-400">{order.created_at ? format(new Date(order.created_at), 'dd MMM yyyy, p') : ''}</p>
                  <p className="text-sm text-slate-400">
                    {order.order_items?.reduce((sum, item) => sum + item.quantity, 0) || 0} {t('cart.items')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-stone-300">₹{order.total_amount || 0}</p>
                  <Badge variant="default" className="text-green-400 border-green-500/30 capitalize bg-slate-800">
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-center py-8">{t('vendor.noOrders')}</p>
        )}
      </CardContent>
    </Card>
  );
};
