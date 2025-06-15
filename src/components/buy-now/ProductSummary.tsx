
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';

interface ProductSummaryProps {
  product: Product;
}

export const ProductSummary: React.FC<ProductSummaryProps> = ({ product }) => {
  const { t } = useTranslation();

  return (
    <div className="flex gap-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-16 h-16 rounded-xl object-cover ring-1 ring-slate-600/30"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-white">{product.name}</h3>
        <p className="text-sm text-slate-300">₹{product.price} {t('buy_now_dialog.each')}</p>
        <Badge variant="secondary" className="text-xs mt-1 bg-slate-700/50 text-slate-200 border-slate-600/30">
          {product.stock} {t('buy_now_dialog.available')}
        </Badge>
      </div>
    </div>
  );
};
