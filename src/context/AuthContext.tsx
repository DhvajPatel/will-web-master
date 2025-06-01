// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { UserDto } from "../services/user/UserDto"; // Import UserDto

interface AuthContextType {
  user: UserDto | null; // Use UserDto here
  isAuthenticated: boolean;
  login: (user: UserDto) => void; // Accept UserDto during login
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserDto | null>(null); // Use UserDto here

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Store and parse UserDto from sessionStorage
    }
  }, []);

  const login = (user: UserDto) => {
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user)); // Store UserDto in sessionStorage
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // Access AuthContext
