
import React, { useState } from 'react';
import { docTypes } from "@/data/services";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface UploadedDoc {
  docId: string;
  fileName: string;
  status: "verified" | "pending";
}

export const DocumentManager: React.FC = () => {
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);

  const handleUpload = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedDocs((prev) =>
        [...prev.filter(d => d.docId !== docId),
        { docId, fileName: e.target.files[0].name, status: "verified" }]
      );
    }
  };

  return (
    <Card className="bg-slate-800/70 border-cyan-400/10 rounded-xl shadow">
      <CardContent className="p-6">
        <CardTitle className="mb-4 text-white flex gap-2 items-center">
          <span role="img" aria-label="docs">📁</span>
          Upload & Manage Documents
        </CardTitle>
        <div className="space-y-5 mt-3">
          {docTypes.map(doc => {
            const uploaded = uploadedDocs.find(d => d.docId === doc.id);
            return (
              <div key={doc.id} className="flex items-center justify-between gap-2 bg-slate-900/70 px-3 py-2 rounded-lg">
                <div>
                  <div className="font-semibold text-slate-200">{doc.label}</div>
                  <CardDescription className="text-xs text-slate-400">
                    {uploaded ? (
                      <span>Uploaded: <span className="text-green-400">{uploaded.fileName}</span></span>
                    ) : "Not Uploaded"}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id={`upload-${doc.id}`}
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={e => handleUpload(doc.id, e)}
                  />
                  <label htmlFor={`upload-${doc.id}`}>
                    <Button size="sm" className="bg-green-500 hover:bg-green-400">
                      {uploaded ? "Re-Upload" : "Upload"}
                    </Button>
                  </label>
                  {uploaded ?
                    <Badge className="bg-green-700 text-green-100 flex gap-1 items-center" variant="secondary">
                      <Check className="w-3 h-3" /> Verified
                    </Badge>
                  : null}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
