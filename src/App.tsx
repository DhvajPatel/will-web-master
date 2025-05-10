import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
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
import ExternalUserDashboard from "./pages/secure/ExternalUserDashboard";
import InternalUserDashboard from "./pages/secure/InternalUserDashboard";
import LawyerDashboard from "./pages/secure/LawyerDashboard";
import PartnerDashboard from "./pages/secure/PartnerDashboard";
import SystemAdminDashboard from "./pages/secure/SystemAdminDashboard";
import TestPage from "./pages/TestPage";
import LoadingOverlay from "./components/LoadingOverlay";

// Example authentication status -- replace this with real logic
const isAuthenticated = true; // Mock authentication for now

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <ApiFlowProvider>
                    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                        {/* Loading Overlay is global */}
                        <LoadingOverlay />
                        <Routes>
                            {/* Public Layout */}
                            <Route element={<PublicLayout />}>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/pricing" element={<Pricing />} />
                                <Route path="/contactUs" element={<ContactUs />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/test" element={<TestPage />} />

                            </Route>

                            {/* Private Layout */}
                            <Route element={<PrivateLayout isAuthenticated={isAuthenticated} />}>
                                <Route
                                    path="/dashboard/external"
                                    element={<PrivateRoute><ExternalUserDashboard /></PrivateRoute>}
                                />
                                <Route
                                    path="/dashboard/internal"
                                    element={<PrivateRoute><InternalUserDashboard /></PrivateRoute>}
                                />
                                <Route
                                    path="/dashboard/lawyer"
                                    element={<PrivateRoute><LawyerDashboard /></PrivateRoute>}
                                />
                                <Route
                                    path="/dashboard/partner"
                                    element={<PrivateRoute><PartnerDashboard /></PrivateRoute>}
                                />
                                <Route
                                    path="/dashboard/admin"
                                    element={<PrivateRoute><SystemAdminDashboard /></PrivateRoute>}
                                />
                            </Route>

                            {/* Test & fallback */}
                            <Route path="/test" element={<TestPage />} />

                            {/* Catch-all route */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </Router>
                </ApiFlowProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;