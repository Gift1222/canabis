import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

// In mockup mode: routes are freely accessible.
// If not logged in at all, redirect to login; otherwise always allow through.
export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // For admin routes in mockup: just let any user through (no hard block)
  // but still navigate admins to correct place from login
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/applicant/dashboard" replace />;
  }

  return <>{children}</>;
}
