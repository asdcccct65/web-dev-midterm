import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import ModeSelection from "./pages/ModeSelection";
import MissionDashboard from "./pages/MissionDashboard";
import MissionDetails from "./pages/MissionDetails";  // 👈 Added import
import ProgressTracker from "./pages/ProgressTracker";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="cybercop-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/mode-selection" element={<Layout><ModeSelection /></Layout>} />
          <Route path="/missions" element={<Layout><MissionDashboard /></Layout>} />
          <Route path="/missions/:id" element={<Layout><MissionDetails /></Layout>} />  {/* 👈 Added route */}
          <Route path="/progress" element={<Layout><ProgressTracker /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
