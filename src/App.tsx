
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LanguageProvider } from "@/contexts/LanguageContext";

import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import VendorPortal from "./pages/VendorPortal";
import FinanceDashboard from "./pages/FinanceDashboard";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import ServicesDashboard from "./pages/ServicesDashboard";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import FloatingChatButton from "./components/chat/FloatingChatButton";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setIsLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/buyer" element={<Dashboard />} />
              <Route path="/vendor" element={<VendorPortal />} />
              <Route path="/vendor/finance" element={<FinanceDashboard />} />
              <Route path="/vendor/analytics" element={<AnalyticsDashboard />} />
              <Route path="/vendor/services" element={<ServicesDashboard />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
            <FloatingChatButton />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
};

export default App;
