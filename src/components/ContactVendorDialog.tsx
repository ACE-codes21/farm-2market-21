
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, QrCode, Copy } from 'lucide-react';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface ContactVendorDialogProps {
  product: Product;
  children: React.ReactNode;
}

export const ContactVendorDialog: React.FC<ContactVendorDialogProps> = ({ 
  product, 
  children 
}) => {
  const [showQR, setShowQR] = useState(false);
  const { toast } = useToast();

  const handleWhatsAppContact = () => {
    if (product.vendor?.phone) {
      const message = `Hi! I'm interested in ${product.name} from your F2M listing.`;
      const whatsappUrl = `https://wa.me/${product.vendor.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handlePhoneCall = () => {
    if (product.vendor?.phone) {
      window.location.href = `tel:${product.vendor.phone}`;
    }
  };

  const copyUpiId = () => {
    if (product.vendor?.upiId) {
      navigator.clipboard.writeText(product.vendor.upiId);
      toast({
        title: "UPI ID Copied",
        description: "UPI ID copied to clipboard",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Contact Vendor
            <Badge variant="secondary">{product.vendor?.name || 'Vendor'}</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Contact vendor for: <span className="font-medium">{product.name}</span>
          </div>
          
          {/* Contact Options */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={handleWhatsAppContact}
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4 text-green-600" />
              WhatsApp
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handlePhoneCall}
              className="flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Call
            </Button>
          </div>

          {/* UPI Payment Section */}
          {product.vendor?.upiId && (
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Payment Options</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowQR(!showQR)}
                  className="flex items-center gap-1"
                >
                  <QrCode className="h-4 w-4" />
                  {showQR ? 'Hide QR' : 'Show QR'}
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <code className="bg-muted px-2 py-1 rounded text-sm flex-1">
                  {product.vendor.upiId}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyUpiId}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              {showQR && product.vendor.upiQrCode && (
                <div className="flex justify-center">
                  <img 
                    src={product.vendor.upiQrCode} 
                    alt="UPI QR Code" 
                    className="w-48 h-48 border rounded-lg"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
