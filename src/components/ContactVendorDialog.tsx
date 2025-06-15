
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, QrCode, Copy, ExternalLink, CreditCard } from 'lucide-react';
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
      <DialogContent className="sm:max-w-md bg-slate-800/95 backdrop-blur-xl border border-slate-600/30 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 mb-3 text-white font-display">
            Contact Vendor
            <Badge variant="secondary" className="text-xs bg-slate-700/50 text-slate-300 border-slate-600/30">
              {product.vendor?.name || 'Vendor'}
            </Badge>
          </DialogTitle>
          <div className="text-sm text-slate-300 space-y-1 bg-slate-700/30 p-3 rounded-lg border border-slate-600/30">
            <p>Product: <span className="font-medium text-white">{product.name}</span></p>
            <p>Price: <span className="font-medium text-white">₹{product.price}</span></p>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          
          {/* Contact Options */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-slate-300">Contact Options</h4>
            <div className="grid grid-cols-1 gap-3">
              <Button 
                variant="outline" 
                onClick={handleWhatsAppContact}
                className="flex items-center gap-3 justify-start p-4 h-auto bg-green-500/10 border-green-500/30 hover:border-green-400 hover:bg-green-500/20 transition-colors text-white"
              >
                <MessageCircle className="h-5 w-5 text-green-400" />
                <div className="text-left">
                  <div className="font-medium">WhatsApp</div>
                  <div className="text-xs text-slate-400">Chat with vendor</div>
                </div>
                <ExternalLink className="h-4 w-4 ml-auto text-slate-400" />
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handlePhoneCall}
                className="flex items-center gap-3 justify-start p-4 h-auto bg-blue-500/10 border-blue-500/30 hover:border-blue-400 hover:bg-blue-500/20 transition-colors text-white"
              >
                <Phone className="h-5 w-5 text-blue-400" />
                <div className="text-left">
                  <div className="font-medium">Call Vendor</div>
                  <div className="text-xs text-slate-400">{product.vendor?.phone || 'Contact number'}</div>
                </div>
                <ExternalLink className="h-4 w-4 ml-auto text-slate-400" />
              </Button>
            </div>
          </div>

          {/* UPI Payment Section */}
          {product.vendor?.upiId && (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm text-slate-300">Payment Options</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowQR(!showQR)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
                >
                  <QrCode className="h-4 w-4" />
                  {showQR ? 'Hide QR' : 'Show QR'}
                </Button>
              </div>

              {/* Quick Pay Button */}
              <Button
                onClick={openUpiApp}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Pay ₹{product.price} via UPI
              </Button>
              
              {/* UPI ID Display */}
              <div className="space-y-2">
                <div className="text-xs text-slate-400">UPI ID:</div>
                <div className="flex items-center gap-2 p-3 bg-slate-800/50 border border-slate-600/30 rounded-lg">
                  <code className="text-sm flex-1 font-mono text-slate-300">
                    {product.vendor.upiId}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyUpiId}
                    className="h-8 w-8 p-0 text-slate-400 hover:text-white"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* QR Code Display */}
              {showQR && product.vendor.upiQrCode && (
                <div className="flex flex-col items-center space-y-3">
                  <div className="text-xs text-slate-400">Scan QR Code:</div>
                  <div className="p-4 bg-slate-800/50 border border-slate-600/30 rounded-lg">
                    <img 
                      src={product.vendor.upiQrCode} 
                      alt="UPI QR Code for payment" 
                      className="w-40 h-40 object-contain"
                    />
                  </div>
                  <div className="text-xs text-slate-400 text-center">
                    Scan with any UPI app to pay ₹{product.price}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Helper Text */}
          <div className="text-xs text-slate-400 bg-slate-700/30 p-3 rounded-lg border border-slate-600/30">
            💡 Tip: Contact the vendor before making payment to confirm availability and delivery details.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
