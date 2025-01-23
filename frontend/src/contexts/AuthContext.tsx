import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (authenticated: boolean) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Adjust based on initial logic
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token"); // Or your storage method
      if (!token || isTokenExpired(token)) {
        setIsAuthenticated(false);
        navigate("/signin"); // Redirect to login or any route
      }
    };

    checkToken();

    // Optionally, use an interval or WebSocket for real-time updates
    const interval = setInterval(checkToken, 1000 * 60); // Check every minute
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const isTokenExpired = (token) => {
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    return exp * 1000 < Date.now(); // Compare expiry with current time
  } catch {
    return true; // Treat as expired if token is malformed
  }
};
