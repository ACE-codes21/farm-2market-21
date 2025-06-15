
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, ExternalLink } from 'lucide-react';
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
  const { toast } = useToast();

  const handleWhatsAppContact = () => {
    if (product.vendor?.phone) {
      const message = `Hi! I'm interested in ${product.name} from your Farm2Market listing. Price: ₹${product.price}`;
      const whatsappUrl = `https://wa.me/${product.vendor.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      toast({
        title: "Opening WhatsApp",
        description: "Redirecting to WhatsApp to contact vendor"
      });
    }
  };

  const handlePhoneCall = () => {
    if (product.vendor?.phone) {
      window.location.href = `tel:${product.vendor.phone}`;
      toast({
        title: "Opening Phone",
        description: "Initiating call to vendor"
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

          {/* Helper Text */}
          <div className="text-xs text-slate-400 bg-slate-700/30 p-3 rounded-lg border border-slate-600/30">
            💡 Tip: Respect their time, they're busy feeding the city.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
