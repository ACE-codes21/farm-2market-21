
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { documents as mockDocuments, Document } from '@/data/services';
import { Upload, File, Check, ShieldAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const DocumentManager: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newDocument: Document = {
        id: `doc-${Date.now()}`,
        name: file.name,
        status: 'Pending',
        uploadDate: new Date().toISOString().split('T')[0],
        previewUrl: URL.createObjectURL(file),
      };
      setDocuments(prev => [newDocument, ...prev]);
    }
  };

  return (
    <Card className="dark-modern-card mt-6 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">My Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 p-4 border border-dashed border-slate-600 rounded-lg">
          <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
            <Upload className="w-10 h-10 text-slate-400 mb-2" />
            <span className="text-slate-300">Click to upload or drag & drop</span>
            <p className="text-xs text-slate-500">PDF, PNG, JPG (MAX. 5MB)</p>
          </label>
          <Input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />
        </div>
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold text-slate-300">Uploaded Files</h3>
          {documents.map(doc => (
            <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-md">
              <div className="flex items-center gap-3">
                <File className="text-slate-400"/>
                <span className="text-white font-medium">{doc.name}</span>
              </div>
              <Badge variant={doc.status === 'Verified' ? 'default' : 'secondary'} className={cn(
                  doc.status === 'Verified' ? 'bg-green-500/20 text-green-400 border-green-400/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30'
              )}>
                {doc.status === 'Verified' ? <Check className="mr-1 h-3 w-3" /> : <ShieldAlert className="mr-1 h-3 w-3" />}
                {doc.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentManager;
