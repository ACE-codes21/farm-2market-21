
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tag, Check, X } from 'lucide-react';

interface Coupon {
  code: string;
  discount: number;
  description: string;
}

interface CouponSectionProps {
  couponCode: string;
  setCouponCode: (code: string) => void;
  appliedCoupon: Coupon | null;
  handleApplyCoupon: () => void;
  handleRemoveCoupon: () => void;
  availableCoupons: Coupon[];
}

export const CouponSection: React.FC<CouponSectionProps> = ({
  couponCode,
  setCouponCode,
  appliedCoupon,
  handleApplyCoupon,
  handleRemoveCoupon,
  availableCoupons,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-white flex items-center gap-2">
        <Tag className="h-4 w-4" />
        {t('buy_now_dialog.coupon_code')}
      </label>

      {!appliedCoupon ? (
        <div className="flex gap-2">
          <Input
            placeholder={t('buy_now_dialog.coupon_code')}
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="bg-slate-700/50 border-slate-600/30 text-white placeholder:text-slate-400"
          />
          <Button
            variant="outline"
            onClick={handleApplyCoupon}
            disabled={!couponCode.trim()}
            className="bg-slate-700/50 border-slate-600/30 text-slate-300 hover:bg-slate-600/50 hover:text-white"
          >
            {t('buy_now_dialog.apply')}
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-400" />
            <span className="text-sm font-medium text-white">{appliedCoupon.code}</span>
            <span className="text-xs text-green-400">-{appliedCoupon.discount}%</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemoveCoupon}
            className="text-slate-400 hover:text-red-400"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-2">
        {availableCoupons.slice(0, 2).map((coupon) => (
          <div
            key={coupon.code}
            className="p-2 bg-slate-700/30 rounded-lg border border-slate-600/30 cursor-pointer hover:bg-slate-600/30 transition-colors"
            onClick={() => setCouponCode(coupon.code)}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-green-400">{coupon.code}</span>
              <span className="text-xs text-slate-400">{coupon.discount}% OFF</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">{coupon.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
