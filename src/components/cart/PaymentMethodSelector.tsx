
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Smartphone, Wallet, Truck, CheckCircle } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: typeof CreditCard;
  color: string;
}

interface PaymentMethodSelectorProps {
  selectedPaymentMethod: string;
  onSelectPaymentMethod: (methodId: string) => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedPaymentMethod,
  onSelectPaymentMethod,
}) => {
  const paymentMethods: PaymentMethod[] = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, color: 'blue' },
    { id: 'upi', name: 'UPI Payment', icon: Smartphone, color: 'green' },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet, color: 'purple' },
    { id: 'cod', name: 'Pay on Delivery', icon: Truck, color: 'orange' }
  ];

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-white">Payment Method</h4>
      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <Button
              key={method.id}
              variant="outline"
              onClick={() => onSelectPaymentMethod(method.id)}
              className={`w-full flex items-center gap-3 justify-start p-4 h-auto transition-all ${
                selectedPaymentMethod === method.id
                  ? 'bg-green-500/20 border-green-500/50 text-white'
                  : 'bg-slate-700/30 border-slate-600/30 text-slate-300 hover:bg-slate-600/30'
              }`}
            >
              <Icon className={`h-5 w-5 ${
                method.color === 'blue' ? 'text-blue-400' :
                method.color === 'green' ? 'text-green-400' :
                method.color === 'purple' ? 'text-purple-400' :
                'text-orange-400'
              }`} />
              <span className="font-medium">{method.name}</span>
              {selectedPaymentMethod === method.id && (
                <CheckCircle className="h-4 w-4 text-green-400 ml-auto" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
