import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LicenseTypesPage from "./pages/LicenseTypesPage";
import RegulationsPage from "./pages/RegulationsPage";
import ApplicantDashboard from "./pages/applicant/ApplicantDashboard";
import NewApplicationPage from "./pages/applicant/NewApplicationPage";
import ApplicationDetailsPage from "./pages/applicant/ApplicationDetailsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminApplicationsPage from "./pages/admin/AdminApplicationsPage";
import AdminApplicationReviewPage from "./pages/admin/AdminApplicationReviewPage";
import AdminLicensesPage from "./pages/admin/AdminLicensesPage";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import AdminCompliancePage from "./pages/admin/AdminCompliancePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "license-types", Component: LicenseTypesPage },
      { path: "regulations", Component: RegulationsPage },
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
      
      // Applicant routes (protected)
      { 
        path: "applicant/dashboard", 
        element: <ProtectedRoute><ApplicantDashboard /></ProtectedRoute>
      },
      { 
        path: "applicant/new-application", 
        element: <ProtectedRoute><NewApplicationPage /></ProtectedRoute>
      },
      { 
        path: "applicant/application/:id", 
        element: <ProtectedRoute><ApplicationDetailsPage /></ProtectedRoute>
      },
      
      // Admin routes (protected, admin only)
      { 
        path: "admin/dashboard", 
        element: <ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>
      },
      { 
        path: "admin/applications", 
        element: <ProtectedRoute requireAdmin><AdminApplicationsPage /></ProtectedRoute>
      },
      { 
        path: "admin/application/:id", 
        element: <ProtectedRoute requireAdmin><AdminApplicationReviewPage /></ProtectedRoute>
      },
      { 
        path: "admin/licenses", 
        element: <ProtectedRoute requireAdmin><AdminLicensesPage /></ProtectedRoute>
      },
      { 
        path: "admin/analytics", 
        element: <ProtectedRoute requireAdmin><AdminAnalyticsPage /></ProtectedRoute>
      },
      { 
        path: "admin/compliance", 
        element: <ProtectedRoute requireAdmin><AdminCompliancePage /></ProtectedRoute>
      },
      
      { path: "*", Component: NotFoundPage },
    ],
  },
]);