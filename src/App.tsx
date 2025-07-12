import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/components/auth/AuthProvider";
import { LoginForm } from "@/components/auth/LoginForm";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Dashboard } from "@/pages/Dashboard";
import { ComingSoon } from "@/pages/ComingSoon";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <LoginForm />;
  }
  
  return <DashboardLayout>{children}</DashboardLayout>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/student-logs" element={
              <ProtectedRoute>
                <ComingSoon title="Student Logs" description="View and manage student activity logs and session history." />
              </ProtectedRoute>
            } />
            <Route path="/crisis-reports" element={
              <ProtectedRoute>
                <ComingSoon title="Crisis Reports" description="Monitor and respond to crisis situations reported by students." />
              </ProtectedRoute>
            } />
            <Route path="/journaling-topics" element={
              <ProtectedRoute>
                <ComingSoon title="Journaling Topics" description="Manage and analyze trending journaling topics among students." />
              </ProtectedRoute>
            } />
            <Route path="/engagement" element={
              <ProtectedRoute>
                <ComingSoon title="Engagement Analytics" description="Detailed analytics on student engagement and participation." />
              </ProtectedRoute>
            } />
            <Route path="/school-addins" element={
              <ProtectedRoute>
                <ComingSoon title="School Addins" description="Configure and manage school-specific integrations and extensions." />
              </ProtectedRoute>
            } />
            <Route path="/ai-sessions" element={
              <ProtectedRoute>
                <ComingSoon title="AI Sessions" description="View and analyze AI-powered counseling sessions and interactions." />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute>
                <ComingSoon title="Notifications" description="Manage notification settings and view system alerts." />
              </ProtectedRoute>
            } />
            <Route path="/eos" element={
              <ProtectedRoute>
                <ComingSoon title="EOS" description="End of session analytics and reporting tools." />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
