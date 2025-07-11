import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
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
import CreatorVerification from "./pages/onboarding/CreatorVerification";
import ApplicationConfirmation from "./pages/onboarding/ApplicationConfirmation";
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
import Orders from "./pages/Orders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
          <Route path="/onboarding/creator/verification" element={<CreatorVerification />} />
          <Route path="/onboarding/application-confirmation" element={<ApplicationConfirmation />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/list-new-item" element={<ListNewItem />} />
          <Route path="/address/add" element={<AddressAdd />} />
          <Route path="/payment/add" element={<PaymentAdd />} />
          <Route path="/bids/active" element={<BidDashboard />} />
          <Route path="/orders/:id" element={<OrderReceipt />} />
          <Route path="/legal/terms" element={<TermsOfService />} />
          <Route path="/legal/privacy" element={<PrivacyPolicy />} />
          <Route path="/legal/dmca" element={<DMCAGuidelines />} />
          <Route path="/legal/acceptable-use" element={<AcceptableUse />} />
          <Route path="/status" element={<Status />} />
          <Route path="/403" element={<Forbidden />} />
          <Route path="/admin/moderation" element={<AdminModeration />} />
          <Route path="/admin/impersonate/:userId" element={<AdminImpersonation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
