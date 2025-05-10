import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import logo from '../assets/logo_64x64.png';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
      <AppBar position="static"> {/* 🔄 Changed from 'fixed' to 'static' */}
        <Toolbar variant="dense">
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <img src={logo} alt="Param-Ichha" style={{ marginRight: 8 }} />Param Ichha - My will! My final wish!
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Button component={Link} to="/" color="inherit">Home</Button>
          <Button component={Link} to="/about" color="inherit">About</Button>
          <Button component={Link} to="/contactUs" color="inherit">Contact Us</Button>
          <Button component={Link} to="/pricing" color="inherit">Pricing</Button>
          <Button component={Link} to="/logout" color="inherit">Logout</Button>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
  );
};

export default Header;