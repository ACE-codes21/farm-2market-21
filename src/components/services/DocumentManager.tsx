
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { documents as mockDocuments, Document } from '@/data/services';
import { Upload, File, Check, ShieldAlert, Eye, Download, X, FileText, Image, AlertCircle, CheckCircle2, Clock, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const DocumentManager: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    files.forEach(file => uploadFile(file));
  };

  const uploadFile = (file: File) => {
    const fileId = `doc-${Date.now()}-${Math.random()}`;
    
    // Simulate upload progress
    setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev[fileId] || 0;
        const newProgress = Math.min(currentProgress + Math.random() * 30, 100);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Add completed document
          const newDocument: Document = {
            id: fileId,
            name: file.name,
            status: 'Pending',
            uploadDate: new Date().toISOString().split('T')[0],
            previewUrl: URL.createObjectURL(file),
          };
          
          setDocuments(prev => [newDocument, ...prev]);
          
          // Remove from progress tracking
          setTimeout(() => {
            setUploadProgress(prev => {
              const { [fileId]: removed, ...rest } = prev;
              return rest;
            });
          }, 1000);
          
          return { ...prev, [fileId]: 100 };
        }
        
        return { ...prev, [fileId]: newProgress };
      });
    }, 200);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    
    const files = Array.from(event.dataTransfer.files);
    files.forEach(file => uploadFile(file));
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const removeDocument = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return <Image className="h-5 w-5" />;
    }
    return <FileText className="h-5 w-5" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Verified':
        return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-400" />;
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Verified':
        return { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-400/30' };
      case 'Pending':
        return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-400/30' };
      default:
        return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-400/30' };
    }
  };

  const verifiedCount = documents.filter(doc => doc.status === 'Verified').length;
  const totalCount = documents.length;
  const completionPercentage = totalCount > 0 ? (verifiedCount / totalCount) * 100 : 0;

  return (
    <div className="space-y-6 mt-6">
      {/* Header Card */}
      <Card className="dark-modern-card animate-fade-in bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-lg border border-slate-600/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl text-white">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <File className="h-6 w-6 text-blue-400" />
            </div>
            Document Manager
          </CardTitle>
          <p className="text-slate-300">Upload and manage your documents for scheme applications</p>
          
          {/* Progress Summary */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Verification Progress</span>
              <span className="text-slate-300">{verifiedCount}/{totalCount} verified</span>
            </div>
            <Progress value={completionPercentage} className="h-2 bg-slate-700/50" />
          </div>
        </CardHeader>
      </Card>

      {/* Upload Area */}
      <Card className="dark-modern-card animate-fade-in">
        <CardContent className="p-6">
          <div 
            className={cn(
              "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
              dragOver 
                ? "border-green-400 bg-green-400/10 scale-[1.02]" 
                : "border-slate-600 hover:border-slate-500 bg-slate-700/30"
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <div className="space-y-4">
              <div className={cn(
                "mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-colors",
                dragOver ? "bg-green-400/20" : "bg-slate-600/50"
              )}>
                <Upload className={cn(
                  "w-8 h-8 transition-colors",
                  dragOver ? "text-green-400" : "text-slate-400"
                )} />
              </div>
              
              <div>
                <p className="text-lg font-medium text-slate-300 mb-2">
                  {dragOver ? "Drop files here" : "Upload Documents"}
                </p>
                <p className="text-sm text-slate-500 mb-4">
                  Click to browse or drag & drop files
                </p>
                <div className="flex items-center justify-center gap-4 text-xs text-slate-600">
                  <span>PDF, PNG, JPG</span>
                  <span>•</span>
                  <span>MAX 5MB per file</span>
                  <span>•</span>
                  <span>Multiple files supported</span>
                </div>
              </div>
            </div>
            
            <Input 
              id="file-upload" 
              type="file" 
              multiple
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden" 
              onChange={handleFileUpload} 
            />
          </div>

          {/* Upload Progress */}
          {Object.keys(uploadProgress).length > 0 && (
            <div className="mt-4 space-y-3">
              <h4 className="text-sm font-medium text-slate-300">Uploading...</h4>
              {Object.entries(uploadProgress).map(([fileId, progress]) => (
                <div key={fileId} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Uploading file...</span>
                    <span className="text-slate-300">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-1" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card className="dark-modern-card animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            <span>Uploaded Documents ({documents.length})</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('file-upload')?.click()}
              className="bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add More
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {documents.length === 0 ? (
            <div className="text-center py-8">
              <File className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-300 mb-2">No Documents Yet</h3>
              <p className="text-slate-400">Upload your first document to get started</p>
            </div>
          ) : (
            documents.map(doc => {
              const statusConfig = getStatusConfig(doc.status);
              return (
                <div 
                  key={doc.id} 
                  className="group flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      {getFileIcon(doc.name)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{doc.name}</p>
                      <p className="text-xs text-slate-400">
                        Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "flex items-center gap-1",
                        statusConfig.bg,
                        statusConfig.text,
                        statusConfig.border
                      )}
                    >
                      {getStatusIcon(doc.status)}
                      {doc.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedDoc(doc)}
                      className="text-slate-400 hover:text-white hover:bg-slate-700"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-white hover:bg-slate-700"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(doc.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Document Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <Card className="dark-modern-card max-w-4xl max-h-[90vh] w-full overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">{selectedDoc.name}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDoc(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 bg-slate-800 flex items-center justify-center">
                {selectedDoc.name.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <img 
                    src={selectedDoc.previewUrl} 
                    alt={selectedDoc.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-300">Preview not available for this file type</p>
                    <p className="text-sm text-slate-500">Click download to view the document</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DocumentManager;
