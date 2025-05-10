import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";  // Import ReactNode

const PrivateRoute = ({ children }: { children: ReactNode }) => {  // Use ReactNode instead of JSX.Element
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
