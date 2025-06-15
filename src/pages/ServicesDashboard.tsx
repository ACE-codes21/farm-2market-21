
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SchemeExplorer } from "@/components/services/SchemeExplorer";
import { EligibilityChecker } from "@/components/services/EligibilityChecker";
import { ApplicationTracker } from "@/components/services/ApplicationTracker";
import { DocumentManager } from "@/components/services/DocumentManager";
import { AIChatAssistant } from "@/components/services/AIChatAssistant";

const tabConfigs = [
  {
    value: "schemes",
    label: "Schemes",
    icon: "🏦"
  },
  {
    value: "licensing",
    label: "Licensing",
    icon: "🧾"
  },
  {
    value: "status",
    label: "My Status",
    icon: "📊"
  }
];

export default function ServicesDashboard() {
  const [tab, setTab] = useState("schemes");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-gray-100 font-sans">
      <div className="max-w-5xl mx-auto py-6 px-2">
        <div className="mb-6">
          <h1 className="text-white gradient-text font-display text-3xl sm:text-4xl font-bold mb-1">
            <span className="text-green-400">Services</span> Portal
          </h1>
          <div className="text-slate-400 text-base">All government schemes, documents & status, in one place.</div>
        </div>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="flex bg-slate-800/70 px-2 py-2 rounded-lg mb-6 justify-start gap-2">
            {tabConfigs.map(cfg => (
              <TabsTrigger key={cfg.value} value={cfg.value} className="flex gap-2 items-center text-base sm:text-lg py-2 px-4">
                <span>{cfg.icon}</span> <span>{cfg.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab 1: Schemes */}
          <TabsContent value="schemes">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 animate-fade-in">
              <div className="lg:col-span-7 flex flex-col gap-7">
                <SchemeExplorer />
                <EligibilityChecker />
              </div>
              <div className="lg:col-span-5 flex flex-col gap-7">
                <ApplicationTracker />
                <AIChatAssistant />
              </div>
            </div>
          </TabsContent>
          {/* Tab 2: Licensing */}
          <TabsContent value="licensing">
            <div className="animate-fade-in">
              <DocumentManager />
              <div className="mt-7">
                <AIChatAssistant />
              </div>
            </div>
          </TabsContent>
          {/* Tab 3: Status */}
          <TabsContent value="status">
            <div className="animate-fade-in">
              <ApplicationTracker />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
