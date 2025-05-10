import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import logo from "../assets/logo_64x64.png";
import ThemeToggle from "../components/ThemeToggle.tsx";

const UserBar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: 64 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                    <img src={logo} alt="Param-Ichha" style={{ marginRight: 8 }} />Param Ichha - My will! My final wish!
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Typography sx={{ mr: 2 }}>Welcome, {user?.fullName || "User"}!</Typography>
                <Button component={Link} to="/about" color="inherit">About</Button>
                <Button component={Link} to="/contactUs" color="inherit">Contact Us</Button>
                <Button component={Link} to="/pricing" color="inherit">Pricing</Button>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button color="inherit" variant="outlined" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
                <ThemeToggle />
            </Toolbar>
        </AppBar>
    );
};

export default UserBar;