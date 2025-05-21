import { Box, Typography } from "@mui/material";
import SideMenu from "../../components/SideMenu";
import { useEffect } from "react";

const AccountUserDashboard = () => {
  // Debug: Log when this component mounts
  useEffect(() => {
    console.log('AccountUserDashboard mounted');
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <SideMenu />
      <Box sx={{ ml: '200px', p: 3 }}>
        <Typography variant="h4">Account Dashboard Content</Typography>
        <Typography>This confirms the account dashboard is loading correctly.</Typography>
      </Box>
    </Box>
  );
};

export default AccountUserDashboard;