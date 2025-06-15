import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CreatorProfile from "./pages/CreatorProfile";
import ItemDetail from "./pages/ItemDetail";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import CreatorOnboardingProfile from "./pages/onboarding/CreatorProfile";
import CreatorSocial from "./pages/onboarding/CreatorSocial";
import CreatorPayout from "./pages/onboarding/CreatorPayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/creator/:username" element={<CreatorProfile />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/onboarding/creator/profile" element={<CreatorOnboardingProfile />} />
          <Route path="/onboarding/creator/social" element={<CreatorSocial />} />
          <Route path="/onboarding/creator/payout" element={<CreatorPayout />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
