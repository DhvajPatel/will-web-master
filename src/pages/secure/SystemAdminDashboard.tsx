import { Typography, Box } from "@mui/material";

const AdminUserDashboard = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Welcome Admin User
      </Typography>
      <Typography variant="body1">
        This is your dashboard. Here you will see your pending requests, status updates, and more.
      </Typography>
    </Box>
  );
};

export default AdminUserDashboard;
