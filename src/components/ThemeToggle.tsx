import { IconButton, Tooltip } from "@mui/material";
import { ColorLens as ThemeIcon } from "@mui/icons-material"; // Icon to represent theme switching
import { useTheme } from "../context/ThemeContext"; // Import custom ThemeContext

const ThemeToggle = () => {
  const { currentTheme, toggleTheme } = useTheme(); // Use ThemeContext to get the active theme and toggle function

  // Determine the label for the tooltip
  const nextThemeName = currentTheme === "blue" ? "Pink Theme" : "Blue Theme";

  return (
    <Tooltip title={`Switch to ${nextThemeName}`}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        style={{
          backgroundColor: currentTheme === "blue" ? "#E3F2FD" : "#FCE4EC", // Button background reflects the current theme
          transition: "background-color 0.3s ease", // Smooth transition for background color
        }}
      >
        <ThemeIcon
          style={{
            color: currentTheme === "blue" ? "#1976D2" : "#F06292", // Icon color reflects the current theme
          }}
        />
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;