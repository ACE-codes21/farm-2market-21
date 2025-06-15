
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import VendorPortal from "./pages/VendorPortal";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { AppProvider } from "./contexts/AppContext";
import FinanceDashboard from "./pages/FinanceDashboard";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import ServicesDashboard from "./pages/ServicesDashboard";
import NotificationsPage from "./pages/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
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
            <Route path="/vendor/notifications" element={<NotificationsPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
