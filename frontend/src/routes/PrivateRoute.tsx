import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext"; // Adjust path

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
