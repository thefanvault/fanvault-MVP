import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
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
import Settings from "./pages/Settings";
import ListNewItem from "./pages/ListNewItem";
import AddressAdd from "./pages/AddressAdd";
import PaymentAdd from "./pages/PaymentAdd";
import NotFound from "./pages/NotFound";
import OrderReceipt from "./pages/OrderReceipt";
import BidDashboard from "./pages/BidDashboard";
import TermsOfService from "./pages/legal/TermsOfService";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import DMCAGuidelines from "./pages/legal/DMCAGuidelines";
import AcceptableUse from "./pages/legal/AcceptableUse";
import Status from "./pages/Status";
import Forbidden from "./pages/error/Forbidden";
import AdminModeration from "./pages/admin/AdminModeration";
import AdminImpersonation from "./pages/admin/AdminImpersonation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          {/* Auth routes without layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/onboarding/creator/profile" element={<CreatorOnboardingProfile />} />
          <Route path="/onboarding/creator/social" element={<CreatorSocial />} />
          <Route path="/onboarding/creator/payout" element={<CreatorPayout />} />
          
          {/* Main app routes with layout */}
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/discover" element={<Layout><Discover /></Layout>} />
          <Route path="/creator/:username" element={<Layout><CreatorProfile /></Layout>} />
          <Route path="/item/:id" element={<Layout><ItemDetail /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="/list-new-item" element={<Layout><ListNewItem /></Layout>} />
          <Route path="/address/add" element={<Layout><AddressAdd /></Layout>} />
          <Route path="/payment/add" element={<Layout><PaymentAdd /></Layout>} />
          <Route path="/bids/active" element={<Layout><BidDashboard /></Layout>} />
          <Route path="/orders/:id" element={<Layout><OrderReceipt /></Layout>} />
          <Route path="/legal/terms" element={<Layout><TermsOfService /></Layout>} />
          <Route path="/legal/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
          <Route path="/legal/dmca" element={<Layout><DMCAGuidelines /></Layout>} />
          <Route path="/legal/acceptable-use" element={<Layout><AcceptableUse /></Layout>} />
          <Route path="/status" element={<Layout><Status /></Layout>} />
          <Route path="/403" element={<Layout><Forbidden /></Layout>} />
          <Route path="/admin/moderation" element={<Layout><AdminModeration /></Layout>} />
          <Route path="/admin/impersonate/:userId" element={<Layout><AdminImpersonation /></Layout>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
