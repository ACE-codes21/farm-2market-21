
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}

interface PaymentMethodsProps {
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (method: string) => void;
  paymentMethods: PaymentMethod[];
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  paymentMethods,
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-white">{t('payment.method')}</label>
      <div className="grid grid-cols-1 gap-2">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <Button
              key={method.id}
              variant="outline"
              onClick={() => setSelectedPaymentMethod(method.id)}
              className={`flex items-center gap-3 justify-start p-4 h-auto transition-all ${
                selectedPaymentMethod === method.id
                  ? 'bg-green-500/20 border-green-500/50 text-white'
                  : 'bg-slate-700/30 border-slate-600/30 text-slate-300 hover:bg-slate-600/30'
              }`}
            >
              <Icon className={`h-5 w-5 ${
                method.color === 'blue' ? 'text-blue-400' :
                method.color === 'green' ? 'text-green-400' :
                'text-purple-400'
              }`} />
              <span className="font-medium">{method.name}</span>
              {selectedPaymentMethod === method.id && (
                <Check className="h-4 w-4 text-green-400 ml-auto" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
