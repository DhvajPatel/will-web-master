import PrivateHeader from "../components/PrivateHeader.tsx";
import Footer from "../components/Footer";
import { Box } from "@mui/material";
import { Outlet, Navigate } from "react-router-dom";
import UserBar from "./UserBar.tsx";

interface PrivateLayoutProps {
  isAuthenticated: boolean;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100vw", overflowX: "hidden" }}>
      <Box sx={{ flexShrink: 0 }}><PrivateHeader /></Box> {/* Header */}
      <Box sx={{ flexShrink: 0 }}><UserBar /></Box> {/* Header */}
      <Box sx={{ display: "flex", flexGrow: 1, width: "100%", py: 2 }}>
        <Box sx={{ flex: 1, px: 2 }} /> {/* Left Sidebar */}
        <Box sx={{ flex: 3, display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
          <Box sx={{ width: "80%", maxWidth: 1200, p: 3, border: "2px solid #ccc", borderRadius: 2, boxShadow: 1 }}>
            <Outlet /> {/* Render nested private routes */}
          </Box>
        </Box>
        <Box sx={{ flex: 1, px: 2 }} /> {/* Right Sidebar */}
      </Box>
      <Box sx={{ flexShrink: 0 }}><Footer /></Box> {/* Footer */}
    </Box>
  );
};

export default PrivateLayout;