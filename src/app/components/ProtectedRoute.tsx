import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: 'student' | 'parent';
}

export function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    if (!userRole) {
      toast.error('Access Denied', {
        description: 'Please sign in to access the portal.',
      });
    } else if (userRole !== allowedRole) {
      toast.warning('Access Restricted', {
        description: `This account does not have access to the ${allowedRole} dashboard.`,
      });
    }
  }, [userRole, allowedRole]);

  if (!userRole) {
    return <Navigate to="/portal-login" replace />;
  }

  if (userRole !== allowedRole) {
    // If a student tries to visit parent dashboard, or vice versa, redirect them to their correct dashboard
    const fallbackPath = userRole === 'student' ? '/student-dashboard' : '/parent-dashboard';
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
}
