import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

const RequireCollaborator = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { sessionLoading, user, isAdmin } = useAuth();
  if (sessionLoading) return null;
  if (!user || isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
};

export default RequireCollaborator;

