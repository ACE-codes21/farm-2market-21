
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload } from 'lucide-react';
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

const getStatusEmoji = (status: LoanScheme['status']) => {
    switch (status) {
        case 'Approved': return '✅';
        case 'Pending': return '🟡';
        case 'Not Applied': return '❌';
    }
}

export const LoanSchemeCard: React.FC<LoanSchemeCardProps> = ({ scheme }) => {
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
                {getStatusEmoji(scheme.status)} {scheme.status}
            </Badge>
        </div>
        <CardDescription className="text-slate-400 pt-2">{scheme.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end gap-2 mt-auto">
        {scheme.status === 'Not Applied' && <Button className="premium-button w-full sm:w-auto">Apply Now</Button>}
        {scheme.status !== 'Approved' && (
          <>
            <Button variant="outline" className="dark-elegant-input w-full sm:w-auto" onClick={handleUploadClick}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Docs
            </Button>
            <input type="file" ref={fileInputRef} className="hidden" multiple />
          </>
        )}
      </CardFooter>
    </Card>
  );
};
