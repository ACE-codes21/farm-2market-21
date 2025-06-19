
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Flame } from 'lucide-react';
import { Product } from '@/types';
import { ProductActionsDropdown } from '@/components/ProductActionsDropdown';
import { Switch } from '@/components/ui/switch';
import { FreshForBadge } from './FreshForBadge';
import { Badge } from '@/components/ui/badge';
import { format, isAfter, subHours } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';

interface VendorProductsTableProps {
  products: Product[];
  onAddProductClick: () => void;
  onEditProduct: (product: Product) => void;
  onUpdateProduct: (productId: string, updatedProduct: Partial<Product>) => void;
  onDeleteProduct: (productId: string) => void;
}

export const VendorProductsTable: React.FC<VendorProductsTableProps> = ({
  products,
  onAddProductClick,
  onEditProduct,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  const { t } = useLanguage();
  
  const handleToggleRestock = (product: Product, checked: boolean) => {
    onUpdateProduct(product.id, { restockReminder: checked });
  };

  const getMostDemandedProduct = () => {
    // Simple logic: product with highest stock reduction (assuming initial stock was higher)
    // In a real app, this would be based on actual sales data
    return products.reduce((prev, current) => 
      (prev.stock < current.stock) ? prev : current
    );
  };

  const mostDemanded = products.length > 0 ? getMostDemandedProduct() : null;

  const isProductFresh = (product: Product) => {
    if (!product.created_at) return false;
    const createdDate = new Date(product.created_at);
    const twentyFourHoursAgo = subHours(new Date(), 24);
    return isAfter(createdDate, twentyFourHoursAgo);
  };

  return (
    <Card className="dark-glass-effect border-slate-700 animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-white">{t('vendor.smartInventory')}</CardTitle>
        <Button onClick={onAddProductClick} className="bg-green-500 text-white hover:bg-green-600 btn-hover-glow shadow-green-500/30">
          <Plus className="h-4 w-4 mr-2" />
          {t('vendor.addProduct')}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
              <tr>
                <th scope="col" className="py-3 px-6">{t('vendor.productName')}</th>
                <th scope="col" className="py-3 px-6">{t('vendor.stock')}</th>
                <th scope="col" className="py-3 px-6">{t('vendor.expiryDate')}</th>
                <th scope="col" className="py-3 px-6">{t('vendor.freshFor')}</th>
                <th scope="col" className="py-3 px-6">{t('vendor.status')}</th>
                <th scope="col" className="py-3 px-6">{t('vendor.restockReminder')}</th>
                <th scope="col" className="py-3 px-6 text-right">{t('vendor.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors duration-300">
                  <td className="py-4 px-6 font-medium text-white whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {product.name}
                      {mostDemanded?.id === product.id && (
                        <Flame className="h-4 w-4 text-orange-500" />
                      )}
                      {isProductFresh(product) && (
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          {t('vendor.fresh')}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={product.stock < 10 ? 'text-orange-400 font-medium' : ''}>{product.stock} {t('vendor.units')}</span>
                  </td>
                  <td className="py-4 px-6">
                    {product.expiryDate ? format(new Date(product.expiryDate), 'dd MMM yyyy') : 'N/A'}
                  </td>
                  <td className="py-4 px-6">
                    <FreshForBadge expiryDate={product.expiryDate} />
                  </td>
                  <td className="py-4 px-6">
                    {product.stock < 5 ? (
                      <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
                        {t('vendor.lowStock')}
                      </Badge>
                    ) : product.stock < 10 ? (
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        {t('vendor.runningLow')}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                        {t('vendor.inStock')}
                      </Badge>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <Switch
                      checked={!!product.restockReminder}
                      onCheckedChange={(checked) => handleToggleRestock(product, checked)}
                    />
                  </td>
                  <td className="py-4 px-6 text-right">
                    <ProductActionsDropdown
                      product={product}
                      onEdit={onEditProduct}
                      onDelete={onDeleteProduct}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
