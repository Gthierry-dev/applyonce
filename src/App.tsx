import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminSignup from "./pages/auth/AdminSignup";
import ResetPassword from "./pages/auth/ResetPassword";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// Dashboard routes
import Dashboard from "./pages/dashboard/Dashboard";
import Applications from "./pages/dashboard/Applications";
import Categories from "./pages/dashboard/Categories";
import ApplicationStatus from "./pages/dashboard/ApplicationStatus";
import Opportunities from "./pages/dashboard/Opportunities";
import Settings from "./pages/dashboard/Settings";

// Admin dashboard routes
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOpportunities from "./pages/admin/Opportunities";
import AdminCategories from "./pages/admin/Categories";
import AdminUsers from "./pages/admin/Users";
import AdminSettings from "./pages/admin/Settings";

// New routes for navigation
import Community from "./pages/Community";
import Resources from "./pages/Resources";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import SocialAuthComingSoon from "./pages/auth/SocialAuthComingSoon";

// Company routes
import CompanyLogin from "./pages/company/Login";
import CompanyDashboard from "./pages/company/Dashboard";
import CompanyProfile from "./pages/company/Profile";
import CompanyApplications from "./pages/company/Applications";
import CompanyCategories from "./pages/company/Categories";
import CompanySettings from "./pages/company/Settings";
import Integrations from "./pages/dashboard/Integrations";
import Help from "./pages/dashboard/Help";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/company/login" element={<CompanyLogin />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route
              path="/social-auth-coming-soon"
              element={<SocialAuthComingSoon />}
            />

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/application-status" element={<ApplicationStatus />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/help" element={<Help />} />

            {/* Protected Company Routes */}
            {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/company/dashboard" element={<CompanyDashboard />} />
            <Route path="/company/profile" element={<CompanyProfile />} />
            <Route
              path="/company/applications"
              element={<CompanyApplications />}
            />
            <Route path="/company/categories" element={<CompanyCategories />} />
            <Route path="/company/settings" element={<CompanySettings />} />
            {/* </Route> */}

            {/* Admin Dashboard Routes */}
            {/*             <Route element={<AdminRoute />}> */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route
              path="/admin/opportunities"
              element={<AdminOpportunities />}
            />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            {/*             </Route> */}

            {/* New Navigation Routes */}
            <Route path="/community" element={<Community />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/support" element={<Support />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
