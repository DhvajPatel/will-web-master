/**
 * A simple footer component that inherits most styles and adapts to the app's theme.
 */
import { Typography, useTheme } from "@mui/material";

const Footer = () => {
    const currentYear = new Date().getFullYear(); // Dynamically fetch the current year
    const theme = useTheme(); // Access the app's theme

    return (
        <footer style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText, textAlign: "center" }}>
            <Typography variant="body2">© {currentYear} Param-Ichha. All rights reserved.</Typography>
        </footer>
    );
};

export default Footer;