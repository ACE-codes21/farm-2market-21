
import React from 'react';
import { VendorDashboardHeader } from '@/components/vendor/VendorDashboardHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { schemes, applications, documents } from '@/data/services';
import SchemeExplorer from '@/components/services/SchemeExplorer';
import EligibilityChecker from '@/components/services/EligibilityChecker';
import ApplicationTracker from '@/components/services/ApplicationTracker';
import DocumentManager from '@/components/services/DocumentManager';
import AIChatAssistant from '@/components/services/AIChatAssistant';

const ServicesDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-200">
      <VendorDashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold font-display gradient-text mb-2">Government Services</h1>
          <p className="text-slate-400">Access schemes, track applications, and get support</p>
        </div>

        <Tabs defaultValue="schemes" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-slate-800/60 border border-slate-700 h-auto p-1">
            <TabsTrigger value="schemes">Schemes</TabsTrigger>
            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
            <TabsTrigger value="tracker">Tracker</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="ai-assist">AI Assistant</TabsTrigger>
          </TabsList>

          <TabsContent value="schemes">
            <SchemeExplorer schemes={schemes} />
          </TabsContent>
          <TabsContent value="eligibility">
            <EligibilityChecker />
          </TabsContent>
          <TabsContent value="tracker">
            <ApplicationTracker />
          </TabsContent>
          <TabsContent value="documents">
            <DocumentManager />
          </TabsContent>
          <TabsContent value="ai-assist">
            <AIChatAssistant />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ServicesDashboard;
