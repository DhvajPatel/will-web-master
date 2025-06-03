/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from '../assets/logo_64x64.png';
import ThemeToggle from './ThemeToggle';

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};


const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        {/* Logo + Home link */}
        <Box component={NavLink} to="/" sx={{ display: 'flex', alignItems: 'center', ...linkStyle }}>
          <img src={logo} alt="Param-Ichha" style={{ marginRight: 8 }} />
          Param Ichha - My will! My final wish!
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Nav Buttons */}
        {[
          { to: "/", label: "Home" },
          { to: "/about", label: "About" },
          { to: "/contactUs", label: "Contact Us" },
          { to: "/pricing", label: "Pricing" },
          { to: "/login", label: "Login" },
          { to: "/register", label: "Register" },
          { to: "/test", label: "Test Page" },
        ].map(({ to, label }) => (
          <Button
            key={to}
            component={NavLink}
            to={to}
            color="inherit"
            sx={{
              textTransform: 'none',
              '&.active': {
                fontWeight: 'bold',
                color: '#FFD700',
                textDecoration: 'underline',
              },
            }}
          >
            {label}
          </Button>
        ))}

        <ThemeToggle />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
