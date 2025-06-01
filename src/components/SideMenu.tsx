import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserType } from '../services/user/UserType';

const SideMenu: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardRoute = (userType?: UserType): string => {
    if (!userType) return '/dashboard/account';
    
    switch (userType) {
      case UserType.ACCOUNT_USER:
        return '/dashboard/account';
      case UserType.PARTNER_USER:
        return '/dashboard/partner';
      case UserType.ADMIN_USER:
        return '/dashboard/admin';
      default:
        return '/dashboard/account';
    }
  };

  return (
    <Box sx={{ 
      width: '200px', 
      bgcolor: 'pink', 
      minHeight: '100vh', 
      position: 'fixed', 
      left: 0, 
      top: 64 
    }}>
      <List sx={{ p: 0 }}>
        <ListItem button sx={{ p: 2 }} onClick={() => navigate(getDashboardRoute(user?.userType))}>
          <ListItemText primary={user?.userType === UserType.ACCOUNT_USER ? "Account Dashboard" : 
                               user?.userType === UserType.PARTNER_USER ? "Partner Dashboard" : 
                               user?.userType === UserType.ADMIN_USER ? "Admin Dashboard" : 
                               "Account Dashboard"} />
        </ListItem>
        
        <ListItem button sx={{ p: 2 }} onClick={() => navigate('/profile')}>
          <ListItemText primary="Profile" />
        </ListItem>
        
        <ListItem button sx={{ p: 2 }} onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
};

export default SideMenu;