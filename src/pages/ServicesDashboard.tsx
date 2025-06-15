
import React from 'react';
import { useTranslation } from 'react-i18next';
import { VendorDashboardHeader } from '@/components/vendor/VendorDashboardHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { schemes, applications, documents } from '@/data/services';
import SchemeExplorer from '@/components/services/SchemeExplorer';
import EligibilityChecker from '@/components/services/EligibilityChecker';
import ApplicationTracker from '@/components/services/ApplicationTracker';
import DocumentManager from '@/components/services/DocumentManager';
import AIChatAssistant from '@/components/services/AIChatAssistant';

const ServicesDashboard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-slate-900 text-gray-200">
      <VendorDashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold font-display gradient-text mb-2">{t('services_dashboard.title')}</h1>
          <p className="text-slate-400">{t('services_dashboard.subtitle')}</p>
        </div>

        <Tabs defaultValue="schemes" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-slate-800/60 border border-slate-700 h-auto p-1">
            <TabsTrigger value="schemes">{t('services_dashboard.tabs.schemes')}</TabsTrigger>
            <TabsTrigger value="eligibility">{t('services_dashboard.tabs.eligibility')}</TabsTrigger>
            <TabsTrigger value="tracker">{t('services_dashboard.tabs.tracker')}</TabsTrigger>
            <TabsTrigger value="documents">{t('services_dashboard.tabs.documents')}</TabsTrigger>
            <TabsTrigger value="ai-assist">{t('services_dashboard.tabs.ai_assist')}</TabsTrigger>
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
