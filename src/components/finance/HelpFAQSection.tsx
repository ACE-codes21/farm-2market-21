
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, ExternalLink, Phone, Mail, MessageCircle } from 'lucide-react';

export const HelpFAQSection: React.FC = () => {
  const handleContactSupport = () => {
    // This would typically open a support chat or modal
    console.log('Opening support chat...');
  };

  const handleCallSupport = () => {
    window.open('tel:+911800123456', '_self');
  };

  const handleEmailSupport = () => {
    window.open('mailto:support@farm2market.com', '_self');
  };

  return (
    <Card className="bg-slate-800/80 backdrop-blur-lg border border-slate-700/50 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600">
              <HelpCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-white">Need Help?</CardTitle>
              <p className="text-sm text-slate-400">Get support with your loan application</p>
            </div>
          </div>
          <Badge variant="outline" className="text-green-300 border-green-400/30">
            24/7 Support
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            onClick={handleContactSupport}
            className="h-auto p-4 bg-slate-700/30 border-slate-600 text-slate-300 hover:bg-green-600/20 hover:border-green-500/50 hover:text-white flex flex-col items-center gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            <div className="text-center">
              <p className="font-medium">Live Chat</p>
              <p className="text-xs text-slate-400">Get instant help</p>
            </div>
          </Button>

          <Button
            variant="outline"
            onClick={handleCallSupport}
            className="h-auto p-4 bg-slate-700/30 border-slate-600 text-slate-300 hover:bg-green-600/20 hover:border-green-500/50 hover:text-white flex flex-col items-center gap-2"
          >
            <Phone className="h-5 w-5" />
            <div className="text-center">
              <p className="font-medium">Call Support</p>
              <p className="text-xs text-slate-400">1800-123-456</p>
            </div>
          </Button>

          <Button
            variant="outline"
            onClick={handleEmailSupport}
            className="h-auto p-4 bg-slate-700/30 border-slate-600 text-slate-300 hover:bg-green-600/20 hover:border-green-500/50 hover:text-white flex flex-col items-center gap-2"
          >
            <Mail className="h-5 w-5" />
            <div className="text-center">
              <p className="font-medium">Email Us</p>
              <p className="text-xs text-slate-400">support@farm2market.com</p>
            </div>
          </Button>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">
              View our comprehensive FAQ and documentation
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open('/help', '_blank')}
              className="text-green-400 hover:text-green-300 hover:bg-green-600/20 flex items-center gap-1"
            >
              <ExternalLink className="h-4 w-4" />
              Help Center
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
