/* eslint-disable react-refresh/only-export-components */
// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserDto } from "../services/user/UserDto";

interface AuthContextType {
  user: UserDto | null;
  isAuthenticated: boolean;
  login: (user: UserDto) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDto | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as UserDto);
      } catch (error) {
        console.error("Failed to parse user from sessionStorage", error);
        sessionStorage.removeItem("user");
      }
    }
  }, []);

  const login = (user: UserDto) => {
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
