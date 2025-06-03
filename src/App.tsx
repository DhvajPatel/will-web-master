// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ApiFlowProvider } from "./context/ApiFlowContext";

import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import PrivateRoute from "./components/PrivateRoute";


import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";

import PartnerDashboard from "./pages/secure/PartnerDashboard";
import SystemAdminDashboard from "./pages/secure/SystemAdminDashboard";
import AccountDashboard from "./pages/secure/AccountDashboard";
import UserProfile from "./pages/secure/UserProfile";

import LoadingOverlay from "./components/LoadingOverlay";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ApiFlowProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <LoadingOverlay />
            <AuthenticatedRoutes />
          </Router>
        </ApiFlowProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

const AuthenticatedRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes with PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected routes with PrivateLayout */}
      <Route element={<PrivateLayout isAuthenticated={isAuthenticated} />}>
        <Route
          path="/dashboard/account"
          element={
            <PrivateRoute>
              <AccountDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/partner"
          element={
            <PrivateRoute>
              <PartnerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <PrivateRoute>
              <SystemAdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
