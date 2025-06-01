import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserBar from "./UserBar";
import SideMenu from '../components/SideMenu';

interface PrivateLayoutProps {
  isAuthenticated: boolean;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <UserBar />
      <Box sx={{ display: 'flex', flexGrow: 1, pt: 8 }}>
        <Outlet />
        <SideMenu />
      </Box>
    </Box>
  );
};

export default PrivateLayout;