
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { type LoanScheme } from '@/data/finance';

interface LoanSchemeCardProps {
  scheme: LoanScheme;
}

const getStatusBadgeVariant = (status: LoanScheme['status']) => {
  switch (status) {
    case 'Approved':
      return 'default';
    case 'Pending':
      return 'secondary';
    case 'Not Applied':
      return 'destructive';
    default:
      return 'default';
  }
};

const getStatusEmoji = (status: LoanScheme['status'], t: any) => {
  switch (status) {
    case 'Approved':
      return t('loan_schemes.approved');
    case 'Pending':
      return t('loan_schemes.pending');
    case 'Not Applied':
      return t('loan_schemes.not_applied');
  }
};

export const LoanSchemeCard: React.FC<LoanSchemeCardProps> = ({
  scheme
}) => {
  const { t } = useTranslation();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <Card className="dark-modern-card card-hover-elevate flex flex-col justify-between animate-fade-in-up">
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold font-display gradient-text">{scheme.title}</CardTitle>
            <Badge variant={getStatusBadgeVariant(scheme.status)} className="whitespace-nowrap">
                {getStatusEmoji(scheme.status, t)}
            </Badge>
        </div>
        <CardDescription className="text-slate-400 pt-2">{scheme.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end gap-2 mt-auto">
        {scheme.status === 'Not Applied' && (
          <Button className="premium-button w-full sm:w-auto">
            {t('loan_schemes.apply_now')}
          </Button>
        )}
        {scheme.status !== 'Approved' && (
          <>
            <Button variant="outline" onClick={handleUploadClick} className="dark-elegant-input w-full sm:w-auto text-zinc-50 bg-gray-900 hover:bg-gray-800">
              <Upload className="mr-2 h-4 w-4" />
              {t('loan_schemes.upload_docs')}
            </Button>
            <input type="file" ref={fileInputRef} className="hidden" multiple />
          </>
        )}
      </CardFooter>
    </Card>
  );
};
