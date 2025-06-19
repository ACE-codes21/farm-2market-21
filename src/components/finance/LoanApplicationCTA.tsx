
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, Smartphone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LoanApplicationCTAProps {
  onOpenApplication: () => void;
}

export const LoanApplicationCTA: React.FC<LoanApplicationCTAProps> = ({ onOpenApplication }) => {
  const { t } = useLanguage();
  
  return (
    <>
      {/* Desktop CTA Card */}
      <Card className="bg-slate-800/60 backdrop-blur-lg border border-slate-700/50 shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-white">{t('finance.applyForLoan')}</CardTitle>
                <p className="text-slate-400 text-sm">{t('finance.unlockLoans')}</p>
              </div>
            </div>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              <Clock className="h-3 w-3 mr-1" />
              {t('finance.quickApply')}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-400 font-bold text-sm">1</span>
              </div>
              <p className="text-xs text-slate-300">{t('finance.fillBasicInfo')}</p>
            </div>
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-400 font-bold text-sm">2</span>
              </div>
              <p className="text-xs text-slate-300">{t('finance.uploadDocuments')}</p>
            </div>
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-400 font-bold text-sm">3</span>
              </div>
              <p className="text-xs text-slate-300">{t('finance.getInstantInsights')}</p>
            </div>
          </div>
          
          <Button 
            onClick={onOpenApplication}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 text-base font-semibold"
          >
            {t('finance.startApplication')}
          </Button>
        </CardContent>
      </Card>

      {/* Mobile Floating Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <Button
          onClick={onOpenApplication}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg rounded-full p-4 h-auto"
        >
          <Smartphone className="h-5 w-5 mr-2" />
          {t('finance.applyNow')}
        </Button>
      </div>
    </>
  );
};
