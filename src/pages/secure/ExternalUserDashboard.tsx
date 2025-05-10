import React, {JSX, useEffect, useState} from "react";
import {
    Typography,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    CssBaseline,
    Toolbar,
    CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const drawerWidth = 240;

// Action type for sidebar
interface Action {
    key: string;
    label: string;
}

// Actions available in the sidebar menu
const actions: Action[] = [
    { key: "profile", label: "Profile Settings" },
    { key: "will", label: "Will Management" },
    { key: "userAdmin", label: "User Administration" },
    { key: "invite", label: "Invite User" },
    { key: "audit", label: "Audit Trail" },
];

// Dynamic action components map
const actionContentMap: Record<string, JSX.Element> = {
    profile: <Typography variant="h6">🔧 Profile Settings - Work in Progress</Typography>,
    will: <Typography variant="h6">📜 Will Management - Work in Progress</Typography>,
    userAdmin: <Typography variant="h6">👥 User Administration - Work in Progress</Typography>,
    invite: <Typography variant="h6">✉️ Invite User - Work in Progress</Typography>,
    audit: <Typography variant="h6">📊 Audit Trail - Work in Progress</Typography>,
};

const ExternalUserDashboard: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth(); // Fetch user from Authentication Context

    const [selectedAction, setSelectedAction] = useState<keyof typeof actionContentMap>("profile"); // Default selected action
    const [isLoading, setIsLoading] = useState(true); // Loading state for user info

    // Effect to fetch user info
    useEffect(() => {
        const fetchUserInfo = async () => {
            if (user) {
                sessionStorage.setItem("user", JSON.stringify(user)); // Store user in session storage
            } else {
                const storedUser = sessionStorage.getItem("user");
                if (!storedUser) {
                    navigate("/login");
                }
            }
            setIsLoading(false); // Loading complete
        };

        fetchUserInfo();
    }, [user, navigate]);

    // Render loading state
    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {/* Sidebar Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        bgcolor: (theme) => theme.palette.background.paper,
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                    <List>
                        {actions.map((action) => (
                            <ListItem
                                key={action.key}
                                disablePadding
                                sx={{
                                    bgcolor: selectedAction === action.key ? "action.selected" : "inherit",
                                }}
                            >
                                <ListItemButton
                                    onClick={() => setSelectedAction(action.key as keyof typeof actionContentMap)}
                                    sx={{
                                        "&:hover": { bgcolor: "action.hover" },
                                    }}
                                >
                                    <ListItemText
                                        primary={action.label}
                                        primaryTypographyProps={{ variant: "body1" }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: (theme) => theme.palette.background.default,
                    p: 3,
                }}
            >
                <Toolbar />
                {actionContentMap[selectedAction] || (
                    <Typography variant="h6" color="text.secondary">
                        🔍 Select an action from the left menu.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default ExternalUserDashboard;