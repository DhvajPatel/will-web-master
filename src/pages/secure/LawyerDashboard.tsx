import { Typography, Box } from "@mui/material";

const LawyerDashboard = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Welcome Lawyer User
      </Typography>
      <Typography variant="body1">
        This is your dashboard. Here you will see your pending requests, status updates, and more.
      </Typography>
    </Box>
  );
};

export default LawyerDashboard;
