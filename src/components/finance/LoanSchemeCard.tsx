
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload } from 'lucide-react';
import { type LoanScheme } from '@/data/finance';

interface LoanSchemeCardProps {
  scheme: LoanScheme;
}

const getStatusBadgeClass = (status: LoanScheme['status']) => {
  switch (status) {
    case 'Approved':
      return 'bg-green-500/20 text-green-300 border-green-500/30';
    case 'Pending':
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    case 'Not Applied':
      return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    default:
      return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  }
};

const getStatusEmoji = (status: LoanScheme['status']) => {
  switch (status) {
    case 'Approved':
      return '✅ Approved';
    case 'Pending':
      return '🟡 Pending';
    case 'Not Applied':
      return '❌ Not Applied';
  }
};

export const LoanSchemeCard: React.FC<LoanSchemeCardProps> = ({
  scheme
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <Card className="h-full bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 shadow-xl rounded-xl flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold text-white">{scheme.title}</CardTitle>
          <Badge className={`${getStatusBadgeClass(scheme.status)} border whitespace-nowrap`}>
            {getStatusEmoji(scheme.status)}
          </Badge>
        </div>
        <CardDescription className="text-slate-400">{scheme.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2 mt-auto">
        {scheme.status === 'Not Applied' && (
          <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
            Apply Now
          </Button>
        )}
        {scheme.status !== 'Approved' && (
          <>
            <Button 
              variant="outline" 
              onClick={handleUploadClick} 
              className="w-full bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Documents
            </Button>
            <input type="file" ref={fileInputRef} className="hidden" multiple />
          </>
        )}
      </CardFooter>
    </Card>
  );
};
