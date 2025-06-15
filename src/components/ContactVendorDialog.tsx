
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, QrCode, Copy, ExternalLink } from 'lucide-react';
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
      const message = `Hi! I'm interested in ${product.name} from your Farm2Market listing. Price: ₹${product.price}`;
      const whatsappUrl = `https://wa.me/${product.vendor.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Opening WhatsApp",
        description: "Redirecting to WhatsApp to contact vendor",
      });
    }
  };

  const handlePhoneCall = () => {
    if (product.vendor?.phone) {
      window.location.href = `tel:${product.vendor.phone}`;
      
      toast({
        title: "Opening Phone",
        description: "Initiating call to vendor",
      });
    }
  };

  const copyUpiId = () => {
    if (product.vendor?.upiId) {
      navigator.clipboard.writeText(product.vendor.upiId);
      toast({
        title: "UPI ID Copied",
        description: "UPI ID copied to clipboard. You can now paste it in your payment app.",
      });
    }
  };

  const openUpiApp = () => {
    if (product.vendor?.upiId) {
      // Create UPI payment link with product info
      const upiUrl = `upi://pay?pa=${product.vendor.upiId}&pn=${encodeURIComponent(product.vendor.name || 'Vendor')}&am=${product.price}&cu=INR&tn=${encodeURIComponent(`Payment for ${product.name}`)}`;
      window.location.href = upiUrl;
      
      toast({
        title: "Opening UPI App",
        description: "Opening your default UPI payment app",
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
          <DialogTitle className="flex items-center gap-2 mb-2">
            Contact Vendor
            <Badge variant="secondary" className="text-xs">
              {product.vendor?.name || 'Vendor'}
            </Badge>
          </DialogTitle>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Product: <span className="font-medium text-foreground">{product.name}</span></p>
            <p>Price: <span className="font-medium text-foreground">₹{product.price}</span></p>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          
          {/* Contact Options */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">Contact Options</h4>
            <div className="grid grid-cols-1 gap-3">
              <Button 
                variant="outline" 
                onClick={handleWhatsAppContact}
                className="flex items-center gap-3 justify-start p-4 h-auto border-green-200 hover:border-green-400 hover:bg-green-50 transition-colors"
              >
                <MessageCircle className="h-5 w-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium">WhatsApp</div>
                  <div className="text-xs text-muted-foreground">Chat with vendor</div>
                </div>
                <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handlePhoneCall}
                className="flex items-center gap-3 justify-start p-4 h-auto border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                <Phone className="h-5 w-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium">Call Vendor</div>
                  <div className="text-xs text-muted-foreground">{product.vendor?.phone || 'Contact number'}</div>
                </div>
                <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
              </Button>
            </div>
          </div>

          {/* UPI Payment Section */}
          {product.vendor?.upiId && (
            <div className="border rounded-lg p-4 space-y-4 bg-purple-50/50">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm text-gray-700">Payment Options</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowQR(!showQR)}
                  className="flex items-center gap-1 text-xs"
                >
                  <QrCode className="h-4 w-4" />
                  {showQR ? 'Hide QR' : 'Show QR'}
                </Button>
              </div>

              {/* Quick Pay Button */}
              <Button
                onClick={openUpiApp}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Pay ₹{product.price} via UPI
              </Button>
              
              {/* UPI ID Display */}
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">UPI ID:</div>
                <div className="flex items-center gap-2 p-2 bg-white border rounded">
                  <code className="text-sm flex-1 font-mono">
                    {product.vendor.upiId}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyUpiId}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* QR Code Display */}
              {showQR && product.vendor.upiQrCode && (
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-xs text-muted-foreground">Scan QR Code:</div>
                  <div className="p-3 bg-white border rounded-lg">
                    <img 
                      src={product.vendor.upiQrCode} 
                      alt="UPI QR Code for payment" 
                      className="w-48 h-48 object-contain"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    Scan with any UPI app to pay ₹{product.price}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Helper Text */}
          <div className="text-xs text-muted-foreground bg-gray-50 p-3 rounded-lg">
            💡 Tip: Contact the vendor before making payment to confirm availability and delivery details.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
