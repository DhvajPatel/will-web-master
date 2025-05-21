import { Typography, Box, Paper, Grid, Avatar, Divider } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Box p={4}>
        <Typography variant="h5">User information not available</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>User Profile</Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar 
              sx={{ width: 120, height: 120, fontSize: '3rem' }}
            >
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </Avatar>
          </Grid>
          
          <Grid item xs={12} md={9}>
            <Typography variant="h5">{user.fullName}</Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {user.userType.replace('_', ' ')}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Email</Typography>
                <Typography variant="body1">{user.email}</Typography>
              </Grid>
              
              {user.phoneNumber && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Phone</Typography>
                  <Typography variant="body1">{user.phoneNumber}</Typography>
                </Grid>
              )}
              
              {user.address && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Address</Typography>
                  <Typography variant="body1">
                    {user.address.line1}
                    {user.address.line2 && <>, {user.address.line2}</>}<br />
                    {user.address.city}, {user.address.state || ''} {user.address.postalCode}<br />
                    {user.address.country}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default UserProfile;