import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const PublicLayout = () => (
  <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100vw", overflowX: "hidden" }}>
    <Box sx={{ flexShrink: 0 }}><Header /></Box> {/* Header */}
    <Box sx={{ display: "flex", flexGrow: 1, width: "100%", py: 2 }}>
      <Box sx={{ flex: 1, px: 2 }} /> {/* Left Sidebar */}
      <Box sx={{ flex: 3, display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <Box sx={{ width: "80%", maxWidth: 1200, p: 3, border: "2px solid #ccc", borderRadius: 2, boxShadow: 1 }}>
          <Outlet /> {/* Render nested public routes */}
        </Box>
      </Box>
      <Box sx={{ flex: 1, px: 2 }} /> {/* Right Sidebar */}
    </Box>
    <Box sx={{ flexShrink: 0 }}><Footer /></Box> {/* Footer */}
  </Box>
);

export default PublicLayout;